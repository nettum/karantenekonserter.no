import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import stream from './documents/stream';
import page from './documents/page';
import organizer from './documents/organizer';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    stream,
    page,
    organizer,
  ])
})
