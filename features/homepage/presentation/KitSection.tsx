"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { KitContent } from "@/features/homepage/domain/homepage-page.model";

interface KitSectionProps {
    content: KitContent;
    onOpenSubscribe: () => void;
}

export function KitSection({ content, onOpenSubscribe }: KitSectionProps) {
    const imageRef = useScrollReveal<HTMLDivElement>();
    const contentRef = useScrollReveal<HTMLDivElement>();

    return (
        <section id="telecharger-kit" aria-labelledby="kit-title" className="py-24 md:py-32 px-6 bg-cream">
            <div className="max-w-7xl mx-auto">
                <h2
                    id="kit-title"
                    className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-center text-deep-violet mb-4"
                >
                    {content.titleStart}{" "}
                    <span className="text-gold">{content.titleHighlight}</span>
                    {content.titleEnd}
                </h2>
                <p className="text-center text-deep-violet/50 text-sm mb-16">
                    {content.publisherNote}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div ref={imageRef} className="scroll-reveal-left relative order-2 lg:order-1">
                        <div className="relative aspect-[4/3] w-full max-w-lg mx-auto">
                            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-gold/20">
                                <Image
                                    src="/images/kit-daggerheart.png"
                                    alt="Aperçu du kit d'initiation gratuit Daggerheart FR"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -inset-4 bg-gold/10 rounded-3xl -z-10 blur-2xl" />
                        </div>
                    </div>

                    <div ref={contentRef} className="scroll-reveal-right order-1 lg:order-2">
                        <h3 className="font-cinzel font-bold text-deep-violet text-xl md:text-2xl mb-8 text-center lg:text-left">
                            {content.sectionLabel}
                        </h3>

                        <ul className="space-y-6 mb-10">
                            {content.items.map((item) => (
                                <li key={item.title} className="flex gap-4">
                                    <div className="shrink-0 mt-1">
                                        <CheckCircle className="w-6 h-6 text-gold" />
                                    </div>
                                    <div>
                                        <strong className="font-cinzel font-semibold text-deep-violet text-base">
                                            {item.title}
                                        </strong>
                                        <p className="text-deep-violet/50 text-sm leading-relaxed mt-1">
                                            {item.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-center lg:justify-start">
                            <Button
                                onClick={onOpenSubscribe}
                                className="bg-gold text-deep-violet font-cinzel font-bold text-sm rounded-full px-8 py-5 h-auto hover:bg-gold-hover shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full sm:w-auto"
                            >
                                {content.ctaLabel}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
