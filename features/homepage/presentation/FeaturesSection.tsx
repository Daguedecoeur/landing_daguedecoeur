"use client";

import Link from "next/link";
import { Swords, Dices, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FEATURES: Feature[] = [
    {
        icon: <Swords className="w-7 h-7" />,
        title: "Une création Critical Role",
        description:
            "Un système de jeu moderne, narratif et ultra-dynamique pensé par les créateurs du plus grand Actual Play au monde.",
    },
    {
        icon: <Dices className="w-7 h-7" />,
        title: "Le système Espoir & Peur",
        description:
            "Oubliez le simple dé à 20 faces. Avec seulement 2 dés à 12 faces, même vos échecs font avancer l'histoire avec des rebondissements inattendus.",
    },
    {
        icon: <Sparkles className="w-7 h-7" />,
        title: "Création de perso express",
        description:
            "Grâce à un système de cartes de capacités très visuel, créez votre héros unique en quelques minutes, sans calculs complexes.",
    },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
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
                        {feature.icon}
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

export function FeaturesSection() {
    const titleRef = useScrollReveal<HTMLHeadingElement>();

    return (
        <section id="pourquoi-daggerheart" aria-labelledby="features-title" className="py-24 md:py-32 px-6 bg-deep-violet">
            <div className="max-w-7xl mx-auto">
                <h2
                    id="features-title"
                    ref={titleRef}
                    className="scroll-reveal font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-center text-cream mb-16"
                >
                    Pourquoi choisir{" "}
                    <span className="text-gold">Daggerheart</span>{" "}
                    pour débuter le JDR ?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button
                        asChild
                        variant="outline"
                        className="border-gold/30 text-gold font-cinzel text-sm rounded-full px-8 py-5 h-auto hover:bg-gold/10 hover:border-gold/60 hover:-translate-y-0.5 transition-all"
                    >
                        <Link
                            href="https://www.youtube.com/watch?v=mX-ZTfLZeGg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ▶️ Voir le tutoriel vidéo signé par BBE
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
