import Link from "next/link";
import { Sword } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FooterLinkColumn } from "./FooterLinkColumn";
import { FooterSocials } from "./FooterSocials";

const NAVIGATION_LINKS = [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Planning", href: "/planning" },
    { label: "Outils Daggerheart", href: "/outils" },
    { label: "SRD Daggerheart VF", href: "/srd" },
];

const COMMUNITY_LINKS = [
    { label: "Discord", href: "https://discord.com/invite/Wp5NKt56BX", external: true },
    { label: "Patreon", href: "https://patreon.com", external: true },
    { label: "Actual Play", href: "/actual-play" },
    { label: "Boutique Etsy", href: "https://etsy.com", external: true },
];

const LEGAL_LINKS = [
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    { label: "Partenaires", href: "/partenaires" },
    { label: "Mentions Légales & RGPD", href: "/mentions-legales" },
];

export function Footer() {
    return (
        <footer className="relative bg-[#12103d] border-t border-gold/30">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/30 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/30 rounded-br-lg" />

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="text-gold transition-transform duration-500 group-hover:rotate-180">
                                <Sword className="w-5 h-5 rotate-45" />
                            </div>
                            <span className="font-cinzel font-bold text-lg text-cream tracking-widest group-hover:text-gold transition-colors">
                                DAGUE DE CŒUR
                            </span>
                        </Link>
                        <p className="text-cream/50 text-sm leading-relaxed">
                            La communauté francophone de Daggerheart — le JDR créé par Critical Role / Darrington Press.
                        </p>
                        <FooterSocials />
                    </div>

                    <FooterLinkColumn title="Navigation" links={NAVIGATION_LINKS} />
                    <FooterLinkColumn title="Communauté" links={COMMUNITY_LINKS} />
                    <FooterLinkColumn title="Informations" links={LEGAL_LINKS} />
                </div>
            </div>

            <Separator className="bg-gold/20" />

            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-cream/40 text-xs text-center md:text-left">
                    © {new Date().getFullYear()} Dague de Cœur & Cie. Inspiré par l&apos;univers de Daggerheart.
                </p>
                <p className="text-cream/30 text-xs text-center md:text-right">
                    Daggerheart est une marque de Darrington Press / Critical Role.
                </p>
            </div>
        </footer>
    );
}
