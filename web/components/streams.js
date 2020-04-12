import { useState, useRef } from 'react';

import Stream from './stream';
import styles from './streams.module.css';

const Streams = props => {
  const { status, limit, streams, concepts, showFilters } = props;
  const [query, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [offset, loadMore] = useState(limit);
  const searchInput = useRef(null);

  const handleFilter = (e) => {
    setSearchQuery('');
    setFilter(e.target.value);
  }

  const handleSearch = (e) => {
    setFilter('');
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
  } else if (filter) {
    filteredStreams = props.streams.filter(stream => {
      if (!stream.organizer) {
        return false;
      }
      return stream.organizer.some(org => org.slug === filter)
    })
  } else {
    filteredStreams = offset !== null ?  props.streams.slice(0, offset) : props.streams;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionheader}>
        <h2>{status} <small>({(!query && !filter) ? streams.length : filteredStreams.length})</small></h2>
        {showFilters &&
          <div>
            <select name="concept" onChange={handleFilter} value={filter}>
              <option value="">Filtrer på konsept/scene...</option>
                {concepts.map(concept =>
                  <option key={concept.slug} value={concept.slug}>{concept.title}</option>
                )}
            </select>
            <input
              ref={searchInput}
              name="search"
              type="text"
              placeholder="Søk"
              value={query}
              onChange={handleSearch}
              onFocus={handleFocus}
            />
          </div>}
      </div>
      <div className={styles.streams}>
        {filteredStreams.map(stream => <Stream key={stream._id} stream={stream} status={status} />)}
      </div>
      {offset && !query && !filter && (filteredStreams.length < streams.length) &&
        <button className={styles.loadmore} onClick={() => loadMore(offset + offset)}>Last flere</button>}
    </section>
  );
};

export default Streams;
