import { NextRequest, NextResponse } from "next/server";
import { ContactSchema } from "@/features/contact/domain/contact.schema";
import { SendContactEmailUseCase } from "@/features/contact/application/send-contact-email.use-case";
import { getBrevoContactAdapter } from "@/features/contact/infrastructure/brevo-contact.adapter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = ContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides.", details: result.error.issues },
        { status: 400 }
      );
    }

    const repository = getBrevoContactAdapter();
    const useCase = new SendContactEmailUseCase(repository);
    const { success, error } = await useCase.execute(result.data);

    if (!success) {
      console.error("[API /contact] Brevo error:", error);
      return NextResponse.json(
        { error: "Échec de l'envoi de l'email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[API /contact] Unexpected error:", error);
    return NextResponse.json({ error: "Erreur interne." }, { status: 500 });
  }
}
