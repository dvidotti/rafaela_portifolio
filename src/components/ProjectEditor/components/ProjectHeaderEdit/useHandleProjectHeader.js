import { useState } from "react";
import { useFetchAPI } from 'hooks/useFetchAPI'

import "./ProjectHeaderEdit.css";

const initialFormDataState = {
    title:'',
    description:'',
    local:'',
    date:'',
    partnership:''
}

export const useHandleProjectHeader = (componentsCollectionId, removeComponentFromList, handleComponents) => {

  let [formData, setFormData ] = useState(initialFormDataState)
  let [areas, setAreas] = useState(["", "", ""]);

  let [headImg, setHeadImg] = useState("")
  let [headImgOriginal, setHeadImgOriginal] = useState(null)
  let [open, setOpen] = useState(false)
  let [componentId, setComponentId ] = useState(null)
  let [projectHeaderId , setProjectHeaderId ] = useState(null)

  const { fetchAPI } = useFetchAPI()


  const saveProjectHeader = async (isEdit) => {
    let body = {
      title: formData.title,
      description: formData.description,
      local: formData.local,
      partnership: formData.partnership,
      date: formData.date,
      areas,
      headImg: !headImg ? null : headImg._id,
      moduleColId: componentsCollectionId,
      moduleId: componentId
    }
    if(isEdit) {
      body.projectHeaderId = projectHeaderId;
    }

    let method = isEdit ? "PUT" : "POST"
    
    let options = { method, body }

    try {
      let response = await fetchAPI('/project-header', options)
      let resObj = response.module;
      resObj.module = response.data
      handleComponents(resObj, isEdit)
      updateFormData(resObj)
      if(!isEdit) {
        setComponentId(resObj._id)
      }
    } catch(error) {
      console.error(error)
    }
  }

  const updateMedia = () => {
    saveProjectHeader(!!componentId)
  }

  const deleteProjHeader = async () => {
    // If componentId equal undefined or null -> remove it from the FE
    if(!componentId) {
      removeComponentFromList(componentId)
      return
    }

    let options = {
      method: "DELETE",
      body: {
        projectHeaderId: projectHeaderId,
        moduleId: componentId,
        modulesCollId: componentsCollectionId
      }
    }

    try {
      let res = await fetchAPI(`/project-header`, options)
      if(res.success) {
        removeComponentFromList(componentId)
        setComponentId(null)
      }
    } catch(error) {
      console.error(error)
    }
  }

  const changeArea = (e, idx) => {
    let areasCopy = [...areas];
    areasCopy[idx] = e.target.value
    setAreas(areasCopy)
  }

  const handleHeadImg = (data) => setHeadImg(data)
  const handleOpen = (data) => setOpen(data)

  
  const updateFormData = (component) => {
    if(!!component._id) {
      let formKeys = Object.keys(initialFormDataState)
      let parentFormData = {}
      formKeys.forEach(key => { 
        parentFormData[key] = component.module[key]
      })
      setFormData(parentFormData)      
      setAreas(component.module.areas)
      if(component.module.headImg) {
        setHeadImgOriginal(component.module.headImg)
        setHeadImg(component.module.headImg)
      }
      setComponentId(component._id)
      setProjectHeaderId(component.module._id)
    } 
  }
  
  const parseUpdateFormData = (e) => {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value
    }))
  }
  
  
  return {
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
    componentId
  }
}
