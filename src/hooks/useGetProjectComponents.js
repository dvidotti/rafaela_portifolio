
import { useState, useEffect, useRef } from 'react'
import ProjectHeaderEdit from "components/ProjectEditor/components/ProjectHeaderEdit/ProjectHeaderEdit"
import FullProjectPicturesEditor from "components/ProjectEditor/components/FullProjectPicturesEditor/FullProjectPicturesEditor"
import DoublePictureEdit from "components/ProjectEditor/components/DoublePictureEdit/DoublePictureEdit"

import ProjectHeader from "components/ProjectPage/components/ProjectHeader/ProjectHeader"
import FullProjectPictures from "components/ProjectPage/components/FullProjectsPictures/FullProjectsPictures"
import DoublePicture from "components/ProjectPage/components/DoublePicture/DoublePicture"
import { useFetchAPI } from './useFetchAPI'

const initialProjectMeta = {
  areas:"",
  link: "",
  name: "",
  type:"",
  published: ""
}

export const useGetProjectComponents = (projectId, backToProjects, isEditPage) => {
  let [components, setComponents] = useState([])
  let [componentsList, setCompList] = useState([])
  let [componentsCollectionId, setComponentsCollectionId]= useState('')
  let [selectedComponent, setSelectComponent] = useState({onModel: "ProjectHeader"})
  let [ isEdit, setIsEdit ] = useState(false)
  let [ projectMeta, setProjectMeta ] = useState(initialProjectMeta)
  let [saved, setSaved] = useState(false)
  let [loading, setLoading ]=useState(true)


  const portPict = useRef(null)

  const { fetchAPI } = useFetchAPI()

  useEffect(() => {
    setIsEdit(isEditPage)
    getProject()
  },[])


  const getProject = async () => {
    setLoading(true)
    try {
      let res = await fetchAPI(`/project/${projectId}`)
      if(res.modules) {
        setProjectMeta(res)
        setComponentsCollectionId(res.modules)
        getComponentsCollection(res.modules)
        setSaved(true)
        setLoading(false)
      } else {
        console.error("Modules ID does not exist in the project")
      }      
    } catch(error) {
      console.log(error)
    }
  }

  const getComponentsCollection = async (componentsCollectionId) => {
    try {
      const res = await fetchAPI(`/modules/${componentsCollectionId}`)
      if(res.success) {
        setComponents(res.data.modules)
      } else console.error("Failed to fetch components collection")
    } catch(errors) { 
      console.error(errors) 
    } finally{
      setLoading(false)
    }
  }

  const handleProjectMeta = (e) => {
    if(e.target.name === "published"){
      setProjectMeta(meta => ({
        ...meta,
        published: !meta.published
      }))
    } else {
      setProjectMeta(meta => ({
        ...meta,
        [e.target.name]: e.target.value
      }))
    }
    setSaved(false)
  }

  const handleSelectedComponent = (e) => setSelectComponent(e.target.value)
  
  const handleComponents = (component, isUpdateComponent) => {
    if(isUpdateComponent) {
      setComponents(l => {
        let list = [...l];
        let idx = list.findIndex(i => i._id === component._id)
        list[idx] = component;
        return list
      })
    } else {
      setComponents(l => {
        let list = [...l]
        list = list.filter(i => !!i._id) // remove comp without id
        list.push(component)
        return list
      })
    }
  }

  const deleteProject = async () => {
    let body = {
      modCollId: componentsCollectionId
    }
    let options = {
      body,
      method: "DELETE",
    }
    try {
      await fetchAPI(`/project/${projectId}`, options )
      backToProjects()
    } catch(error) {
      console.error(error)
    }
  }

  const updateProject = async () => {
    
    const body = projectMeta;
    body.projectId = projectId
    // const body = {
    //   name,
    //   type,
    //   areas,
    //   link,
    //   projectId,
    //   published
    // }
    const options = {
      body,
      method: "PUT"
    }
    try {
      let res = await fetchAPI(`/project/`, options)
      getProject()      
    } catch(error) {
      console.log(error)
    }
  }


  const mapCollectionItemToComponent = (componentObj, idx) => {
    let component = null;
    // IF item still doesn't have a onModel property, it's a new component
    // Item in this case component will be the module name (ProjectHeader, FullImageModule and so on ...)
    let componentModelName = componentObj.onModel;
    if(isEdit) {
      switch(componentModelName) {
        case 'ProjectHeader':
          component = 
          <ProjectHeaderEdit
            key={componentObj._id || idx}
            component={componentObj}
            componentsCollectionId={componentsCollectionId}
            removeComponentFromList={removeComponentFromList}
            handleComponents={handleComponents}         
          />
          break;
        case "FullImageModule":
          component = 
          <FullProjectPicturesEditor
            key={module._id || idx}
            id={module._id}
            // getProject={getProject} 
            module={!module.onModel ? null : module }
            componentsCollectionId={componentsCollectionId}
            removeComponentFromList={removeComponentFromList}
          />
          break;
        case "DoublePicture":
          component = 
          <DoublePictureEdit
            key={module._id || idx}
            id={module._id || idx}
            module={typeof module.onModel === "undefined" ? null  : module}
            // refProp={portPict}
            componentsCollectionId={componentsCollectionId}
            // getProject={getProject} 
          />
          break;
      }
    } else {
      switch(componentModelName) {
        case 'ProjectHeader':
          component = 
          <ProjectHeader
            refProp={portPict}
            component={componentObj}
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
    }
    return component
  }

   // From list of modules create a list of components and update modules state
  const createComponentsList = () => {
    // idx used as a key while creating new components
    // if item has ._id used that as key instead
    let compList = components.map((item, idx) => mapCollectionItemToComponent(item, idx))
    setCompList(compList)
  }
  
  // Update components list when the modules list changes
  useEffect(() => {
    createComponentsList()
  },[components])

  const addComponentToList = () => {
    setComponents(l => {
      let list = [...l]
      list.push(selectedComponent)
      return list
    })
  }

  // Create a new filtered list
  // Filters components without an id and the one matching the id arg.
  const removeComponentFromList = (id) => {
    let filteredList = components.filter(item => {
      if(!item._id) return false;
      if(item._id == id) return false
      else return true
    })
    setComponents(filteredList)
  }

  const scrollTo = (reference) => {
    reference.current.scrollIntoView()
  } 

  return {
    getComponentsCollection,
    componentsList,
    handleSelectedComponent,
    selectedComponent,
    addComponentToList,
    handleProjectMeta,
    projectMeta,
    updateProject,
    deleteProject,
    saved,
    loading
  }
}