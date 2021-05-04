import React from "react";

import "./FullProjectsPictures.css";

const FullProjectPictures = (props) => {
  const imagesList = props.project;

  return ( 
    <section ref={props.refProp} className="full-pictures-container">
      {imagesList.images.map((img, idx) => {
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