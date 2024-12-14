import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workSection',
  title: 'Work Section',
  type: 'object',
  fields: [
    defineField({
      name: 'works',
      title: 'Works',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'work'}]}],
    }),
  ],
})