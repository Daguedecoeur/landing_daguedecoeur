export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactRepository {
  sendContactEmail(
    data: ContactFormData
  ): Promise<{ success: boolean; error?: string }>;
}
