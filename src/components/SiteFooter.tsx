export function SiteFooter() {
  return (
    <footer className="bg-header text-header-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 text-sm sm:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-semibold">حجاب سول</h3>
            <p className="mt-2 text-header-foreground/70">
              كل قطعة .. تحمل في طياتها قصة إيمان
            </p>
          </div>
          <div>
            <h4 className="font-serif text-base">روابط سريعة</h4>
            <ul className="mt-2 space-y-1 text-header-foreground/70">
              <li>الرئيسية</li>
              <li>تخفيضات</li>
              <li>مقالات و نصائح</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-base">تواصلي معنا</h4>
            <ul className="mt-2 space-y-1 text-header-foreground/70">
              <li>الجزائر العاصمة</li>
              <li>contact@hijabsoul.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-header-foreground/15 pt-6 text-center text-xs text-header-foreground/50">
          © ٢٠٢٦ حجاب سول — جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
