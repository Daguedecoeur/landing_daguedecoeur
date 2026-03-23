export interface BenefitItem {
  title: string
  description: string
}

export interface FormContent {
  title: string
  subtitle: string
  firstNamePlaceholder: string
  emailPlaceholder: string
  acquisitionChannelLabel: string
  submitButtonDefault: string
  submitButtonLoading: string
  disclaimer: string
}

export interface SuccessContent {
  title: string
  message: string
  community: {
    title: string
    text: string
    cta: string
    link: string
  }
  accountCreation: {
    title: string
    text: string
    cta: string
    link: string
  }
  signature: {
    text: string
    name: string
  }
}

export interface HomepageContent {
  header: {
    titleStart: string
    titleHighlight: string
    subtitle: string
  }
  painPoints: {
    title: string
    points: string[]
  }
  solution: {
    title: string
    bio: string
    signature: string
  }
  benefits: {
    title: string
    items: BenefitItem[]
  }
  form: FormContent
  success: SuccessContent
}

export interface HomepageContentRepository {
  getHomepageContent(): Promise<HomepageContent>
}
