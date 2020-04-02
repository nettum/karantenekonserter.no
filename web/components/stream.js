import Link from 'next/link'
import Countdown,  { zeroPad } from 'react-countdown'

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

const Stream = ({ stream, status, idx })  => {
  const { _id, title, slug, poster, streamDate } = stream;

  return (
    <div key={_id} className={styles.item}>
      <Link href="/stream/[slug]" as={`/stream/${slug.current}`}>
        <a>
          {poster && <img src={`${poster}?w=350&h=197&crop=center&fit=crop`} alt={`Skjermbilde av ${title}`} />}
          <h3>{title}</h3>
          <small>{new Intl.DateTimeFormat('nb-NO', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'} ).format(new Date(streamDate))}</small>
          {(status === 'Neste ut' && idx < 5) && <Countdown date={new Date(streamDate)} renderer={renderTimer} />}
        </a>
      </Link>
    </div>
  )
};

export default Stream;
