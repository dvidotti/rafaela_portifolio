import React, {useState, useEffect, useRef} from "react";
import ChoseMedia from '../../../Medias/components/ChoseMedia/ChoseMedia'

import "./ProjectHeaderEdit.css";

const imageKey = process.env.REACT_APP_IMAGE_USED

const ProjectHeaderEdit = (props) => {
  console.log("PROPS", props)
  const {project} = props;

  const didMountRef = useRef(false)

  let [title, handleTitle] = useState("");
  let [description, handleDescription] = useState("")
  let [areas, handleAreas] = useState(["", "", ""]);
  let [local, handleLocal] = useState("");
  let [date, handleDate] = useState("");
  let [partnership, handlePartnership] = useState("");
  let [headImg, handleHeadImg] = useState("")
  let [headImgId, handleHeadImgId] = useState(null)
  // let [headImgId, handleHeadImgId] = useState("60800487e0595115ce2944ad")

  let [open, handleOpen] = useState(false)


  const saveProjectHeader = async (isEdit) => {
    console.log("ISEDIT", isEdit)
    let obj = {
      title,
      description,
      areas,
      local,
      date,
      partnership,
      headImg: headImgId,
      // headImg: isEdit ? props.module.module.headImg._id : headImg,
      moduleId: props.modulesCollId
    }
    if(isEdit) {
      obj.projectHeaderId = props.module.module._id;
    }

    let method = isEdit ? "PUT" : "POST"
    let options = {
      method: method,
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }),
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(obj)
    }

    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/project-header`, options)
      let resBck = await res.json()
      console.log("00000000>>>>", resBck)
      props.getProject()
    } catch(errors) {
      console.log(errors)
    }
  }

  const updateMedia = () => {
    saveProjectHeader(typeof props.module._id !== "undefined")
  }

  const deleteProjHeader = async () => {
    if(typeof props.module._id === "undefined") {
      console.log("PROPSID", props.id)
      props.removeComponentFromList(props.id)
      return
    }
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/project-header`, {
          method: "DELETE",
          headers: new Headers({
            'content-type': 'application/json',
            'Access-Control-Allow-Credentials': true
          }),
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify({
            projectHeaderId: props.module.module._id,
            moduleId: props.module._id,
            modulesCollId: props.modulesCollId
          })
      })
      let resBack = await res.json()
      if(resBack.success) {
        console.log("RESFROMDELETE", resBack)
        props.removeComponentFromList(resBack.data._id)
        props.getProject()
      }
    } catch(errors) {
      console.log("Fail to delete modulel: ", errors)
    }
  }

  const changeArea = (e, idx) => {
    let areasCopy = [...areas];
    areasCopy[idx] = e.target.value
    handleAreas(areasCopy)
  }

  useEffect(() => {
    const {module} = props
    if(typeof props.module._id !== "undefined") {
      handleTitle(module.module.title)
      handleDescription(module.module.description)
      handleAreas(module.module.areas)
      handleLocal(module.module.local)
      if(module.module.headImg) {
        handleHeadImgId(module.module.headImg._id)
      }
      handleHeadImg(module.module.headImg)
      handleDate(module.module.date)
      handlePartnership(module.module.partnership)
      handleHeadImg(module.module.headImg)
    } 
  },[])

  // Simulating a componentDidUpdate
  useEffect(() => {
    if(didMountRef.current) {
      if(typeof props.module._id !== "undefined") {
        if(headImg !== props.module.module.headImg) {
          handleHeadImg(props.module.module.headImg)
        }
      }
    } else didMountRef.current = true;
  })

  return (
    <React.Fragment>
      {open && 
        <ChoseMedia 
          open={open}
          title={'Chose media'}
          getMediaId={handleHeadImgId}
          postMedia={updateMedia}
          handleOpen={handleOpen}
        />
      }
      <section>
        <section className="project-header">
          <div className="project-header-content">
            <div className="project-header-top-container">
              <button
                className="project-header-save-btn"
                onClick={() => saveProjectHeader(typeof props.module._id !== "undefined")}>
                {props.module._id ? 'Edit Infos' : 'Save'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteProjHeader()
                }}
                className="project-header-delete-btn"
                >Delete
              </button>
              <input
                type="text"
                value={title}
                placeholder="Project Title"
                className="project-title no-outline"
                onChange={(e) => handleTitle(e.target.value)}
              />
              <div>
                <textarea
                  type="textarea"
                  value={description}
                  placeholder="Describe your project, take care with the length of the text"
                  className="project-header-description no-outline textarea"
                  onChange={(e) => handleDescription(e.target.value)}
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
                  className="local no-outline"
                  value={local}
                  placeholder="Local"
                  onChange={(e) => handleLocal(e.target.value)}

                />
                <div className="div-line"></div>
                <input
                  type="text"
                  className="date no-outline"
                  value={date}
                  placeholder="e.g 2020/2021"
                  onChange={(e) => handleDate(e.target.value)}
                />
              </div>
            </div>
            <div className="project-header-lower-container">
              <div className="partnership-box">
                <div className="partnership-text">Partnership with:</div>
                <input 
                  className="partnership-text no-outline"
                  type="text"
                  value={partnership}
                  placeholder="Partnership"
                  onChange={(e) => handlePartnership(e.target.value)}
                  />
              </div>
              <div className="arrow-box">
                {/* <span className="cursor-pointer" onClick={() => props.scrollTo(props.refProp)}>
                  <img className="arrow-image" src="/imgs/rv_icon_direction_down.svg" alt="Arrow Down"/>       
                </span> */}
              </div>
            </div>
          </div>
          <div className="project-header-image-box">
            <button
              onClick={() => handleOpen(true)}
              className="change-photo-btn"
              >EDIT PHOTO
            </button>
            {headImg ? 
            <img className="project-header-image" src={headImg[imageKey]} alt={headImg.alt}/>
            :
            <img className="project-header-image" src='/imgs/default_media_image.png' alt="default image"/>
            }
          </div>
        </section>
      </section>
    </React.Fragment>
  )
}

export default ProjectHeaderEdit;