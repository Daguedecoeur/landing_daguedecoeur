"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavbarContent } from "@/features/navigation/domain/navigation.model";
import { NavbarLogo } from "./NavbarLogo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

interface NavbarProps {
    content: NavbarContent;
}

export function Navbar({ content }: NavbarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname?.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="sticky top-0 z-50 w-full">
            <div className={cn(
                "w-full",
                "bg-deep-violet/80 backdrop-blur-xl",
                "border-b border-gold/20",
                "shadow-[0_4px_30px_0_rgba(0,0,0,0.3)]",
            )}>
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-16">
                        <NavbarLogo siteName={content.siteName} />
                        <DesktopNav items={content.menuItems} isActive={isActive} ctaLabel={content.ctaLabel} ctaHref={content.ctaHref} />
                        <MobileNav
                            items={content.mobileMenuItems}
                            siteName={content.siteName}
                            isActive={isActive}
                            open={mobileOpen}
                            onOpenChange={setMobileOpen}
                            ctaLabel={content.ctaMobileLabel}
                            ctaHref={content.ctaHref}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
