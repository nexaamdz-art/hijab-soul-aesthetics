import type { ReactNode } from "react";

type Feature = {
  title: string;
  detail: string;
  illustration: ReactNode;
};

const drawingProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.65,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features: Feature[] = [
  {
    title: "شحن سريع",
    detail: "لجميع المناطق",
    illustration: (
      <svg viewBox="0 0 64 50" aria-hidden="true" className="h-full w-full">
        <g {...drawingProps}>
          <path d="M7.5 34.8h4.8m32.6 0h5.7c1.5 0 2.5-.8 2.6-2.2l.2-7.8-7.4-8.1h-8.7" />
          <path d="M14 34.8h20.4V11.3H14.1l-.1 23.5Z" />
          <path d="M37.4 19.1h7.1l5.2 5.8H37.4m10 0v4.8h5.8" />
          <path d="M13.8 16.4H9.1m4.7 5.7H5.9m8 5.7H9.6" />
          <circle cx="18.2" cy="36.1" r="4.1" />
          <circle cx="43.2" cy="36.1" r="4.1" />
          <path d="M16.2 36c.8-.8 2.3-.9 3.4 0m21.6 0c.8-.8 2.3-.9 3.4 0" />
          <path d="M21.4 14.7v-5m-3 1.5 3-2.7 3.1 2.6" />
        </g>
      </svg>
    ),
  },
  {
    title: "دفع آمن",
    detail: "ومتعدد الوسائل",
    illustration: (
      <svg viewBox="0 0 64 50" aria-hidden="true" className="h-full w-full">
        <g {...drawingProps}>
          <path d="M31.7 5.4c5.2 4 10.1 5.4 15.2 6.7v11.5c0 9.5-5.7 16.4-15.2 21.2-9.3-4.7-15.1-11.7-15.1-21.2V12.1c5-1.3 10-2.8 15.1-6.7Z" />
          <path d="m24.4 24.6 5 5.1 9.7-10.5" />
          <path d="M18.9 13.9c4.7-1.4 8.9-3.1 12.8-6.2 4.1 3.1 8.2 4.8 12.8 6.2" opacity=".5" />
        </g>
      </svg>
    ),
  },
  {
    title: "إمكانية الاستبدال",
    detail: "والإرجاع",
    illustration: (
      <svg viewBox="0 0 64 50" aria-hidden="true" className="h-full w-full">
        <g {...drawingProps}>
          <path d="m19 17.3 12.9-7.2 13.3 7.2-13 7.4L19 17.3Z" />
          <path d="M19 17.6v16l13 7.3 13-7.3v-16M32 24.8v15.8" />
          <path d="M25.6 13.6 38.9 21" opacity=".55" />
          <path d="M48.8 9.7c4.3 1.8 7.3 5.8 7.3 10.6 0 2.6-.9 5-2.4 6.9" />
          <path d="m48 13.8.8-4.1 4-1.1" />
          <path d="M15.1 39.6c-4.3-1.7-7.3-5.8-7.3-10.5 0-2.7.9-5.1 2.4-7" />
          <path d="m15.8 35.5-.7 4.1-4.1 1" />
        </g>
      </svg>
    ),
  },
  {
    title: "نحن هنا دائمًا",
    detail: "لخدمتك",
    illustration: (
      <svg viewBox="0 0 64 50" aria-hidden="true" className="h-full w-full">
        <g {...drawingProps}>
          <path d="M31.8 42.6C24 35.7 13.4 28.9 12.1 19.5 11 11.8 20.3 7.2 26 12c2.1 1.7 3.6 4.4 5.7 7.5 2-3.2 3.5-5.8 5.7-7.6 5.8-4.8 15.1-.2 13.9 7.7-1.4 9.4-11.8 16.1-19.5 23Z" />
          <path d="M49.9 12.1c1.2 2.5 1.7 5.4 1.1 8.3M14.8 28.9c-1.8-2.4-3-4.8-3.3-7.3" opacity=".55" />
        </g>
      </svg>
    ),
  },
];

export function FeaturesSection() {
  return (
    <section aria-label="مزايا التسوق" className="paper-cream border-y border-ink/10 px-4 py-7 sm:px-7 lg:py-8">
      <div dir="ltr" className="mx-auto grid max-w-[1100px] grid-cols-2 sm:px-3 lg:grid-cols-4">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            dir="rtl"
            className={`relative flex min-h-[142px] flex-col items-center justify-center px-3 text-center text-ink sm:min-h-[152px] sm:px-6 lg:min-h-[132px] ${
              index % 2 === 0 ? "border-r border-ink/20 lg:border-r-0" : ""
            } ${index < 2 ? "border-b border-ink/20 lg:border-b-0" : ""} ${index > 0 ? "lg:border-l lg:border-ink/20" : ""}`}
          >
            <span className="mb-2 block h-[50px] w-[64px]" aria-hidden="true">
              {feature.illustration}
            </span>
            <h2 className="text-[15px] font-medium leading-7 sm:text-base">{feature.title}</h2>
            <p className="text-[14px] leading-6 text-ink/90 sm:text-[15px]">{feature.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}