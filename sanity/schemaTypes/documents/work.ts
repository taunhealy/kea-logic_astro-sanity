import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Work Categories',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'workCategory' }]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{type: 'client'}],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'The URL to the wedding video',
    }),
  ],
  preview: {
    select: {
      clientName: 'client.coupleNames',
      media: 'image',
    },
    prepare({clientName, media}) {
      return {
        title: clientName || 'Untitled Work',
        subtitle: 'Work',
        media: media
      }
    }
  }
})