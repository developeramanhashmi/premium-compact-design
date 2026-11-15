import { createFileRoute } from "@tanstack/react-router";
import { PortfolioHome } from "@/components/PortfolioHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aman Alam — Data Analyst & Front-end Developer" },
      { name: "description", content: "Portfolio of Aman Alam — Data Analyst with IIT Madras & MANUU background." },
      { property: "og:title", content: "Aman Alam — Data Analyst & Front-end Developer" },
      { property: "og:description", content: "Portfolio of Aman Alam — Data Analyst with IIT Madras & MANUU background." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioHome,
});
