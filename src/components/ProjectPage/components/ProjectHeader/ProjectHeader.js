import React from "react";


import "./ProjectHeader.css";

const ProjectHeader = (props) => {
  console.log("PROPS", props)
  const {project} = props;

  return ( 
    <section className="project-header">
      <div className="project-header-content">
        <div className="project-header-top-container">
          <h2 className="project-title">{props.project.module.title}</h2>
          <p className="project-header-description">{props.project.module.description}</p>
        </div>
        <div className="tech-details-container">
          <div className="areas-container">
            {project.module.areas.map((area, idx) => 
              <div key={idx}>{project.module.areas[idx]}</div>
            )}
          </div>
          <div className="local-date-container">
            <div className="local">
              {project.module.local}
            </div>
            <div className="div-line"></div>
            <div className="date">
              {project.module.date}
            </div>
          </div>
        </div>
        <div className="project-header-lower-container">
          <div className="partnership-box">
            <div className="partnership-text">Partnership with:</div>
            <div className="partnership-text">{project.module.partnership}</div>
          </div>
          <div className="arrow-box">
            <span className="cursor-pointer" onClick={() => props.scrollTo(props.refProp)}>
              <img className="arrow-image" src="/imgs/rv_icon_direction_down.svg" alt="Arrow Down"/>       
            </span>
          </div>
        </div>
      </div>
      <div className="project-header-image-box">
        {props.project.module.headImg ? 
          <img className="project-header-image" src={props.project.module.headImg[process.env.REACT_APP_IMAGE_USED]}/>
          :
          <img className="project-header-image" src='/imgs/default_media_image.png' alt="default image"/>
        }
      </div>
    </section>
  )
}

export default ProjectHeader;