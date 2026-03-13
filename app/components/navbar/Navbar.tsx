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
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();

        async function fetchUserAndAvatar() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setUser(null); setAvatarUrl(null); return; }
            setUser(user);
            // Custom upload takes priority over OAuth avatar
            const { data: profile } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single();
            setAvatarUrl(profile?.avatar_url ?? user.user_metadata?.avatar_url ?? null);
        }

        fetchUserAndAvatar();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session?.user) { setUser(null); setAvatarUrl(null); return; }
            setUser(session.user);
            // Re-fetch profile avatar on auth change
            supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', session.user.id)
                .single()
                .then(({ data: profile }) => {
                    setAvatarUrl(profile?.avatar_url ?? session.user?.user_metadata?.avatar_url ?? null);
                });
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
                        <DesktopNav items={content.menuItems} isActive={isActive} ctaLabel={content.ctaLabel} ctaHref={content.ctaHref} user={user} avatarUrl={avatarUrl} />
                        <MobileNav
                            items={content.mobileMenuItems}
                            siteName={content.siteName}
                            isActive={isActive}
                            open={mobileOpen}
                            onOpenChange={setMobileOpen}
                            ctaLabel={content.ctaMobileLabel}
                            ctaHref={content.ctaHref}
                            user={user}
                            avatarUrl={avatarUrl}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
