"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Sword, Menu, X } from "lucide-react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname?.startsWith(path)) return true;
        return false;
    };

    return (
        <>
            <div className="sticky top-6 z-50 w-full flex justify-center px-4 mb-8">
                <div className={cn(
                    "relative flex items-center justify-between w-full max-w-4xl px-8 py-4",
                    "bg-[#1a1b4b]/60 backdrop-blur-md",
                    "rounded-full",
                    "border border-[#d4af37]/30",
                    "shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
                    "transition-all duration-300 hover:border-[#d4af37]/50 hover:shadow-[0_8px_32px_0_rgba(212,175,55,0.1)]"
                )}>

                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent pointer-events-none" />

                    <Link href="/" className="flex items-center gap-3 group relative z-10" onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="text-[#d4af37] transition-transform duration-500 group-hover:rotate-180 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                            <Sword className="w-5 h-5 md:w-6 md:h-6 rotate-45" />
                        </div>
                        <span className="font-cinzel font-bold text-lg md:text-xl text-[#F4EBD0] tracking-widest transition-colors group-hover:text-[#d4af37] drop-shadow-sm">
                            DAGUE DE CŒUR
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 relative z-10">
                        {[
                            { name: "BLOG", href: "/blog" }
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "font-cinzel font-semibold text-sm tracking-widest transition-all duration-300",
                                    isActive(link.href)
                                        ? "text-[#d4af37] drop-shadow-[0_0_5px_rgba(212,175,55,0.6)]"
                                        : "text-[#F4EBD0]/70 hover:text-[#d4af37]"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>


                    <button
                        className="md:hidden relative z-10 text-[#F4EBD0] hover:text-[#d4af37] transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
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
                        className="absolute top-8 right-8 text-[#F4EBD0]/70 hover:text-[#d4af37] transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="flex flex-col items-center gap-8">
                        {[
                            { name: "ACCUEIL", href: "/" },
                            { name: "BLOG", href: "/blog" }
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "font-cinzel font-bold text-2xl tracking-widest transition-all duration-300",
                                    isActive(link.href)
                                        ? "text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                                        : "text-[#F4EBD0]/70 hover:text-[#d4af37]"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
