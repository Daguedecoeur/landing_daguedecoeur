"use client";

import { useNewsletterSubscription } from "@/features/newsletter/application/useNewsletterSubscription";
import { SubscriptionForm } from "@/features/newsletter/presentation/components/SubscriptionForm";
import { SuccessMessage } from "@/features/newsletter/presentation/SuccessMessage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { SuccessContent, FormContent } from "@/features/newsletter/domain/homepage-content.model";
import { Card, CardContent } from "@/components/ui/card";


const defaultSuccessContent: SuccessContent = {
    title: "C'est fait !",
    message: "Ton Kit de Démarrage est en route vers ta boîte mail (vérifie tes spams, les gobelins les cachent parfois).",
    community: {
        title: "En attendant, ne reste pas seul !",
        text: "La communauté t'attend pour t'accueillir.",
        cta: "REJOINDRE LE SERVEUR DISCORD MAINTENANT 👾",
        link: "https://discord.com/invite/Wp5NKt56BX",
    },
    signature: {
        text: "À tout de suite de l'autre côté,",
        name: "Dilhan.",
    },
};

// Default blog unlock content
const defaultUnlockContent = {
    title: "Débloque les Archives Secrètes",
    description: "Seuls les initiés ont accès à l'intégralité de nos chroniques. Inscris-toi gratuitement pour accéder à toutes les éditions passées et futures.",
    loading: "Ouverture des archives en cours...",
};

const defaultFormContent: FormContent = {
    title: "Prêt à écrire ta propre légende ?",
    subtitle: "Reçois ton accès par email dans la minute.",
    firstNamePlaceholder: "Ton Prénom",
    emailPlaceholder: "Ton Email",
    acquisitionChannelLabel: "Comment es-tu tombé sur daguedecoeur.fr ?",
    submitButtonDefault: "TÉLÉCHARGER MON KIT & REJOINDRE LE DISCORD 🚀",
    submitButtonLoading: "Envoi en cours...",
    disclaimer: "Pas de spam. Juste de l'aventure. Désinscription possible à tout moment.",
};

interface UnlockBlogProps {
    unlockContent?: typeof defaultUnlockContent;
    successContent?: SuccessContent;
    formContent?: FormContent;
}

export function UnlockBlog({
    unlockContent = defaultUnlockContent,
    successContent = defaultSuccessContent,
    formContent = defaultFormContent,
}: UnlockBlogProps) {
    const { subscribe, isLoading, errors, isSuccess } = useNewsletterSubscription();
    const router = useRouter();

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

    // Reload the page on success to refresh server cookies and unlock content
    useEffect(() => {
        if (isSuccess) {
            const timeout = setTimeout(() => {
                router.refresh();
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [isSuccess, router]);

    return (
        <Card className="bg-deep-violet border-2 border-gold rounded-lg ring-0 shadow-[0_0_40px_var(--color-gold-light)] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50px] left-[-50px] w-32 h-32 rounded-full bg-gold blur-3xl"></div>
                <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 rounded-full bg-gold blur-3xl"></div>
            </div>

            <CardContent className="p-8 md:p-12 text-center relative z-10">
                <div className="max-w-lg mx-auto">
                    <h3 className="text-3xl font-cinzel text-gold mb-4">
                        {unlockContent.title}
                    </h3>
                    <p className="text-cream/80 mb-8 font-lato">
                        {unlockContent.description}
                    </p>

                    {!isSuccess ? (
                        <SubscriptionForm
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            errors={errors}
                            formContent={formContent}
                        />
                    ) : (
                        <div className="py-8">
                            <SuccessMessage success={successContent} />
                            <p className="text-gold mt-4 text-sm animate-pulse">
                                {unlockContent.loading}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
