"use client";

import Link from "next/link";
import { Swords, Dices, Sparkles, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { FeaturesContent, FeatureItem } from "@/features/homepage/domain/homepage-page.model";

const ICONS = [
    <Swords key="swords" className="w-7 h-7" />,
    <Dices key="dices" className="w-7 h-7" />,
    <Sparkles key="sparkles" className="w-7 h-7" />,
    <BookOpen key="book" className="w-7 h-7" />,
];

interface FeatureCardProps {
    feature: FeatureItem;
    index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
    const ref = useScrollReveal<HTMLDivElement>();

    return (
        <article
            ref={ref}
            className="scroll-reveal"
            style={{ transitionDelay: `${index * 0.12}s` }}
        >
            <Card className="bg-white/5 border-gold/15 hover:border-gold/35 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] backdrop-blur-sm">
                <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                        {ICONS[index % ICONS.length]}
                    </div>
                    <h3 className="font-cinzel font-bold text-cream text-lg">
                        {feature.title}
                    </h3>
                    <p className="text-cream/50 text-sm leading-relaxed">
                        {feature.description}
                    </p>
                </CardContent>
            </Card>
        </article>
    );
}

interface FeaturesSectionProps {
    content: FeaturesContent;
}

export function FeaturesSection({ content }: FeaturesSectionProps) {
    const titleRef = useScrollReveal<HTMLHeadingElement>();

    return (
        <section id="pourquoi-daggerheart" aria-labelledby="features-title" className="py-24 md:py-32 px-6 bg-deep-violet">
            <div className="max-w-7xl mx-auto">
                <h2
                    id="features-title"
                    ref={titleRef}
                    className="scroll-reveal font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-center text-cream mb-16"
                >
                    {content.titleStart}{" "}
                    <span className="text-gold">{content.titleHighlight}</span>{" "}
                    {content.titleEnd}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14">
                    {content.items.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button
                        asChild
                        variant="outline"
                        className="border-gold/30 text-gold font-cinzel text-sm rounded-full px-8 py-5 h-auto hover:bg-gold/10 hover:border-gold/60 hover:-translate-y-0.5 transition-all"
                    >
                        <Link href={content.videoUrl} target="_blank" rel="noopener noreferrer">
                            {content.videoCta}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
