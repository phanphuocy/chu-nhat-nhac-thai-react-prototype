import React, { Fragment } from "react";
import { connect } from "react-redux";
import Media from "react-media";
import SEO from "../components/SEO";
import ArtistGroup from "../components/Artist/ArtistGroup";
import { useTrail, animated } from "react-spring";

const ArtistsPage = ({ allIds, byIds }) => {
  const trail = useTrail(allIds.length, {
    to: { opacity: 1, transform: `translate3d(0px,0,0)` },
    from: {
      position: "relative",
      opacity: 0,
      transform: `translate3d(0px,40px,0)`,
    },
  });

  return (
    <div style={{ marginTop: "2rem" }}>
      <h1 style={{ display: "none" }}>
        Nghệ Sĩ Thái Lan Nào Hát Lên Tâm Hồn Của Bạn?
      </h1>
      <SEO
        title="Danh Sách Nghệ Sĩ Thái Lan"
        description="Nghệ Sĩ Thái Lan Nào Hát Lên Tâm Hồn Của Bạn? Tìm Hiểu Thêm Ngay Nhé! :*"
        ogUrl={`${process.env.REACT_APP_WEBSITE_URL}/artists`}
        ogTitle="50+ Nghệ Sĩ Thái Lan, Với Đủ Thể Loại Nhạc Bạn Yêu Thích"
      />
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
            columns = 7;
          }
          return (
            <Fragment>
              {trail.map((props, key) => (
                <animated.div style={props} key={key}>
                  <ArtistGroup
                    key={allIds[key]}
                    columns={columns}
                    id={allIds[key]}
                  />
                </animated.div>
              ))}
            </Fragment>
          );
        }}
      </Media>
      <div className="dummyheight" style={{ height: "20rem" }}></div>
    </div>
  );
};

function mapStateToPageProps({ data }) {
  return {
    allIds: data.artistGroups.allIds,
    byIds: data.artistGroups.byIds,
  };
}
export default connect(mapStateToPageProps, {})(ArtistsPage);
