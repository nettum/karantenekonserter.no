export default {
  name: 'organizer',
  type: 'document',
  title: 'Organizer',
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
      title: 'Logo',
      name: 'logo',
      type: 'image',
    },
    {
      name: 'homepageUrl',
      type: 'url',
      title: 'Homepage URL',
    },
    {
      name: 'facebookUrl',
      type: 'url',
      title: 'Facebook URL',
    },
  ],
}
