import { ContactRepository, ContactFormData } from "../domain/contact.model";

const BREVO_API_URL = "https://api.brevo.com/v3";
const ADMIN_EMAIL = "admin@daguedecoeur.fr";
const SENDER_EMAIL = "noreply@daguedecoeur.fr";
const SENDER_NAME = "Dague de Coeur";

export class BrevoContactAdapter implements ContactRepository {
  constructor(private readonly apiKey: string) {}

  async sendContactEmail(
    data: ContactFormData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1040;">Nouveau message de contact</h2>
          <p><strong>De :</strong> ${data.name} (${data.email})</p>
          <p><strong>Objet :</strong> ${data.subject}</p>
          <hr style="border-color: #D4AF37;" />
          <h3 style="color: #1a1040;">Message :</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
          <hr style="border-color: #D4AF37;" />
          <p style="color: #888; font-size: 12px;">
            Répondre directement à ce message pour contacter ${data.name} via ${data.email}.
          </p>
        </div>
      `;

      const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": this.apiKey,
        },
        body: JSON.stringify({
          sender: { name: SENDER_NAME, email: SENDER_EMAIL },
          to: [{ email: ADMIN_EMAIL, name: "Admin Dague de Coeur" }],
          replyTo: { email: data.email, name: data.name },
          subject: `[Contact] ${data.subject}`,
          htmlContent,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          success: false,
          error: error.message || "Échec de l'envoi de l'email.",
        };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Erreur réseau." };
    }
  }
}

let brevoContactAdapter: BrevoContactAdapter | null = null;

export function getBrevoContactAdapter(): BrevoContactAdapter {
  if (!brevoContactAdapter) {
    const apiKey = process.env.BREVO_API;
    if (!apiKey) {
      throw new Error("BREVO_API environment variable is not set");
    }
    brevoContactAdapter = new BrevoContactAdapter(apiKey);
  }
  return brevoContactAdapter;
}
