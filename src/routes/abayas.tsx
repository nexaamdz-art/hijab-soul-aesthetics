import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/abayas")({
  head: () => ({
    meta: [
      { title: "عبايات | حجاب سول" },
      { name: "description", content: "عبايات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:title", content: "عبايات | حجاب سول" },
      { property: "og:description", content: "عبايات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="عبايات" />
    </SiteLayout>
  ),
});
