import { GetResourcesUseCase } from './application/get-resources.use-case'
import { PayloadResourcesAdapter } from './infrastructure/payload-resources.adapter'

export { ResourcesLayout } from './presentation/ResourcesLayout'
export * from './domain/resources.model'

export function getResourcesUseCase() {
  const repository = new PayloadResourcesAdapter()
  return new GetResourcesUseCase(repository)
}
