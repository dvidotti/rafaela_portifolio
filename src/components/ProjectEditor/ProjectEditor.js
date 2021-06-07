import React, {useEffect, useRef, useState} from "react";
// import {projects} from "../../data/projects"

import {useParams, useHistory} from "react-router-dom";
import ProjectHeaderEdit from "./components/ProjectHeaderEdit/ProjectHeaderEdit"
import FullProjectPicturesEditor from "./components/FullProjectPicturesEditor/FullProjectPicturesEditor"


const modulesOptions = ["ProjectHeader", "FullImageModule"]
const ProjectEditor = (props) => {
  const portPict = useRef(null)
  let params = useParams()
  let {projectId} = params;

  const history = useHistory()

  const backToProjects = () =>{ 
    history.push('/admin/projects');
  }

  let [modules, handleModules] = useState([])
  let [componentsList, handleCompList] = useState([])
  let [modulesCollId, handleModulesCollId]= useState('')

  let [areas, handleAreas]= useState('')
  let [link, handleLink]= useState('')
  let [name, handleName]= useState('')
  let [type, handleType]= useState('')
  let [count, handleCount] =useState(0)
  let [loading, handleLoading]=useState(true)

  let [selectedModule, handleSelectModule] = useState("ProjectHeader")
  
  // let project = projects.filter(i => i.link === project_link)[0]

  const getProject = async () => {
    handleLoading(true)
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/project/${projectId}`, {
        method: "GET",
        mode: 'cors',
      })
      let resBck = await res.json();
      if(resBck.modules) {
        console.log("PROJECT",resBck)
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
      })
      let resBck = await res.json();
      console.log("Collection: ", resBck)
      if(resBck.success) {
        handleModules(resBck.data.modules)
        handleLoading(false)
      } else console.log("Failed to fetch modules collection")
    } catch(errors) {
      console.log(errors)
    }
  }

  const updateProjectMeta = (project) => {
    handleName(project.name)
    handleType(project.type)
    handleLink(project.link)
    handleAreas(project.areas)
  }

  useEffect(() => {
   getProject()
  }, [])

  useEffect(() => {
    console.log("MODULES", modules)
  })


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
    console.log("MODULES", modules)
    let component = null;
    let moduleName = module.onModel ? module.onModel : module;
    switch(moduleName) {
      case 'ProjectHeader':
        component = 
        <ProjectHeaderEdit
          key={module._id || idx}
          id={module._id || idx}
          getProject={getProject} 
          module={(typeof module.onModel) === "undefined" ? [] : module}
          modulesCollId={modulesCollId}
          removeComponentFromList={removeComponentFromList}
        />
        break;
      case "FullImageModule":
        component = 
        <FullProjectPicturesEditor
          key={module._id || idx}
          id={module._id || idx}
          getProject={getProject} 
          module={(typeof module.onModel) === "undefined" ? [] : module}
          modulesCollId={modulesCollId}
          removeComponentFromList={removeComponentFromList}
        />
        break;
    }
    return component
  }

  const addComponentToList = () => {
    handleCount(count + 1)
    let moduleToAdd = mapModuleToComponents(selectedModule, count);
    // let compListCopy = [...componentsList]
    // compListCopy.push(moduleToAdd)
    componentsList.push(moduleToAdd)
    console.log("INADDCOPYLIST", componentsList)
    handleCompList(componentsList)
  }

  const removeComponentFromList = (id) => {
    // console.log("ID", id)
    // let compListCopy = JSON.parse(JSON.stringify(componentsList))
    // console.log("COMPCOPYLIST", [...compListCopy])
    let index = -1
    componentsList.forEach((i, idx) => {
      console.log("ITEM: ", i, " IDX: ", idx)
      console.log("Condition: ", i.props.id == id)
      if(i.props.id == id) {
        index = idx
      } 
    })
    console.log("INDEX", index)
    let compoCopy = [...componentsList]
    compoCopy.splice(index, 1)
    console.log("COMPOCOPY", compoCopy)
    handleCompList(compoCopy)
  }

  useEffect(() => {
    console.log("COMPLIST", componentsList)
  }, [componentsList])

   
  const deleteProject = async () => {
    let obj = {
      modCollId: modulesCollId
    }
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/project/${projectId}`, {
        method: "DELETE",
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(obj)
      })
      let resBck = await res.json();
      backToProjects()
      
    } catch(error) {
      console.log(error)
    }
  }

  const updateProject = async () => {
    
    // let areaArr = []
    // console.log("---->>>", areas)
    // if(areas.length > 0) areaArr = areas.split(',')
    const body = {
      name,
      type,
      areas,
      link,
      projectId
    }
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/project/`, {
        method: "PUT",
        mode: 'cors',
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }),
        credentials: 'include',
        body: JSON.stringify(body)
      })
      let resBck = await res.json();
      getProject()
      
    } catch(error) {
      console.log(error)
    }
  }
   

  return (
    <div style={{marginLeft: "60px"}}>
      <section style={{margin: "65px 65px 30px 15px"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div style={{display: "flex"}}>
            <h1 style={{marginRight: 15}}>Project Infos</h1>
            <button
              onClick={() => backToProjects()}
              >Back to Projects
            </button>
          </div>
          <div>
            <button
              onClick={() => updateProject()}
              style={{marginRight: "20px"}}
              >Save
            </button>
            <button
              onClick={() => deleteProject()}
              >Delete
            </button>
          </div>
        </div>
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

      <section>
        {!loading && componentsList.map((component, idx) => component)}
        {/* <ProjectHeaderEdit/> */}
      </section>
      <section style={{padding: "65px 65px 100px 0px"}}>
        <h1 style={{paddingBottom: "50px"}}>ADD MODULE</h1>
        <h4>Select a module in the list and click Add Module to add a new section.</h4>
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
    </div>
  )
}

export default ProjectEditor;