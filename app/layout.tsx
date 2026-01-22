import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Analytics */}
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
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
