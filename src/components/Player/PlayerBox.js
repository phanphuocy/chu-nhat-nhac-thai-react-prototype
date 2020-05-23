import React from "react";
import RatioBoundingBox from "../RatioBoundingBoxx";
import ReactPlayer from "react-player";

const PlayerBox = ({ url }) => {
  return (
    <RatioBoundingBox ratio={0.4625} className="sticky">
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
  );
};

export default PlayerBox;
