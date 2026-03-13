import type { SupabaseClient } from '@supabase/supabase-js'
import type { AvatarRepository } from '../domain/profile.model'

/** Supabase Storage adapter implementing AvatarRepository */
export class SupabaseAvatarAdapter implements AvatarRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async uploadAvatar(userId: string, file: File): Promise<string> {
    const path = `${userId}/avatar.webp`

    const { error: uploadError } = await this.supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type })

    if (uploadError) throw new Error(`Storage: ${uploadError.message}`)

    const { data } = this.supabase.storage.from('avatars').getPublicUrl(path)
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`

    const { error: dbError } = await this.supabase.from('profiles').upsert({
      id: userId,
      avatar_url: publicUrl,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })

    if (dbError) throw new Error(`DB: ${dbError.message}`)

    return publicUrl
  }
}
