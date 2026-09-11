import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/hijab-supplies")({
  head: () => ({
    meta: [
      { title: "مستلزمات الحجاب | حجاب سول" },
      { name: "description", content: "مستلزمات الحجاب من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:title", content: "مستلزمات الحجاب | حجاب سول" },
      { property: "og:description", content: "مستلزمات الحجاب من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="مستلزمات الحجاب" />
    </SiteLayout>
  ),
});
