import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Tool } from '@/payload-types'
import type { ToolsData, ToolsRepository } from '../domain/tools.model'

export class PayloadToolsAdapter implements ToolsRepository {
  async getTools(): Promise<ToolsData> {
    const payload = await getPayload({ config: configPromise })

    const data: Tool = await payload.findGlobal({
      slug: 'tools',
    })

    return {
      title: data.title || 'Outils & Ressources',
      subtitle: data.subtitle ?? undefined,
      categories: (data.categories ?? []).map((cat) => ({
        name: cat.name,
        icon: cat.icon,
        links: (cat.links ?? []).map((link) => ({
          name: link.name,
          description: link.description,
          url: link.url,
          icon: link.icon || 'link',
        })),
      })),
    }
  }
}
