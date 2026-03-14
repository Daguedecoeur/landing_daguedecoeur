import { LegalMentionsData, LegalMentionsRepository } from '../domain/legal-mentions.model'

export class GetLegalMentionsUseCase {
  constructor(private readonly repository: LegalMentionsRepository) {}

  async execute(): Promise<LegalMentionsData> {
    return this.repository.getLegalMentions()
  }
}
