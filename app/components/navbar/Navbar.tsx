"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { NavbarContent } from "@/features/navigation/domain/navigation.model";
import type { User } from "@supabase/supabase-js";
import { NavbarLogo } from "./NavbarLogo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

interface NavbarProps {
    content: NavbarContent;
}

export function Navbar({ content }: NavbarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

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
                        <DesktopNav items={content.menuItems} isActive={isActive} ctaLabel={content.ctaLabel} ctaHref={content.ctaHref} user={user} />
                        <MobileNav
                            items={content.mobileMenuItems}
                            siteName={content.siteName}
                            isActive={isActive}
                            open={mobileOpen}
                            onOpenChange={setMobileOpen}
                            ctaLabel={content.ctaMobileLabel}
                            ctaHref={content.ctaHref}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
