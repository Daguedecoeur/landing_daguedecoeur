import { GetLegalMentionsUseCase } from './application/get-legal-mentions.use-case'
import { PayloadLegalMentionsAdapter } from './infrastructure/payload-legal-mentions.adapter'

export * from './domain/legal-mentions.model'

export function getLegalMentionsUseCase() {
  const repository = new PayloadLegalMentionsAdapter()
  return new GetLegalMentionsUseCase(repository)
}
