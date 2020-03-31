import Router from 'next/router'
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import '../styles.css'

import { GA_TRACKING_ID } from '../utils/gtag'
import * as gtag from '../utils/gtag'

import Layout from '../components/layout';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

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
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `,
          }}
        />
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
