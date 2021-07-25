import React, {useEffect, useRef, useState} from "react";
// import {projects} from "../../data/projects"

import {useParams} from "react-router-dom";

import ProjectHeader from "./components/ProjectHeader/ProjectHeader"
import FullProjectPictures from "./components/FullProjectsPictures/FullProjectsPictures"
import DoublePicture from "./components/DoublePicture/DoublePicture"

const ProjectPage = (props) => {
  const portPict = useRef(null)
  let params = useParams()
  let project_link = params.project_name
  
  let [modules, handleModules] = useState([]);
  let [compList, handleCompList] = useState([]);
  let [project, handleProject] = useState(null)
  
  
  useEffect(() => {
    let projectFiltered = props.projects.filter(i => i.link === project_link)[0]
    
    console.log("projectFiltered", projectFiltered)
    handleProject(projectFiltered)
    
    // if(typeof project === "undefined") {
      // props.getPortfolio()
    // }
    props.handleIsProjectPage(true)
    return function cleanup() {
      props.handleIsProjectPage(false)
    }
  },[])
  
  useEffect(() => {
    getModulesCollection()
  }, [project])

  const scrollTo = (reference) => {
    reference.current.scrollIntoView()
  } 

  const getModulesCollection = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/modules/${project.modules}`, {
        method: "GET",
        mode: 'cors',
        credentials: 'include',
      })
      let resBck = await res.json();
      if(resBck.success) {
        createComponentsList(resBck.data.modules)
      } else console.log("Failed to fetch modules collection")
    } catch(errors) {
      console.log(errors)
    }
  }

  const mapModuleToComponents = (module, idx) => {
    console.log("MODULES", modules)
    let component = null;
    let moduleName = module.onModel ? module.onModel : module;
    switch(moduleName) {
      case 'ProjectHeader':
        component = 
        <ProjectHeader
          key={module._id || idx}
          id={module._id || idx}
          refProp={portPict}
          project={module}
          scrollTo={scrollTo}
        />
        break;
      case "FullImageModule":
        component = 
        <FullProjectPictures
          key={module._id || idx}
          id={module._id || idx}
          project={module}
          refProp={portPict}       
        />
        break;
      case "DoublePicture":
        component = 
        <DoublePicture
          key={module._id || idx}
          id={module._id || idx}
          project={module}
          refProp={portPict}       
        />
        break;
    }
    return component
  }

  const createComponentsList = (modules) => {
    let compList = []
    modules.forEach((module, idx) => {
      let component = mapModuleToComponents(module, idx)
      compList.push(component)
    })
    handleCompList(compList)
  }

  return (
    <div style={{width: "100%"}}>
      {compList.length > 0 && compList.map(component => {
        return (
          <React.Fragment>
            {component}
            <div id="projects" style={{height: "75px", width: "100%"}}></div>
          </React.Fragment>
        )
      })}
      {/* <ProjectHeader scrollTo={scrollTo} project={project} refProp={portPict}/>
      <div id="projects" style={{height: "75px", width: "100%"}}></div>
      <FullProjectPictures refProp={portPict} project={project}/>
      <div id="projects" style={{height: "75px", width: "100%"}}></div> */}
    </div>
  )
}

export default ProjectPage;