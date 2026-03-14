import { Cinzel, Lato } from "next/font/google";
import "./globals.css";
import { NotFoundContent } from "./components/NotFoundContent";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export default function NotFound() {
  return (
    <html lang="fr" className={`${cinzel.variable} ${lato.variable}`}>
      <body className={`${lato.className} antialiased min-h-screen bg-[#1d1852]`}>
        <NotFoundContent />
      </body>
    </html>
  );
}
