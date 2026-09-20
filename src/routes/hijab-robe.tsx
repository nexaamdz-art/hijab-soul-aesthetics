import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/hijab-robe")({
  head: () => ({
    meta: [
      { title: "روب حجاب | حجاب سول" },
      { name: "description", content: "تشكيلة روب حجاب الفاخرة — أناقة ملكية ومحتشمة من حجاب سول الجزائر." },
      { property: "og:title", content: "روب حجاب | حجاب سول" },
      {
        property: "og:description",
        content: "تشكيلة روب حجاب الفاخرة — أناقة ملكية ومحتشمة من حجاب سول الجزائر.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage title="العبايات" categoryKey="abayas" />
    </SiteLayout>
  ),
});
