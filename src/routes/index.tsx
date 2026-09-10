import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "حجاب سول | أزياء محتشمة أنيقة" },
      {
        name: "description",
        content:
          "حجاب سول: فساتين، إسدالات، خمار، عبايات وإكسسوارات محتشمة بلمسة أنيقة وراقية.",
      },
      { property: "og:title", content: "حجاب سول | أزياء محتشمة أنيقة" },
      {
        property: "og:description",
        content: "أكثر من مجرد ملابس .. إنه أسلوب حياة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SiteLayout />;
}
