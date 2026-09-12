import { Link } from "@tanstack/react-router";
import heroArtwork from "@/assets/hijab-soul-hero.png.asset.json";

export function HeroArtwork() {
  return (
    <section aria-label="أناقة الحجاب بأسلوبك الخاص" className="w-full">
      <div className="relative aspect-[1034/485] w-full overflow-hidden">
        <img
          src={heroArtwork.url}
          alt="أناقة الحجاب بأسلوبك الخاص"
          className="block h-full w-full object-contain"
          fetchPriority="high"
        />
        <Link
          to="/shop"
          aria-label="تسوقي الآن"
          title="تسوقي الآن"
          className="absolute left-[50.5%] top-[63.5%] h-[16%] w-[17%] bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <span className="sr-only">تسوقي الآن</span>
        </Link>
      </div>
    </section>
  );
}