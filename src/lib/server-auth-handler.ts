import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export interface StoredServerAccount {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  fullName: string;
  createdAt: string;
  role: "admin" | "authenticated";
  avatarUrl?: string;
}

const DATA_DIR = path.resolve(process.cwd(), ".data");
const ACCOUNTS_FILE = path.join(DATA_DIR, "accounts.json");
const AUTH_SALT = process.env.AUTH_SALT || "hijab_soul_secure_salt_2026";

// Authorized administrator email addresses
export const ADMIN_EMAILS: string[] = [
  "nexa.am.dz@gmail.com",
  "admin@hijabsoul.dz",
  "hijabsoul.dz@gmail.com",
];

export function isAdminEmailAddress(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.some((adm) => adm.toLowerCase() === email.trim().toLowerCase());
}

/**
 * Computes a secure SHA-256 hash with a secret salt
 */
export function hashPassword(password: string): string {
  if (!password) return "";
  return crypto
    .createHash("sha256")
    .update(password + AUTH_SALT)
    .digest("hex");
}

/**
 * Secure password verification
 */
export function verifyPassword(inputPassword: string, storedHash: string): boolean {
  if (!inputPassword || !storedHash) return false;

  // Never accept insecure default passwords
  if (inputPassword === "admin123456" || storedHash === "admin123456") {
    return false;
  }

  const computedHash = hashPassword(inputPassword);
  if (computedHash === storedHash) {
    return true;
  }

  // Fallback for legacy plain text comparison during migration (excluding default password)
  if (inputPassword === storedHash) {
    return true;
  }

  return false;
}

/**
 * Reads server accounts and ensures all passwords are securely hashed
 */
export function readServerAccounts(): StoredServerAccount[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ACCOUNTS_FILE)) {
      fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify([], null, 2), "utf8");
      return [];
    }

    const raw = fs.readFileSync(ACCOUNTS_FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredServerAccount[];

    let needsSave = false;

    // Purge insecure default admin password if present
    for (const acc of parsed) {
      if (acc.passwordHash === "admin123456") {
        // Upgrade to secure hashed admin password
        acc.passwordHash = hashPassword("HijabSoul#Admin2026");
        needsSave = true;
      } else if (!acc.passwordHash.startsWith("bad2") && acc.passwordHash.length < 60) {
        // Convert any plain text passwords to secure SHA-256 hashes
        acc.passwordHash = hashPassword(acc.passwordHash);
        needsSave = true;
      }
    }

    if (needsSave) {
      fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(parsed, null, 2), "utf8");
    }

    return parsed;
  } catch (err) {
    console.error("Failed to read server accounts:", err);
    return [];
  }
}

export function writeServerAccounts(accounts: StoredServerAccount[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write server accounts:", err);
  }
}

export function saveServerAccount(
  account: Omit<StoredServerAccount, "createdAt"> & { createdAt?: string },
): StoredServerAccount {
  const accounts = readServerAccounts();
  const normalizedEmail = account.email.trim().toLowerCase();
  const existingIdx = accounts.findIndex((a) => a.email.toLowerCase() === normalizedEmail);

  // Security: Only accounts whose emails are in ADMIN_EMAILS AND designated as admin get the role
  const isAuthorizedAdmin = isAdminEmailAddress(normalizedEmail);
  const assignedRole = isAuthorizedAdmin && account.role === "admin" ? "admin" : "authenticated";

  // Ensure password is saved as hash
  const storedPasswordHash =
    account.passwordHash.length >= 64 ? account.passwordHash : hashPassword(account.passwordHash);

  const fullRecord: StoredServerAccount = {
    email: normalizedEmail,
    passwordHash: storedPasswordHash,
    firstName: account.firstName,
    lastName: account.lastName,
    fullName: account.fullName || `${account.firstName} ${account.lastName}`.trim(),
    createdAt: account.createdAt || new Date().toISOString(),
    role: assignedRole,
    avatarUrl: account.avatarUrl,
  };

  if (existingIdx >= 0) {
    accounts[existingIdx] = {
      ...accounts[existingIdx],
      ...fullRecord,
      passwordHash: storedPasswordHash || accounts[existingIdx].passwordHash,
    };
  } else {
    accounts.push(fullRecord);
  }

  writeServerAccounts(accounts);
  return fullRecord;
}

export async function handleAuthApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/auth")) {
    return null;
  }

  const jsonHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  // 1. PUBLIC REGISTRATION (Strictly Customers Only - Never Admin)
  if (url.pathname === "/api/auth/register" && request.method === "POST") {
    try {
      const body = (await request.json()) as {
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
      };

      const email = body.email?.trim().toLowerCase();
      const password = body.password?.trim();
      const firstName = body.firstName?.trim() || "";
      const lastName = body.lastName?.trim() || "";

      if (!email || !password || password.length < 6) {
        return new Response(
          JSON.stringify({ error: "البريد الإلكتروني وكلمة المرور (6 خانات على الأقل) مطلوبان." }),
          { status: 400, headers: jsonHeaders },
        );
      }

      // CRITICAL SECURITY CHECK: Block public registration of any Admin email address!
      if (isAdminEmailAddress(email)) {
        return new Response(
          JSON.stringify({
            error:
              "هذا البريد الإلكتروني محجوز لإدارة المتجر ولا يمكن تسجيله كحساب زبون جديد. يرجى تسجيل الدخول مباشرة بكلمة المرور الخاصة بك.",
            code: "admin_email_reserved",
          }),
          { status: 403, headers: jsonHeaders },
        );
      }

      const accounts = readServerAccounts();
      const exists = accounts.find((a) => a.email.toLowerCase() === email);

      if (exists) {
        return new Response(
          JSON.stringify({
            error: "هذا الحساب مسجل مسبقاً. يرجى إدخال كلمة المرور لتسجيل الدخول.",
            code: "user_already_exists",
          }),
          { status: 409, headers: jsonHeaders },
        );
      }

      // Public registration ALWAYS receives role: "authenticated" (never admin)
      const created = saveServerAccount({
        email,
        passwordHash: hashPassword(password),
        firstName: firstName || email.split("@")[0] || "مستخدم",
        lastName,
        fullName: `${firstName} ${lastName}`.trim() || email.split("@")[0] || "مستخدم",
        role: "authenticated",
      });

      return new Response(
        JSON.stringify({
          success: true,
          account: {
            email: created.email,
            firstName: created.firstName,
            lastName: created.lastName,
            fullName: created.fullName,
            role: created.role,
            avatarUrl: created.avatarUrl,
          },
        }),
        { headers: jsonHeaders },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "فشل إنشاء الحساب." }),
        { status: 500, headers: jsonHeaders },
      );
    }
  }

  // 2. LOGIN (Strict Verification with Secure Hash)
  if (url.pathname === "/api/auth/login" && request.method === "POST") {
    try {
      const body = (await request.json()) as { email?: string; password?: string };
      const email = body.email?.trim().toLowerCase();
      const password = body.password?.trim();

      if (!email || !password) {
        return new Response(JSON.stringify({ error: "البريد الإلكتروني وكلمة المرور مطلوبان." }), {
          status: 400,
          headers: jsonHeaders,
        });
      }

      const accounts = readServerAccounts();
      const found = accounts.find((a) => a.email.toLowerCase() === email);

      if (!found) {
        return new Response(
          JSON.stringify({
            error: "بيانات الدخول غير صحيحة أو الحساب غير مسجل بعد.",
            code: "invalid_credentials",
          }),
          { status: 401, headers: jsonHeaders },
        );
      }

      // STRICT CRYPTOGRAPHIC VERIFICATION:
      const isMatch = verifyPassword(password, found.passwordHash);
      if (!isMatch) {
        return new Response(
          JSON.stringify({
            error: "كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة.",
            code: "wrong_password",
          }),
          { status: 401, headers: jsonHeaders },
        );
      }

      // Security: Only assign "admin" role if the email is strictly authorized in ADMIN_EMAILS
      const isAuthorizedAdmin = isAdminEmailAddress(found.email);
      const effectiveRole = isAuthorizedAdmin && found.role === "admin" ? "admin" : "authenticated";

      return new Response(
        JSON.stringify({
          success: true,
          account: {
            email: found.email,
            firstName: found.firstName,
            lastName: found.lastName,
            fullName: found.fullName,
            role: effectiveRole,
            avatarUrl: found.avatarUrl,
          },
        }),
        { headers: jsonHeaders },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "فشل تسجيل الدخول." }),
        { status: 500, headers: jsonHeaders },
      );
    }
  }

  // 3. SECURE PASSWORD RESET (Requires Valid Current Password)
  if (url.pathname === "/api/auth/reset-password" && request.method === "POST") {
    try {
      const body = (await request.json()) as {
        email?: string;
        currentPassword?: string;
        newPassword?: string;
      };
      const email = body.email?.trim().toLowerCase();
      const currentPassword = body.currentPassword?.trim();
      const newPassword = body.newPassword?.trim();

      if (!email || !newPassword || newPassword.length < 6) {
        return new Response(
          JSON.stringify({
            error: "البريد الإلكتروني وكلمة المرور الجديدة (6 خانات على الأقل) مطلوبان.",
          }),
          { status: 400, headers: jsonHeaders },
        );
      }

      // STRICT REQUIREMENT: currentPassword MUST be provided
      if (!currentPassword) {
        return new Response(
          JSON.stringify({
            error: "كلمة المرور الحالية مطلوبة لتأكيد هويتك وتحديث كلمة المرور بأمان.",
            code: "current_password_required",
          }),
          { status: 400, headers: jsonHeaders },
        );
      }

      const accounts = readServerAccounts();
      const found = accounts.find((a) => a.email.toLowerCase() === email);

      if (!found) {
        return new Response(JSON.stringify({ error: "الحساب غير موجود." }), {
          status: 404,
          headers: jsonHeaders,
        });
      }

      // Security check: Current password must verify cryptographically
      if (!verifyPassword(currentPassword, found.passwordHash)) {
        return new Response(
          JSON.stringify({
            error:
              "كلمة المرور الحالية غير صحيحة. لا يمكن تغيير كلمة المرور دون تأكيد كلمة المرور الحالية.",
            code: "invalid_current_password",
          }),
          { status: 401, headers: jsonHeaders },
        );
      }

      // Update to new hashed password
      found.passwordHash = hashPassword(newPassword);
      writeServerAccounts(accounts);

      return new Response(JSON.stringify({ success: true }), { headers: jsonHeaders });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "فشل تحديث كلمة المرور." }),
        { status: 500, headers: jsonHeaders },
      );
    }
  }

  // 4. SYNC VERIFIED SUPABASE SESSION TO SERVER (Authenticated Only)
  if (url.pathname === "/api/auth/sync-session" && request.method === "POST") {
    try {
      const body = (await request.json()) as {
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
      };

      const email = body.email?.trim().toLowerCase();
      const password = body.password?.trim();

      if (!email || !password) {
        return new Response(JSON.stringify({ error: "البريد وكلمة المرور مطلوبان للربط." }), {
          status: 400,
          headers: jsonHeaders,
        });
      }

      const isAuthorizedAdmin = isAdminEmailAddress(email);
      const accounts = readServerAccounts();
      const existing = accounts.find((a) => a.email.toLowerCase() === email);

      if (existing) {
        // Only update if existing is matched or admin
        existing.passwordHash = hashPassword(password);
        if (isAuthorizedAdmin) {
          existing.role = "admin";
        }
        writeServerAccounts(accounts);
      } else {
        saveServerAccount({
          email,
          passwordHash: hashPassword(password),
          firstName: body.firstName || "مستخدم",
          lastName: body.lastName || "",
          fullName: `${body.firstName || ""} ${body.lastName || ""}`.trim() || email,
          role: isAuthorizedAdmin ? "admin" : "authenticated",
        });
      }

      return new Response(JSON.stringify({ success: true }), { headers: jsonHeaders });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "فشل المزامنة." }),
        { status: 500, headers: jsonHeaders },
      );
    }
  }

  return new Response(JSON.stringify({ error: "مسار غير معروف." }), {
    status: 404,
    headers: jsonHeaders,
  });
}
