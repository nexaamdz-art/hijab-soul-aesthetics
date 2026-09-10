import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "إكسسوارات | حجاب سول" },
      { name: "description", content: "إكسسوارات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:title", content: "إكسسوارات | حجاب سول" },
      { property: "og:description", content: "إكسسوارات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="إكسسوارات" />
    </SiteLayout>
  ),
});
