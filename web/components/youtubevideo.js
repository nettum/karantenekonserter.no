import getYouTubeID from 'get-youtube-id';

import styles from './youtubevideo.module.css'

const YoutubeVideo = props => {

  const youtubeId = getYouTubeID(props.url);

  return (youtubeId ?
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        width="1024"
        height="576"
        className={styles.iframe}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
  : null)
};

export default YoutubeVideo;
