import { useState, useRef } from 'react';

import Stream from './stream';
import styles from './streams.module.css';

const Streams = props => {
  const { status } = props;
  const [query, setSearchQuery] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleFocus = (e) => {
    searchInput.current.scrollIntoView({behavior: 'smooth'});
  }

  const streams = !query ?
    props.streams :
    props.streams.filter(stream =>
      stream.title.toLowerCase().includes(query.toLocaleLowerCase()
    )
  );

  return (
    <section>
      <div className={styles.sectionheader}>
        <h2>{status} <small>({streams.length})</small></h2>
        {status === 'Arkiv' && <input ref={searchInput} type="text" placeholder="Søk" value={query} onChange={handleSearch} onFocus={handleFocus} />}
      </div>
      <div className={styles.streams}>
        {streams.map(stream => <Stream key={stream._id} stream={stream} status={status} />)}
      </div>
    </section>
  );
};

export default Streams;
