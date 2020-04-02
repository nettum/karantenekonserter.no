import Link from 'next/link'
import groq from 'groq'
import client from '../client'

import Countdown,  { zeroPad } from 'react-countdown'

import styles from './index.module.css';


const renderStreams = (streams, status) => {
  if (streams.length === 0) return null;
  return (
    <section>
      <h2>{status} <small>({streams.length})</small></h2>
      <div className={styles.streams}>
        {streams.map((stream, idx) => renderItem(stream, status, idx))}
      </div>
    </section>
  );

};

const renderItem = (item, status, idx)  => {
  const { _id, title, slug, poster, streamDate } = item;

  return (
    <div key={_id} className={styles.item}>
      <Link href="/stream/[slug]" as={`/stream/${slug.current}`}>
        <a>
          {poster && <img src={`${poster}?w=350&h=197&crop=center&fit=crop`} alt={`Skjermbilde av ${title}`} />}
          <h3>{title}</h3>
          <small>{new Intl.DateTimeFormat('nb-NO', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'} ).format(new Date(streamDate))}</small>
          {(status === 'Neste ut' && idx < 5) && <Countdown date={new Date(streamDate)} renderer={renderTimer} />}
        </a>
      </Link>
    </div>
  )
};

const renderTimer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return null;
  } else {
    return (
      <small className={styles.upcoming}>
        {(days * 24) + hours}:{zeroPad(minutes)}
      </small>
    );
  }
};

const Index = ({streaming, upcoming, archive}) => {
  return (
    <div className={styles.main}>
      {renderStreams(streaming, 'Strømmes nå')}
      {renderStreams(upcoming, 'Neste ut')}
      {renderStreams(archive, 'Arkiv')}
    </div>
  )
}

Index.getInitialProps = async () => {
  const streams = await client.fetch(groq`
    *[_type == "stream"]{
      _id,
      title,
      slug,
      "poster": poster.asset->url,
      streamDate,
      facebookUrl,
      youtubeUrl,
    }|order(streamDate desc)
  `);

  if (streams.length < 0) {
    return;
  }

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

  return { streaming, upcoming, archive };
};

export default Index;
