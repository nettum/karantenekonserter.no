import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';

import client from '../../client';
import BlockContent from '@sanity/block-content-to-react';

import FacebookVideo from '../../components/facebookvideo';
import YoutubeVideo from '../../components/youtubevideo';
import { urlFor } from '../../utils/imageHelper';

import styles from './stream.module.css';

const renderOrganizers = (organizers) => {
  if (organizers.length === 0) return null;

  return organizers.map(organizer => {
    return (
      <li key={organizer._id}>
        <a href={organizer.facebookUrl} target="_blank" rel="noopener"><span>{organizer.title}</span></a>
        <img src={`${organizer.logo}?w=50&h=50&crop=center&fit=crop`} alt={`Logo, ${organizer.title}`} />
      </li>
    );
  });
};

const Stream = (props) => {
  const { title, slug, poster, facebookUrl, youtubeUrl, description, streamDate, organizer } = props;
  const [realtimeFields, updateFields] = useState({ title, facebookUrl, youtubeUrl, description });

  useEffect(() => {
    client.listen('*[_type == "stream" && slug.current == $slug]', { slug: slug.current })
    .subscribe(update => {
      if (update.type === 'mutation' && update.transition === 'update') {
        updateFields({ title, facebookUrl, youtubeUrl, description } = update.result);
      }
    });
  });

  const readableDate = new Intl.DateTimeFormat('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'}
    ).format(new Date(streamDate));

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
        title={`${realtimeFields.title} | karantenekonserter.no`}
        description={`Se ${realtimeFields.title} og flere konserter på karantenekonserter.no`}
        openGraph={{
          type: 'website',
          url: `https://karantenekonserter.no/stream/${slug.current}`,
          title: `${realtimeFields.title} | karantenekonserter.no`,
          description: 'STØTT NORSKE ARTISTER! Se opptak og hvilke konserter som kommer for strømming på karantenekonserter.no',
          images: [
            {
              url: urlFor(poster).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ],
        }}
      />
      {!realtimeFields.facebookUrl && !realtimeFields.youtubeUrl && poster && <img src={urlFor(poster).width(1280).height(720).url()} alt={`Skjermbilde av ${realtimeFields.title}`} />}
      {realtimeFields.facebookUrl && <FacebookVideo url={realtimeFields.facebookUrl} />}
      {realtimeFields.youtubeUrl && <YoutubeVideo url={realtimeFields.youtubeUrl} />}
      <section>
        <div>
          <div className={styles.intro}>
            <div>
              <h1>{realtimeFields.title}</h1>
              <small>{readableDate}</small>
            </div>
          </div>
          <div className={styles.info}>
            <BlockContent blocks={realtimeFields.description} serializers={serializers} />
          </div>
        </div>
          {organizer != null &&
            <div className={styles.organizers}>
              <h3>Denne konserten er arrangert av:</h3>
              <ul>{renderOrganizers(organizer)}</ul>
            </div>}
      </section>
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
      poster,
      streamDate,
      facebookUrl,
      youtubeUrl,
      description,
      organizer[]->{title, 'logo': logo.asset->url, facebookUrl}
    }[0]
  `, { slug });
};

export default Stream;
