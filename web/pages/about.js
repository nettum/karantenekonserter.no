import groq from 'groq'
import client from '../client'
import { PortableText } from '@portabletext/react';

import styles from './about.module.css';

const About = (props) => {
  const { title, body } = props;
  return (
    <div className={styles.main}>
      <h1>{title}</h1>
      <div>
        <PortableText value={body} />
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
