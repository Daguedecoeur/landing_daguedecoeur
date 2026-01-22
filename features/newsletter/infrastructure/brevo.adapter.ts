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

export class BrevoAdapter {
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
    listId: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.request<BrevoContact>("/contacts", {
        email,
        attributes: { firstname: firstName },
        listIds: [listId],
        updateEnabled: true,
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.message || "Failed to add contact" };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Network error" };
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
    } catch (error) {
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
