export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenart.tech";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
