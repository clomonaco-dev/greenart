export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenart.tech";
  const routes = [
    "",
    "/request-b2b-offer",
    "/privacy-policy",
    "/cookie-policy",
    "/terms-and-conditions",

    // FIRST VERSION: pages kept in source but excluded from the public sitemap.
    // "/about",
    // "/technology",
    // "/cultivation",
    // "/facility",
    // "/products",
    // "/quality-compliance",
    // "/b2b-wholesale",
    // "/contact",
  ];

  return routes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
