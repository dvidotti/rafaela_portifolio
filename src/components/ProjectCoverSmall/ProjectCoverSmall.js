import React, {useState, useEffect} from "react";
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
  let [projectId, handleProjectId] = useState('')
  let [mediaId, handleMediaId] = useState('')


  const updateCoverImage = async () => {
    const obj = {
      cover: mediaId,
      projectId: projectId
    }
    const bckRes = await fetch(`${process.env.REACT_APP_API_URL}/project-cover`, {
      method: "PUT",
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }),
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(obj)
    })
    props.getProjects()
    handleOpenChoseCover()
  }

  useEffect(() => {
    handleProjectId(project._id)
  }, [])

  // useEffect(() => {
  //   console.log
  // })

  return isEdit ? (
    <React.Fragment>
      <ChoseMedia 
        open={openChoseCover}
        title={'Chose media'}
        getMediaId={handleMediaId}
        postMedia={updateCoverImage}
        handleOpen={handleOpenChoseCover}
      />
      <div className="proj_cover_container">
        <div className="image-container">
          {isEdit && 
            <button 
              onClick={(e) => {
                e.stopPropagation()
                handleOpenChoseCover(true)
              }}
              className="edit-cover-btn clean-button"
              >Edit Cover
            </button>
          }
          <span
           className={project.published ? "badge-published" : "badge-unpublished"}
          >{project.published ? "PUBLISHED" : "UNPUBLISHED"}</span>
          
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
    : props.isPortfolioEdit ? 
    (
    <div className="proj_cover_container">
      <div className="image-container">
        {project.cover ? 
          <img className="image" src={project.cover[process.env.REACT_APP_IMAGE_USED]} alt={project.cover.alt}/>
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
    )
    :
    (
    <Link className="image-link" to={linkRef}>
      <div className="proj_cover_container">
        <div className="image-container">
          {project.cover ? 
            <img className="image" src={project.cover[process.env.REACT_APP_IMAGE_USED]} alt={project.cover.alt}/>
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

{/* <img className="image" src={project.cover.link} alt={project.cover.alt}/> */}