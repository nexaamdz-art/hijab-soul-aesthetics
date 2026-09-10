import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/dresses")({
  head: () => ({
    meta: [
      { title: "فساتين | حجاب سول" },
      { name: "description", content: "فساتين من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:title", content: "فساتين | حجاب سول" },
      { property: "og:description", content: "فساتين من حجاب سول — أزياء محتشمة أنيقة بلمسة راقية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="فساتين" />
    </SiteLayout>
  ),
});
