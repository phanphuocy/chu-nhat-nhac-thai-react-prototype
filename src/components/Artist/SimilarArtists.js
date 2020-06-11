import React from "react";
import Client from "../../contentful";
import orderBy from "lodash.orderby";
import Media from "react-media";
import Slider from "../Slider";
import ArtistCard from "./ArtistCard";

// const fetchData = async (tags) => {
//     var artists = [];
//     tags.forEach(async (tag) => {
//       const res = await connectToServer(tag);
//       console.log(`BEGIN GET SIMILAR ARTISTS FOR TAG ${tag}`);
//       if (res.total > 0) {
//         res.items.forEach((item) => {
//           if (artists.indexOf(item.fields.slug) >= 0) {
//             console.log("existed");
//           } else {
//             artists.push(item.fields.slug);
//           }
//         });
//       } else {
//         console.log(`No Results Found For ${tag}`);
//       }
//     });
//     console.log(Object.keys(artists));
//     setSimilarArtists(artists);
//   };
//   fetchData(tags);

function fetchArtists(tag) {
  return Client.getEntries({ query: tag, content_type: "artists" }).then(
    (res) => {
      if (res.total > 0) {
        return res.items.map((item) => item.fields.slug);
      }
    }
  );
}

function mergeArrays(array, exclude) {
  var result = [];

  array.forEach((item) => {
    if (result.indexOf(item) <= 0) {
      result.push(item);
    } else {
      result.splice(result.indexOf(item), 1);
      result.unshift(item);
    }
  });
  if (result.indexOf(exclude) >= 0) {
    result.splice(result.indexOf(exclude), 1);
  }

  return result.slice(0, 10);
}

const SimilarArtists = ({ similar }) => {
  return (
    <Media
      queries={{
        small: "(max-width: 639px)",
        medium: "(min-width: 640px) and (max-width: 959px)",
        large: "(min-width: 960px) and (max-width: 1279px)",
        extraLarge: "(min-width: 1280px)",
      }}
    >
      {(matches) => {
        var columns = 2;
        if (matches.medium) {
          columns = 4;
        }
        if (matches.large) {
          columns = 5;
        }
        if (matches.extraLarge) {
          columns = 5;
        }
        return (
          <Slider columns={columns} length={similar.length} height={300}>
            {similar.map((item, i) => (
              <ArtistCard key={item} id={item} />
            ))}
          </Slider>
        );
      }}
    </Media>
  );
};

export default SimilarArtists;
