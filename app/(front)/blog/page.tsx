import { getBrevoAdapter } from "@/features/newsletter/infrastructure/brevo.adapter";
import { NewsletterLayout } from "@/features/newsletter/presentation/NewsletterLayout";
import Link from "next/link";
import { cookies } from "next/headers";
import { UnlockBlog } from "./UnlockBlog";
import Image from "next/image";
import { GetSentCampaignsUseCase } from "@/features/newsletter/application/get-sent-campaigns.use-case";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    // Composition Root (Simple/Manual Dependency Injection)
    const repository = getBrevoAdapter();
    const useCase = new GetSentCampaignsUseCase(repository);

    // Execute logic
    const campaigns = await useCase.execute(50, 0);

    const cookieStore = await cookies();
    const isUnlocked = cookieStore.has("dague_newsletter_auth");

    const isLocked = !isUnlocked && campaigns.length > 4;

    const visibleLimit = 4;
    const visibleCampaigns = isLocked ? campaigns.slice(0, visibleLimit) : campaigns;
    const teaserCampaigns = isLocked ? campaigns.slice(visibleLimit, visibleLimit + 4) : [];

    return (
        <NewsletterLayout>
            <div className="relative w-full h-[400px] mb-16 rounded-xl overflow-hidden border border-gold shadow-[0_0_50px_var(--color-gold-light)] group">
                <Image
                    src="/images/blog-hero.png"
                    alt="Daggerheart Universe"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-blue via-dark-blue/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue to-transparent opacity-80"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-4xl">
                    <span className="text-gold font-cinzel tracking-[0.2em] text-sm md:text-base mb-4 uppercase animate-fade-in">
                        Archives de la Confrérie
                    </span>
                    <h1 className="text-4xl md:text-6xl font-cinzel text-white mb-6 leading-tight drop-shadow-lg">
                        La Gazette de <br />
                        <span className="text-gold">Dague de Cœur</span>
                    </h1>
                    <p className="text-lg text-cream/90 max-w-xl font-lato leading-relaxed drop-shadow-md">
                        Plongez dans les chroniques passées, découvrez des secrets oubliés et revivez l&apos;évolution de notre aventure commune.
                    </p>
                </div>

                {/* Decorative border embellishment */}
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/50 rounded-br-lg"></div>
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/50 rounded-tl-lg"></div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-8">
                {visibleCampaigns.map((campaign) => (
                    <Link
                        key={campaign.id}
                        href={`/blog/${campaign.id}`}
                        className="group flex flex-col h-full bg-cream border-2 border-gold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_var(--color-gold-hover)] hover:-translate-y-1 relative"
                    >
                        {/* Corner decoration */}
                        <div className="absolute top-0 right-0 p-2 opacity-50">
                            <div className="w-4 h-4 border-t-2 border-r-2 border-dark-blue" />
                        </div>

                        <div className="p-6 flex-1 flex flex-col relative z-10">
                            <div className="flex justify-between items-center mb-4 border-b border-dark-blue/10 pb-4">
                                <span className="text-dark-blue/70 text-sm font-cinzel font-semibold">
                                    {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date inconnue'}
                                </span>
                                <span className="bg-dark-blue text-gold text-[10px] uppercase tracking-widest px-2 py-1 rounded">
                                    Newsletter
                                </span>
                            </div>

                            <h2 className="text-2xl font-cinzel text-dark-blue mb-4 leading-tight font-bold group-hover:text-red-hover transition-colors">
                                {campaign.subject}
                            </h2>

                            <div className="mt-auto pt-4 flex items-center text-dark-blue text-sm font-cinzel font-bold">
                                <span className="border-b-2 border-gold pb-0.5 group-hover:border-red-hover transition-colors">Lire l&apos;édition</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform text-gold group-hover:text-red-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {isLocked && (
                <div className="relative mb-16">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left opacity-30 select-none pointer-events-none blur-sm filter grayscale">
                        {teaserCampaigns.map((campaign) => (
                            <div
                                key={campaign.id}
                                className="flex flex-col h-full bg-cream border-2 border-gold rounded-lg overflow-hidden p-6"
                            >
                                <div className="flex justify-between items-center mb-4 border-b border-dark-blue/10 pb-4">
                                    <span className="text-dark-blue/70 text-sm font-cinzel font-semibold">
                                        {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date inconnue'}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-cinzel text-dark-blue mb-4 leading-tight font-bold">
                                    {campaign.subject}
                                </h2>
                            </div>
                        ))}
                    </div>

                    {/* Overlay Gradient + CTA */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/60 to-transparent"></div>
                        <div className="w-full max-w-2xl px-4 mt-8 md:mt-0 relative z-30">
                            <UnlockBlog />
                        </div>
                    </div>
                </div>
            )}

            {campaigns.length === 0 && (
                <div className="text-center py-24 border-2 border-gold/30 rounded-lg bg-dark-blue/50">
                    <p className="text-cream text-xl font-cinzel mb-2">Le calme avant la tempête...</p>
                    <p className="text-cream/60">Aucune newsletter n&apos;a encore été envoyée.</p>
                </div>
            )}

        </NewsletterLayout>
    );
}
