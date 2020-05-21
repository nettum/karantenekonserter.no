import getVideoId from 'get-video-id';

import styles from './video.module.css'

const VimeoVideo = props => {

  const vimeo = getVideoId(props.url);

  return (vimeo ?
    <div className={styles.container}>
      <iframe
        src={`https://player.vimeo.com/video/${vimeo.id}?color=9abcc3`}
        frameborder="0"
        className={styles.iframe}
        allow="autoplay; fullscreen"
        allowfullscreen>
      </iframe>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  : null)
};

export default VimeoVideo;
