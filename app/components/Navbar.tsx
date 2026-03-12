"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sword, Menu, X } from "lucide-react";

interface NavLink {
    label: string;
    href: string;
}

interface NavbarProps {
    siteName?: string;
    menuItems?: NavLink[];
    mobileMenuItems?: NavLink[];
}

const defaultMenuItems: NavLink[] = [{ label: "BLOG", href: "/blog" }];
const defaultMobileMenuItems: NavLink[] = [
    { label: "ACCUEIL", href: "/" },
    { label: "BLOG", href: "/blog" },
];

export function Navbar({
    siteName = "DAGUE DE CŒUR",
    menuItems = defaultMenuItems,
    mobileMenuItems = defaultMobileMenuItems,
}: NavbarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname?.startsWith(path)) return true;
        return false;
    };

    const effectiveMobileItems = mobileMenuItems.length > 0
        ? mobileMenuItems
        : [{ label: "ACCUEIL", href: "/" }, ...menuItems];

    return (
        <>
            <div className="sticky top-6 z-50 w-full flex justify-center px-4 mb-8">
                <div className={cn(
                    "relative flex items-center justify-between w-full max-w-4xl px-8 py-4",
                    "bg-deep-violet/60 backdrop-blur-md",
                    "rounded-full",
                    "border border-gold/30",
                    "shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
                    "transition-all duration-300 hover:border-gold/50 hover:shadow-[0_8px_32px_0_rgba(212,175,55,0.1)]"
                )}>

                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-gold/5 to-transparent pointer-events-none" />

                    <Link href="/" className="flex items-center gap-3 group relative z-10" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="text-gold transition-transform duration-500 group-hover:rotate-180 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                            <Sword className="w-5 h-5 md:w-6 md:h-6 rotate-45" />
                        </div>
                        <span className="font-cinzel font-bold text-lg md:text-xl text-cream tracking-widest transition-colors group-hover:text-gold drop-shadow-sm">
                            {siteName}
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 relative z-10">
                        {menuItems.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "font-cinzel font-semibold text-sm tracking-widest transition-all duration-300",
                                    isActive(link.href)
                                        ? "text-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.6)]"
                                        : "text-cream/70 hover:text-gold"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>


                    <button
                        className="md:hidden relative z-10 text-cream hover:text-gold transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Ouvrir le menu de navigation"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-[#0a0a1f]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center animate-in fade-in duration-200">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-8 right-8 text-cream/70 hover:text-gold transition-colors"
                        aria-label="Fermer le menu de navigation"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="flex flex-col items-center gap-8">
                        {effectiveMobileItems.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "font-cinzel font-bold text-2xl tracking-widest transition-all duration-300",
                                    isActive(link.href)
                                        ? "text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                                        : "text-cream/70 hover:text-gold"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
