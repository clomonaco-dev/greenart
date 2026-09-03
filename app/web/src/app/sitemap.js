export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
  const routes = [
    "",
    "/about",
    "/technology",
    "/cultivation",
    "/facility",
    "/products",
    "/quality-compliance",
    "/b2b-wholesale",
    "/contact",
    "/request-b2b-offer",
  ];

  return routes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
