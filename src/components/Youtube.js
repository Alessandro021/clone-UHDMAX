import React from 'react';
import { WebView } from 'react-native-webview';

const CustomYouTubePlayer = ({ videoId }) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body, html, #player {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        <div id="player"></div>
        <script>
          var tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
              videoId: '${videoId}',
              playerVars: {
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                cc_load_policy: 0,
                enablejsapi: 0,
              },
              events: {
                onReady: onPlayerReady
              }
            });
          }

          function onPlayerReady(event) {
            event.target.playVideo();
          }
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      source={{ html }}
      style={{ flex: 1}}
      allowsInlineMediaPlayback={true}
    />
  );
};

export default CustomYouTubePlayer;