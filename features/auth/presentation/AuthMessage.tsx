interface AuthMessageProps {
  error?: string
  success?: string
}

export function AuthMessage({ error, success }: AuthMessageProps) {
  if (!error && !success) return null

  return (
    <div
      className={`rounded-lg px-4 py-3 text-sm font-lato ${
        error
          ? 'bg-red-500/10 border border-red-500/30 text-red-300'
          : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
      }`}
    >
      {error || success}
    </div>
  )
}
