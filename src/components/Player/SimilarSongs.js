import React, { useEffect, useState } from "react";
import Client from "../../contentful";

const SimilarSongs = () => {
  const [similarSongs, setSimilarSongs] = useState([]);
  useEffect(() => {
    Client.getEntries({ query: "fun dancing" }).then((response) =>
      console.log(response)
    );
  }, []);
  return (
    <div>
      {similarSongs.length <= 0 && <h1>NO SONGS</h1>}
      <p>Similar Songs</p>
    </div>
  );
};

export default SimilarSongs;
