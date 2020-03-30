import groq from 'groq'
import client from '../client'
import BlockContent from '@sanity/block-content-to-react';

import styles from './about.module.css';

const About = (props) => {
  const { title, body } = props;
  return (
    <div className={styles.main}>
      <h1>{title}</h1>
      <div>
        <BlockContent blocks={body} />
      </div>
    </div>
  )
}

About.getInitialProps = async () => {
  return await client.fetch(groq`
    *[_type == "page" && slug.current == "about"]{
      _id,
      title,
      body,
    }[0]
  `);
};

export default About;
