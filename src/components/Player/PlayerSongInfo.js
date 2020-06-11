import React from "react";
import styled from "styled-components";
import Button from "../Button";
import ArtistBadge from "../Artist/ArtistBadge";
import { FacebookShareCount, FacebookShareButton } from "react-share";
import { RiShareLine } from "react-icons/ri";

const StyledPlayerSongInfo = styled.div`
  padding: 1rem;
  display: grid;
  column-gap: 1.5rem;
  row-gap: 1rem;
  grid-template-areas:
    "songInfo"
    "artistsInfo"
    "commenting"
    "sharing";

  .songInfo {
    grid-area: songInfo;

    h1 {
      font-size: 1.5rem;
      font-family: ${(props) => props.theme.fonts.serif};
      margin: 1rem 0;
    }
    .subtitle {
      color: ${(props) => props.theme.colors.gray["700"]};
    }
  }
  .artistsInfo {
    grid-area: artistsInfo;
    display: flex;
    flex-wrap: wrap;
  }
  .commenting {
    grid-area: commenting;
  }
  .sharing {
    grid-area: sharing;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    p {
      margin-bottom: 0.5rem;
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: auto 20rem;
    grid-template-areas:
      "artistsInfo artistsInfo"
      "songInfo sharing"
      "commenting sharing";

    .songInfo {
      h1 {
        font-size: 2rem;
      }
    }
  }
`;

const PlayerSongInfo = ({ song }) => {
  const {
    artists,
    titleEn,
    titleRo,
    titleTh,
    title,
    titleVi,
    slug,
    deungdutjaisNote,
  } = song;
  const shareUrl = `${process.env.REACT_APP_WEBSITE_URL}/p/${slug}`;
  return (
    <StyledPlayerSongInfo>
      <div className="artistsInfo">
        {artists.map((artistId) => (
          <ArtistBadge id={artistId} key={artistId} />
        ))}
      </div>
      <div className="songInfo">
        <h1>{title}</h1>
        <h5 className="subtitle">{`${titleTh} ${
          titleRo !== titleEn ? titleRo : ""
        }`}</h5>
      </div>

      <div className="commenting">
        {deungdutjaisNote && <p>{deungdutjaisNote}</p>}
      </div>
      <div className="sharing">
        <p>{`Bạn Thích Bài Hát '${title}' Hông? Nếu Vậy Hãy Share Cho Bạn Bè Cùng Xem Nhé!`}</p>
        <FacebookShareButton
          url={shareUrl}
          children={<ShareButton />}
          hashtag="#chunhatnhacthai"
        ></FacebookShareButton>
        <FacebookShareCount url={shareUrl}>
          {(shareCount) => (
            <span>{`${shareCount} người đã chia sẻ bài hát này`}</span>
          )}
        </FacebookShareCount>
      </div>
    </StyledPlayerSongInfo>
  );
};

const ShareButton = () => (
  <Button primary full label="Chia Sẻ">
    <RiShareLine />
  </Button>
);

export default PlayerSongInfo;
