import React from "react";
import BarLoader from "react-spinners/BarLoader";

const LoaderScreen = () => {
  return (
    <div>
      <BarLoader height={8} width={500} />
    </div>
  );
};

export default LoaderScreen;
