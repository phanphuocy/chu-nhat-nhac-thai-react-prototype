import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const SEO = ({
  title,
  description,
  ogTitle,
  ogType,
  ogUrl,
  ogImage,
  children,
}) => {
  console.log(useParams());

  return (
    <Helmet>
      <title>{`${title} || Chủ Nhật Nhạc Thái`}</title>
      <meta property="fb:app_id" content="885010941966639" />
      <meta name="description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
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
      {children}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SEO;
