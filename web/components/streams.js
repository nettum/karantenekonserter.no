import { useState, useRef } from 'react';

import Stream from './stream';
import styles from './streams.module.css';

const Streams = props => {
  const { status, limit, streams } = props;
  const [query, setSearchQuery] = useState('');
  const [offset, loadMore] = useState(limit);
  const searchInput = useRef(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleFocus = (e) => {
    searchInput.current.scrollIntoView({behavior: 'smooth'});
  }

  let filteredStreams = [];
  if (query) {
    filteredStreams = props.streams.filter(stream =>
      stream.title.toLowerCase().includes(query.toLocaleLowerCase())
    )
  } else {
    filteredStreams = limit !== null ?  props.streams.slice(0, offset) : props.streams;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionheader}>
        <h2>{status} <small>({!query ? streams.length : filteredStreams.length})</small></h2>
        {status === 'Arkiv' && <input ref={searchInput} type="text" placeholder="Søk" value={query} onChange={handleSearch} onFocus={handleFocus} />}
      </div>
      <div className={styles.streams}>
        {filteredStreams.map(stream => <Stream key={stream._id} stream={stream} status={status} />)}
      </div>
      {offset && !query &&  (filteredStreams.length < streams.length) && <button className={styles.loadmore} onClick={() => loadMore(offset + offset)}>Last flere</button>}
    </section>
  );
};

export default Streams;
