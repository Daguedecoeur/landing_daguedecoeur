export interface ToolLink {
  name: string
  description: string
  url: string
  icon: string
}

export interface ToolCategory {
  name: string
  icon: string
  links: ToolLink[]
}

export interface ToolsData {
  title: string
  subtitle?: string
  categories: ToolCategory[]
}

export interface ToolsRepository {
  getTools(): Promise<ToolsData>
}
