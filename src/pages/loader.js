import React from "react";
import BarLoader from "react-spinners/BarLoader";

const LoaderScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <BarLoader height={8} width={500} />
    </div>
  );
};

export default LoaderScreen;
