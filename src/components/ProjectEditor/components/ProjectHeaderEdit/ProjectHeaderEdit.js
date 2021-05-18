import React, {useState, useEffect} from "react";


import "./ProjectHeaderEdit.css";

const imageKey = process.env.REACT_APP_IMAGE_USED

const ProjectHeaderEdit = (props) => {
  console.log("PROPS", props)
  const {project} = props;
  let [title, handleTitle] = useState("");
  let [description, handleDescription] = useState("")
  let [areas, handleAreas] = useState(["", "", ""]);
  let [local, handleLocal] = useState("");
  let [date, handleDate] = useState("");
  let [partnership, handlePartnership] = useState("");
  let [headImg, handleHeadImg] = useState("60800487e0595115ce2944ad")


  const saveProjectHeader = async (isEdit) => {
    let obj = {
      title,
      description,
      areas,
      local,
      date,
      partnership,
      headImg: isEdit ? props.module.module.headImg._id : headImg,
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

  const changeArea = (e, idx) => {
    let areasCopy = [...areas];
    areasCopy[idx] = e.target.value
    handleAreas(areasCopy)
  }

  useEffect(() => {
    console.log("AREAS", props)
    const {module} = props
    if(typeof props.module._id !== "undefined") {
      handleTitle(module.module.title)
      handleDescription(module.module.description)
      handleAreas(module.module.areas)
      handleLocal(module.module.local)
      handleDate(module.module.date)
      handlePartnership(module.module.partnership)
      handleHeadImg(module.module.headImg)
    } 
  },[])


 
  return (
    <section style={{marginLeft: "60px"}}>
      <section className="project-header">
        <div className="project-header-content">
          <div className="project-header-top-container">
            <button
              className="project-header-save-btn"
              onClick={() => saveProjectHeader(props.module.length > 0)}>
              {props.module._id ? 'Update' : 'Save'}
            </button>
            <button
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
          {headImg.alt ? 
          <img className="project-header-image" src={headImg[imageKey]} alt={headImg.alt}/>
          :
          <img className="project-header-image" src='/imgs/default_media_image.png' alt="default image"/>
          }
        </div>
      </section>
    </section>
  )
}

export default ProjectHeaderEdit;