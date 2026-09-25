import fs from "node:fs";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/index.js
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage(errorMessage) {
	return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>حجاب سول | أزياء محتشمة أنيقة</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Noto Kufi Arabic', system-ui, -apple-system, sans-serif;
        background-color: #F7F3EE;
        background-image: radial-gradient(#E5DBCF 1px, transparent 1px);
        background-size: 16px 16px;
        color: #2B2119;
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 1.5rem;
      }
      .card {
        max-width: 32rem;
        width: 100%;
        text-align: center;
        padding: 2.5rem 2rem;
        background: #FFFFFF;
        border-radius: 1rem;
        border: 1px solid #E5DBCF;
        box-shadow: 0 10px 25px -5px rgba(43, 33, 25, 0.08), 0 8px 10px -6px rgba(43, 33, 25, 0.04);
      }
      .logo-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #8C6D58;
        margin-bottom: 0.25rem;
      }
      .tagline {
        font-size: 0.85rem;
        color: #8C6D58;
        opacity: 0.8;
        margin-bottom: 1.75rem;
      }
      .divider {
        height: 1px;
        background: #E5DBCF;
        margin: 0 auto 1.75rem auto;
        width: 60%;
      }
      h1 {
        font-size: 1.35rem;
        font-weight: 700;
        color: #2B2119;
        margin-bottom: 0.75rem;
      }
      p {
        color: #6B5D52;
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 2rem;
      }
      .actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      a, button {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      .primary {
        background: #2B2119;
        color: #FAF6F0;
        border: 1px solid #2B2119;
      }
      .primary:hover {
        background: #443428;
      }
      .secondary {
        background: #FAF6F0;
        color: #2B2119;
        border: 1px solid #D5C7B7;
      }
      .secondary:hover {
        background: #EFE8DE;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="logo-title">Hijab Soul | حجاب سول</div>
      <div class="tagline">أكثر من مجرد ملابس .. إنه أسلوب حياة ♡</div>
      <div class="divider"></div>
      <h1>أهلاً بك في حجاب سول</h1>
      <p>حدث تحديث في الصفحة أثناء التحميل. يرجى الضغط على زر التحديث أو الانتقال إلى الصفحة الرئيسية للاستمتاع بتجربة التسوق.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">إعادة المحاولة</button>
        <a class="secondary" href="/">الصفحة الرئيسية</a>
        <a class="secondary" href="/shop">تصفح المتجر</a>
      </div>
    </div>
  </body>
</html>`;
}
var DATA_DIR = path.resolve(process.cwd(), ".data");
var ACCOUNTS_FILE = path.join(DATA_DIR, "accounts.json");
var ADMIN_EMAILS = [
	"nexa.am.dz@gmail.com",
	"admin@hijabsoul.dz",
	"hijabsoul.dz@gmail.com"
];
var DEFAULT_ADMIN_ACCOUNT = {
	email: "nexa.am.dz@gmail.com",
	passwordHash: "admin123456",
	firstName: "المدير",
	lastName: "العام",
	fullName: "المدير العام (روح الحجاب)",
	createdAt: "2026-01-01T00:00:00.000Z",
	role: "admin",
	avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
};
function readServerAccounts() {
	try {
		if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
		if (!fs.existsSync(ACCOUNTS_FILE)) {
			const initial = [DEFAULT_ADMIN_ACCOUNT];
			fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(initial, null, 2), "utf8");
			return initial;
		}
		const raw = fs.readFileSync(ACCOUNTS_FILE, "utf8");
		const parsed = JSON.parse(raw);
		if (parsed.findIndex((a) => a.email.toLowerCase() === DEFAULT_ADMIN_ACCOUNT.email.toLowerCase()) === -1) {
			parsed.unshift(DEFAULT_ADMIN_ACCOUNT);
			fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(parsed, null, 2), "utf8");
		}
		return parsed;
	} catch (err) {
		console.error("Failed to read server accounts:", err);
		return [DEFAULT_ADMIN_ACCOUNT];
	}
}
function writeServerAccounts(accounts) {
	try {
		if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
		fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), "utf8");
	} catch (err) {
		console.error("Failed to write server accounts:", err);
	}
}
function saveServerAccount(account) {
	const accounts = readServerAccounts();
	const normalizedEmail = account.email.trim().toLowerCase();
	const existingIdx = accounts.findIndex((a) => a.email.toLowerCase() === normalizedEmail);
	const isAdmin = ADMIN_EMAILS.some((adm) => adm.toLowerCase() === normalizedEmail);
	const fullRecord = {
		email: normalizedEmail,
		passwordHash: account.passwordHash,
		firstName: account.firstName,
		lastName: account.lastName,
		fullName: account.fullName || `${account.firstName} ${account.lastName}`.trim(),
		createdAt: account.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
		role: isAdmin ? "admin" : "authenticated",
		avatarUrl: account.avatarUrl
	};
	if (existingIdx >= 0) accounts[existingIdx] = {
		...accounts[existingIdx],
		...fullRecord,
		passwordHash: account.passwordHash || accounts[existingIdx].passwordHash
	};
	else accounts.push(fullRecord);
	writeServerAccounts(accounts);
	return fullRecord;
}
async function handleAuthApi(request) {
	const url = new URL(request.url);
	if (!url.pathname.startsWith("/api/auth")) return null;
	const jsonHeaders = {
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization"
	};
	if (request.method === "OPTIONS") return new Response(null, {
		status: 204,
		headers: jsonHeaders
	});
	if (url.pathname === "/api/auth/register" && request.method === "POST") try {
		const body = await request.json();
		const email = body.email?.trim().toLowerCase();
		const password = body.password?.trim();
		const firstName = body.firstName?.trim() || "";
		const lastName = body.lastName?.trim() || "";
		if (!email || !password || password.length < 6) return new Response(JSON.stringify({ error: "البريد الإلكتروني وكلمة المرور (6 خانات على الأقل) مطلوبان." }), {
			status: 400,
			headers: jsonHeaders
		});
		if (readServerAccounts().find((a) => a.email.toLowerCase() === email)) return new Response(JSON.stringify({
			error: "هذا الحساب مسجل مسبقاً. يرجى إدخال كلمة المرور لتسجيل الدخول.",
			code: "user_already_exists"
		}), {
			status: 409,
			headers: jsonHeaders
		});
		const isAuthorizedAdminEmail = ADMIN_EMAILS.some((adm) => adm.toLowerCase() === email);
		const created = saveServerAccount({
			email,
			passwordHash: password,
			firstName: firstName || email.split("@")[0] || "مستخدم",
			lastName,
			fullName: `${firstName} ${lastName}`.trim() || email.split("@")[0] || "مستخدم",
			role: isAuthorizedAdminEmail ? "admin" : "authenticated"
		});
		return new Response(JSON.stringify({
			success: true,
			account: {
				email: created.email,
				firstName: created.firstName,
				lastName: created.lastName,
				fullName: created.fullName,
				role: created.role,
				avatarUrl: created.avatarUrl
			}
		}), { headers: jsonHeaders });
	} catch (err) {
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "فشل إنشاء الحساب." }), {
			status: 500,
			headers: jsonHeaders
		});
	}
	if (url.pathname === "/api/auth/login" && request.method === "POST") try {
		const body = await request.json();
		const email = body.email?.trim().toLowerCase();
		const password = body.password?.trim();
		if (!email || !password) return new Response(JSON.stringify({ error: "البريد الإلكتروني وكلمة المرور مطلوبان." }), {
			status: 400,
			headers: jsonHeaders
		});
		const found = readServerAccounts().find((a) => a.email.toLowerCase() === email);
		if (!found) return new Response(JSON.stringify({
			error: "بيانات الدخول غير صحيحة أو الحساب غير مسجل.",
			code: "invalid_credentials"
		}), {
			status: 401,
			headers: jsonHeaders
		});
		if (!found.passwordHash || found.passwordHash !== password) return new Response(JSON.stringify({
			error: "كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة.",
			code: "wrong_password"
		}), {
			status: 401,
			headers: jsonHeaders
		});
		return new Response(JSON.stringify({
			success: true,
			account: {
				email: found.email,
				firstName: found.firstName,
				lastName: found.lastName,
				fullName: found.fullName,
				role: found.role,
				avatarUrl: found.avatarUrl
			}
		}), { headers: jsonHeaders });
	} catch (err) {
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "فشل تسجيل الدخول." }), {
			status: 500,
			headers: jsonHeaders
		});
	}
	if (url.pathname === "/api/auth/reset-password" && request.method === "POST") try {
		const body = await request.json();
		const email = body.email?.trim().toLowerCase();
		const currentPassword = body.currentPassword?.trim();
		const newPassword = body.newPassword?.trim();
		if (!email || !newPassword || newPassword.length < 6) return new Response(JSON.stringify({ error: "البريد الإلكتروني وكلمة المرور الجديدة (6 خانات على الأقل) مطلوبان." }), {
			status: 400,
			headers: jsonHeaders
		});
		const accounts = readServerAccounts();
		const found = accounts.find((a) => a.email.toLowerCase() === email);
		if (!found) return new Response(JSON.stringify({ error: "الحساب غير موجود." }), {
			status: 404,
			headers: jsonHeaders
		});
		if (currentPassword && found.passwordHash !== currentPassword) return new Response(JSON.stringify({ error: "كلمة المرور الحالية غير صحيحة." }), {
			status: 401,
			headers: jsonHeaders
		});
		found.passwordHash = newPassword;
		writeServerAccounts(accounts);
		return new Response(JSON.stringify({ success: true }), { headers: jsonHeaders });
	} catch (err) {
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "فشل تحديث كلمة المرور." }), {
			status: 500,
			headers: jsonHeaders
		});
	}
	return new Response(JSON.stringify({ error: "مسار غير معروف." }), {
		status: 404,
		headers: jsonHeaders
	});
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-C05oOkEP.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	try {
		const authResponse = await handleAuthApi(request);
		if (authResponse) return authResponse;
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { server_default as default, renderErrorPage as t };
