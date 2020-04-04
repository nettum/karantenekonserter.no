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
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </small>
    );
  }
};

const renderNextLabel = (streamDate) => {
  const now = new Date();
  const airDate = new Date(streamDate);
  airDate.setSeconds(0);
  const diffHours = Math.abs(airDate - now) / 36e5;

  let nextMarkup = false;
  if (diffHours < 24) {
    nextMarkup =
      <small className={styles.upcoming}>
        <Countdown date={airDate} renderer={renderTimer} />
      </small>
  } else {
    nextMarkup =
    <small className={styles.upcoming}>
      {new Intl.DateTimeFormat('nb-NO', {  weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' } ).format(airDate)}
    </small>
  }

  return nextMarkup
}

const Stream = ({ stream, status })  => {
  const { _id, title, slug, poster, streamDate } = stream;

  return (
    <div key={_id} className={styles.item}>
      <Link href="/stream/[slug]" as={`/stream/${slug.current}`}>
        <a>
          {poster && <img src={urlFor(poster).width(350).height(197).url()} alt={`Skjermbilde av ${title}`} loading="lazy" />}
          <h3>{title}</h3>
          <small>{new Intl.DateTimeFormat('nb-NO', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'} ).format(new Date(streamDate))}</small>
          {status === 'Neste ut' && renderNextLabel(streamDate)}
        </a>
      </Link>
    </div>
  )
};

export default Stream;
