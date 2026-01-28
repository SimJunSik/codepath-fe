import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/signup`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/problems`,
      lastModified: new Date(),
    },
  ];
}
