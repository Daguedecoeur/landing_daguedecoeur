export function CalendarLegend() {
  return (
    <div className="p-6 border border-gold/20 rounded-xl" style={{ background: 'rgba(45, 22, 77, 0.3)' }}>
      <h4 className="font-cinzel text-sm text-gold mb-4 tracking-widest uppercase">
        Légende
      </h4>
      <ul className="space-y-3">
        <li className="flex items-center gap-3 text-sm text-cream/70">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span>Stream Live RPG</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-cream/70">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>Sortie Produit</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-cream/70">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span>Convention</span>
        </li>
      </ul>
    </div>
  )
}
