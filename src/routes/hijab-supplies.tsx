import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/hijab-supplies")({
  head: () => ({
    meta: [
      { title: "حجابات | حجاب سول" },
      {
        name: "description",
        content:
          "حجابات وشالات فاخرة من حجاب سول — أقمشة شيفون جورجيت وكريب تركي ناعم وشالات سهرة.",
      },
      { property: "og:title", content: "حجابات | حجاب سول" },
      {
        property: "og:description",
        content:
          "حجابات وشالات فاخرة من حجاب سول — أقمشة شيفون جورجيت وكريب تركي ناعم وشالات سهرة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <CategoryPage
        title="حجابات"
        subtitle="تشكيلة أرقى الحجابات والشالات التركية، شيفون جورجيت، كريب ناعم، شالات سهرة مرصعة، وأوشحة مريحة"
      />
    </SiteLayout>
  ),
});
