import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://iclalinal.com.tr'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Eğer gizli sayfaların varsa
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
