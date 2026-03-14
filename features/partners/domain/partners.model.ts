export interface Partner {
  name: string
  description: string
  logo?: {
    url: string
    alt?: string
  }
  url?: string
}

export interface PartnersData {
  title: string
  subtitle?: string
  partners: Partner[]
}

export interface PartnersRepository {
  getPartners(): Promise<PartnersData>
}
