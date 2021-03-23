import React, {useState} from "react"

import "../../Home/Home.css"

import {aboutInfo} from "../../../data/about"

const AboutInfo = () => {

  return (
    <div className="about-info-container">
      <div className="about-title">Summary</div>
      <div className="description-box">{aboutInfo.bio}</div>
      <div className="image-box">
        <img src={aboutInfo.img_link} alt={aboutInfo.alt}></img>
      </div>
    </div>
  )
}

export default AboutInfo;

