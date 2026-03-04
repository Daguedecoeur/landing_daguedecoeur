import { SuccessContent } from "../domain/homepage-content.model";

interface SuccessMessageProps {
    success: SuccessContent;
}

export function SuccessMessage({ success }: SuccessMessageProps) {
    return (
        <div className="bg-dark-blue/50 p-8 rounded-xl border border-gold/30 animate-fade-in-up text-left max-w-lg">
            <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                {success.title}
            </h3>
            <p className="text-cream/90 mb-2 text-lg">
                {success.message}
            </p>

            <div className="my-8 pt-6 border-t border-gold/20">
                <strong className="block text-xl text-gold mb-2 font-cinzel">{success.community.title}</strong>
                <p className="text-cream mb-6">{success.community.text}</p>

                <a
                    href={success.community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#5865F2] text-white font-bold text-lg px-6 py-4 rounded-xl hover:bg-[#4752c4] transition-all transform hover:-translate-y-0.5 shadow-lg"
                >
                    {success.community.cta}
                </a>
            </div>

            <p className="text-cream/70 italic mt-4">
                {success.signature.text}<br />
                <span className="font-bold text-gold">{success.signature.name}</span>
            </p>
        </div>
    );
}
