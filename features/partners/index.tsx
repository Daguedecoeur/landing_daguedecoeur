import { GetPartnersUseCase } from './application/get-partners.use-case'
import { PayloadPartnersAdapter } from './infrastructure/payload-partners.adapter'

export * from './domain/partners.model'

export function getPartnersUseCase() {
  const repository = new PayloadPartnersAdapter()
  return new GetPartnersUseCase(repository)
}
