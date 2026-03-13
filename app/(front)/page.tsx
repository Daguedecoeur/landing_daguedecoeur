import type { Metadata } from "next";
import HomepageView from "@/features/homepage";
import { GetHomepagePageUseCase } from "@/features/homepage/application/get-homepage-page.use-case";
import { getPayloadHomepagePageAdapter } from "@/features/homepage/infrastructure/payload-homepage-page.adapter";
import { GetHomepageContentUseCase } from "@/features/newsletter/application/get-homepage-content.use-case";
import { getPayloadHomepageAdapter } from "@/features/newsletter/infrastructure/payload-homepage.adapter";

export const metadata: Metadata = {
  title: "Kit de Démarrage Daggerheart (VF) - Gratuit | Dague de Coeur",
  description:
    "Télécharge ton Kit de Découverte pour Daggerheart. Règles simplifiées, scénario et accès à la communauté francophone. Inscription gratuite.",
  openGraph: {
    title: "Kit de Démarrage Daggerheart (VF) - Gratuit",
    description:
      "Tout ce qu'il te faut pour te lancer dans Daggerheart ce soir. Règles, dés et communauté.",
    images: ["/images/hero-bg.png"],
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  // Homepage page content (hero, features, kit) — from features/homepage
  const pageRepo = getPayloadHomepagePageAdapter();
  const page = await new GetHomepagePageUseCase(pageRepo).execute();

  // Form & success content — from features/newsletter (existing)
  const newsletterRepo = getPayloadHomepageAdapter();
  const newsletterContent = await new GetHomepageContentUseCase(newsletterRepo).execute();

  return (
    <HomepageView
      page={page}
      form={newsletterContent.form}
      success={newsletterContent.success}
    />
  );
}
