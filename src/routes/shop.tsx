import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "تسوقي الآن | حجاب سول" },
      {
        name: "description",
        content: "تسوقي أزياء حجاب سول المحتشمة والأنيقة.",
      },
      { property: "og:title", content: "تسوقي الآن | حجاب سول" },
      {
        property: "og:description",
        content: "تسوقي أزياء حجاب سول المحتشمة والأنيقة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <SiteLayout>
      <CategoryPage title="تسوقي الآن" />
    </SiteLayout>
  );
}