import styles from './youtubevideo.module.css'

const YoutubeVideo = props => (
  <div className={styles.container}>
    <iframe
      src={props.url}
      width="1024"
      height="576"
      className={styles.iframe}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen>
    </iframe>
  </div>
);

export default YoutubeVideo;
