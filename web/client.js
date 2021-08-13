import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 't6u0vaao',
  dataset: 'production',
  apiVersion: '2021-08-13',
  useCdn: true
})
