import { getPayload } from 'payload'
import config from '@payload-config'
import type { HomepageContent, HomepageContentRepository } from '../domain/homepage-content.model'
import contentJson from '../content.json'

// ── Fallback (content.json) ───────────────────────────────────────────────
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
      accountCreation: c.success.accountCreation,
      signature: c.success.signature,
    },
  }
}

function isFormEmpty(data: Record<string, unknown>): boolean {
  return !data.form || !(data.form as Record<string, unknown>).title
}

// ── Adapter ───────────────────────────────────────────────────────────────
// Note: hero/features/kit are handled by PayloadHomepagePageAdapter.
// This adapter reads form, success (for the modal) + legacy sections
// used by the /decouvre-daggerheart NewsletterView (header, painPoints, etc.)
export class PayloadHomepageAdapter implements HomepageContentRepository {
  async getHomepageContent(): Promise<HomepageContent> {
    try {
      const payload = await getPayload({ config })
      const data = await payload.findGlobal({ slug: 'decouvre-daggerheart' })

      if (isFormEmpty(data as unknown as Record<string, unknown>)) {
        return getContentJsonFallback()
      }

      const fallback = getContentJsonFallback()

      return {
        header: fallback.header,
        painPoints: fallback.painPoints,
        solution: fallback.solution,
        benefits: fallback.benefits,
        form: {
          title: data.form?.title ?? fallback.form.title,
          subtitle: data.form?.subtitle ?? fallback.form.subtitle,
          firstNamePlaceholder: data.form?.firstNamePlaceholder ?? fallback.form.firstNamePlaceholder,
          emailPlaceholder: data.form?.emailPlaceholder ?? fallback.form.emailPlaceholder,
          acquisitionChannelLabel: data.form?.acquisitionChannelLabel ?? fallback.form.acquisitionChannelLabel,
          submitButtonDefault: data.form?.submitButtonDefault ?? fallback.form.submitButtonDefault,
          submitButtonLoading: data.form?.submitButtonLoading ?? fallback.form.submitButtonLoading,
          disclaimer: data.form?.disclaimer ?? fallback.form.disclaimer,
        },
        success: {
          title: data.success?.title ?? fallback.success.title,
          message: data.success?.message ?? fallback.success.message,
          community: {
            title: data.success?.communityTitle ?? fallback.success.community.title,
            text: data.success?.communityText ?? fallback.success.community.text,
            cta: data.success?.communityCta ?? fallback.success.community.cta,
            link: data.success?.communityLink ?? fallback.success.community.link,
          },
          accountCreation: {
            title: data.success?.accountCreationTitle ?? fallback.success.accountCreation.title,
            text: data.success?.accountCreationText ?? fallback.success.accountCreation.text,
            cta: data.success?.accountCreationCta ?? fallback.success.accountCreation.cta,
            link: data.success?.accountCreationLink ?? fallback.success.accountCreation.link,
          },
          signature: {
            text: data.success?.signatureText ?? fallback.success.signature.text,
            name: data.success?.signatureName ?? fallback.success.signature.name,
          },
        },
      }
    } catch (error) {
      console.error('[PayloadHomepageAdapter]', error)
      return getContentJsonFallback()
    }
  }
}

// ── Singleton ─────────────────────────────────────────────────────────────
import { createSingleton } from '@/lib/singleton'

export const getPayloadHomepageAdapter = createSingleton(() => new PayloadHomepageAdapter())
