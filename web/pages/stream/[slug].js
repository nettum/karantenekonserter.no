import { useRouter } from 'next/router'
import Layout from '../../components/layout';
const Post = () => {
  const router = useRouter()

  return (
    <Layout>
      <article>
        <h1>{router.query.slug}</h1>
      </article>
    </Layout>
  )
}

export default Post
