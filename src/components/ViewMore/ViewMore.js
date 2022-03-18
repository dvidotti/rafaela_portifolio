import React from "react"

import "./ViewMore.css";

const ViewMore = ({ openSide }) => {

  return (
    <div className="view-more-container">
      <div 
        className="view-more-inner-container"
        onClick={(e) => openSide(e)}
        >
        <div>
          <img className="view-more-arrow" src="imgs/rv_icon_direction_left.svg"/>
        </div>
        <div className="view-more-box">
          view more projects
        </div>
      </div>
    </div>
  )
}

export default ViewMore;

