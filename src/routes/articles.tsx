import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "مقالات و نصائح | حجاب سول" },
      {
        name: "description",
        content: "مقالات و نصائح من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية.",
      },
      { property: "og:title", content: "مقالات و نصائح | حجاب سول" },
      {
        property: "og:description",
        content: "مقالات و نصائح من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="مقالات و نصائح" />
    </SiteLayout>
  ),
});
