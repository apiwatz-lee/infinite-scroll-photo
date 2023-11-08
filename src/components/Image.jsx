import React from "react";

const Image = ({ photo }) => {
  return (
    <>
      <img
        src={photo.links.download}
        alt={photo.alt_description}
        className="w-4/6 m-4"
      />
    </>
  );
};

export default Image;
