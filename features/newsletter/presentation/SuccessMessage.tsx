import content from "@/features/newsletter/content.json";

export function SuccessMessage() {
    const t = content.newsletter.success;

    return (
        <div className="bg-dark-blue/50 p-8 rounded-xl border border-gold/30 animate-fade-in-up text-left max-w-lg">
            <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                {t.title}
            </h3>
            <p className="text-cream/90 mb-2 text-lg">
                {t.message}
            </p>

            <div className="my-8 pt-6 border-t border-gold/20">
                <strong className="block text-xl text-gold mb-2 font-cinzel">{t.community.title}</strong>
                <p className="text-cream mb-6">{t.community.text}</p>

                <a
                    href={t.community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#5865F2] text-white font-bold text-lg px-6 py-4 rounded-xl hover:bg-[#4752c4] transition-all transform hover:-translate-y-0.5 shadow-lg"
                >
                    {t.community.cta}
                </a>
            </div>

            <p className="text-cream/70 italic mt-4">
                {t.signature.text}<br />
                <span className="font-bold text-gold">{t.signature.name}</span>
            </p>
        </div>
    );
}
