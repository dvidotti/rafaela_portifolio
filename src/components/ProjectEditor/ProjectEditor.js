import React, {useEffect, useRef, useState} from "react";
// import {projects} from "../../data/projects"

import {useParams} from "react-router-dom";
import ProjectHeaderEdit from "./components/ProjectHeaderEdit/ProjectHeaderEdit"


const modulesOptions = ["ProjectHeader", "FullImageContainer"]
const ProjectEditor = (props) => {
  const portPict = useRef(null)
  let params = useParams()
  let {projectId} = params;

  let [modules, handleModules] = useState([])
  let [componentsList, handleCompList] = useState([])
  let [modulesCollId, handleModulesCollId]= useState('')

  let [areas, handleAreas]= useState('')
  let [link, handleLink]= useState('')
  let [name, handleName]= useState('')
  let [type, handleType]= useState('')

  let [selectedModule, handleSelectModule] = useState("ProjectHeader")
  
  // let project = projects.filter(i => i.link === project_link)[0]

  const getProject = async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/project/${projectId}`, {
        method: "GET",
        mode: 'cors',
        credentials: 'include',
      })
      let resBck = await res.json();
      if(resBck.modules) {
        console.log("GETPROJECT", resBck)
        console.log("resBck.modules", resBck.modules)
        updateProjectMeta(resBck)
        handleModulesCollId(resBck.modules)
        getModulesCollection(resBck.modules)
      } else {
        console.log("Modules ID does not exist in the project")
      }
      console.log("RESSS", resBck)
      
    } catch(error) {
      console.log(error)
    }
  }

  const getModulesCollection = async (modColId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/modules/${modColId}`, {
        method: "GET",
        mode: 'cors',
        credentials: 'include',
      })
      let resBck = await res.json();
      if(resBck.success) {
        handleModules(resBck.data.modules)
      } else console.log("Failed to fetch modules collection")
      console.log("MODules collection", resBck)
    } catch(errors) {
      console.log(errors)
    }
  }

  // const addToModuleCollection = async (moduleId) => {
  //   let moduleIdList = [...modules].map(i => i._id)
  //   moduleIdList.push(moduleId)
  //   let newList = {module_id_list: moduleIdList}
    
  //   try {
  //     let res = await fetch("POST TO MODULES COLECTION/:modulesCollId", {
  //       method: 'POST',

  //       body: JSON.stringify(newList)
  //     })
  //   } catch(errors){
  //     console.log(errors)
  //   }
  // }

  const updateProjectMeta = (project) => {
    handleName(project.name)
    handleType(project.type)
    handleLink(project.link)
    handleAreas(project.areas)
  }

  useEffect(() => {
   getProject()
  }, [])


  // From list of modules create a list of components and update modules state
  const createComponentsList = () => {
    let compList = []
    modules.forEach((module, idx) => {
      let component = mapModuleToComponents(module, idx)
      compList.push(component)
      handleCompList(compList)
    })
  }
  
  // Update components list when the modules list changes
  useEffect(() => {
    createComponentsList()
  },[modules])
  
  // From onModel property map to one of the project Components
  const mapModuleToComponents = (module, idx) => {
    console.log("MODULE", module.onModel)
    let component = null;
    let moduleName = module.onModel ? module.onModel : module;
    switch(moduleName) {
      case 'ProjectHeader':
        component = 
        <ProjectHeaderEdit
          key={idx}
          getProject={getProject} 
          module={(typeof module.onModel) === "undefined" ? [] : module}
          modulesCollId={modulesCollId}
        />
        break;
    }
    return component
  }

  const addComponentToList = () => {
    console.log("HALLLLLOOOOOO")
    let moduleToAdd = mapModuleToComponents(selectedModule);
    console.log("COMPONENTTOADD", moduleToAdd)
    let compListCopy = [...componentsList]
    compListCopy.unshift(moduleToAdd)
    handleCompList(compListCopy)
  }

  useEffect(() => {

  }, [componentsList])

   

  return (
    <div>
      <section style={{padding: "25px"}}>
        <h1>Project Infos</h1>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <label style={{display: "block"}} htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => handleName(e.target.value)}
            />
          </div>
          <div>
            <label style={{display: "block"}} htmlFor="type">Type</label>
            <input
              id="type"
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => handleType(e.target.value)}
            />
          </div>
          <div>
            <label style={{display: "block"}} htmlFor="areas">Areas</label>
            <input
              id="areas"
              type="text"
              placeholder="Areas"
              value={areas}
              onChange={(e) => handleAreas(e.target.value)}
            />
          </div>
          <div>
            <label style={{display: "block"}} htmlFor="link">Link</label>
            <input
              id="link"
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => handleLink(e.target.value)}
            />
          </div>
        </div>
      </section>
      <section style={{padding: "25px"}}>
        <h4>Add Module</h4>
        <select
          style={{height: "30px", width: "200px"}}
          name="module"
          onChange={(e) => handleSelectModule(e.target.value)}
          >
          {modulesOptions.map((i, idx) => (
            <option key={idx} selected={i === selectedModule}>{i}</option>
            )
          )}
        </select>
        <button onClick={() => addComponentToList()} className="clean-button">+ ADD MODULE</button>
      </section>

      <section>
        {componentsList.map((component, idx) => component)}
        {/* <ProjectHeaderEdit/> */}
      </section>
    </div>
  )
}

export default ProjectEditor;