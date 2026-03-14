import { ContactRepository, ContactFormData } from "../domain/contact.model";

export class SendContactEmailUseCase {
  constructor(private readonly repository: ContactRepository) {}

  async execute(
    data: ContactFormData
  ): Promise<{ success: boolean; error?: string }> {
    return this.repository.sendContactEmail(data);
  }
}
