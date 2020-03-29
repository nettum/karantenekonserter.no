export default {
  name: 'stream',
  type: 'document',
  title: 'Stream',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
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
      type: 'datetime'
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
  ]
}
