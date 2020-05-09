import React, { useState } from "react";
import styled from "styled-components";
import BoundingBox from "./BoundingBox";
import { connect } from "react-redux";
import { useTransition, animated } from "react-spring";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Image = styled.div`
    height: 100%;
    background-color: gray;
    background-image: ${(props) => `url(${props.url})`};
    filter: blur(8px);
`;

const GradientFilter = styled.div`
    position: absolute;
    background: ${(props) =>
      `linear-gradient(90deg, ${props.theme.colors.background} 0%, rgba(0,0,0,0) 100%)`} ;
    top: -1rem;
    left: -2rem;
    height: 120%;
    width: 36%;

`;

const StyledFeaturedBanner = styled.div`
    position: relative;
    cursor: pointer;
    .card {
        overflow: hidden;   
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 100px 100px 1fr;
        grid-template-areas: 
            "title image"
            "action image"
            "content content";
    }
    .image {z-index: -100;
        grid-area: image;
        position: relative;
        max-height: 200px;
        
        
        .main-image {
            width: 150px;
            height: 150px;
            position: absolute;
            top: 25px;
            right: 2rem;
            object-fit: cover;
            object-position: center;
        }
    }
    .title {
        align-self: flex-end;
        padding-left: 1rem;
        grid-area: title;
        h4 {
            color: ${(props) => props.theme.colors.primary};
            margin: 0.5rem 0;
        }
        h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
    }
    .content {
        grid-area: content;
        padding: 2rem 1rem;

        p {
            color: lightgray;
            line-height: 1.4rem;
        }
    }
    .action {
        align-self: flex-start;
        padding-left: 1rem;
        grid-area: action;

        button {
            border:1px solid white;
            background: transparent;
            padding: 1rem;
            color: white;
            z-index: 100;
        }
    }

    @media (min-width: 768px) {
        .content {
            padding: 2rem 8rem;
        }
        .image {
            .main-image {
                right: 3rem;
            }
        }
        
    }
  
`;

const FeaturedBanner = ({ allIds, posts }) => {
  const [index, set] = useState(0);
  function onClickHandler() {
    set((state) => (state + 1) % posts.length);
  }
  const transitions = useTransition(index, (post) => post, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)", display: "none" },
  });
  return (
    <BoundingBox maxwidth={1280}>
      <StyledFeaturedBanner i={posts.length} onClick={onClickHandler}>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={{ ...props }}>
            <div className="card">
              <div className="title">
                <h4>{posts[item].category}</h4>
                <h3>{posts[item].identifier}</h3>
              </div>
              <div className="content">
                <p>{posts[item].body}</p>
              </div>
              <div className="action">
                <button>Play</button>
              </div>
              <div className="image">
                <Image url={posts[item].image && posts[item].image.url}></Image>
                <GradientFilter></GradientFilter>
                <img
                  className="main-image"
                  src={posts[item].image && posts[item].image.url}
                  alt="aa"
                />
              </div>
            </div>
          </animated.div>
        ))}
      </StyledFeaturedBanner>
    </BoundingBox>
  );
};

function getFeaturedPosts(data, ids) {
  const firstThreeIds = ids.slice(0, 3);
  const posts = [];
  firstThreeIds.forEach((id) => {
    posts.push(data.news.byIds[id]);
  });
  return posts;
}

function mapStateToProps({ data }) {
  return {
    allIds: data.news.allIds,
    posts: getFeaturedPosts(data, data.news.allIds),
  };
}

export default connect(mapStateToProps)(FeaturedBanner);
