import groq from 'groq'
import client from '../client';

export const getStreams = async (concept = null, search = null) => {
  let query = ['_type == "stream"'];
  if (concept !== null) {
    query.push(`"${concept}" in organizer[]->slug.current`);
  }
  if (search !== null) {
    query.push(`title match "${search}*" || description[].children[].text match "${search}*"`);
  }

  const result = await client.fetch(groq`
    *[${query.join(' && ')}]{
      _id,
      title,
      slug,
      poster,
      streamDate,
      facebookUrl,
      youtubeUrl,
      organizer[]->{'slug': slug.current}
    }|order(streamDate desc)
  `);

  // Split result from sanity into 3 different arrays based on event time
  const now = new Date();
  let streams = { upcoming: [], streaming: [], archive: [] };

  if (result.length > 0) {
    for (const stream of result) {
      const airDate = new Date(stream.streamDate);
      const diff = (((now - airDate) / 1000) / 60);
      if (now < airDate) {
        streams.upcoming.push(stream);
      } else if (diff >= 0 && diff < 60) {
        streams.streaming.push(stream);
      } else {
        streams.upcoming = streams.upcoming.reverse();
        const elemsToRemove = result.length - (streams.upcoming.length + streams.streaming.length);
        streams.archive = result.splice(-elemsToRemove);
      }
    };
  }

  return streams;
}

export const getConcepts = async () => {
  return await client.fetch(groq`
    *[_type == "organizer"]{
      title, "slug": slug.current
    }|order(slug.current asc)
  `);
}
