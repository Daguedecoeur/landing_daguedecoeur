import { Share2, BookOpen, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function BenefitsSection() {
    return (
        <section className="space-y-6">
            <Card className="border border-gold bg-deep-violet/50 rounded-lg ring-0">
                <CardContent className="p-8">
                    <h3 className="font-cinzel text-xl text-gold mb-6 italic">
                        &quot;En t&apos;inscrivant gratuitement tu reçois immédiatement...&quot;
                    </h3>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <div className="mt-1 text-gold">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <strong className="block text-cream font-cinzel text-lg">Le Kit de Découverte Daggerheart (VF) :</strong>
                                <span className="text-cream/70">Les règles essentielles résumées pour commencer à jouer ce soir.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1 text-gold">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <strong className="block text-cream font-cinzel text-lg">L&apos;Accès à la Guilde (Discord) :</strong>
                                <span className="text-cream/70">Rejoins +200 passionnés pour poser tes questions, trouver une table et discuter avec moi.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1 text-gold">
                                <Share2 size={24} />
                            </div>
                            <div>
                                <strong className="block text-cream font-cinzel text-lg">La Newsletter &quot;Dague de Cœur&quot; :</strong>
                                <span className="text-cream/70">
                                    &quot;L&apos;actualité Daggerheart, des scénarios exclusifs, les outils les plus populaires, mes meilleurs conseils de MJ et les infos sur ma tournée en festivals.&quot;
                                </span>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </section>
    );
}
