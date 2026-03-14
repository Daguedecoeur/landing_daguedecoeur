import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { ResourcesPageData, ResourcesRepository } from '../domain/resources.model'

export class PayloadResourcesAdapter implements ResourcesRepository {
  async getResources(): Promise<ResourcesPageData> {
    const payload = await getPayload({ config: configPromise })

    const data = await payload.findGlobal({
      slug: 'resources' as any,
    })

    const raw = data as any

    return {
      title: raw.title || 'Téléchargements',
      subtitle: raw.subtitle,
      categories: (raw.categories ?? []).map((cat: any) => ({
        name: cat.name,
        icon: cat.icon,
        items: (cat.items ?? []).map((item: any) => {
          const file = item.file
          const fileUrl =
            typeof file === 'object' && file?.url
              ? file.url
              : ''

          return {
            name: item.name,
            description: item.description,
            fileUrl,
            fileSize: item.fileSize,
            fileType: item.fileType,
          }
        }),
      })),
    }
  }
}
