import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Partner as PayloadPartner, Media } from '@/payload-types'
import type { PartnersData, PartnersRepository } from '../domain/partners.model'

export class PayloadPartnersAdapter implements PartnersRepository {
  async getPartners(): Promise<PartnersData> {
    const payload = await getPayload({ config: configPromise })

    const data: PayloadPartner = await payload.findGlobal({
      slug: 'partners',
    })

    return {
      title: data.title || 'Nos Partenaires',
      subtitle: data.subtitle ?? undefined,
      partners: (data.partners ?? []).map((p) => {
        const logo = typeof p.logo === 'object' && p.logo !== null
          ? p.logo as Media
          : undefined

        return {
          name: p.name,
          description: p.description,
          logo: logo ? { url: logo.url ?? '', alt: logo.alt } : undefined,
          url: p.url ?? undefined,
        }
      }),
    }
  }
}
