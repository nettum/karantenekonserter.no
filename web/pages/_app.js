import Head from 'next/head';
import { Container } from 'next/app';
import '../styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
