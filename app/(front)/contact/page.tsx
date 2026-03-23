import type { Metadata } from "next";
import ContactFeature from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact — Dague de Coeur",
  description:
    "Contactez l'équipe de Dague de Coeur pour toute question, suggestion ou demande de collaboration.",
  alternates: {
    canonical: "https://daguedecoeur.fr/contact",
  },
};

export default function ContactPage() {
  return <ContactFeature />;
}
