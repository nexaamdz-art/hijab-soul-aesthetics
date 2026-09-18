import { Heart, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { MosqueFooterDecoration } from "@/components/MosqueFooterDecoration";

interface ServiceFeature {
  id: string;
  icon: typeof Heart;
  text: string;
}

// Ordered strictly Right-to-Left (Arabic RTL):
// 1. Right: Heart line icon - نحن هنا دائمًا لخدمتك
// 2. Center-Right: Exchange/Return arrows icon - إمكانية الاستبدال والإرجاع
// 3. Center-Left: Shield with checkmark icon - دفع آمن ومتعدد الوسائل
// 4. Left: Delivery truck line icon - شحن سريع
const features: ServiceFeature[] = [
  {
    id: "service-feature-service",
    icon: Heart,
    text: "نحن هنا دائمًا لخدمتك",
  },
  {
    id: "service-feature-return",
    icon: RefreshCw,
    text: "إمكانية الاستبدال والإرجاع",
  },
  {
    id: "service-feature-payment",
    icon: ShieldCheck,
    text: "دفع آمن ومتعدد الوسائل",
  },
  {
    id: "service-feature-shipping",
    icon: Truck,
    text: "شحن سريع",
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto flex flex-col w-full overflow-x-clip">
      {/* Vertical clearance zone so the tall mosque minarets and floral branch rise gracefully into the cream background */}
      <div className="h-14 sm:h-20 md:h-28 lg:h-32 w-full pointer-events-none" aria-hidden="true" />

      <section
        id="service-bar-banner"
        aria-label="مزايا وخدمات المتجر"
        className="relative w-full bg-[#E3D5C9] py-2.5 sm:py-3.5 md:py-4.5 lg:py-5 border-t border-[#B8A495]/60"
      >
        {/* Clean, subtle matte kraft paper finish texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-1.5 sm:px-3 md:px-6 lg:px-8">
          {/* Main flex row: RTL places the Mosque decoration at the far right, and features to the left */}
          <div className="flex flex-row items-center justify-between w-full">
            {/* 1. RIGHT SIDE: Mosque & Arabic Calligraphy Art Container
                The wrapper reserves layout space so the 4 features never collide with the art.
                The image is anchored to the banner ribbon and towers upward over the top border. */}
            <div
              id="mosque-decoration-container"
              className="relative shrink-0 flex items-center justify-end w-[110px] sm:w-[150px] md:w-[195px] lg:w-[240px] xl:w-[270px]"
            >
              <MosqueFooterDecoration className="absolute bottom-[-2px] sm:bottom-[-4px] md:bottom-[-6px] right-0 w-[115px] sm:w-[155px] md:w-[200px] lg:w-[245px] xl:w-[275px] z-20" />
            </div>

            {/* 2. LEFT SIDE: 4 Service Features Grid
                Evenly distributed columns separated by subtle vertical dividers (#B8A495).
                Optimized padding, compact icons, and balanced typography ensure no text clipping. */}
            <div
              id="service-features-grid"
              className="flex-1 grid grid-cols-4 items-center w-full min-w-0 mr-1 sm:mr-3 md:mr-5 lg:mr-7"
            >
              {features.map((feature, idx) => {
                const IconComponent = feature.icon;
                const isLeftmost = idx === features.length - 1; // Leftmost feature in RTL (Truck: شحن سريع)

                return (
                  <div
                    key={feature.id}
                    id={feature.id}
                    className={`flex flex-col items-center justify-center text-center px-0.5 sm:px-1.5 md:px-3 lg:px-4 min-w-0 ${
                      !isLeftmost ? "border-l border-[#B8A495]/70" : ""
                    }`}
                  >
                    {/* Minimalist espresso brown line icon with hover micro-interaction */}
                    <div className="text-[#2C221E] transition-transform duration-200 hover:scale-110">
                      <IconComponent
                        className="h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
                        strokeWidth={1.35}
                      />
                    </div>

                    {/* Balanced, crisp typography in dark espresso brown (#2C221E) */}
                    <span className="mt-1 sm:mt-1.5 md:mt-2 text-[9.5px] sm:text-xs md:text-[13px] lg:text-sm font-semibold text-[#2C221E] leading-[1.2] sm:leading-snug max-w-full text-balance tracking-tight">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
