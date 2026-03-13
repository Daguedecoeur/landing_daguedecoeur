"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import type { NavItem } from "@/features/navigation/domain/navigation.model";

interface MobileNavProps {
    items: NavItem[];
    siteName: string;
    isActive: (path: string) => boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    ctaLabel: string;
    ctaHref: string;
}

function MobileNavSection({ item, onClose }: { item: NavItem; onClose: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!item.children) {
        return (
            <Link
                href={item.href || "/"}
                onClick={onClose}
                className="flex items-center gap-3 py-3 px-4 rounded-lg font-cinzel font-semibold text-base text-cream/90 hover:bg-gold/10 hover:text-gold transition-colors"
            >
                {item.emoji && <span>{item.emoji}</span>}
                {item.label}
            </Link>
        );
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-3 px-4 rounded-lg font-cinzel font-semibold text-base text-cream/90 hover:bg-gold/10 hover:text-gold transition-colors"
            >
                <span className="flex items-center gap-3">
                    {item.emoji && <span>{item.emoji}</span>}
                    {item.label}
                </span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-gold transition-transform duration-200",
                    isOpen && "rotate-180"
                )} />
            </button>
            {isOpen && (
                <div className="ml-4 pl-4 border-l border-gold/20 space-y-1 mb-2">
                    {item.children.map((child) => {
                        const Component = child.external ? "a" : Link;
                        const extraProps = child.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
                        return (
                            <Component
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className="block py-2 px-3 rounded-md text-sm text-cream/70 hover:text-gold hover:bg-gold/10 transition-colors"
                                {...extraProps}
                            >
                                <span className="font-medium">{child.label}</span>
                                {child.description && (
                                    <span className="block text-xs text-cream/40 mt-0.5">{child.description}</span>
                                )}
                            </Component>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export function MobileNav({ items, siteName, isActive, open, onOpenChange, ctaLabel, ctaHref }: MobileNavProps) {
    const close = () => onOpenChange(false);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-cream hover:text-gold hover:bg-gold/10"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="w-6 h-6" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="bg-deep-violet/95 backdrop-blur-xl border-l border-gold/20 w-[320px] sm:w-[380px] overflow-y-auto"
            >
                <SheetHeader className="border-b border-gold/20 pb-4">
                    <SheetTitle className="flex items-center gap-3 font-cinzel text-cream">
                        <Sword className="w-5 h-5 text-gold rotate-45" />
                        {siteName}
                    </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1 py-4 px-2">
                    {/* Home link */}
                    <Link
                        href="/"
                        onClick={close}
                        className={cn(
                            "flex items-center gap-3 py-3 px-4 rounded-lg font-cinzel font-semibold text-base transition-colors",
                            isActive("/")
                                ? "text-gold bg-gold/10"
                                : "text-cream/90 hover:bg-gold/10 hover:text-gold"
                        )}
                    >
                        🏠 Accueil
                    </Link>

                    {items.map((item) => (
                        <MobileNavSection
                            key={item.label}
                            item={item}
                            onClose={close}
                        />
                    ))}
                </nav>

                <div className="mt-auto p-4 border-t border-gold/20">
                    <Button
                        asChild
                        className="w-full bg-gold text-deep-violet font-cinzel font-bold text-sm py-3 h-auto rounded-full hover:bg-gold/80 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    >
                        <Link href={ctaHref} onClick={close}>
                            {ctaLabel}
                        </Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
