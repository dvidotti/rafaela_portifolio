import React from "react";


import "./ProjectHeader.css";

const ProjectHeader = (props) => {
  const {project} = props;

  return ( 
    <section className="project-header">
      <div className="project-header-content">
        <div className="project-header-top-container">
          <h2 className="project-title">{props.project.name}</h2>
          <p className="project-header-description">{props.project.description}</p>
        </div>
        <div className="tech-details-container">
          <div className="areas-container">
            {project.areas.map((area, idx) => 
              <div key={idx}>{project.areas[idx]}</div>
            )}
          </div>
          <div className="local-date-container">
            <div className="local">
              {project.local}
            </div>
            <div className="div-line"></div>
            <div className="date">
              {project.date}
            </div>
          </div>
        </div>
        <div className="project-header-lower-container">
          <div className="partnership-box">
            <div className="partnership-text">Partnership with:</div>
            <div className="partnership-text">{project.partnership}</div>
          </div>
          <div className="arrow-box">
           <img className="arrow-image" src="/imgs/rv_icon_direction_down.svg" alt="Arrow Down"/>       
          </div>
        </div>
      </div>
      <div className="project-header-image-box">
        <img className="project-header-image" src="/imgs/curts_kale.png"/>
      </div>
    </section>
  )
}

export default ProjectHeader;