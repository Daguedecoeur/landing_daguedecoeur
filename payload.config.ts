import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './cms/collections/Users'
import { Articles } from './cms/collections/Articles'
import { Media } from './cms/collections/Media'

// Globals
import { Homepage } from './cms/globals/Homepage'
import { DiscoverDaggerheart } from './cms/globals/DecouvreDaggerheart'
import { SiteSettings } from './cms/globals/SiteSettings'
import { Navbar } from './cms/globals/Navbar'
import { NewsletterPreferencesPage } from './cms/globals/NewsletterPreferencesPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Articles, Media],
  globals: [DiscoverDaggerheart, Homepage, SiteSettings, Navbar, NewsletterPreferencesPage],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    tablesFilter: ['!profiles'],
  }),

  sharp,

  plugins: [
    seoPlugin({
      collections: ['articles'],
      globals: ['homepage', 'decouvre-daggerheart'],
      uploadsCollection: 'media',
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'Masquer des moteurs de recherche (noindex)',
          defaultValue: false,
        },
      ],
      generateTitle: ({ doc }) => {
        const title = (doc as Record<string, unknown>)?.title
          ?? (doc as Record<string, unknown>)?.hero
        return `${title ?? ''} | Dague de Cœur`
      },
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        region: process.env.S3_REGION || 'eu-west-1',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
})
