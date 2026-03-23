import { GetToolsUseCase } from './application/get-tools.use-case'
import { PayloadToolsAdapter } from './infrastructure/payload-tools.adapter'

export * from './domain/tools.model'

export function getToolsUseCase() {
  const repository = new PayloadToolsAdapter()
  return new GetToolsUseCase(repository)
}
