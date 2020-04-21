import React, { useState } from "react";
import YouTubePlayer from "react-player/lib/players/YouTube";
import styled from "styled-components";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import RatioBoundingBox from "./RatioBoundingBox";

const Comp = styled.div`
  display: flex;
  background-color: #111;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    height: 47rem;
  }
`;

const LyricsBox = styled.div`
  background-color: #111;

  display: flex;
  flex-direction: column;
  .header {
    padding: 0.5rem 1rem;
    border-bottom: 2px solid #232323;

    .header-text {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    flex-basis: 20rem;
  }

  @media (min-width: 1600px) {
    flex-basis: 25rem;
  }
`;

const PlayerComp = ({ currentSong }) => {
  const { url, lyricsAll } = currentSong.fields;

  var [urlState, setUrlState] = useState(null);

  // `https://www.youtube.com/watch?v=${url}`;

  function onReadyHandler() {
    console.log(`Ready, setting https://www.youtube.com/watch?v=${url}`);
    setUrlState(`https://www.youtube.com/watch?v=${url}`);
  }

  return (
    <Comp>
      <RatioBoundingBox ratio={0.4625}>
        <YouTubePlayer
          url={`https://www.youtube.com/watch?v=${url}`}
          width="100%"
          height="100%"
          controls
          muted
          onReady={() => onReadyHandler()}
          onStart={() => console.log("onStart")}
          onPlay={() => console.log("onPlay")}
          onPause={() => console.log("onPause")}
          onBuffer={() => console.log("onBuffer")}
          onEnded={() => console.log("onEnded")}
          onError={() => console.log("onError")}
          onProgress={() => console.log("onProgress")}
          onDuration={() => console.log("onDuration")}
        />
      </RatioBoundingBox>
      <LyricsBox>
        <div className="header">
          <h3 className="header-text">Lyrics</h3>
        </div>
        <LyricsRender>{documentToReactComponents(lyricsAll)}</LyricsRender>
      </LyricsBox>
    </Comp>
  );
};

const LyricsRender = styled.div`
  padding: 1rem;
  height: 100%;
  overflow-y: scroll;

  p {
    line-height: 140%;
    margin-bottom: 0.5rem;
  }
`;

export default PlayerComp;
