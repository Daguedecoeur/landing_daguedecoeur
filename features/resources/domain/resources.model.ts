export interface DownloadItem {
  name: string
  description?: string
  fileUrl: string
  fileSize?: string
  fileType?: string
}

export interface DownloadCategory {
  name: string
  icon: string
  items: DownloadItem[]
}

export interface ResourcesPageData {
  title: string
  subtitle?: string
  categories: DownloadCategory[]
}

export interface ResourcesRepository {
  getResources(): Promise<ResourcesPageData>
}
