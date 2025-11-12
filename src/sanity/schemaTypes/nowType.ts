import {defineField, defineType} from 'sanity'

export const nowType = defineType({
  name: 'now',
  title: 'Now',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'nowBlockContent',
    }),
    defineField({
      name: 'shareEnabled',
      title: 'Enable Sharing',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image (Open Graph)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'shareImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection as {title?: string; subtitle?: string; media?: any}
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : undefined
      return { title, subtitle: date ? `Published ${date}` : undefined, media }
    },
  },
})