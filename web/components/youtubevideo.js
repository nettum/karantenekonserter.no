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

const YoutubeVideo = props => (
  <div style={containerStyle}>
    <iframe
      src={props.url}
      width="1024"
      height="576"
      style={iframeStyle}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen>
    </iframe>
  </div>
);

export default YoutubeVideo;
