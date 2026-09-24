export function renderErrorPage(errorMessage?: string): string {
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
