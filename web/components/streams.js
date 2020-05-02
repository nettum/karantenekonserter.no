import { useState } from 'react';

import Stream from './stream';
import styles from './streams.module.css';

const Streams = props => {
  const { status, limit, streams } = props;
  const [offset, loadMore] = useState(limit);
  const filteredStreams = offset !== null ?  props.streams.slice(0, offset) : props.streams;

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionheader}>
        <h2>{status} <small>({streams.length})</small></h2>
      </div>
      <div className={styles.streams}>
        {filteredStreams.map(stream => <Stream key={stream._id} stream={stream} status={status} />)}
      </div>
      {offset && filteredStreams.length < streams.length &&
        <button className={styles.loadmore} onClick={() => loadMore(offset + offset)}>Last flere</button>}
    </section>
  );
};

export default Streams;
