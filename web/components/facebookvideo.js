import styles from './facebookvideo.module.css'

const FacebookVideo = props => (
  <div className={styles.container}>
    <iframe
      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(props.url)}%2F&width=1024&show_text=false&height=576`}
      width="1024"
      height="576"
      className={styles.iframe}
      scrolling="no"
      frameBorder="0"
      allowTransparency="true"
      allow="encrypted-media"
      allowFullScreen>
    </iframe>
  </div>
);

export default FacebookVideo;
