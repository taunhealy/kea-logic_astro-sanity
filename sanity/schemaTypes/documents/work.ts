import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    defineField({
      name: 'workType',
      title: 'Work Type',
      type: 'string',
      options: {
        list: [
          {title: 'Web Design', value: 'webDesign'},
          {title: 'Web Development', value: 'webDevelopment'}
        ],
      },
      validation: Rule => Rule.required(),
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
      workType: 'workType'
    },
    prepare({clientName, media, workType}) {
      return {
        title: clientName || 'Untitled Work',
        subtitle: workType,
        media: media
      }
    }
  }
})