import { GetAboutPageUseCase } from './application/get-about-page.use-case'
import { PayloadAboutPageAdapter } from './infrastructure/payload-about-page.adapter'

export * from './domain/about-page.model'

export function getAboutPageUseCase() {
  const repository = new PayloadAboutPageAdapter()
  return new GetAboutPageUseCase(repository)
}
