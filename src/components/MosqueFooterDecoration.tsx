import mosqueDecorationPng from "@/assets/mosque-footer-decoration.png";

interface MosqueFooterDecorationProps {
  className?: string;
  imgClassName?: string;
}

export function MosqueFooterDecoration({
  className = "",
  imgClassName = "",
}: MosqueFooterDecorationProps) {
  return (
    <div
      id="mosque-footer-decoration-wrapper"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* High-quality transparent PNG asset */}
      <img
        id="mosque-footer-decoration-img"
        src={mosqueDecorationPng}
        alt="كل ما تحتاجينه من ملابس المحجبات في مكان واحد"
        className={`h-auto w-full object-contain drop-shadow-[0_4px_16px_rgba(44,34,30,0.06)] ${imgClassName}`}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="sync"
        suppressHydrationWarning
      />
    </div>
  );
}
