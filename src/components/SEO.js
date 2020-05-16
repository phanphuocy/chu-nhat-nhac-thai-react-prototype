import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const SEO = ({ title, description, ogImage }) => {
  console.log(useParams());

  return (
    <Helmet>
      <title>{`${title} || Chủ Nhật Nhạc Thái`}</title>
      <meta name="description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage.url} />}
      {ogImage && (
        <meta property="og:image:type" content={ogImage.contentType} />
      )}
      {ogImage && (
        <meta property="og:image:width" content={ogImage.details.image.width} />
      )}
      {ogImage && (
        <meta
          property="og:image:height"
          content={ogImage.details.image.height}
        />
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SEO;
