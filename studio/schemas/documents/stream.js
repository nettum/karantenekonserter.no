export default {
  name: 'stream',
  type: 'document',
  title: 'Stream',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      title: 'Stream date',
      name: 'streamDate',
      type: 'datetime',
      options: {
        timeStep: 60,
      },
      validation: Rule => Rule.required(),
    },
    {
      title: 'Organizer',
      name: 'organizer',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'organizer'},
          ]
        }
      ],
      options: {
        layout: 'tags'
      },
    },
    {
      title: 'Poster',
      name: 'poster',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'facebookUrl',
      type: 'url',
      title: 'Facebook URL',
      description: 'If the concert is a facebook stream, paste the facebook URL for the video here'
    },
    {
      name: 'youtubeUrl',
      type: 'url',
      title: 'Youtube URL',
      description: 'If the concert is a youtube stream, paste the youtube URL for the video here'
    },
    {
      name: 'vimeoUrl',
      type: 'url',
      title: 'Vimeo URL',
      description: 'If the concert is a vimeo stream, paste the vimeo URL for the video here'
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'streamDate',
      media: 'poster',
    },
  },
  orderings: [
    {
      title: 'Stream date',
      name: 'streamDateDesc',
      by: [
        {field: 'streamDate', direction: 'desc'}
      ]
    },
  ],
}
