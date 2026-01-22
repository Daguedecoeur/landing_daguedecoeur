import { ReactNode } from "react";
import { GoldSeparator } from "./components/GoldSeparator";

interface NewsletterLayoutProps {
    children: ReactNode;
}

export function NewsletterLayout({ children }: NewsletterLayoutProps) {
    return (
        <div className="min-h-screen bg-[#1a1b4b] text-[#F4EBD0] font-lato overflow-x-hidden selection:bg-[#d4af37] selection:text-[#1a1b4b]">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <GoldSeparator />

                <main>
                    {children}
                </main>

                <GoldSeparator />

                <footer className="text-center text-[#d4af37]/60 text-sm pb-8 font-cinzel">
                    © {new Date().getFullYear()} Dague de Cœur. Inspiré par l'univers de Daggerheart.
                </footer>
            </div>
        </div>
    );
}
