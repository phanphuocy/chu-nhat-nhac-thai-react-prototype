import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

const LyricsBox = ({ text }) => {
  useEffect(() => console.log("CHANGED"), [text]);
  const transitions = useTransition(text, null, {
    from: {
      position: "absolute",
      transform: "translate3d(0,-40px,0)",
      opacity: 0,
    },
    enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
    leave: { transform: "translate3d(0,40px,0)", opacity: 0 },
  });
  return (
    <StyledLyricsBox>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="lyricsWrapper">
          <p>{item}</p>
        </animated.div>
      ))}
    </StyledLyricsBox>
  );
};

const DynamicLyricsComp = ({ song }) => {
  const [displayLyrics, setDisplayLyrics] = useState("");
  const url = `https://www.youtube.com/watch?v=${song.url}`;

  const timestamp = JSON.parse(song.timestamp);

  if (!song) {
    return <p>ERROR</p>;
  }

  function findAndReplaceLyrics(playedSeconds) {
    var playedMs = Math.floor(playedSeconds * 1000);
    for (var i = 0; i < timestamp.length; i++) {
      if (playedMs > timestamp[i].start && playedMs < timestamp[i].end) {
        setDisplayLyrics(timestamp[i].text);
        break;
      } else if (
        i === timestamp.length - 1 &&
        (playedMs < timestamp[i].start || playedMs > timestamp[i].end)
      ) {
        setDisplayLyrics("");
      }
    }
  }
  //0.4625
  return (
    <ControlHeight>
      <div className="maxWidth">
        <ReactPlayer
          className="player"
          url={url}
          width="100%"
          height="100%"
          controls
          playing
          progressInterval={500}
          onReady={() => console.log("onReady")}
          onStart={() => console.log("onStart")}
          onPlay={() => console.log("onPlay")}
          onPause={() => console.log("onPause")}
          onBuffer={() => console.log("onBuffer")}
          onEnded={() => console.log("onEnded")}
          onError={() => console.log("onError")}
          onProgress={(e) => findAndReplaceLyrics(e.playedSeconds)}
          onDuration={() => console.log("onDuration")}
          config={{
            youtube: {
              playerVars: {
                cc_load_policy: 0,
              },
            },
          }}
        />
        <LyricsBox className="lyrics" text={displayLyrics} />
      </div>
    </ControlHeight>
  );
};

const ControlHeight = styled.div`
  height: 70vh;
  background-color: black;
  width: 100vw;
  position: relative;

  .player {
    flex-basis: 65%;
    height: 70%;
  }

  .lyrics {
  }

  .maxWidth {
    max-width: 1600px;
    height: 100%;
    width: 100vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    height: 90vh;
  }
`;

const StyledLyricsBox = styled.div`
  flex-basis: 35%;
  min-height: 5rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;

  position: relative;
  flex-wrap: wrap;

  .lyricsWrapper {
    padding: 2rem 1rem;
  }

  p {
    width: 100%;
    text-align: center;
    vertical-align: center;
    font-family: ${(props) => props.theme.fonts.serif};
    font-size: ${(props) => props.theme.fontSizes["base"]};
    background: linear-gradient(
      0deg,
      rgba(248, 91, 124, 1) 0%,
      rgba(244, 140, 124, 1) 100%
    );
    text-shadow: 1px 1px 2px #f85b7c;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: 768px) {
    min-height: 10rem;
    .lyricsWrapper {
      padding: 4rem 2rem;
    }
    p {
      font-size: ${(props) => props.theme.fontSizes["xl"]};
    }
  }
`;
export default DynamicLyricsComp;
