import type { Metadata } from "next";
import { Inter, Cinzel, Lato } from "next/font/google";
import "./../globals.css";
import Script from "next/script";
import { Navbar } from "./../components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getPayload } from "payload";
import configPromise from "@payload-config";

const inter = Inter({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Dague de Coeur - Communauté Française Daggerheart",
  description: "Rejoignez Dague de Coeur, la communauté française dédiée à Daggerheart, le jeu de rôle narratif de Darrington Press. Découvrez des parties, des ressources et des joueurs francophones passionnés.",
  keywords: "Daggerheart, Dague de Coeur, jeu de rôle, JDR, RPG, communauté française, Darrington Press, Critical Role, jeu narratif",
  authors: [{ name: "Dague de Coeur" }],
  openGraph: {
    type: "website",
    url: "https://daguedecoeur.fr/",
    title: "Dague de Coeur - Communauté Française Daggerheart",
    description: "Rejoignez la communauté française de Daggerheart ! Découvrez des parties, des ressources et connectez-vous avec des joueurs francophones.",
    images: [
      {
        url: "https://daguedecoeur.fr/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dague de Coeur - Communauté Daggerheart Francophone",
      },
    ],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dague de Coeur - Communauté Française Daggerheart",
    description: "Rejoignez la communauté française de Daggerheart ! Découvrez des parties, des ressources et connectez-vous avec des joueurs francophones.",
    images: ["https://daguedecoeur.fr/images/og-image.png"],
  },
  alternates: {
    canonical: "https://daguedecoeur.fr/",
  },
  icons: {
    icon: "/images/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
};

async function getNavbarData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.findGlobal({ slug: "navbar" });
    return {
      siteName: data.siteName || undefined,
      menuItems: (data.menuItems ?? []).map((item: { label: string; href: string }) => ({
        label: item.label,
        href: item.href,
      })),
      mobileMenuItems: (data.mobileMenuItems ?? []).map((item: { label: string; href: string }) => ({
        label: item.label,
        href: item.href,
      })),
    };
  } catch {
    return {};
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarData = await getNavbarData();

  return (
    <html lang="fr" className={`${cinzel.variable} ${lato.variable}`}>
      <head>
        {/* Google Analytics - Rebuild Trigger */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-55XGMRT9T5"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-55XGMRT9T5');
          `}
        </Script>
      </head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://daguedecoeur.fr/#website",
                "name": "Dague de Coeur",
                "url": "https://daguedecoeur.fr/",
                "description": "Communauté Française Daggerheart — Le jeu de rôle narratif de Darrington Press / Critical Role",
                "inLanguage": "fr-FR",
                "publisher": {
                  "@id": "https://daguedecoeur.fr/#organization"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://daguedecoeur.fr/#organization",
                "name": "Dague de Coeur",
                "alternateName": "Dague de Cœur & Cie",
                "url": "https://daguedecoeur.fr/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://daguedecoeur.fr/images/og-image.png",
                  "width": 1200,
                  "height": 630
                },
                "description": "Association francophone dédiée à Daggerheart. Nous aidons les joueurs débutants et confirmés à découvrir et pratiquer le jeu de rôle narratif.",
                "founder": {
                  "@type": "Person",
                  "name": "Dilhan"
                },
                "sameAs": [
                  "https://discord.com/invite/Wp5NKt56BX"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "community",
                  "url": "https://discord.com/invite/Wp5NKt56BX"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://daguedecoeur.fr/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Accueil",
                    "item": "https://daguedecoeur.fr/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://daguedecoeur.fr/blog"
                  }
                ]
              }
            ]
          })
        }}
      />
      <body
        className={`${lato.className} antialiased`}
      >
        <Navbar {...navbarData} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

