import { MetadataRoute } from "next";

const BASE_URL = "https://www.trustmydiag.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/blog",
    "/blog/second-avis-dentaire",
    "/blog/bilan-gynecologique",
    "/blog/droits-second-avis-medical",
    "/blog/preparer-dossier-medical",
    "/faq",
    "/contact",
    "/testimonials",
    "/mentions-legales",
    "/terms",
    "/rgpd",
    "/cookies",
    "/news",
    "/guides",
    "/glossary",
    "/login",
    "/register",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
