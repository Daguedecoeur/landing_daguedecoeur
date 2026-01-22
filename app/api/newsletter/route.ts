import { NextRequest, NextResponse } from "next/server";
import { SubscriptionSchema } from "@/features/newsletter/domain/subscription.schema";
import { getBrevoAdapter } from "@/features/newsletter/infrastructure/brevo.adapter";

const BREVO_LIST_ID = 4;
const BREVO_TEMPLATE_ID = 13;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = SubscriptionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const { email, firstName } = result.data;
    const brevo = getBrevoAdapter();

    const contactResult = await brevo.addContactToList(email, firstName, BREVO_LIST_ID);
    if (!contactResult.success) {
      console.error("Failed to add contact:", contactResult.error);
    }

    const emailResult = await brevo.sendTransactionalEmail(email, firstName, BREVO_TEMPLATE_ID);
    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send welcome email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
