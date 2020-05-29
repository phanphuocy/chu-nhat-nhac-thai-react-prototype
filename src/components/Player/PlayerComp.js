import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import RatioBoundingBox from "../RatioBoundingBox";
import { useTransition, animated } from "react-spring";
import Button from "../Button";
import Media from "react-media";

// Import custom components
import TabGroup from "../styled-components/TabGroup";

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

  const input =
    "(*) \nยิ้มก็พอ เพียงเท่านั้น อย่าต่อรองได้ไหม\nYim gor por piang tao nun yah dtor raung dai mai\n\nรับมันไป ความใส่ใจ ที่เอามาให้กัน\nRup mun bpai kwahm sai jai tee ao mah hai gun\n\nไม่ขออะไรตอบฉันไม่เคยต้องการ\nMai kor arai dtaup chun mai koey dtaung gahn\n\nไม่มีข้อแม้ ฉันการันตี\nMai mee kor mae chun gahrundtee\n\nไม่เคยผูดมัด ไม่เคยเซ้าซี้\nMai koey poot mut mai koey sao see\n\nแค่อยากทำอย่างนี้ มันก็เท่านั้นเอง\nYah yahk tum yahng nee mun gor tao nun eng\n\nไม่ต้องเกรงใจอะไรฉัน\nMai dtaung greng jai arai chun\n\n(*)\n\nเหมือนเป็นเหตุผล ที่ง่ายเกินไป\nMeuan bpen het pon tee ngai gern bpai\n\nเหมือนจะแอบแฝง ต้องการอะไร\nMeuan ja aep faeng dtaung gahn arai\n\nแต่ถ้าเธอเป็นฉัน มองจากมุมนี้ไป\nDtae tah tur bpen chun maung jahk moom nee bpai\n\nเธอจะรู้ว่ามันสุขใจ\nTur ja roo wah mun sook jai\n\n(*)\n\nฉันยินดีให้เธอ\nChun yin dee hai tur\n\nมอง มอง มองดูเธอมาตั้งแต่อนุบาล\nMaung maung maung doo tur mah dtung dtae anoobahn\n\nแอบส่งยิ้มให้เธอในทุกสถานการณ์\nAep song yim hai tur nai took satahngahn\n\nต่อให้เธอจะต้องแต่งงาน แต่ตัวฉันขึ้นคาน\nDtor hai tur ja dtaung dtaeng ngahn dtae dtua chun keun kahn\n\nความรักของฉันจะเป็น legend เป็นระดับตำนาน\nKwahm ruk kaung chun ja bpen legend bpen radup dtum nahn\n\nก็ขอแค่เพียงได้มอง ไม่หวังที่จะครอบครอง\nGor kor kae piang dai maung mai wung tee ja kraup kraung\n\nแค่นี้ก็เป็นความสุขของฉันที่ได้คอยมองเธอ\nKae nee gor bpen kwahm sook kaung chun tee dai koy maung tur\n\nยิ้มเบาเบาก็พอ เธออย่าทำหน้างอดิ\nYim bao bao gor por tur yah tum nah ngor di\n\nรอยยิ้มของเธอน่ะทำให้โลกนี้มีชีวิตดูสดใส\nRoy yim kaung tur na tum hai lohk nee mee cheewit doo sot sai\n\nฉันไม่เคยหวังให้เธอต้องมารัก\nChun mai koey wung hai tur dtaung mah ruk\n\nไม่ว่าวันไหนฉันพร้อมจะเป็นที่พัก\nMai wah wun nai chun praum ja bpen tee puk\n\nถ้าเธอเป็นฉัน มองอย่างที่ฉันมอง\nTah tur bpen chun maung yahng tee chun maung\n\nจะรู้ว่าเป็นสุข ที่ได้ทำอะไรอย่างนี้ให้เธอ\nJa roo wah bpen sook tee dai tum arai yahng nee hai tur\n\n(*)\n\nได้รักก็พอ เพียงเท่านั้น จากใจจริงของฉัน\nDai ruk gor por piang tao nun jahk jai jing kaung chun\n\nรับมันไป ความใส่ใจอยากแค่เพียงให้เธอ\nRup mun bpai kwahm sai jai yahk kae piang hai tur\n\nเท่านี้ก็ เกินพอ รักเธอไปทุกวัน\nTao nee gor gern por ruk tur bpai took wun\n\nรู้เพียงว่าพอแล้ว (มองเธออยู่ไกลไกลแค่นั้นก็พอ)\nRoo piang wah por laeo (maung tur yoo glai glai kae nun gor por)\n\nรับไปก็แล้วกัน (แม้โลกจะหมุนไปแต่ฉันยังรอ)\nRup bpai gor laeo gun (mae lohk ja moon bpai dtae chun yung ror)\n\nฉันยินดีให้เธอ (ไม่อยากจะพูดเยอะแค่เธอรู้ก็พอ)\nChun yin dee hai tur (mai yahk ja poot yur kae tur roo gor por)\n\nฉันยินดีให้เธอ\nChun yin dee hai tur\n\n";

  const langs = [
    {
      type: "lyricsTh",
      name: "Tiếng Thái",
    },
    {
      type: "lyricsEn",
      name: "Tiếng Anh",
    },
    {
      type: "lyricsVi",
      name: "Tiếng Việt",
    },
  ];

  function onReadyHandler() {
    // console.log(`Ready, setting https://www.youtube.com/watch?v=${url}`);
    // setUrlState(`https://www.youtube.com/watch?v=${url}`);
  }

  function onShowLyricsHandler() {
    switchLyricsVisibility();
  }

  return (
    <Comp>
      <RatioBoundingBox ratio={0.4625}>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          playing
          muted
          onReady={() => console.log("onReady")}
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
          <Media
            query="(max-width: 768px)"
            render={() => (
              <Button className="lyrics-toggle" onClickFx={onShowLyricsHandler}>
                {showLyrics ? "Ẩn Lời" : "Xem Lời Bài Hát"}
              </Button>
            )}
          />
        </div>
        <div className="content-wrapper">
          {transitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div className="content" key={key} style={props}>
                  <TabGroup>
                    {langs.map((button) => (
                      <button
                        className={lyricsLang === button.type ? "active" : ""}
                        onClick={() => switchLyricsLang(button.type)}
                      >
                        {button.name}
                      </button>
                    ))}
                  </TabGroup>
                  <LyricsRender>
                    {lyricsLang === "th" &&
                      song.lyricsTh.split("\n\n").map((paragraph) => (
                        <div style={{ marginBottom: "1.4rem" }}>
                          {paragraph.split("\n").map((line) => (
                            <ReactMarkdown source={line} />
                          ))}
                        </div>
                      ))}
                    {lyricsLang === "en" && <p>I will render English lyrics</p>}
                    {lyricsLang === "vi" && (
                      <p>I will render Vietnamese lyrics</p>
                    )}

                    {input.split("\n\n").map((paragraph) => (
                      <div style={{ marginBottom: "1.4rem" }}>
                        {paragraph.split("\n").map((line) => (
                          <ReactMarkdown source={line} />
                        ))}
                      </div>
                    ))}
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
