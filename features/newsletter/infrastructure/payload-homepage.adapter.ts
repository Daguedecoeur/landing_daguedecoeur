import { getPayload } from 'payload'
import config from '@payload-config'
import { HomepageContent, HomepageContentRepository } from '../domain/homepage-content.model'
import contentJson from '../content.json'

// Fallback content from content.json (used when Payload Global has no data)
function getContentJsonFallback(): HomepageContent {
  const c = contentJson.newsletter
  return {
    header: {
      titleStart: c.header.title.start,
      titleHighlight: c.header.title.highlight,
      subtitle: c.header.subtitle,
    },
    painPoints: {
      title: c.painPoints.title,
      points: c.painPoints.points,
    },
    solution: {
      title: c.solution.title,
      bio: c.solution.p1,
      signature: c.solution.signature,
    },
    benefits: {
      title: c.benefits.title,
      items: c.benefits.items,
    },
    form: {
      title: c.form.title,
      subtitle: '',
      firstNamePlaceholder: c.form.firstNamePlaceholder,
      emailPlaceholder: c.form.emailPlaceholder,
      acquisitionChannelLabel: '',
      submitButtonDefault: c.form.submitButton.default,
      submitButtonLoading: c.form.submitButton.loading,
      disclaimer: c.form.disclaimer,
    },
    success: {
      title: c.success.title,
      message: c.success.message,
      community: c.success.community,
      signature: c.success.signature,
    },
  }
}

function isContentEmpty(data: Record<string, unknown>): boolean {
  // If the Payload Global was just created but never saved,
  // the header fields will be empty or missing
  return !data.header || !(data.header as Record<string, unknown>).titleStart
}

export class PayloadHomepageAdapter implements HomepageContentRepository {
  async getHomepageContent(): Promise<HomepageContent> {
    try {
      const payload = await getPayload({ config })
      const data = await payload.findGlobal({ slug: 'decouvre-daggerheart' })

      // If the Global has no real content yet, use fallback
      if (isContentEmpty(data as unknown as Record<string, unknown>)) {
        console.log('[Homepage] Payload Global empty, using content.json fallback')
        return getContentJsonFallback()
      }

      return {
        header: {
          titleStart: data.header?.titleStart ?? '',
          titleHighlight: data.header?.titleHighlight ?? '',
          subtitle: data.header?.subtitle ?? '',
        },
        painPoints: {
          title: data.painPoints?.title ?? '',
          points: (data.painPoints?.points ?? []).map(
            (p: { text?: string | null }) => p.text ?? ''
          ),
        },
        solution: {
          title: data.solution?.title ?? '',
          bio: data.solution?.bio ?? '',
          signature: data.solution?.signature ?? '',
        },
        benefits: {
          title: data.benefits?.title ?? '',
          items: (data.benefits?.items ?? []).map(
            (item: { title?: string | null; description?: string | null }) => ({
              title: item.title ?? '',
              description: item.description ?? '',
            })
          ),
        },
        form: {
          title: data.form?.title ?? '',
          subtitle: data.form?.subtitle ?? '',
          firstNamePlaceholder: data.form?.firstNamePlaceholder ?? '',
          emailPlaceholder: data.form?.emailPlaceholder ?? '',
          acquisitionChannelLabel: data.form?.acquisitionChannelLabel ?? '',
          submitButtonDefault: data.form?.submitButtonDefault ?? '',
          submitButtonLoading: data.form?.submitButtonLoading ?? '',
          disclaimer: data.form?.disclaimer ?? '',
        },
        success: {
          title: data.success?.title ?? '',
          message: data.success?.message ?? '',
          community: {
            title: data.success?.communityTitle ?? '',
            text: data.success?.communityText ?? '',
            cta: data.success?.communityCta ?? '',
            link: data.success?.communityLink ?? '',
          },
          signature: {
            text: data.success?.signatureText ?? '',
            name: data.success?.signatureName ?? '',
          },
        },
      }
    } catch (error) {
      // If Payload is not available (DB down, etc.), fall back to content.json
      console.error('[Homepage] Payload unavailable, using content.json fallback:', error)
      return getContentJsonFallback()
    }
  }
}

// Singleton
let adapter: PayloadHomepageAdapter | null = null

export function getPayloadHomepageAdapter(): PayloadHomepageAdapter {
  if (!adapter) {
    adapter = new PayloadHomepageAdapter()
  }
  return adapter
}
