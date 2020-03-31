import Head from 'next/head';
import { NextSeo } from 'next-seo';

import '../styles.css'

import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextSeo
        title="karantenekonserter.no"
        description="karantenekonserter.no er en nettside som samler alle norske konsertstrømmer på en og samme plass."
        openGraph={{
          type: 'website',
          url: 'https://karantenekonserter.no',
          title: 'karantenekonserter.no',
          description: 'STØTT NORSKE ARTISTER! Se opptak og hvilke konserter som kommer for strømming på karantenekonserter.no',
          images: [
            {
              url: 'https://karantenekonserter.no/shareimage.png',
              width: 1200,
              height: 630,
            },
          ],
        }}
      />
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Bitter|Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
