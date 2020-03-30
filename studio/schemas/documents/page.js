export default {
  name: 'page',
  type: 'document',
  title: 'Page',
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
      name: 'navname',
      type: 'string',
      title: 'Nav name',
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }
  ]
};
