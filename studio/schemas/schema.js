import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import stream from './documents/stream';
import page from './documents/page';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    stream,
    page,
  ])
})
