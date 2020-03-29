export default {
  name: 'stream',
  type: 'document',
  title: 'Stream',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title will be shown on the frontpage and over the stream itself'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Used in the URL for the stream',
      options: {
        source: 'title',
        maxLength: 96
      }
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
