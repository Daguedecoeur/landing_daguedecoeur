import { getBrevoAdapter } from "@/features/newsletter/infrastructure/brevo.adapter";
import { NewsletterLayout } from "@/features/newsletter/presentation/NewsletterLayout";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const brevo = getBrevoAdapter();
    const { data } = await brevo.getSentCampaigns(50, 0);
    const campaigns = data?.campaigns || [];

    return (
        <NewsletterLayout>
            <div className="mb-12 text-center">
                <h1 className="text-4xl lg:text-5xl font-cinzel text-[#d4af37] mb-4">
                    La Gazette de Dague de Cœur
                </h1>
                <p className="text-lg text-[#F4EBD0]/80 max-w-2xl mx-auto">
                    Retrouvez toutes nos précédentes éditions et plongez dans l&apos;univers de Daggerheart.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {campaigns.map((campaign) => (
                    <Link
                        key={campaign.id}
                        href={`/blog/${campaign.id}`}
                        className="group flex flex-col h-full bg-[#F4EBD0] border-2 border-[#d4af37] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:-translate-y-1 relative"
                    >
                        {/* Corner decoration */}
                        <div className="absolute top-0 right-0 p-2 opacity-50">
                            <div className="w-4 h-4 border-t-2 border-r-2 border-[#1a1b4b]" />
                        </div>

                        <div className="p-6 flex-1 flex flex-col relative z-10">
                            <div className="flex justify-between items-center mb-4 border-b border-[#1a1b4b]/10 pb-4">
                                <span className="text-[#1a1b4b]/70 text-sm font-cinzel font-semibold">
                                    {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date inconnue'}
                                </span>
                                <span className="bg-[#1a1b4b] text-[#d4af37] text-[10px] uppercase tracking-widest px-2 py-1 rounded">
                                    Newsletter
                                </span>
                            </div>

                            <h2 className="text-2xl font-cinzel text-[#1a1b4b] mb-4 leading-tight font-bold group-hover:text-[#b43232] transition-colors">
                                {campaign.subject}
                            </h2>

                            <div className="mt-auto pt-4 flex items-center text-[#1a1b4b] text-sm font-cinzel font-bold">
                                <span className="border-b-2 border-[#d4af37] pb-0.5 group-hover:border-[#b43232] transition-colors">Lire l&apos;édition</span>
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform text-[#d4af37] group-hover:text-[#b43232]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {campaigns.length === 0 && (
                <div className="text-center py-24 border-2 border-[#d4af37]/30 rounded-lg bg-[#1a1b4b]/50">
                    <p className="text-[#F4EBD0] text-xl font-cinzel mb-2">Le calme avant la tempête...</p>
                    <p className="text-[#F4EBD0]/60">Aucune newsletter n&apos;a encore été envoyée.</p>
                </div>
            )}

            <div className="mt-16 text-center">
                <Link href="/newsletter" className="inline-block px-8 py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1b4b] transition-all duration-300 font-cinzel text-sm uppercase tracking-widest">
                    S&apos;abonner à la newsletter
                </Link>
            </div>
        </NewsletterLayout>
    );
}
