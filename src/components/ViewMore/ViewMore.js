import React from "react"

import "./ViewMore.css";

const ViewMore = (props) => {

  return (
    <div style={{paddingLeft: "10px", paddingBottom: "40px"}}>
      <div 
        onClick={(e) => props.openSide(e)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-end",
          width: "18%"
        }}
        >
        <div>
          <img className="view-more-arrow" src="imgs/rv_icon_direction_left.svg"/>
        </div>
        <div 
          style={{
            paddingLeft: "8px",
            paddingBottom: "3px"
          }}
          >view more projects
        </div>
      </div>
    </div>
  )
}

export default ViewMore;

