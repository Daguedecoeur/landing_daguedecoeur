export function PageHeader() {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-4 mb-4">
      <h1 className="text-cream text-5xl md:text-6xl font-black font-cinzel leading-tight tracking-wide uppercase">
        La Gazette de Dague de Cœur
      </h1>
      <p className="text-gold text-xl font-cinzel italic tracking-widest">
        Archives de la Confrérie
      </p>
      <div className="w-32 h-[2px] bg-gold mt-4 rounded-full" />
    </section>
  )
}
