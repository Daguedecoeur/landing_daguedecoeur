"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface UserMenuDesktopProps {
    user: User;
    avatarUrl?: string | null;
}

function Avatar({ user, avatarUrl }: { user: User; avatarUrl?: string | null }) {
    const initials = (user.email?.[0] ?? "?").toUpperCase();
    if (avatarUrl) {
        return (
            <Image
                src={avatarUrl}
                alt="Avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-gold/30"
            />
        );
    }
    return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/20 border border-gold/30 text-gold font-cinzel font-bold text-xs">
            {initials}
        </div>
    );
}

export function UserMenuDesktop({ user, avatarUrl }: UserMenuDesktopProps) {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    const handleMouseEnter = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(() => setOpen(false), 120);
    };

    async function handleSignOut() {
        setIsPending(true);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    }

    return (
        <div
            className="relative hidden lg:flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger */}
            <button
                className="flex items-center justify-center rounded-full hover:ring-2 hover:ring-gold/50 hover:shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-all focus:outline-none"
                title="Mon compte"
            >
                <Avatar user={user} avatarUrl={avatarUrl} />
            </button>

            {/* Dropdown panel */}
            {open && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-deep-violet/95 backdrop-blur-xl border border-gold/20 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
                    {/* Header */}
                    <div className="px-3 py-2.5 border-b border-gold/20">
                        <p className="text-xs font-cinzel text-gold truncate">{user.email}</p>
                    </div>

                    {/* Mon compte */}
                    <Link
                        href="/compte"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 font-cinzel text-xs text-cream hover:text-gold hover:bg-gold/10 transition-colors"
                    >
                        <UserIcon className="w-3.5 h-3.5" />
                        Mon compte
                    </Link>

                    {/* Séparateur */}
                    <div className="border-t border-gold/20" />

                    {/* Déconnexion */}
                    <button
                        onClick={handleSignOut}
                        disabled={isPending}
                        className="flex items-center gap-2 w-full px-3 py-2.5 font-cinzel text-xs text-cream/70 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        {isPending ? "Déconnexion…" : "Déconnexion"}
                    </button>
                </div>
            )}
        </div>
    );
}
