import type { Metadata } from "next";
import NewsletterView from "@/features/newsletter";
import { GetHomepageContentUseCase } from "@/features/newsletter/application/get-homepage-content.use-case";
import { getPayloadHomepageAdapter } from "@/features/newsletter/infrastructure/payload-homepage.adapter";

export const metadata: Metadata = {
  title: "Kit de Démarrage Daggerheart (VF) - Gratuit | Dague de Coeur",
  description: "Télécharge ton Kit de Découverte pour Daggerheart. Règles simplifiées, scénario et accès à la communauté francophone. Inscription gratuite.",
  openGraph: {
    title: "Kit de Démarrage Daggerheart (VF) - Gratuit",
    description: "Tout ce qu'il te faut pour te lancer dans Daggerheart ce soir. Règles, dés et communauté.",
    images: ["/images/hero-bg.png"],
  },
};

export const revalidate = 60;

export default async function DecouvreDaggerheart() {
  const repository = getPayloadHomepageAdapter();
  const useCase = new GetHomepageContentUseCase(repository);
  const content = await useCase.execute();

  return <NewsletterView content={content} />;
}
