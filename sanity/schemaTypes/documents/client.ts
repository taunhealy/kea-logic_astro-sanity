export default {
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'projectTitle',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Web Design', value: 'webDesign'},
          {title: 'Web Development', value: 'webDevelopment'},
          {title: 'E-commerce', value: 'ecommerce'},
          {title: 'UI/UX Design', value: 'uiux'},
          {title: 'Brand Identity', value: 'brandIdentity'}
        ]
      }
    },
    {
      name: 'projectUrl',
      title: 'Live Project URL',
      type: 'url'
    },
    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date'
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{type: 'image'}]
    },
    {
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'text'
    }
  ]
}