// import { createFileRoute } from "@tanstack/react-router";
// import { PortfolioHome } from "@/components/PortfolioHome";

// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "Aman Alam — Data Analyst & Front-end Developer" },
//       { name: "description", content: "Portfolio of Aman Alam — Data Analyst with IIT Madras & MANUU background." },
//       { property: "og:title", content: "Aman Alam — Data Analyst & Front-end Developer" },
//       { property: "og:description", content: "Portfolio of Aman Alam — Data Analyst with IIT Madras & MANUU background." },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary_large_image" },
//     ],
//   }),
//   component: PortfolioHome,
// });
import { createFileRoute } from "@tanstack/react-router";
import { PortfolioHome } from "@/components/PortfolioHome";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "canonical", href: "https://founder.devgronix.com" },
    ],
    meta: [
      { title: "Aman Alam — Founder of DEVGRONIX | Data Analyst & Developer" },
      { 
        name: "description", 
        content: "Official portfolio of Aman Alam (Hashmi Aman), Founder & Lead Full-Stack Architect at DEVGRONIX. Data Analyst with background from IIT Madras and MANUU." 
      },
      { 
        name: "keywords", 
        content: "founder of devgronix, devgronix founder, aman alam, hashmi aman, aman alam devgronix, devgronix.com founder, founder.devgronix.com, data analyst iit madras" 
      },
      { name: "author", content: "Aman Alam" },
      { property: "og:title", content: "Aman Alam — Founder of DEVGRONIX" },
      { property: "og:description", content: "Founder & Lead Architect at DEVGRONIX. Data Analyst with IIT Madras & MANUU background." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://founder.devgronix.com" },
      { property: "og:site_name", content: "Aman Alam — Founder of DEVGRONIX" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Aman Alam — Founder of DEVGRONIX" },
      { name: "twitter:description", content: "Founder of DEVGRONIX & Data Analyst from IIT Madras & MANUU." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Aman Alam",
          "alternateName": ["Hashmi Aman", "developeramanhashmi"],
          "jobTitle": "Founder & Lead Full-Stack Architect",
          "worksFor": {
            "@type": "Organization",
            "name": "DEVGRONIX",
            "url": "https://devgronix.com"
          },
          "description": "Founder of DEVGRONIX, Data Analyst, and Full-Stack Developer with education from IIT Madras and MANUU.",
          "url": "https://founder.devgronix.com",
          "sameAs": [
            "https://devgronix.com",
            "https://github.com/developeramanhashmi",
            "https://x.com/amanalam93"
          ],
          "alumniOf": [
            { "@type": "CollegeOrUniversity", "name": "IIT Madras" },
            { "@type": "CollegeOrUniversity", "name": "MANUU" }
          ],
          "knowsAbout": [
            "Data Analysis",
            "SQL",
            "Python",
            "Power BI",
            "React",
            "Full Stack Architecture",
            "Frontend Development"
          ]
        }),
      },
    ],
  }),
  component: PortfolioHome,
});
