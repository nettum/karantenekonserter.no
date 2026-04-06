import { createClient } from '@sanity/client'

export default createClient({
  projectId: 't6u0vaao',
  dataset: 'production',
  apiVersion: '2021-08-13',
  useCdn: true
})
