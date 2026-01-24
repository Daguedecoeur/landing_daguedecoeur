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

    const { email, firstName, acquisitionChannel, acquisitionChannelOther } = result.data;
    const brevo = getBrevoAdapter();

    // Determine the final acquisition channel value
    const acquisitionValue = acquisitionChannel === "Autre" && acquisitionChannelOther
      ? `Autre: ${acquisitionChannelOther}`
      : acquisitionChannel;

    // 1. Add to list with acquisition channel attribute
    const contactResult = await brevo.addContactToList(email, firstName, BREVO_LIST_ID, {
      ACQUISITION_CHANNEL: acquisitionValue,
    });
    
    // 2. Send transactional email (Welcome) - ONLY if it's a new signup
    if (contactResult.success) {
        const emailResult = await brevo.sendTransactionalEmail(email, firstName, BREVO_TEMPLATE_ID);
        if (!emailResult.success) {
           console.error("Failed to send email:", emailResult.error);
        }
    } else if (contactResult.code === "ALREADY_EXISTS") {
        console.log("Contact already exists, skipping welcome email.");
        // We consider this a success for the user (they get access)
    } else {
        // Real error
        console.error("Add contact result:", contactResult.error);
        return NextResponse.json(
            { error: contactResult.error || "Failed to subscribe" },
            { status: 500 }
        );
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
