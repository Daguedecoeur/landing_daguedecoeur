import { ToolLink } from '../../domain/tools.model'

interface ToolLinkRowProps {
  link: ToolLink
}

export function ToolLinkRow({ link }: ToolLinkRowProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link flex items-center gap-4 bg-[#FAEDD4] border border-[#E5D9BB] hover:border-gold/50 rounded-lg p-4 transition-all hover:shadow-md"
    >
      {/* Icon */}
      <div className="bg-cream rounded border border-[#E5D9BB] p-3 shrink-0 text-deep-violet group-hover/link:text-gold transition-colors">
        <span className="material-symbols-outlined">{link.icon}</span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-deep-violet text-lg truncate">
          {link.name}
        </p>
        <p className="text-deep-violet/70 text-sm truncate">
          {link.description}
        </p>
      </div>

      {/* Arrow */}
      <span className="material-symbols-outlined text-gold opacity-0 group-hover/link:opacity-100 transition-opacity transform group-hover/link:translate-x-1 duration-300">
        arrow_forward
      </span>
    </a>
  )
}
