"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { FaqContent } from "@/features/homepage/domain/homepage-page.model";

interface FaqSectionProps {
    content: FaqContent;
}

export function FaqSection({ content }: FaqSectionProps) {
    const sectionRef = useScrollReveal<HTMLDivElement>();

    return (
        <section
            id="faq-daggerheart"
            aria-labelledby="faq-title"
            className="relative py-24 md:py-32 px-6 bg-deep-violet overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />
            </div>

            <div ref={sectionRef} className="scroll-reveal max-w-4xl mx-auto relative z-10">
                <h2
                    id="faq-title"
                    className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-center text-cream mb-4"
                >
                    {content.title}
                </h2>

                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12" />

                <Accordion type="single" collapsible className="space-y-4">
                    {content.items.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`faq-${index}`}
                            className="group border-0 rounded-xl bg-cream/5 backdrop-blur-sm border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] overflow-hidden"
                        >
                            <AccordionTrigger className="px-6 py-5 text-cream/90 hover:text-gold font-cinzel text-base md:text-lg font-semibold hover:no-underline transition-colors duration-300 [&>svg]:text-gold/60 [&>svg]:hover:text-gold">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 text-cream/60 text-sm md:text-base leading-relaxed font-lato">
                                <p>{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
