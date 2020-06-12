import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import RatioBoundingBox from "../RatioBoundingBox";
import { useTransition, animated } from "react-spring";
import Button from "../Button";
import Media from "react-media";

// Import REDUX
import { connect } from "react-redux";
import { switchLyricsVisibility } from "../../actions/interfaceActions";

const Comp = styled.div`
  display: flex;
  background-color: #111;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    height: 47rem;
  }

  .sticky {
    position: sticky;
    top: 0;
  }
`;

const LyricsBox = styled.div`
  background-color: #111;
  display: flex;
  height: 100%;
  flex-direction: column;

  .header {
    padding: 0.5rem 1rem;
    height: 3rem;
    border-bottom: 2px solid #232323;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-text {
      font-size: 1.2rem;
    }
  }

  .content-wrapper {
    height: calc(100% - 3rem);
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 1024px) {
    flex-basis: 20rem;
  }

  @media (min-width: 1600px) {
    flex-basis: 25rem;
  }
`;

const LyricsRender = styled.div`
  padding: 1rem;
  overflow-y: scroll;

  p {
    line-height: 140%;
  }
`;

const PlayerComp = ({
  song,
  songId,
  showLyrics,
  switchLyricsVisibility,
  lyricsLang,
  switchLyricsLang,
}) => {
  const url = `https://www.youtube.com/watch?v=${song.url}`;

  const transitions = useTransition(showLyrics, null, {
    from: {
      position: "relative",
      opacity: 0,
      transform: "translate3d(0,-40px,0)",
    },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
  });

  if (!song) {
    return <p>ERROR</p>;
  }

  function onShowLyricsHandler() {
    switchLyricsVisibility();
  }

  return (
    <Comp>
      <Media query={{ minWidth: 768 }}>
        {(matches) => (
          <RatioBoundingBox ratio={matches ? 0.4625 : 0.6}>
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              controls
              playing
              onReady={() => console.log("onReady")}
              onStart={() => console.log("onStart")}
              onPlay={() => console.log("onPlay")}
              onPause={() => console.log("onPause")}
              onBuffer={() => console.log("onBuffer")}
              onEnded={() => console.log("onEnded")}
              onError={() => console.log("onError")}
              onProgress={(e) => console.log(e)}
              onDuration={() => console.log("onDuration")}
            />
          </RatioBoundingBox>
        )}
      </Media>

      <LyricsBox>
        <div className="header">
          <span className="header-text">Lyrics</span>
          <Media
            query="(max-width: 768px)"
            render={() => (
              <Button className="lyrics-toggle" onClickFx={onShowLyricsHandler}>
                {showLyrics ? "Ẩn" : "Xem"}
              </Button>
            )}
          />
        </div>
        <div className="content-wrapper">
          {transitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div className="content" key={key} style={props}>
                  <LyricsRender>
                    {song.lyricsTh ? (
                      song.lyricsTh.split("\n\n").map((paragraph, i) => (
                        <div style={{ marginBottom: "1.4rem" }} key={i}>
                          {paragraph.split("\n").map((line, i) => (
                            <ReactMarkdown source={line} key={i} />
                          ))}
                        </div>
                      ))
                    ) : (
                      <p>NO Lyrics</p>
                    )}
                  </LyricsRender>
                </animated.div>
              )
          )}
        </div>
      </LyricsBox>
    </Comp>
  );
};

function mapStateToProps(state) {
  return {
    showLyrics: state.interface.showLyrics,
  };
}

export default connect(mapStateToProps, { switchLyricsVisibility })(PlayerComp);
