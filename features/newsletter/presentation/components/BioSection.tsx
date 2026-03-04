interface BioSectionProps {
    solution: {
        title: string;
        bio: string;
        signature: string;
    };
}

export function BioSection({ solution }: BioSectionProps) {
    // A simple parser for the specific formatting we put in JSON
    // [text](style) -> applies style class
    const parseText = (text: string) => {
        const parts = text.split(/(\[.*?\]\(.*?\))/g);
        return parts.map((part, index) => {
            const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (match) {
                const [, content, style] = match;
                if (style === 'highlight') return <strong key={index} className="text-gold">{content}</strong>;
                if (style === 'bold') return <strong key={index}>{content}</strong>;
                if (style === 'italic') return <em key={index}>{content}</em>;
            }
            return part;
        });
    };

    return (
        <div className="mt-8 mb-8 text-cream/90 leading-relaxed font-serif">
            <div className="mb-4">
                <h3 className="block text-xl text-gold mb-4 font-bold">{solution.title}</h3>
                {parseText(solution.bio)}
            </div>
            <p className="text-sm font-cinzel text-gold mt-2">{solution.signature}</p>
        </div>
    );
}
