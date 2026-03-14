import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Resource, Media } from '@/payload-types'
import type { ResourcesPageData, ResourcesRepository } from '../domain/resources.model'

export class PayloadResourcesAdapter implements ResourcesRepository {
  async getResources(): Promise<ResourcesPageData> {
    const payload = await getPayload({ config: configPromise })

    const data: Resource = await payload.findGlobal({
      slug: 'resources',
    })

    return {
      title: data.title || 'Téléchargements',
      subtitle: data.subtitle ?? undefined,
      categories: (data.categories ?? []).map((cat) => ({
        name: cat.name,
        icon: cat.icon,
        items: (cat.items ?? []).map((item) => {
          const file = typeof item.file === 'object' && item.file !== null
            ? (item.file as Media)
            : null

          return {
            name: item.name,
            description: item.description ?? undefined,
            fileUrl: file?.url ?? '',
            fileSize: item.fileSize ?? undefined,
            fileType: item.fileType ?? undefined,
          }
        }),
      })),
    }
  }
}
