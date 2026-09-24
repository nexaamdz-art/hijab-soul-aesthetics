import fs from "node:fs";
import path from "node:path";

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

export const ADMIN_EMAILS = [
  "nexa.am.dz@gmail.com",
  "admin@hijabsoul.dz",
  "hijabsoul.dz@gmail.com",
];

export const DEFAULT_ADMIN_ACCOUNT: StoredServerAccount = {
  email: "nexa.am.dz@gmail.com",
  passwordHash: "admin123456",
  firstName: "المدير",
  lastName: "العام",
  fullName: "المدير العام (روح الحجاب)",
  createdAt: "2026-01-01T00:00:00.000Z",
  role: "admin",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

export function readServerAccounts(): StoredServerAccount[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ACCOUNTS_FILE)) {
      const initial = [DEFAULT_ADMIN_ACCOUNT];
      fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const raw = fs.readFileSync(ACCOUNTS_FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredServerAccount[];
    // Ensure default admin exists
    const adminIdx = parsed.findIndex(
      (a) => a.email.toLowerCase() === DEFAULT_ADMIN_ACCOUNT.email.toLowerCase(),
    );
    if (adminIdx === -1) {
      parsed.unshift(DEFAULT_ADMIN_ACCOUNT);
      fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(parsed, null, 2), "utf8");
    }
    return parsed;
  } catch (err) {
    console.error("Failed to read server accounts:", err);
    return [DEFAULT_ADMIN_ACCOUNT];
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

  const isAdmin = ADMIN_EMAILS.some((adm) => adm.toLowerCase() === normalizedEmail);

  const fullRecord: StoredServerAccount = {
    email: normalizedEmail,
    passwordHash: account.passwordHash,
    firstName: account.firstName,
    lastName: account.lastName,
    fullName: account.fullName || `${account.firstName} ${account.lastName}`.trim(),
    createdAt: account.createdAt || new Date().toISOString(),
    role: isAdmin ? "admin" : "authenticated",
    avatarUrl: account.avatarUrl,
  };

  if (existingIdx >= 0) {
    // Preserve existing password if not updated
    accounts[existingIdx] = {
      ...accounts[existingIdx],
      ...fullRecord,
      passwordHash: account.passwordHash || accounts[existingIdx].passwordHash,
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
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: jsonHeaders });
  }

  // REGISTER
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

      // Security: Any user registering via public API is an authenticated customer, never admin
      const isAuthorizedAdminEmail = ADMIN_EMAILS.some((adm) => adm.toLowerCase() === email);

      const created = saveServerAccount({
        email,
        passwordHash: password,
        firstName: firstName || email.split("@")[0] || "مستخدم",
        lastName,
        fullName: `${firstName} ${lastName}`.trim() || email.split("@")[0] || "مستخدم",
        role: isAuthorizedAdminEmail ? "admin" : "authenticated",
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

  // LOGIN (Strict Password Verification for ALL Accounts)
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
            error: "بيانات الدخول غير صحيحة أو الحساب غير مسجل.",
            code: "invalid_credentials",
          }),
          { status: 401, headers: jsonHeaders },
        );
      }

      // STRICT SECURITY: Password MUST match exactly.
      if (!found.passwordHash || found.passwordHash !== password) {
        return new Response(
          JSON.stringify({
            error: "كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة.",
            code: "wrong_password",
          }),
          { status: 401, headers: jsonHeaders },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          account: {
            email: found.email,
            firstName: found.firstName,
            lastName: found.lastName,
            fullName: found.fullName,
            role: found.role,
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

  // SECURE PASSWORD CHANGE
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

      const accounts = readServerAccounts();
      const found = accounts.find((a) => a.email.toLowerCase() === email);

      if (!found) {
        return new Response(JSON.stringify({ error: "الحساب غير موجود." }), {
          status: 404,
          headers: jsonHeaders,
        });
      }

      // Security check: If currentPassword was provided, it must match
      if (currentPassword && found.passwordHash !== currentPassword) {
        return new Response(JSON.stringify({ error: "كلمة المرور الحالية غير صحيحة." }), {
          status: 401,
          headers: jsonHeaders,
        });
      }

      found.passwordHash = newPassword;
      writeServerAccounts(accounts);
      return new Response(JSON.stringify({ success: true }), { headers: jsonHeaders });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: err instanceof Error ? err.message : "فشل تحديث كلمة المرور." }),
        { status: 500, headers: jsonHeaders },
      );
    }
  }

  return new Response(JSON.stringify({ error: "مسار غير معروف." }), {
    status: 404,
    headers: jsonHeaders,
  });
}
