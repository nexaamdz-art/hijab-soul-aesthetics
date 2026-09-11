import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "تخفيضات | حجاب سول" },
      { name: "description", content: "تخفيضات حجاب سول — قطع محتشمة أنيقة بأسعار مميزة." },
      { property: "og:title", content: "تخفيضات | حجاب سول" },
      { property: "og:description", content: "تخفيضات حجاب سول — قطع محتشمة أنيقة بأسعار مميزة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="تخفيضات" />
    </SiteLayout>
  ),
});
