import React from "react";

import "./DoublePicture.css";

const DoublePicture = (props) => {
  const {imageOne, imageTwo} = props.project.module;

  return ( 
    <section ref={props.refProp} className="full-pictures-container">
        <div className="picture-double-container">
          <div className="left-pict">
            <img className="full-img" src={imageOne[process.env.REACT_APP_IMAGE_USED]} alt={imageOne.alt}/>
          </div>
          <div className="right-pict">
            <img className="full-img" src={imageTwo[process.env.REACT_APP_IMAGE_USED]} alt={imageTwo.alt}/>
          </div>

        </div>
    </section>
  )
}

export default DoublePicture;