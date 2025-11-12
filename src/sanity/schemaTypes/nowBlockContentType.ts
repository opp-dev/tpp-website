import {defineType, defineArrayMember} from 'sanity'
import {ImageIcon, PlayIcon} from '@sanity/icons'

/**
 * Simplified block content for "now" posts
 * Allows normal text formatting without heading styles
 */

export const nowBlockContentType = defineType({
  title: 'Now Block Content',
  name: 'nowBlockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Only normal text and blockquote styles - no headers
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Quote', value: 'blockquote'},
      ],
      // Bullet and numbered lists
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      // Full text formatting
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
        // Links
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // Images
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    // Short videos
    defineArrayMember({
      type: 'file',
      icon: PlayIcon,
      name: 'video',
      title: 'Video',
      options: {
        accept: 'video/*'
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }
      ]
    }),
  ],
})
