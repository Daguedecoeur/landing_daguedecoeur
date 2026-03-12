import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface NewsletterLayoutProps {
    children: ReactNode;
}

export function NewsletterLayout({ children }: NewsletterLayoutProps) {
    return (
        <div className="min-h-screen bg-deep-violet text-cream font-lato overflow-x-hidden selection:bg-gold selection:text-deep-violet">
            <div className="container mx-auto px-4 py-8 max-w-6xl">

                <main>
                    {children}
                </main>

                <div className="w-full flex items-center justify-center py-8">
                    <div className="h-px bg-gold w-full max-w-4xl relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#242456] px-4 text-gold">
                            ◈
                        </div>
                    </div>
                </div>

                <footer className="text-center text-gold/80 text-sm pb-8 font-cinzel">
                    © {new Date().getFullYear()} Dague de Cœur. Inspiré par l&apos;univers de Daggerheart.
                </footer>
            </div>
        </div>
    );
}
