import Router from 'next/router'
import { useState, useEffect } from 'react';

import { getConcepts, getStreams } from '../utils/apiHelper';
import Streams from './../components/streams';
import styles from './index.module.css';

const Index = (props) => {
  const { concepts, } = props;
  const [search, setSearchQuery] = useState(props.search);
  const [concept, setConcept] = useState(props.concept);
  const [streams, setStreams] = useState(props.streams);

  let { upcoming, streaming, archive } = streams;

  useEffect(() => {
    const updateStreams = async () => {
      console.log('search effect');
      setStreams(await getStreams(concept, search))
    }
    if (concept !== props.concept || search !== props.search) {
      updateStreams();
    }

  }, [concept, search]);

  const handleSearch = (e) => {
    const searchParam = e.target.value || null;
    setSearchQuery(searchParam);
    let query = searchParam ? { search: searchParam } : {};
    if (concept) {
      query.concept = concept;
    }
    Router.push({
      pathname: '/',
      query: query,
    });
  }

  const handleConcept = (e) => {
    const conceptParam = e.target.value || null;
    setConcept(conceptParam);
    let query = conceptParam ? { concept: conceptParam } : {};
    if (search) {
      query.search = search;
    }
    Router.push({
      pathname: '/',
      query: query,
    });
  }

  return (
    <div className={styles.main}>
      <form>
        <select name="concept" onChange={handleConcept} value={concept}>
          <option value="">Filtrer på konsept/scene...</option>
            {concepts.map(concept =>
              <option key={concept.slug} value={concept.slug}>{concept.title}</option>
            )}
        </select>
        <input
          name="search"
          type="text"
          placeholder="Søk"
          value={search}
          onChange={handleSearch}
        />
      </form>
      {streaming.length > 0 && <Streams streams={streaming} status='Strømmes nå' />}
      {upcoming.length > 0 && <Streams streams={upcoming} status='Neste ut' limit={8} />}
      {archive.length > 0 && <Streams streams={archive} status='Arkiv' limit={52} />}
    </div>
  )
};

export async function getServerSideProps(context) {
  const { concept = null, search = null } = context.query;
  const concepts = await getConcepts();
  const streams = await getStreams(concept, search);

  return { props: { streams, concepts, concept, search } };
};

export default Index;
