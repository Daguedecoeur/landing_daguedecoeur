// ─── Newsletter Preferences ──────────────────────────────────
export interface NewsletterPrefs {
  newsletterDebutant: boolean
  newsletterRegulier: boolean
  newsletterMensuel: boolean
}

// ─── Profile Entity ──────────────────────────────────────────
export interface Profile {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  discordId?: string
  patreonTier?: string
  firstName?: string
  lastName?: string
  country?: string
  provider?: string
  newsletterDebutant: boolean
  newsletterRegulier: boolean
  newsletterMensuel: boolean
}

// ─── Repository Port ─────────────────────────────────────────
export interface ProfileRepository {
  getProfile(userId: string): Promise<Profile>
  updatePersonalData(userId: string, data: Partial<Pick<Profile, 'firstName' | 'lastName' | 'country'>>): Promise<void>
  updateNewsletter(userId: string, prefs: NewsletterPrefs): Promise<void>
  updatePassword(newPassword: string): Promise<void>
}

// ─── Avatar Repository Port ──────────────────────────────────
export interface AvatarRepository {
  uploadAvatar(userId: string, file: File): Promise<string>
}
