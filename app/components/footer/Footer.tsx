import Link from "next/link";
import { Sword } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FooterLinkColumn } from "./FooterLinkColumn";
import { FooterSocials } from "./FooterSocials";
import type { SiteSettingsContent } from "@/features/navigation/domain/navigation.model";

interface FooterProps {
    settings: SiteSettingsContent;
}

export function Footer({ settings }: FooterProps) {
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
                                {settings.siteName.toUpperCase()}
                            </span>
                        </Link>
                        <p className="text-cream/50 text-sm leading-relaxed">
                            {settings.siteDescription}
                        </p>
                        <FooterSocials socialLinks={settings.socialLinks} />
                    </div>

                    <FooterLinkColumn title="Navigation" links={settings.footerNavLinks} />
                    <FooterLinkColumn title="Communauté" links={settings.footerCommunityLinks} />
                    <FooterLinkColumn title="Informations" links={settings.footerLegalLinks} />
                </div>
            </div>

            <Separator className="bg-gold/20" />

            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-cream/40 text-xs text-center md:text-left">
                    © {new Date().getFullYear()} {settings.siteName} & Cie. Inspiré par l&apos;univers de Daggerheart.
                </p>
                <p className="text-cream/30 text-xs text-center md:text-right">
                    Daggerheart est une marque de Darrington Press / Critical Role.
                </p>
            </div>
        </footer>
    );
}
