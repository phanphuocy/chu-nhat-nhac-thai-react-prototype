import React, { useState } from "react";
import styled from "styled-components";
import BoundingBox from "./BoundingBox";
import { connect } from "react-redux";
import { useTransition, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Image = styled.div`
  position: relative;
  top:  -5%;
  left:0;
    height: 110%;
    width: 100%;
    @media (min-width: 640px) {
      width: 200%;
    } 
    background-color: gray;
    background-image: ${(props) => `url(${props.url})`};
    background-size:cover;
    filter: blur(8px) brightness(75%);
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
    overflow: hidden;
    cursor: pointer;
    .card {
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
          color: ${(props) => props.theme.colors.onBackground};
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
    }
    .content {
        grid-area: content;
        padding: 2rem 1rem;

        p {
            color: ${(props) => props.theme.colors.onBackground};
            line-height: 1.4rem;
        }
    }
    .action {
        align-self: flex-start;
        padding-left: 1rem;
        grid-area: action;

        button {
            border:1px solid   ${(props) => props.theme.colors.onBackground};;
            background: transparent;
            padding: 1rem;
            color: ${(props) => props.theme.colors.onBackground};
            z-index: 100;
        }
    }

    @media (min-width: 768px) {
        .content {
            padding: 2rem 8rem;
        } 
        .card {
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 100px auto 1fr;
        grid-template-areas: 
            "title image"
            "action image"
            "content image";
    }
        .image {
          max-height: 100%;
            .main-image {
                right: 3rem;
                width: 250px;
                height: 250px;
                top: calc(50% - 125px);
            }
        }
        .content {
            padding: 1rem 1rem 2rem;          
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
    leave: { display: "none" },
  });
  const bind = useDrag(({ down, distance, cancel, swipe, tap }) => {
    if (tap || swipe[0] !== 0) {
      onClickHandler();
    }
  });

  return (
    <StyledFeaturedBanner>
      <BoundingBox maxwidth={960}>
        {transitions.map(({ item, props, key }) => (
          <animated.div {...bind()} key={key} style={{ ...props }}>
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
      </BoundingBox>
    </StyledFeaturedBanner>
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
