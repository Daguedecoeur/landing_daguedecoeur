export interface NavSubItem {
    label: string;
    href: string;
    description?: string;
    external?: boolean;
}

export interface NavItem {
    label: string;
    href?: string;
    emoji?: string;
    children?: NavSubItem[];
}

export interface NavbarProps {
    siteName?: string;
}
