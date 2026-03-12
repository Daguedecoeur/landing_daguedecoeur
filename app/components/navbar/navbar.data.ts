import type { NavItem } from "./navbar.types";

export const NAV_ITEMS: NavItem[] = [
    {
        label: "Découvre Daggerheart",
        emoji: "🎁",
        href: "/decouvre-daggerheart",
    },
    {
        label: "Ressources & Outils",
        emoji: "🧰",
        children: [
            { label: "Blog et Newsletter", href: "/blog", description: "Tes articles, conseils MJ et newsletters mensuels" },
            { label: "Téléchargements Gratuits", href: "/telechargements", description: "Tes PDF en accès libre" },
            { label: "Outils Daggerheart", href: "/outils", description: "L'annuaire des sites officiels et communautaires", external: true },
            { label: "SRD Daggerheart VF", href: "/srd", description: "Tout le système disponible en licence libre" },
        ],
    },
    {
        label: "Nos Projets & Lieux",
        emoji: "🎭",
        children: [
            { label: "Actual Play Daggerheart", href: "/actual-play", description: "Nos parties en live et replay" },
            { label: "Salle Immersive Dagues & Dragons", href: "/salle-immersive", description: "Chartres" },
            { label: "Studio Audiovisuel Dédale", href: "/studio-dedale", description: "Chartres" },
            { label: "Le Tréfon", href: "/trefon", description: "Bar à jeux heroic fantasy — Chartres" },
        ],
    },
    {
        label: "Planning",
        emoji: "🗓️",
        href: "/planning",
    },
    {
        label: "Abonnements & Boutiques",
        emoji: "⭐",
        children: [
            { label: "Catalogue Patreon", href: "https://patreon.com", description: "PDFs et vidéos exclusives", external: true },
            { label: "Boutique Etsy", href: "https://etsy.com", description: "Goodies, impressions 3D, gravures sur bois", external: true },
        ],
    },
];
