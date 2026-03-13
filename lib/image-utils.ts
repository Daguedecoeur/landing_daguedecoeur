/**
 * Resize an image and convert it to WebP format client-side.
 * Uses canvas API — must be called from a browser context.
 *
 * @param file - The original image file
 * @param maxSize - Maximum width/height in pixels (default: 400)
 * @param quality - WebP quality from 0 to 1 (default: 0.85)
 * @returns A new File object with WebP content
 */
export async function resizeToWebP(file: File, maxSize = 400, quality = 0.85): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas context unavailable'))
      ctx.drawImage(img, 0, 0, w, h)
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas toBlob failed'))
          resolve(new File([blob], 'avatar.webp', { type: 'image/webp' }))
        },
        'image/webp',
        quality
      )
    }
    img.onerror = reject
    img.src = objectUrl
  })
}
