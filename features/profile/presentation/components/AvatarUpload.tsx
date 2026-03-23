'use client'

import { useRef, useState, useTransition } from 'react'
import Image from 'next/image'
import { Camera, Loader2 } from 'lucide-react'
import { updateAvatarAction } from '../../application/profile.actions'
import { resizeToWebP } from '@/lib/image-utils'

interface AvatarUploadProps {
  currentUrl: string | null
  displayName: string
}

export function AvatarUpload({ currentUrl, displayName }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const initials = displayName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setError(null)

    startTransition(async () => {
      try {
        const resized = await resizeToWebP(file)
        const formData = new FormData()
        formData.set('avatar', resized)
        const result = await updateAvatarAction(formData)
        if (result.error) {
          setError(result.error)
          setPreview(currentUrl) 
        } else if (result.avatarUrl) {
          setPreview(result.avatarUrl)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du traitement de l\'image.')
        setPreview(currentUrl)
      }
    })
  }


  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative group size-24 block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        title="Changer la photo"
      >
        {preview ? (
          <Image
            src={preview}
            alt={displayName}
            width={96}
            height={96}
            className="rounded-full ring-2 ring-gold shadow-[0_0_20px_rgba(212,175,55,0.3)] object-cover size-24"
          />
        ) : (
          <div className="size-24 rounded-full ring-2 ring-gold shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-deep-violet flex items-center justify-center text-gold font-cinzel text-2xl font-bold">
            {initials}
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isPending ? (
            <Loader2 className="size-5 text-white animate-spin" />
          ) : (
            <>
              <Camera className="size-5 text-white" />
              <span className="text-white text-[10px] font-medium mt-0.5">Modifier</span>
            </>
          )}
        </div>
      </button>

 
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && (
        <p className="text-red-600 text-xs mt-1 max-w-[100px] text-center">{error}</p>
      )}
    </div>
  )
}
