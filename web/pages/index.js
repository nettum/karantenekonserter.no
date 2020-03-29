import Link from 'next/link'
import groq from 'groq'
import client from '../client'

import Layout from '../components/layout';

const Index = (props) => {
  const { streams = [] } = props;

  return (
    <Layout>
      <div>
        <h1>Karantenekonserter.no</h1>
        <section>
        {streams.map(
          ({ _id, title, slug, poster }) =>
          <div key={_id}>
            <Link href="/stream/[slug]" as={`/stream/${slug.current}`}>
              <a>
                <h2>{title}</h2>
                {poster && <img src={`${poster}?w=400`} alt={`Skjermbilde av ${title}`} />}
              </a>
            </Link>
          </div>
        )}
        </section>
      </div>
    </Layout>
  )
}

Index.getInitialProps = async () => ({
  streams: await client.fetch(groq`
    *[_type == "stream"]{
      _id,
      title,
      slug,
      "poster": poster.asset->url
    }|order(streamDate desc)
  `)
});

export default Index;
