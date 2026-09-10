import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/khimar")({
  head: () => ({
    meta: [
      { title: "خمار | حجاب سول" },
      { name: "description", content: "خمار من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:title", content: "خمار | حجاب سول" },
      { property: "og:description", content: "خمار من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="خمار" />
    </SiteLayout>
  ),
});
