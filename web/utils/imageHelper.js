import client from '../client';
import { createImageUrlBuilder } from '@sanity/image-url'

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
}
