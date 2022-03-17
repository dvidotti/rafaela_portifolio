import React from "react";
import { useGetRendersHelper } from "hooks/useGetRendersHelper";


import "./ProjectHeader.css";

const ProjectHeader = React.memo(({ component, scrollTo, refProp }) => {
  // useGetRendersHelper()

  return ( 
    <section className="project-header">
      <div className="project-header-content">
        <div className="project-header-top-container">
          <h2 className="project-title">{component.module.title}</h2>
          <p className="project-header-description">{component.module.description}</p>
        </div>
        <div className="tech-details-container">
          <div className="areas-container">
            {component.module.areas.map((area, idx) => 
              <div key={idx}>{area[idx]}</div>
            )}
          </div>
          <div className="local-date-container">
            <div className="local">
              {component.module.local}
            </div>
            <div className="div-line"></div>
            <div className="date">
              {component.module.date}
            </div>
          </div>
        </div>
        <div className="project-header-lower-container">
          <div className="partnership-box">
            <div className="partnership-text">Partnership with:</div>
            <div className="partnership-text">{component.module.partnership}</div>
          </div>
          <div className="arrow-box">
            <span className="cursor-pointer" onClick={() => scrollTo(refProp)}>
              <img className="arrow-image" src="/imgs/rv_icon_direction_down.svg" alt="Arrow Down"/>       
            </span>
          </div>
        </div>
      </div>
      <div className="project-header-image-box">
        {component.module.headImg ? 
          <img className="project-header-image" src={component.module.headImg[process.env.REACT_APP_IMAGE_USED]}/>
          :
          <img className="project-header-image" src='/imgs/default_media_image.png' alt="default image"/>
        }
      </div>
    </section>
  )
})

export default ProjectHeader;