import Link from 'next/link'

const Index = () => {
  return (
    <div>
      <h1>Index</h1>
      <Link href="/stream/[slug]" as={`/stream/testslug`}>
        <a>Test link to stream page</a>
      </Link>
    </div>
  )
}

export default Index;
