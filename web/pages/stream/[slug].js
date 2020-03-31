import { NextSeo } from 'next-seo';

import client from '../../client';
import BlockContent from '@sanity/block-content-to-react';

import FacebookVideo from '../../components/facebookvideo';
import YoutubeVideo from '../../components/youtubevideo';

import styles from './stream.module.css';

const renderStream = (props) => {
  const { title, facebookUrl, youtubeUrl, poster } = props;

  if (!facebookUrl && !youtubeUrl) {
    return poster && <img src={`${poster}?w=1280&crop=center&fit=crop`} alt={`Skjermbilde av ${title}`} />
  }

  return (
    <>
      {facebookUrl && <FacebookVideo url={facebookUrl} />}
      {youtubeUrl && <YoutubeVideo url={youtubeUrl} />}
    </>
  );
};

const Stream = (props) => {
  const { title, slug, poster, streamDate, description } = props;

  const readableDate = new Intl.DateTimeFormat('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'}
    ).format(new Date(streamDate));

  // const shareImage = {`${poster}?w=1200&h=630&crop=center&fit=crop`};

  const serializers = {
    marks: {
      link: ({mark, children}) => {
        const { href } = mark
        return <a href={href} target="_blank" rel="noopener">{children}</a>
      },
    }
  };

  return (
    <article className={styles.main}>
      <NextSeo
        title={`${title} | karantenekonserter.no`}
        description={`Se ${title} og flere konserter på karantenekonserter.no`}
        openGraph={{
          type: 'website',
          url: `https://karantenekonserter.no/stream/${slug.current}`,
          title: `${title} | karantenekonserter.no`,
          description: 'STØTT NORSKE ARTISTER! Se opptak og hvilke konserter som kommer for strømming på karantenekonserter.no',
          images: [
            {
              url: `${poster}?w=1200&h=630&crop=center&fit=crop`,
              width: 1200,
              height: 630,
            },
          ],
        }}
      />
      {renderStream(props)}
      <div className={styles.intro}>
        <div>
          <h1>{title}</h1>
          <small>{readableDate}</small>
        </div>
        <ul>
          {/* <li>1</li>
          <li>2</li>
          <li>3</li> */}
        </ul>
      </div>
      <div className={styles.info}>
        <BlockContent blocks={description} serializers={serializers} />
      </div>
    </article>
  );
}

Stream.getInitialProps = async (context) => {
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
