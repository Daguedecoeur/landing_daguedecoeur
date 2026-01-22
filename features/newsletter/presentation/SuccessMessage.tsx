export function SuccessMessage() {
    return (
        <div className="bg-[#1e1b4b]/50 p-8 rounded-xl border border-[#d4af37]/30 animate-fade-in-up text-left max-w-lg">
            <h3 className="text-2xl font-cinzel font-bold text-white mb-4">
                C'est fait !
            </h3>
            <p className="text-[#F4EBD0]/90 mb-2 text-lg">
                Ton Kit de Démarrage est en route vers ta boîte mail (vérifie tes spams, les gobelins les cachent parfois).
            </p>

            <div className="my-8 pt-6 border-t border-[#d4af37]/20">
                <strong className="block text-xl text-[#d4af37] mb-2 font-cinzel">En attendant, ne reste pas seul !</strong>
                <p className="text-[#F4EBD0] mb-6">La communauté t'attend pour t'accueillir.</p>

                <a
                    href="https://discord.com/invite/Wp5NKt56BX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#5865F2] text-white font-bold text-lg px-6 py-4 rounded-xl hover:bg-[#4752c4] transition-all transform hover:-translate-y-0.5 shadow-lg"
                >
                    REJOINDRE LE SERVEUR DISCORD MAINTENANT 👾
                </a>
            </div>

            <p className="text-[#F4EBD0]/70 italic mt-4">
                À tout de suite de l'autre côté,<br />
                <span className="font-bold text-[#d4af37]">Dilhan.</span>
            </p>
        </div>
    );
}
