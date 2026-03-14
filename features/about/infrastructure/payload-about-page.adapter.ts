import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AboutPageData, AboutPageRepository } from '../domain/about-page.model'

export class PayloadAboutPageAdapter implements AboutPageRepository {
  async getAboutPage(): Promise<AboutPageData> {
    const payload = await getPayload({ config: configPromise })

    const data = await payload.findGlobal({
      slug: 'about-page' as any,
    })

    const raw = data as any
    const cover = raw.coverImage

    return {
      title: raw.title || 'À Propos',
      subtitle: raw.subtitle || undefined,
      coverImage: cover?.url
        ? {
            url: cover.url,
            alt: cover.alt || '',
            width: cover.width,
            height: cover.height,
          }
        : undefined,
      content: raw.content,
    }
  }
}
