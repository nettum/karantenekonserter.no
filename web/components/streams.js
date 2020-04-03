import { useState } from 'react';

import Stream from './stream';
import styles from './streams.module.css';

const Streams = props => {
  const { status } = props;
  const [query, setSearchQuery] = useState('');
  console.log(query);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
        {status === 'Arkiv' && <input type="text" placeholder="Søk" value={query} onChange={handleSearch} />}
      </div>
      <div className={styles.streams}>
        {streams.map(stream => <Stream stream={stream} status={status} />)}
      </div>
    </section>
  );
};

export default Streams;
