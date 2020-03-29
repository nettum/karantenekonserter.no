import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import client from '../../client';

const Stream = (props) => {
  const { title, poster} = props;
  const router = useRouter();

  return (
    <Layout>
      <article>
        <h1>{title}</h1>
        <img src={`${poster}?w=1024`} alt={`Skjermbilde av ${title}`} />
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
      "poster": poster.asset->url
    }[0]
  `, { slug });
};

export default Stream;
