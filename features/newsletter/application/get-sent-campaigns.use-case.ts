import { Campaign, NewsletterRepository } from "../domain/newsletter.model";

export class GetSentCampaignsUseCase {
  constructor(private readonly repository: NewsletterRepository) {}

  async execute(limit: number = 10, offset: number = 0): Promise<Campaign[]> {
    const { campaigns } = await this.repository.getSentCampaigns(limit, offset);

    return campaigns.sort((a, b) => {
      const dateA = a.sentDate ? a.sentDate.getTime() : 0;
      const dateB = b.sentDate ? b.sentDate.getTime() : 0;
      return dateB - dateA;
    });
  }
}
