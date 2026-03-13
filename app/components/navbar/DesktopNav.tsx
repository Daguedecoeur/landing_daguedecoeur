import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { NavItem, NavSubItem } from "@/features/navigation/domain/navigation.model";
import type { User } from "@supabase/supabase-js";
import { signOutAction } from "@/features/auth/application/auth.actions";
import { LogOut } from "lucide-react";

interface DesktopNavProps {
    items: NavItem[];
    isActive: (path: string) => boolean;
    ctaLabel: string;
    ctaHref: string;
    user: User | null;
}

function DesktopDropdownItem({ item }: { item: NavSubItem }) {
    const Component = item.external ? "a" : Link;
    const extraProps = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <NavigationMenuLink asChild>
            <Component
                href={item.href}
                className={cn(
                    "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                    "hover:bg-gold/10 focus:bg-gold/10",
                )}
                {...extraProps}
            >
                <div className="text-sm font-cinzel font-semibold text-cream leading-none mb-1">
                    {item.label}
                </div>
                {item.description && (
                    <p className="text-xs leading-snug text-cream/50">
                        {item.description}
                    </p>
                )}
            </Component>
        </NavigationMenuLink>
    );
}

export function DesktopNav({ items, isActive, ctaLabel, ctaHref, user }: DesktopNavProps) {
    return (
        <>
            <NavigationMenu className="hidden lg:flex" viewport={true}>
                <NavigationMenuList className="gap-0">
                    {items.map((item) => (
                        <NavigationMenuItem key={item.label}>
                            {item.children ? (
                                <>
                                    <NavigationMenuTrigger
                                        className={cn(
                                            "bg-transparent text-cream/80 font-cinzel text-xs tracking-wider",
                                            "hover:bg-gold/10 hover:text-gold",
                                            "data-popup-open:bg-gold/10 data-popup-open:text-gold",
                                            "focus:bg-gold/10",
                                            "h-10 px-3",
                                        )}
                                    >
                                        {item.emoji && <span className="mr-1.5">{item.emoji}</span>}
                                        {item.label}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-deep-violet/95 backdrop-blur-xl border border-gold/20 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                                        <ul className="grid w-[320px] gap-1 p-2">
                                            {item.children.map((child) => (
                                                <li key={child.href}>
                                                    <DesktopDropdownItem item={child} />
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            ) : (
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={item.href || "/"}
                                        className={cn(
                                            "inline-flex items-center h-10 px-3 rounded-lg text-xs font-cinzel tracking-wider transition-colors",
                                            isActive(item.href || "/")
                                                ? "text-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.6)]"
                                                : "text-cream/80 hover:text-gold hover:bg-gold/10",
                                        )}
                                    >
                                        {item.emoji && <span className="mr-1.5">{item.emoji}</span>}
                                        {item.label}
                                    </Link>
                                </NavigationMenuLink>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            {user ? (
                <div className="hidden lg:flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/20 border border-gold/30 text-gold font-cinzel font-bold text-xs">
                        {(user.email?.[0] ?? '?').toUpperCase()}
                    </div>
                    <form action={signOutAction}>
                        <Button
                            type="submit"
                            variant="ghost"
                            className="text-cream/60 hover:text-gold hover:bg-gold/10 font-cinzel text-xs h-9 px-3 gap-1.5"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Déconnexion
                        </Button>
                    </form>
                </div>
            ) : (
                <Button
                    asChild
                    className="hidden lg:inline-flex bg-gold text-deep-violet font-cinzel font-bold text-xs h-9 rounded-full px-5 hover:bg-gold/80 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 transition-all"
                >
                    <Link href="/login">{ctaLabel}</Link>
                </Button>
            )}
        </>
    );
}
