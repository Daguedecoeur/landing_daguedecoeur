'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function SoftGatingOverlay() {
  const pathname = usePathname()
  return (
    <div className="relative">
      {/* Blur gradient overlay */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-cream z-10 pointer-events-none" />
      <div className="absolute -top-64 left-0 right-0 h-64 backdrop-blur-[2px] z-[5] pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
        }}
      />

      {/* CTA Card */}
      <Card className="bg-deep-violet border-2 border-gold rounded-xl ring-0 shadow-[0_0_40px_var(--color-gold-light)] relative overflow-hidden max-w-2xl mx-auto">
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -ml-10 -mb-10" />

        <CardContent className="p-8 md:p-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4 text-gold">
            <span className="material-symbols-outlined text-3xl">lock</span>
            <h3 className="text-2xl md:text-3xl font-cinzel text-gold">
              La suite est réservée aux membres
            </h3>
          </div>

          <p className="text-cream/70 mb-8 font-lato text-base md:text-lg leading-relaxed max-w-lg mx-auto">
            Cet article (et nos autres guides complets) est réservé aux membres de la Taverne.
            Créez un compte gratuit en 1 clic pour lire la suite et recevoir nos conseils JDR par e-mail !
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gold text-deep-violet hover:bg-gold/90 font-cinzel font-bold text-base px-8 py-3 h-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <Link href={`/signup?redirectTo=${encodeURIComponent(pathname)}`}>
                Créer un compte gratuit 🗡️
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-gold/40 text-gold hover:bg-gold/10 font-cinzel text-sm px-6 py-3 h-auto"
            >
              <Link href={`/login?redirectTo=${encodeURIComponent(pathname)}`}>
                Se connecter
              </Link>
            </Button>
          </div>

          <p className="text-cream/40 text-xs mt-6 font-lato">
            Pas de spam. Juste de l&apos;aventure. Désinscription possible à tout moment.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
