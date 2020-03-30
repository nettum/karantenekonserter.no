import Link from 'next/link'
import groq from 'groq'
import client from '../client'

import styles from './index.module.css';


const renderItem = (item)  => {
  const { _id, title, slug, poster, streamDate } = item;

  const airDate = new Date(streamDate);
  const now = new Date();

  return (
    <div key={_id} className={styles.item}>
      <Link href="/stream/[slug]" as={`/stream/${slug.current}`}>
        <a>
          {poster && <img src={`${poster}?w=350&h=197&crop=center&fit=crop`} alt={`Skjermbilde av ${title}`} />}
          <h2>{title}</h2>
          <small>{new Intl.DateTimeFormat('nb-NO', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'} ).format(new Date(streamDate))}</small>
          {now < airDate && <small className={styles.upcoming}>Kommende</small>}
        </a>
      </Link>
    </div>
  )
};

const Index = (props) => {
  const { streams = [] } = props;

  return (
    <section className={styles.streams}>
      {streams.map(item => (renderItem(item)))}
    </section>
  )
}

Index.getInitialProps = async () => ({
  streams: await client.fetch(groq`
    *[_type == "stream"]{
      _id,
      title,
      slug,
      "poster": poster.asset->url,
      streamDate,
    }|order(streamDate desc)
  `)
});

export default Index;
