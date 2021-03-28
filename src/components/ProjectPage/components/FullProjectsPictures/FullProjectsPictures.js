import React from "react";

import "./FullProjectsPictures.css";

const FullProjectPictures = (props) => {
  const {project} = props;

  return ( 
    <section className="full-pictures-container">
      {project.images.map((img, idx) => {
        return (
          <div className="full-pict-box"key={idx}>
            <img className="full-img" src={img.link} alt={img.alt}/>
          </div>
        )
      })}
    </section>
  )
}

export default FullProjectPictures;