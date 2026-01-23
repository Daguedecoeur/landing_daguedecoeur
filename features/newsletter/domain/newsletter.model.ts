export interface Campaign {
  id: string;
  subject: string;
  sentDate: Date | null;
  previewUrl: string;
}

export interface NewsletterRepository {
  getSentCampaigns(limit?: number, offset?: number): Promise<{ campaigns: Campaign[]; count: number }>;
}
