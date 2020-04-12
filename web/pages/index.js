import groq from 'groq'
import client from '../client'

import Streams from './../components/streams';
import styles from './index.module.css';

const Index = ({streaming, upcoming, archive, concepts}) => {
  return (
    <div className={styles.main}>
      {streaming.length > 0 && <Streams streams={streaming} status='Strømmes nå' />}
      {upcoming.length > 0 && <Streams streams={upcoming} status='Neste ut' limit={8} />}
      {archive.length > 0 && <Streams streams={archive} status='Arkiv' limit={52} showFilters={true} concepts={concepts} />}
    </div>
  )
}

Index.getInitialProps = async () => {
  const streams = await client.fetch(groq`
    *[_type == "stream"]{
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

  if (streams.length < 0) {
    return;
  }

  const concepts = await client.fetch(groq`
    *[_type == "organizer"]{
      title, "slug": slug.current
    }|order(slug.current asc)
  `);

  // Split result from sanity into 3 different arrays based on event time
  const now = new Date();
  let streaming = [];
  let upcoming = [];
  let archive = [];
  for (const stream of streams) {
    const airDate = new Date(stream.streamDate);
    const diff = (((now - airDate) / 1000) / 60);
    if (now < airDate) {
      upcoming.push(stream);
    } else if (diff >= 0 && diff < 60) {
      streaming.push(stream);
    } else {
      upcoming = upcoming.reverse();
      const elemsToRemove = streams.length - (upcoming.length + streaming.length);
      archive = streams.splice(-elemsToRemove);
    }
  };

  return { streaming, upcoming, archive, concepts };
};

export default Index;
