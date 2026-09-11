import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/isdalat")({
  head: () => ({
    meta: [
      { title: "اسدالات | حجاب سول" },
      { name: "description", content: "اسدالات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:title", content: "اسدالات | حجاب سول" },
      { property: "og:description", content: "اسدالات من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="اسدالات" />
    </SiteLayout>
  ),
});
