import React from "react";
import "./projectCoverSmall.css"

const ProjectCoverSmall = (props) => {
  const {project, isEdit} = props;
  const linkRef = isEdit ? 
    `project-edit/${props.project.link}` 
    : `projects/${props.project.link}`
  return (
    <a className="image-link" href={linkRef}>
      <div className="proj_cover_container">
        <div className="image-container">
          <img className="image" src={project.cover.link} alt={project.cover.alt}/>
          {/* <img className="image" src={project.cover.link2} alt={project.cover.alt}/> */}
        </div>
        <div className="projec-legend-container">
          <div className="cover-title_1">{project.name}</div>
          <div className="cover-title_2">{project.type}</div>
        </div>
      </div>
    </a>
  )
}

export default ProjectCoverSmall;