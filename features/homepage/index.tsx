"use client";

import { useState } from "react";
import { useNewsletterSubscription } from "@/features/newsletter/application/useNewsletterSubscription";
import { SubscriptionForm } from "@/features/newsletter/presentation/components/SubscriptionForm";
import { SuccessMessage } from "@/features/newsletter/presentation/SuccessMessage";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { HeroSection } from "./presentation/HeroSection";
import { FeaturesSection } from "./presentation/FeaturesSection";
import { KitSection } from "./presentation/KitSection";
import type { HomepageContent } from "@/features/newsletter/domain/homepage-content.model";

interface HomepageViewProps {
    content: HomepageContent;
}

export default function HomepageView({ content }: HomepageViewProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { subscribe, isLoading, errors, isSuccess } = useNewsletterSubscription();

    const handleOpenModal = () => setIsModalOpen(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            firstName: formData.get("firstName"),
            email: formData.get("email"),
            acquisitionChannel: formData.get("acquisitionChannel"),
            acquisitionChannelOther: formData.get("acquisitionChannelOther") || undefined,
        };
        subscribe(data);
    };

    return (
        <main>
            <HeroSection onOpenSubscribe={handleOpenModal} />
            <FeaturesSection />
            <KitSection onOpenSubscribe={handleOpenModal} />

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-deep-violet border-gold/30 w-[95vw] sm:w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-[0_0_60px_rgba(212,175,55,0.15)] p-6 sm:p-8">
                    <DialogTitle className="font-cinzel text-gold text-xl text-center sr-only">
                        Télécharger le Kit Daggerheart
                    </DialogTitle>
                    {!isSuccess ? (
                        <SubscriptionForm
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            errors={errors}
                            formContent={content.form}
                        />
                    ) : (
                        <SuccessMessage success={content.success} />
                    )}
                </DialogContent>
            </Dialog>
        </main>
    );
}
