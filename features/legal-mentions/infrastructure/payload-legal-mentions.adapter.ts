import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { LegalMention } from '@/payload-types'
import type { LegalMentionsData, LegalMentionsRepository } from '../domain/legal-mentions.model'

export class PayloadLegalMentionsAdapter implements LegalMentionsRepository {
  async getLegalMentions(): Promise<LegalMentionsData> {
    const payload = await getPayload({ config: configPromise })

    const data: LegalMention = await payload.findGlobal({
      slug: 'legal-mentions',
    })

    return {
      title: data.title || 'Mentions Légales & RGPD',
      content: data.content,
    }
  }
}
