"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavbarProps } from "./navbar.types";
import { NAV_ITEMS } from "./navbar.data";
import { NavbarLogo } from "./NavbarLogo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Navbar({ siteName = "DAGUE DE CŒUR" }: NavbarProps) {
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
                        <NavbarLogo siteName={siteName} />
                        <DesktopNav items={NAV_ITEMS} isActive={isActive} />
                        <MobileNav
                            items={NAV_ITEMS}
                            siteName={siteName}
                            isActive={isActive}
                            open={mobileOpen}
                            onOpenChange={setMobileOpen}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
