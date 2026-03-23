import { Mail, MessageSquare, Clock } from "lucide-react";

export function ContactSidebar() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="w-4 h-4 text-gold" />
        <span className="font-cinzel text-gold text-sm tracking-widest uppercase font-semibold">
          Informations
        </span>
      </div>

      <div>
        <p className="font-lato font-bold text-deep-violet text-sm uppercase tracking-wide mb-1">
          Email
        </p>
        <a
          href="mailto:admin@daguedecoeur.fr"
          className="flex items-center gap-2 text-deep-violet/80 text-sm hover:text-gold transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          admin@daguedecoeur.fr
        </a>
      </div>

      <div>
        <p className="font-lato font-bold text-deep-violet text-sm uppercase tracking-wide mb-1">
          Discord
        </p>
        <a
          href="https://discord.com/invite/Wp5NKt56BX"
          target="_blank"
          rel="noopener noreferrer"
          className="text-deep-violet/80 text-sm hover:text-gold transition-colors"
        >
          Rejoindre la Confrérie
        </a>
      </div>

      <div>
        <p className="font-lato font-bold text-deep-violet text-sm uppercase tracking-wide mb-1">
          <Clock className="w-3.5 h-3.5 inline mr-1" />
          Délai de réponse
        </p>
        <p className="text-deep-violet/70 text-sm leading-relaxed">
          Nous faisons de notre mieux pour répondre sous 48 heures ouvrées.
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-deep-violet/20">
        <p className="text-deep-violet/50 text-xs italic leading-relaxed">
          Tous les messages sont lus par l'équipe de Dague de Cœur.
        </p>
      </div>
    </div>
  );
}
