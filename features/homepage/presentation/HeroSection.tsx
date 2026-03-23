"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { HeroContent } from "@/features/homepage/domain/homepage-page.model";

interface HeroSectionProps {
    content: HeroContent;
    onOpenSubscribe: () => void;
}

export function HeroSection({ content, onOpenSubscribe }: HeroSectionProps) {
    const headingRef = useScrollReveal<HTMLHeadingElement>();
    const subtitleRef = useScrollReveal<HTMLParagraphElement>({ rootMargin: "0px" });
    const ctaRef = useScrollReveal<HTMLDivElement>({ rootMargin: "0px" });
    const proofRef = useScrollReveal<HTMLParagraphElement>({ rootMargin: "0px" });

    return (
        <header className="relative min-h-[90vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero_new.jpeg"
                    alt="Univers épique Daggerheart — héros fantastiques"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-deep-violet/80 via-deep-violet/60 to-deep-violet" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 md:py-36 text-center">
                <h1
                    ref={headingRef}
                    className="scroll-reveal font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6 break-words"
                >
                    {content.titleStart}{" "}
                    <span className="text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                        {content.titleHighlight}
                    </span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="scroll-reveal text-cream/70 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
                    style={{ transitionDelay: "0.15s" }}
                >
                    {content.subtitle}
                </p>

                <div
                    ref={ctaRef}
                    className="scroll-reveal flex justify-center mb-8"
                    style={{ transitionDelay: "0.3s" }}
                >
                    <Button
                        onClick={onOpenSubscribe}
                        className="bg-gold text-deep-violet font-cinzel font-bold text-xs sm:text-sm md:text-base rounded-full px-4 sm:px-10 py-4 sm:py-6 h-auto whitespace-normal leading-snug hover:bg-gold-hover shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                    >
                        {content.ctaLabel}
                    </Button>
                </div>

                <p
                    ref={proofRef}
                    className="scroll-reveal text-cream/70 font-medium text-sm sm:text-base mt-2"
                    style={{ transitionDelay: "0.45s" }}
                >
                    {content.socialProof}
                </p>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-gold/40 rounded-full" />
                </div>
            </div>
        </header>
    );
}
