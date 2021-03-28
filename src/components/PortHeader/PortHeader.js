import React from "react";

import "./PortHeader.css"


const PortHeader = () => {

  return (
    <section className="portfolio-big-window">
      <div className="frame-container">
        <img className="image-big-portfolio" src="imgs/Caellum_cover.png" alt="Caellum Cover"/>
      </div>
      <div className="control-container">
        <div className="box1">
          <div>Caelum _ Branding & Design</div>
        </div>
        <div className="box2">
          <div>Expor Revestir</div> 
        </div>
        <div className="box3">
          <div>Raison Pure</div>
        </div>
      </div>
    </section>
  )
}

export default PortHeader;