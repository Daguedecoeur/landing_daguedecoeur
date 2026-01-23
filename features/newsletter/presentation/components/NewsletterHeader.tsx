import content from "@/features/newsletter/content.json";

export function NewsletterHeader() {
    const t = content.newsletter.header;

    return (
        <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6 leading-tight">
                {t.title.start} <span className="text-gold">{t.title.highlight}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-cream/90 font-serif font-light leading-relaxed">
                {t.subtitle}
            </h2>
        </header>
    );
}
