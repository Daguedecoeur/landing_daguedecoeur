import Link from "next/link";

interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
}

interface FooterLinkColumnProps {
    title: string;
    links: FooterLink[];
}

export function FooterLinkColumn({ title, links }: FooterLinkColumnProps) {
    return (
        <div>
            <h4 className="font-cinzel font-bold text-gold text-sm tracking-wider mb-4">
                {title}
            </h4>
            <ul className="space-y-3">
                {links.map((link) => {
                    const Component = link.external ? "a" : Link;
                    const extraProps = link.external
                        ? { target: "_blank" as const, rel: "noopener noreferrer" }
                        : {};
                    return (
                        <li key={link.href}>
                            <Component
                                href={link.href}
                                className="text-cream/50 text-sm hover:text-gold transition-colors duration-200"
                                {...extraProps}
                            >
                                {link.label}
                            </Component>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
