import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        {children}
      </div>

      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="/images/auth-bg.png"
          alt="Univers Daggerheart"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-violet via-deep-violet/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-violet/80 via-transparent to-deep-violet/30" />
      </div>
    </main>
  )
}
