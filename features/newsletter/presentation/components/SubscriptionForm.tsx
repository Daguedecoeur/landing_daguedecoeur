import { SubscriptionData } from "../../domain/subscription.schema";

interface SubscriptionFormProps {
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    errors: Partial<Record<keyof SubscriptionData, string>>;
}

export function SubscriptionForm({ onSubmit, isLoading, errors }: SubscriptionFormProps) {
    return (
        <div className="mt-8">
            <div className="mb-6">
                <h3 className="text-2xl font-cinzel font-bold text-[#F4EBD0] mb-2">
                    Prêt à écrire ta propre légende ?
                </h3>
                <p className="text-[#F4EBD0]/70 italic">
                    Reçois ton accès par email dans la minute.
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-3">
                    <div>
                        <input
                            name="firstName"
                            type="text"
                            placeholder="Ton Prénom"
                            required
                            className={`w-full px-5 py-3 rounded-full bg-[#F4EBD0] text-[#1a1b4b] border-2 ${errors.firstName ? "border-red-500" : "border-transparent"
                                } focus:border-[#d4af37] focus:outline-none placeholder:text-[#1a1b4b]/50`}
                        />
                        {errors.firstName && <p className="text-red-400 text-sm mt-1 ml-4">{errors.firstName}</p>}
                    </div>
                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Ton Email"
                            required
                            className={`w-full px-5 py-3 rounded-full bg-[#F4EBD0] text-[#1a1b4b] border-2 ${errors.email ? "border-red-500" : "border-transparent"
                                } focus:border-[#d4af37] focus:outline-none placeholder:text-[#1a1b4b]/50`}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1 ml-4">{errors.email}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#d4af37] text-[#1a1b4b] font-cinzel font-bold text-lg py-3 px-6 rounded-full hover:bg-[#b4941f] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                    {isLoading ? "Envoi en cours..." : "TÉLÉCHARGER MON KIT & REJOINDRE LE DISCORD 🚀"}
                </button>

                <p className="text-xs text-[#F4EBD0]/60 text-center italic">
                    Pas de spam. Juste de l&apos;aventure. Désinscription possible à tout moment.
                </p>
            </form>
        </div>
    );
}
