import type { Metadata } from "next";
import NewsletterView from "@/features/newsletter";

export const metadata: Metadata = {
  title: "Kit de Démarrage Daggerheart (VF) - Gratuit | Dague de Coeur",
  description: "Télécharge ton Kit de Découverte pour Daggerheart. Règles simplifiées, scénario et accès à la communauté francophone. Inscription gratuite.",
  openGraph: {
    title: "Kit de Démarrage Daggerheart (VF) - Gratuit",
    description: "Tout ce qu'il te faut pour te lancer dans Daggerheart ce soir. Règles, dés et communauté.",
    images: ["/images/hero-bg.png"],
  },
};

export default function Home() {
  return <NewsletterView />;
}
