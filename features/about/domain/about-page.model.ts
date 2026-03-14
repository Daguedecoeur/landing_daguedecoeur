export interface AboutPageData {
  title: string
  subtitle?: string
  coverImage?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  content: any // lexical rich text
}

export interface AboutPageRepository {
  getAboutPage(): Promise<AboutPageData>
}
