interface NewsletterHeaderProps {
    header: {
        titleStart: string;
        titleHighlight: string;
        subtitle: string;
    };
}

export function NewsletterHeader({ header }: NewsletterHeaderProps) {
    return (
        <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6 leading-tight">
                {header.titleStart} <span className="text-gold">{header.titleHighlight}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-cream/90 font-serif font-light leading-relaxed">
                {header.subtitle}
            </h2>
        </header>
    );
}
