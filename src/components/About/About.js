import React, {useState} from "react"

import {aboutInfo} from "../../data/about.js"
import "./About.css"

const About = () => {
  let [openEducation , handleEducation] = useState(false)
  let [openSkilled , handleSkilled] = useState(false)
  let [openMarketplace , handleMarketplace] = useState(false)


  return (
     <div className="about-info-container">
      <div className="about-title">Summary</div>
      <div className="description-box">{aboutInfo.bio}</div>
      <div className="summary-box">
        <div className="summary-item-box">
          <div onClick={() => handleEducation(!openEducation)}  className="summary-item-title">
            <span className="summary-item-title-text" >Education</span>
          </div>
          {openEducation &&
            <div className="summary-item-list">
              <div className="summary-subitem-box">
                <span>BA Graphic Design</span>
              </div>
              <div className="summary-subitem-box">
                <span>MA Visual Identity</span>
              </div>
              <div className="summary-subitem-box">
                <div className="">
                  <span>Interface Design</span>
                </div>
                <div >
                  <span>ServiceDesign</span>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="summary-item-box">
          <div onClick={() => handleSkilled(!openSkilled)} className="summary-item-title">
            <span className="summary-item-text">Skilled</span>
          </div>
          {openSkilled &&
            <div className="summary-item-list">
              <div className="summary-subitem-box">
                <span>Brand Design</span>
              </div>
              <div className="summary-subitem-box">
                <span>User Experience</span>
              </div>
              <div className="summary-subitem-box">
                <div className="">
                  <span>Strategy</span>
                </div>
                <div >
                  <span>Visual Design</span>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="summary-item-box">
          <div 
            className="summary-item-title"
            onClick={() => handleMarketplace(!openMarketplace)}
            >
            <span  className="summary-item-text">Marketplace</span>
          </div>
          {openMarketplace &&
            <div className="summary-item-list">
              <div className="summary-subitem-box">
                <span>BA Graphic Design</span>
              </div>
              <div className="summary-subitem-box">
                <span>MA Visual Identity</span>
              </div>
              <div className="summary-subitem-box">
                <div className="">
                  <span>Interface Design</span>
                </div>
                <div >
                  <span>ServiceDesign</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="image-box">
        <img className="image-about"src={aboutInfo.img_link} alt={aboutInfo.alt}></img>
      </div>
    </div>
  )
}

export default About;