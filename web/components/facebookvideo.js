const containerStyle = {
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '56.25%',
};

const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  maxWidth: '1024px',
  maxHeight: '576px',
  border: 0,
  overflow: 'hidden',
  border: 'none',
};

const FacebookVideo = props => (
  <div style={containerStyle}>
    <iframe
      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(props.url)}%2F&width=1024&show_text=false&height=576`}
      width="1024"
      height="576"
      style={iframeStyle}
      scrolling="no"
      frameBorder="0"
      allowTransparency="true"
      allow="encrypted-media"
      allowFullScreen>
    </iframe>
  </div>
);

export default FacebookVideo;
