import React, { useEffect } from "react";
import ChoseMedia from 'components/Medias/components/ChoseMedia/ChoseMedia'
import { useHandleProjectHeader } from "./useHandleProjectHeader";

import "./ProjectHeaderEdit.css";

const imageKey = process.env.REACT_APP_IMAGE_USED

const ProjectHeaderEdit = ({
  modulesCollectionId,
  removeComponentFromList,
  handleModules,
  module

}) => {

  const {
    headImg, 
    handleHeadImg,
    formData,
    open,
    handleOpen,
    headImgOriginal,
    areas, 
    saveProjectHeader,
    updateMedia,
    deleteProjHeader,
    changeArea,
    updateFormData,
    parseUpdateFormData,
    moduleId
  } = useHandleProjectHeader(
    modulesCollectionId, 
    removeComponentFromList,  
    handleModules
  )
  
  useEffect(() => {
    if (!!module.component) updateFormData(module)
  },[module])

  return (
    <React.Fragment>
      {open && 
        <ChoseMedia 
          open={open}
          title={'Chose media'}
          getMedia={handleHeadImg}
          postMedia={updateMedia}
          handleOpen={handleOpen}
          mediaOriginal={headImgOriginal}
        />
      }
      <section>
        <section className="project-header">
          <div className="project-header-content">
            <div className="project-header-top-container">
              <span
                className="project-header-save-btn clean-button white-bck"
                onClick={() => saveProjectHeader(!!moduleId)}>
                {'Save Changes'}
              </span>
              <span 
                onClick={() => deleteProjHeader()}
                className="project-header-delete-btn clean-button white-bck"
                >Delete
              </span>
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Project Title"
                className="project-title no-outline"
                onChange={parseUpdateFormData}
              />
              <div>
                <textarea
                  type="textarea"
                  name="description"
                  value={formData.description}
                  placeholder="Describe your project, take care with the length of the text"
                  className="project-header-description no-outline textarea"
                  onChange={parseUpdateFormData}
                />   
              </div>
            </div>
            <div className="tech-details-container">
              <div className="areas-container">
                  <input
                    className="no-outline"
                    type="text"
                    value={areas[0]}
                    placeholder="Area 1"
                    onChange={(e) => changeArea(e, 0)}
                  />
                  <input
                    value={areas[1]}
                    placeholder="Area 2"
                    onChange={(e) => changeArea(e, 1)}
                    className="no-outline"
                  />
                  <input
                    value={areas[2]}
                    placeholder="Area 3"
                    onChange={(e) => changeArea(e, 2)}
                    className="no-outline"
                  />
              </div>
              <div className="local-date-container">
                <input
                  type="text"
                  name="local"
                  className="local no-outline"
                  value={formData.local}
                  placeholder="Local"
                  onChange={parseUpdateFormData}

                />
                <div className="div-line"></div>
                <input
                  type="text"
                  name="date"
                  className="date no-outline"
                  value={formData.date}
                  placeholder="e.g 2020/2021"
                  onChange={parseUpdateFormData}
                />
              </div>
            </div>
            <div className="project-header-lower-container">
              <div className="partnership-box">
                <div className="partnership-text">Partnership with:</div>
                <input 
                  className="partnership-text no-outline"
                  type="text"
                  name="partnership"
                  value={formData.partnership}
                  placeholder="Partnership"
                  onChange={parseUpdateFormData}
                  />
              </div>
            </div>
          </div>
          <div className="project-header-image-box">
            <button
              onClick={() => handleOpen(true)}
              className="change-photo-btn clean-button"
              >Edit Photo
            </button>
            {headImg ? 
            <img 
              className="project-header-image" 
              src={headImg[imageKey]} 
              alt={headImg.alt}
            />
            :
            <img 
              className="project-header-image"
              src='/imgs/default_media_image.png'
              alt="default image"
            />
            }
          </div>
        </section>
      </section>
    </React.Fragment>
  )
}

export default ProjectHeaderEdit;