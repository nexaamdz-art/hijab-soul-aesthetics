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
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-CHNm8cBm.mjs").then((m) => m.default ?? m);
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
