import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/admin", "/mfa", "/api/"],
      },
    ],
    sitemap: "https://www.trustmydiag.com/sitemap.xml",
  };
}
