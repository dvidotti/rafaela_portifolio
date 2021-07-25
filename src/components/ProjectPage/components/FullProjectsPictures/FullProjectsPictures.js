import React from "react";

import "./FullProjectsPictures.css";

const FullProjectPictures = (props) => {
  console.log("FULLLLLLLLL", props)
  const imagesList = props.project.module.images;

  return ( 
    <section ref={props.refProp} className="full-pictures-container">
      {imagesList.map((img, idx) => {
        return (
          <div className="full-pict-box"key={idx}>
            {img.media_type === "image" ? 
              <img className="full-img" src={img[process.env.REACT_APP_IMAGE_USED]} alt={img.alt}/>
            : img.media_type === "video" ?
              <video autoPlay muted loop className="full-img" src={img[process.env.REACT_APP_IMAGE_USED]} alt={img.alt}/>
            : null
            }
          </div>
        )
      })}
    </section>
  )
}

export default FullProjectPictures;