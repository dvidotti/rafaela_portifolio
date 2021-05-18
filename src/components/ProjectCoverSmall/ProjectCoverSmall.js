import React, {useState} from "react";
import ChoseMedia from '../Medias/components/ChoseMedia/ChoseMedia'
import "./projectCoverSmall.css"
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";


const ProjectCoverSmall = (props) => {
  const {project, isEdit} = props;
  const linkRef = isEdit ? 
  `/edit/${props.project._id}` 
  : `/projects/${props.project.link}`

  const history = useHistory()

  const routeChange = (path) =>{ 
    history.push(path);
  }

  let [openChoseCover, handleOpenChoseCover] = useState(false)
  return isEdit ? (
    <React.Fragment>
      <ChoseMedia 
        open={openChoseCover}
        title={'Chose project cover'}
        handleOpen={handleOpenChoseCover}
        project={project}
        getProjects={props.getProjects}
      />
      <div className="proj_cover_container">
        <div className="image-container">
          {isEdit && 
            <span 
              onClick={(e) => {
                e.stopPropagation()
                handleOpenChoseCover(true)
              }}
              className="edit-cover-btn clean-button"
              >Edit Cover
            </span>
          }
          {project.cover ? 
            <img className="image" src={project.cover[process.env.REACT_APP_IMAGE_USED]} alt={project.cover.alt}/>
            :
            <img className="image" src={'/imgs/default_media_image.png'} alt="Default Image" />
          }
          {/* <img className="image" src={project.cover.link2} alt={project.cover.alt}/> */}
        </div>
        <div className="projec-legend-container">
          <div className="cover-title_1">{project.name}</div>
          {isEdit && 
              <span 
                onClick={(e) => {
                  e.stopPropagation()
                  routeChange(linkRef)
                }}
                className="edit-project-btn clean-button"
                >Edit Project
              </span>
            }
          <div className="cover-title_2">{project.type}</div>
        </div>
      </div>
    </React.Fragment>
    ) 
    :
    (
    <Link className="image-link" to={linkRef}>
      <div className="proj_cover_container">
        <div className="image-container">
          {project.cover ? 
            <img className="image" src={project.cover.link} alt={project.cover.alt}/>
            :
            <img className="image" src={'/imgs/default_media_image.png'} alt="Default Image" />
          }
          {/* <img className="image" src={project.cover.link2} alt={project.cover.alt}/> */}
        </div>
        <div className="projec-legend-container">
          <div className="cover-title_1">{project.name}</div>
          <div className="cover-title_2">{project.type}</div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCoverSmall;