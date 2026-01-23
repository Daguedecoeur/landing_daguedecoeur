"use client";

import content from "@/features/newsletter/content.json";
import { useNewsletterSubscription } from "@/features/newsletter/application/useNewsletterSubscription";
import { SubscriptionForm } from "@/features/newsletter/presentation/components/SubscriptionForm";
import { SuccessMessage } from "@/features/newsletter/presentation/SuccessMessage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function UnlockBlog() {
    const { subscribe, isLoading, errors, isSuccess } = useNewsletterSubscription();
    const router = useRouter();
    const t = content.newsletter.blog;

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
        <div className="bg-dark-blue border-2 border-gold rounded-lg p-8 md:p-12 text-center shadow-[0_0_40px_var(--color-gold-light)] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50px] left-[-50px] w-32 h-32 rounded-full bg-gold blur-3xl"></div>
                <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 rounded-full bg-gold blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-lg mx-auto">
                <h3 className="text-3xl font-cinzel text-gold mb-4">
                    {t.unlock.title}
                </h3>
                <p className="text-cream/80 mb-8 font-lato">
                    {t.unlock.description}
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
                        <p className="text-gold mt-4 text-sm animate-pulse">
                            {t.unlock.loading}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
