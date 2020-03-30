import { useRouter } from 'next/router'
import client from '../../client';
import BlockContent from '@sanity/block-content-to-react';

import Layout from '../../components/layout';
import FacebookVideo from '../../components/facebookvideo';
import YoutubeVideo from '../../components/youtubevideo';

import styles from './stream.module.css';

const Stream = (props) => {
  const { title, poster, streamDate, facebookUrl, youtubeUrl, description } = props;
  const router = useRouter();

  const serializers = {
    marks: {
      link: ({mark, children}) => {
        const { href } = mark
        return <a href={href} target="_blank" rel="noopener">{children}</a>
      },
    }
  };

  return (
    <Layout>
      <article className={styles.main}>
        {facebookUrl && <FacebookVideo url={facebookUrl} />}
        {youtubeUrl && <YoutubeVideo url={youtubeUrl} />}
        <div className={styles.intro}>
          <div>
            <h1>{title}</h1>
            <small>{new Intl.DateTimeFormat('nb-NO', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'} ).format(new Date(streamDate))}</small>
          </div>
          <ul>
            {/* <li>1</li>
            <li>2</li>
            <li>3</li> */}
          </ul>
        </div>
        <div class={styles.info}>
        <BlockContent blocks={description} serializers={serializers} />
        </div>
      </article>
    </Layout>
  );
}

Stream.getInitialProps = async function(context) {
  const { slug = '' } = context.query;
  return await client.fetch(`
    *[_type == "stream" && slug.current == $slug]{
      _id,
      title,
      slug,
      "poster": poster.asset->url,
      streamDate,
      facebookUrl,
      youtubeUrl,
      description,
    }[0]
  `, { slug });
};

export default Stream;
