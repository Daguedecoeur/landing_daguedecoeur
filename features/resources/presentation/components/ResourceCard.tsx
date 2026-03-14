import { DownloadItem } from '../../domain/resources.model'

interface DownloadCardProps {
  item: DownloadItem
}

export function DownloadCard({ item }: DownloadCardProps) {
  return (
    <a
      href={item.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="group/card flex items-center gap-4 rounded-xl border border-gold/20 bg-deep-violet/60 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(212,175,55,0.12)] hover:border-gold/40"
    >
      {/* File type badge */}
      <div className="shrink-0 flex flex-col items-center gap-1">
        <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center group-hover/card:bg-gold/20 transition-colors">
          <span className="material-symbols-outlined text-gold text-2xl">
            download
          </span>
        </div>
        {item.fileType && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold/60">
            {item.fileType}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-cinzel font-bold text-cream text-base truncate group-hover/card:text-gold transition-colors">
          {item.name}
        </p>
        {item.description && (
          <p className="text-cream/60 text-sm leading-snug mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
        {item.fileSize && (
          <p className="text-cream/40 text-xs mt-1">{item.fileSize}</p>
        )}
      </div>

      {/* Download arrow */}
      <span className="material-symbols-outlined text-gold/40 group-hover/card:text-gold transition-all duration-300 group-hover/card:translate-y-0.5 shrink-0">
        file_download
      </span>
    </a>
  )
}
