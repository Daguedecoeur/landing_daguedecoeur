"use client";

import { ContactHeader } from "./presentation/components/ContactHeader";
import { ContactFormCard } from "./presentation/ContactFormCard";

export default function ContactFeature() {
  return (
    <main className="min-h-screen bg-deep-violet pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ContactHeader />
        <ContactFormCard />
      </div>
    </main>
  );
}
