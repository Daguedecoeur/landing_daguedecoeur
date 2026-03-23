import { createHmac, timingSafeEqual } from 'crypto'

const getSecret = () => {
  const secret = process.env.NEWSLETTER_SECRET
  if (!secret) throw new Error('NEWSLETTER_SECRET is not set')
  return secret
}

/** Generate a deterministic HMAC-SHA256 token for an email */
export function generateNewsletterToken(email: string): string {
  return createHmac('sha256', getSecret())
    .update(email.toLowerCase().trim())
    .digest('hex')
}

/** Verify a token against an email (timing-safe) */
export function verifyNewsletterToken(email: string, token: string): boolean {
  const expected = generateNewsletterToken(email)
  if (expected.length !== token.length) return false
  return timingSafeEqual(Buffer.from(expected), Buffer.from(token))
}
