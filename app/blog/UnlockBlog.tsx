"use client";

import { useNewsletterSubscription } from "@/features/newsletter/application/useNewsletterSubscription";
import { SubscriptionForm } from "@/features/newsletter/presentation/components/SubscriptionForm";
import { SuccessMessage } from "@/features/newsletter/presentation/SuccessMessage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function UnlockBlog() {
    const { subscribe, isLoading, errors, isSuccess } = useNewsletterSubscription();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            firstName: formData.get("firstName"),
            email: formData.get("email"),
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
        <div className="bg-[#1a1b4b] border-2 border-[#d4af37] rounded-lg p-8 md:p-12 text-center shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50px] left-[-50px] w-32 h-32 rounded-full bg-[#d4af37] blur-3xl"></div>
                <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 rounded-full bg-[#d4af37] blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-lg mx-auto">
                <h3 className="text-3xl font-cinzel text-[#d4af37] mb-4">
                    Débloque les Archives Secrètes
                </h3>
                <p className="text-[#F4EBD0]/80 mb-8 font-lato">
                    Seuls les initiés ont accès à l&apos;intégralité de nos chroniques.
                    Inscris-toi gratuitement pour accéder à toutes les éditions passées et futures.
                </p>

                {!isSuccess ? (
                    <SubscriptionForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        errors={errors}
                    />
                ) : (
                    <div className="py-8">
                        <SuccessMessage />
                        <p className="text-[#d4af37] mt-4 text-sm animate-pulse">
                            Ouverture des archives en cours...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
