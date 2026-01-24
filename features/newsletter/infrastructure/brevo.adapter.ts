import { NewsletterRepository, Campaign } from "../domain/newsletter.model";

const BREVO_API_URL = "https://api.brevo.com/v3";

interface BrevoContact {
  email: string;
  attributes?: Record<string, string>;
  listIds?: number[];
  updateEnabled?: boolean;
}

interface BrevoTransactionalEmail {
  to: { email: string; name?: string }[];
  templateId: number;
  params?: Record<string, string>;
}

export interface BrevoCampaign {
  id: number;
  name: string;
  subject: string;
  previewUrl: string;
  htmlContent: string;
  scheduledAt?: string;
  createdAt: string;
  sentDate?: string;
}

export interface BrevoCampaignsResponse {
  campaigns: BrevoCampaign[];
  count: number;
}

export class BrevoAdapter implements NewsletterRepository {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request<T>(endpoint: string, body: T): Promise<Response> {
    return fetch(`${BREVO_API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    });
  }

  /**
   * Add a contact to a Brevo list
   */
  async addContactToList(
    email: string,
    firstName: string,
    listId: number,
    customAttributes?: Record<string, string>
  ): Promise<{ success: boolean; error?: string; code?: "ALREADY_EXISTS" | "UNKNOWN" }> {
    try {
      const response = await this.request<BrevoContact>("/contacts", {
        email,
        attributes: { firstname: firstName, ...customAttributes },
        listIds: [listId],
        updateEnabled: true,
      });

      if (!response.ok) {
        const error = await response.json();
        // Check for specific Brevo error code for duplicates
        if (response.status === 400 && (error.code === "duplicate_parameter" || error.message?.includes("already exists"))) {
            return { success: false, error: "Contact already exists", code: "ALREADY_EXISTS" };
        }
        return { success: false, error: error.message || "Failed to add contact", code: "UNKNOWN" };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Network error", code: "UNKNOWN" };
    }
  }

  /**
   * Send a transactional email using a Brevo template
   */
  async sendTransactionalEmail(
    email: string,
    firstName: string,
    templateId: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.request<BrevoTransactionalEmail>("/smtp/email", {
        to: [{ email, name: firstName }],
        templateId,
        params: { firstname: firstName },
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.message || "Failed to send email" };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Network error" };
    }
  }

  /**
   * Get sent email campaigns - Implementation of NewsletterRepository
   */
  async getSentCampaigns(limit: number = 10, offset: number = 0): Promise<{ campaigns: Campaign[]; count: number }> {
     try {
       const params = new URLSearchParams({
         status: "sent",
         limit: limit.toString(),
         offset: offset.toString(),
         sort: "desc",
       });
 
       const response = await fetch(`${BREVO_API_URL}/emailCampaigns?${params}`, {
         method: "GET",
         headers: {
           "Content-Type": "application/json",
           "api-key": this.apiKey,
         },
       });
 
       if (!response.ok) {
         console.error("Failed to fetch campaigns from Brevo:", await response.text());
         return { campaigns: [], count: 0 };
       }
 
       const data: BrevoCampaignsResponse = await response.json();
       
       return {
         campaigns: data.campaigns.map(this.mapToEntity),
         count: data.count
       };
     } catch (error) {
       console.error("Network error fetching campaigns:", error);
       return { campaigns: [], count: 0 };
     }
  }

  private mapToEntity(brevoCampaign: BrevoCampaign): Campaign {
    return {
      id: brevoCampaign.id.toString(),
      subject: brevoCampaign.subject,
      sentDate: brevoCampaign.sentDate ? new Date(brevoCampaign.sentDate) : null,
      previewUrl: brevoCampaign.previewUrl
    };
  }

 
  async getCampaign(
    campaignId: number
  ): Promise<{ success: boolean; data?: BrevoCampaign; error?: string }> {
    try {
      const response = await fetch(`${BREVO_API_URL}/emailCampaigns/${campaignId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": this.apiKey,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.message || "Failed to fetch campaign" };
      }

      const data = await response.json();
      return { success: true, data };
    } catch {
      return { success: false, error: "Network error" };
    }
  }
}

// Singleton instance
let brevoAdapter: BrevoAdapter | null = null;

export function getBrevoAdapter(): BrevoAdapter {
  if (!brevoAdapter) {
    const apiKey = process.env.BREVO_API;
    if (!apiKey) {
      throw new Error("BREVO_API environment variable is not set");
    }
    brevoAdapter = new BrevoAdapter(apiKey);
  }
  return brevoAdapter;
}
