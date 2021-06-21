import React, {useEffect, useRef, useState} from "react";
// import {projects} from "../../data/projects"
import Dialog from '../Dialog/Dialog'
import DeleteDialog from '../DeleteDialog/DeleteDialog'

import {useParams, useHistory} from "react-router-dom";
import ProjectHeaderEdit from "./components/ProjectHeaderEdit/ProjectHeaderEdit"
import FullProjectPicturesEditor from "./components/FullProjectPicturesEditor/FullProjectPicturesEditor"
import './ProjectEditor.css'

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
  let [published, handlePublished] = useState(false)
  let [count, handleCount] =useState(0)
  let [deleteDialog, handleDeleteDialog] =useState(false)
  let [loading, handleLoading]=useState(true)
  let [saved, handleSaved] = useState(true)

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
        handleSaved(true)
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
    handlePublished(project.published)
    handleSaved(true)
  }

  useEffect(() => {
   getProject()
   handleSaved(true)
  }, [])

  useEffect(() => {
    handleSaved(false)
  }, [areas, link, name, type, published])


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
      console.log("Condition: ", i.props.id == id)
      if(i.props.id == id) {
        index = idx
      } 
    })
    let compoCopy = [...componentsList]
    compoCopy.splice(index, 1)
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
      projectId,
      published
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
      <Dialog
        open={deleteDialog}
        children={
          <DeleteDialog
            title={'Delete Project'}
            message={'Are you sure you want to delete this project'}
            closeDialog={handleDeleteDialog}
            deleteAction={deleteProject}
          />
        }
        >


      </Dialog>
      <section style={{padding: "30px 65px 30px 15px", marginTop: 5, marginRight: 2, border: "4px solid black"}}>

        <div style={{display: "flex", justifyContent: "space-between", paddingBottom: "25px"}}>
          <h1 style={{marginRight: 15}}>Project Infos</h1>
          <button
            className="clean-button transparent-bck"
            onClick={() => backToProjects()}
            >Back to Projects
          </button>
        </div>
        
        <div style={{display: "flex"}}>
          <div className="project-box-input">
            <div className="horizontal-input">
              <label className="horizontal-label" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => handleName(e.target.value)}
              />
            </div>
            <div className="horizontal-input">
              <label className="horizontal-label"  htmlFor="type">Type</label>
              <input
                id="type"
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => handleType(e.target.value)}
              />
            </div>
          </div>

          <div className="project-box-input">
            <div className="horizontal-input">
              <label className="horizontal-label"  htmlFor="areas">Areas</label>
              <input
                id="areas"
                type="text"
                placeholder="Areas"
                value={areas}
                onChange={(e) => handleAreas(e.target.value)}
              />
            </div>
            <div className="horizontal-input">
              <div>
                <label className="horizontal-label"  htmlFor="link">Link</label>
              </div>
              <input
                id="link"
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => handleLink(e.target.value)}
              />
            </div>
          </div>

          <div className="project-box-input">
            <div className="horizontal-input-auto">
              <input
                id="published"
                type="checkbox"
                placeholder="Published"
                checked={published}
                value={published}
                onChange={(e) => handlePublished(!published)}
              />
              <label className="horizontal-label"  htmlFor="published">Published</label>
            </div>
          </div>

        <div>
          <div style={{marginBottom: 13}}>
            <button
              disabled={saved}
              onClick={() => updateProject()}
              style={{marginRight: "20px"}}
              className="clean-button transparent-bck"
              >Save Project
            </button>
          </div>
          <div>
            <button
              className="clean-button transparent-bck"
              // onClick={() => deleteProject()}
              onClick={() => handleDeleteDialog(true)}
              >Delete Project
            </button>
          </div>
        </div>
        </div>
      </section>

      <section style={{margin:"2px 2px 0px 0px", border: "4px solid black"}}>
        {!loading && componentsList.map((component, idx) => component)}
      </section>

      <section className="flex align-center" style={{padding: "65px 65px 100px 0px", border: "4px solid black", marginBottom: 50}}>
        <h1 style={{paddingLeft: 40}}>Add Module</h1>
          <div>
            <select
              style={{height: "60px", width: "400px", fontSize: "1.2rem", margin:"0px 70px 0px 70px", padding: 5}}
              name="module"
              onChange={(e) => handleSelectModule(e.target.value)}
              >
              {modulesOptions.map((i, idx) => (
                <option key={idx} selected={i === selectedModule}>{i}</option>
                )
              )}
            </select>
            <button 
              onClick={() => addComponentToList()} 
              className="clean-button white-bck force-big-padding"
              >+ ADD MODULE
            </button>
          </div>
        {/* </div> */}
      </section>
    </div>
  )
}

export default ProjectEditor;