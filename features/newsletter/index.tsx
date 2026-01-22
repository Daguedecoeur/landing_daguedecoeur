"use client";

import Image from "next/image";
import { useNewsletterSubscription } from "./application/useNewsletterSubscription";
import { NewsletterLayout } from "./presentation/NewsletterLayout";
import { NewsletterHeader } from "./presentation/components/NewsletterHeader";
import { BioSection } from "./presentation/components/BioSection";
import { PainPoints } from "./presentation/components/PainPoints";
import { SubscriptionForm } from "./presentation/components/SubscriptionForm";
import { BenefitsSection } from "./presentation/components/BenefitsSection";
import { SuccessMessage } from "./presentation/SuccessMessage";
import { GoldSeparator } from "./presentation/components/GoldSeparator";

export default function NewsletterView() {
    const { subscribe, isLoading, errors, isSuccess } = useNewsletterSubscription();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            firstName: formData.get("firstName"),
            email: formData.get("email"),
        };
        subscribe(data);
    };

    return (
        <NewsletterLayout>
            {/* LIGNE 1: 2 colonnes - Titre/Sous-titre + Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-12">
                <NewsletterHeader />

                <div className="hidden lg:block relative">
                    <div className="relative aspect-square w-full max-w-md mx-auto">
                        <div className="absolute inset-0 border-2 border-[#d4af37] rotate-3 opacity-30 rounded-lg"></div>
                        <div className="absolute inset-0 border-2 border-[#d4af37] -rotate-3 opacity-30 rounded-lg"></div>
                        <div className="relative h-full w-full rounded-lg overflow-hidden border border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                            <Image
                                src="/images/hero-bg.png"
                                alt="Daggerheart Atmosphere"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-0 right-0 p-2">
                                <div className="w-8 h-8 border-t-4 border-r-4 border-[#d4af37]" />
                            </div>
                            <div className="absolute bottom-0 left-0 p-2">
                                <div className="w-8 h-8 border-b-4 border-l-4 border-[#d4af37]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-6">
                <PainPoints />
                <BioSection />
            </div>

            <GoldSeparator />  

            <div className="max-w-6xl mx-auto m-12">
                <BenefitsSection />
            </div>

            <div className="max-w-2xl mx-auto">
                {!isSuccess ? (
                    <SubscriptionForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        errors={errors}
                    />
                ) : (
                    <SuccessMessage />
                )}
            </div>
        </NewsletterLayout>
    );
}
