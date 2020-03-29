import Link from 'next/link'
import Layout from '../components/layout';

const Index = () => {
  return (
    <Layout>
      <div>
        <h1>Index</h1>
        <Link href="/stream/[slug]" as={`/stream/testslug`}>
          <a>Test link to stream page</a>
        </Link>
      </div>
    </Layout>
  )
}

export default Index;
