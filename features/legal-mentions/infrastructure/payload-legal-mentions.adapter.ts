import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { LegalMentionsData, LegalMentionsRepository } from '../domain/legal-mentions.model'

export class PayloadLegalMentionsAdapter implements LegalMentionsRepository {
  async getLegalMentions(): Promise<LegalMentionsData> {
    const payload = await getPayload({ config: configPromise })
    
    // Using any for now to bypass type issues if generate:types hasn't finished syncing or hasn't exactly matched LegalMention yet
    const data = await payload.findGlobal({
      slug: 'legal-mentions' as any,
    })

    return {
      title: (data as any).title || 'Mentions Légales & RGPD',
      content: (data as any).content,
    }
  }
}
