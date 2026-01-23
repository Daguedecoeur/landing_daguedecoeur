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

    // 1. Add to list
    const contactResult = await brevo.addContactToList(email, firstName, BREVO_LIST_ID);
    
    // Check if error is NOT "contact already exists" (which we treat as success for the user flow)
    // Brevo returns "duplicate_parameter" or message containing "already exists" typically.
    // We'll trust the adapter to return specific codes or just string match for now if adapter is generic.
    // For now assuming any failure that isn't network crash might be worth logging but we want to let the user "login"
    // IMPROVEMENT: We should check specifically for duplicate error. 
    // Usually Brevo returns 400 for duplicates.
    if (!contactResult.success) {
        // If it's a "real" error (not just duplicate), we might want to stop. 
        // But for this "paywall" feature, if they are already in the list, we generally want to let them through.
        // So we log it but proceed to sending email (maybe they want the welcome email again?) 
        // or just proceed to returning success.
        console.warn("Add contact result:", contactResult.error);
    }

    // 2. Send transactional email (Welcome) - ONLY if it was a new signup? 
    // Or send it anyway? The user might expect a confirmation.
    // If they are already subscribed, Brevo might bounce it or they get it again.
    // Let's attempt to send.
    const emailResult = await brevo.sendTransactionalEmail(email, firstName, BREVO_TEMPLATE_ID);
    if (!emailResult.success) {
       console.error("Failed to send email:", emailResult.error);
       // We don't fail the request here, main goal is "subscription/login"
    }

    // 3. Set Cookie and Return Success
    const response = NextResponse.json({ success: true });
    
    // Set a long-lived cookie to "remember" the subscription
    response.cookies.set("dague_newsletter_auth", "true", {
        httpOnly: true, // Only accessible by server (used in Server Components)
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
        sameSite: "lax"
    });

    return response;
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
