import Link from "next/link";
import { Sword } from "lucide-react";

interface NavbarLogoProps {
    siteName: string;
}

export function NavbarLogo({ siteName }: NavbarLogoProps) {
    return (
        <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="text-gold transition-transform duration-500 group-hover:rotate-180 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                <Sword className="w-5 h-5 rotate-45" />
            </div>
            <span className="font-cinzel font-bold text-base lg:text-lg text-cream tracking-widest transition-colors group-hover:text-gold">
                {siteName}
            </span>
        </Link>
    );
}
