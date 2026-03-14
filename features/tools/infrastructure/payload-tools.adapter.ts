import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { ToolsData, ToolsRepository } from '../domain/tools.model'

export class PayloadToolsAdapter implements ToolsRepository {
  async getTools(): Promise<ToolsData> {
    const payload = await getPayload({ config: configPromise })

    const data = await payload.findGlobal({
      slug: 'tools' as any,
    })

    const raw = data as any

    return {
      title: raw.title || 'Outils & Ressources',
      subtitle: raw.subtitle,
      categories: (raw.categories ?? []).map((cat: any) => ({
        name: cat.name,
        icon: cat.icon,
        links: (cat.links ?? []).map((link: any) => ({
          name: link.name,
          description: link.description,
          url: link.url,
          icon: link.icon || 'link',
        })),
      })),
    }
  }
}
