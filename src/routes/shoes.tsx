import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/shoes")({
  head: () => ({
    meta: [
      { title: "أحذية شرعية | حجاب سول" },
      { name: "description", content: "أحذية شرعية من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:title", content: "أحذية شرعية | حجاب سول" },
      {
        property: "og:description",
        content: "أحذية شرعية من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="أحذية شرعية" />
    </SiteLayout>
  ),
});
