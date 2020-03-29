import { useRouter } from 'next/router'
import client from '../../client';

import Layout from '../../components/layout';
import FacebookVideo from '../../components/facebookvideo';
import YoutubeVideo from '../../components/youtubevideo';

const Stream = (props) => {
  const { title, poster, facebookUrl, youtubeUrl } = props;
  const router = useRouter();
  return (
    <Layout>
      <article>
        <h1>{title}</h1>
        {facebookUrl && <FacebookVideo url={facebookUrl} />}
        {youtubeUrl && <YoutubeVideo url={youtubeUrl} />}
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
      facebookUrl,
      youtubeUrl,
    }[0]
  `, { slug });
};

export default Stream;
