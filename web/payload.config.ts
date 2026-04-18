import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

export default buildConfig({
  admin: {
    user: 'admins',
  },
  collections: [
    {
      slug: 'admins',
      auth: true,
      fields: [],
    },
    {
      slug: 'users',
      admin: { readOnly: true },
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
        delete: () => false,
      },
      fields: [
        { name: 'user_id', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'name', type: 'text' },
      ],
    },
    {
      slug: 'posts',
      fields: [
        { name: 'post_id', type: 'text' },
        { name: 'author_id', type: 'relationship', relationTo: 'users' },
        { name: 'title', type: 'text' },
        { name: 'slug', type: 'text' },
        { name: 'content', type: 'richText' },
        { name: 'excerpt', type: 'text' },
        { name: 'published_at', type: 'date' },
        { name: 'status', type: 'select', options: ['draft', 'published', 'archived'] },
      ],
    },
    {
      slug: 'categories',
      fields: [
        { name: 'category_id', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'slug', type: 'text' },
        { name: 'description', type: 'text' },
      ],
    },
    {
      slug: 'tags',
      fields: [
        { name: 'tag_id', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'slug', type: 'text' },
      ],
    },
    {
      slug: 'media',
      fields: [
        { name: 'media_id', type: 'text' },
        { name: 'file_name', type: 'text' },
        { name: 'file_path', type: 'text' },
        { name: 'file_type', type: 'text' },
        { name: 'file_size', type: 'number' },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'secret-token',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://vogelkop:vogelkop@127.0.0.1:5432/vogelkop',
    },
    push: false,
    beforeSchemaInit: [
      ({ schema, adapter }) => {
        return {
          ...schema,
          // Merge existing tables here if using Drizzle introspection
        }
      },
    ],
  }),
})
