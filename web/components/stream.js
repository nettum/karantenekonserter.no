import Link from 'next/link'
import Countdown,  { zeroPad } from 'react-countdown'

import { urlFor } from '../utils/imageHelper';

import styles from './stream.module.css';

const renderTimer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return null;
  } else {
    return (
      <small className={styles.upcoming}>
        {zeroPad((days * 24) + hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </small>
    );
  }
};

const Stream = ({ stream, status })  => {
  const { _id, title, slug, poster, streamDate } = stream;

  return (
    <div key={_id} className={styles.item}>
      <Link href="/stream/[slug]" as={`/stream/${slug.current}`}>
        <a>
          {poster && <img src={urlFor(poster).width(350).height(197).url()} alt={`Skjermbilde av ${title}`} loading="lazy" />}
          <h3>{title}</h3>
          <small>{new Intl.DateTimeFormat('nb-NO', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'} ).format(new Date(streamDate))}</small>
          {status === 'Neste ut' && <Countdown date={new Date(streamDate)} renderer={renderTimer} />}
        </a>
      </Link>
    </div>
  )
};

export default Stream;
