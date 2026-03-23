import { PartnersData, PartnersRepository } from '../domain/partners.model'

export class GetPartnersUseCase {
  constructor(private readonly repository: PartnersRepository) {}

  async execute(): Promise<PartnersData> {
    return this.repository.getPartners()
  }
}
