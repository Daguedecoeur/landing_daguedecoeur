import { getBrevoAdapter } from "@/features/newsletter/infrastructure/brevo.adapter";
import { NewsletterLayout } from "@/features/newsletter/presentation/NewsletterLayout";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogParams {
    params: Promise<{
        id: string;
    }>;
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: BlogParams) {
    const { id } = await params;
    const brevo = getBrevoAdapter();
    const { data: campaign, error } = await brevo.getCampaign(parseInt(id, 10));

    if (error || !campaign) {
        notFound();
    }

    return (
        <NewsletterLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center gap-4 text-sm text-[#d4af37]/60">
                    <Link href="/blog" className="hover:text-[#d4af37] flex items-center transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux archives
                    </Link>
                </div>

                <div className="mb-12 border-b border-[#d4af37]/30 pb-8 text-center">
                    <span className="block text-[#d4af37] text-sm font-cinzel mb-4">
                        {campaign.sentDate ? new Date(campaign.sentDate).toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Date inconnue'}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-cinzel text-[#F4EBD0] leading-tight mb-6">
                        {campaign.subject}
                    </h1>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                    <div
                        className="email-content"
                        dangerouslySetInnerHTML={{ __html: campaign.htmlContent }}
                    />
                </div>
            </div>
        </NewsletterLayout>
    );
}
