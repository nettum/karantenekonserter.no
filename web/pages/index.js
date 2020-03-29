import Link from 'next/link'
import groq from 'groq'
import client from '../client'

import Layout from '../components/layout';
import styles from './index.module.css';

const Index = (props) => {
  const { streams = [] } = props;

  return (
    <Layout>
      <section className={styles.streams}>
      {streams.map(
        ({ _id, title, slug, poster, streamDate }) =>
        <div key={_id} className={styles.item}>
          <Link href="/stream/[slug]" as={`/stream/${slug.current}`}>
            <a>
              {poster && <img src={`${poster}?w=350&h=197&crop=center&fit=crop`} alt={`Skjermbilde av ${title}`} />}
              <h2>{title}</h2>
              <small>{new Intl.DateTimeFormat('nb-NO', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'} ).format(new Date(streamDate))}</small>
            </a>
          </Link>
        </div>
      )}
      </section>
    </Layout>
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
