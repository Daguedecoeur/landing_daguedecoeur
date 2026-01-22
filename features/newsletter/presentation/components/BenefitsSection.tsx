import { Share2, BookOpen, MessageCircle } from "lucide-react";



export function BenefitsSection() {
    return (
        <section className="space-y-6">
            <div className="p-8 border border-[#d4af37] rounded-lg bg-[#1a1b4b]/50 relative">
                <h3 className="font-cinzel text-xl text-[#d4af37] mb-6 italic">
                    "En t'inscrivant gratuitement tu reçois immédiatement..."
                </h3>
                <ul className="space-y-6">
                    <li className="flex gap-4">
                        <div className="mt-1 text-[#d4af37]">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <strong className="block text-[#F4EBD0] font-cinzel text-lg">Le Kit de Découverte Daggerheart (VF) :</strong>
                            <span className="text-[#F4EBD0]/70">Les règles essentielles résumées pour commencer à jouer ce soir.</span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="mt-1 text-[#d4af37]">
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <strong className="block text-[#F4EBD0] font-cinzel text-lg">L'Accès à la Guilde (Discord) :</strong>
                            <span className="text-[#F4EBD0]/70">Rejoins +200 passionnés pour poser tes questions, trouver une table et discuter avec moi.</span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="mt-1 text-[#d4af37]">
                            <Share2 size={24} />
                        </div>
                        <div>
                            <strong className="block text-[#F4EBD0] font-cinzel text-lg">La Newsletter "Dague de Cœur" :</strong>
                            <span className="text-[#F4EBD0]/70">
                                "L'actualité Daggerheart, des scénarios exclusifs, les outils les plus populaires, mes meilleurs conseils de MJ et les infos sur ma tournée en festivals."
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}
