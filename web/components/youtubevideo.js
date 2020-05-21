import getVideoId from 'get-video-id';

import styles from './video.module.css'

const YoutubeVideo = props => {

  const youtube = getVideoId(props.url);

  return (youtube ?
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtube.id}`}
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
