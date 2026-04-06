import Router from 'next/router'
import Head from 'next/head';
import Script from 'next/script';
import { generateDefaultSeo } from 'next-seo/pages';

import '../styles.css'

import { GA_TRACKING_ID } from '../utils/gtag'
import * as gtag from '../utils/gtag'

import Layout from '../components/layout';

Router.events.on('routeChangeComplete', url => {  window.scrollTo(0, 0); gtag.pageview(url); });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {generateDefaultSeo({
          title: 'karantenekonserter.no',
          description: 'karantenekonserter.no er en nettside som samler alle norske konsertstrømmer på en og samme plass.',
          openGraph: {
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
          },
        })}
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
          anonymize_ip: true,
        });
      `}</Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
