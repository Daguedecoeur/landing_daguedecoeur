import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { PartnersData, PartnersRepository } from '../domain/partners.model'

export class PayloadPartnersAdapter implements PartnersRepository {
  async getPartners(): Promise<PartnersData> {
    const payload = await getPayload({ config: configPromise })

    const data = await payload.findGlobal({
      slug: 'partners' as any,
    })

    const raw = data as any

    return {
      title: raw.title || 'Nos Partenaires',
      subtitle: raw.subtitle,
      partners: (raw.partners ?? []).map((p: any) => ({
        name: p.name,
        description: p.description,
        logo: p.logo ? { url: p.logo.url, alt: p.logo.alt } : undefined,
        url: p.url,
      })),
    }
  }
}
