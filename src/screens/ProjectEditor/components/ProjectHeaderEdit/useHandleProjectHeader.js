import { useState } from 'react'
import { useFetchAPI } from 'hooks/useFetchAPI'

import './ProjectHeaderEdit.css'

const initialFormDataState = {
    title: '',
    description: '',
    local: '',
    date: '',
    partnership: '',
}

export const useHandleProjectHeader = (
    modulesCollectionId,
    removeComponentFromList,
    handleModules
) => {
    let [formData, setFormData] = useState(initialFormDataState)
    let [areas, setAreas] = useState(['', '', ''])

    let [headImg, setHeadImg] = useState('')
    let [headImgOriginal, setHeadImgOriginal] = useState(null)
    let [open, setOpen] = useState(false)
    let [moduleId, setModuleId] = useState(null)
    let [projectHeaderId, setProjectHeaderId] = useState(null)

    const { fetchAPI } = useFetchAPI()

    const saveProjectHeader = async isEdit => {
        let body = {
            title: formData.title,
            description: formData.description,
            local: formData.local,
            partnership: formData.partnership,
            date: formData.date,
            areas,
            headImg: !headImg ? null : headImg._id,
            moduleColId: modulesCollectionId,
            moduleId: moduleId,
        }
        if (isEdit) {
            body.projectHeaderId = projectHeaderId
        }

        let method = isEdit ? 'PUT' : 'POST'

        let options = { method, body }

        try {
            let response = await fetchAPI('/project-header', options)
            let resObj = response.module
            resObj.component = response.data
            resObj.onComponent = 'ProjectHeader'
            handleModules(resObj, isEdit)
            updateFormData(resObj)
            if (!isEdit) {
                setModuleId(resObj._id)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateMedia = () => {
        saveProjectHeader(!!moduleId)
    }

    const deleteProjHeader = async () => {
        // If moduleId equal undefined or null -> remove it from the FE
        if (!moduleId) {
            removeComponentFromList(moduleId)
            return
        }

        let options = {
            method: 'DELETE',
            body: {
                projectHeaderId: projectHeaderId,
                moduleId: moduleId,
                modulesCollId: modulesCollectionId,
            },
        }

        try {
            let res = await fetchAPI(`/project-header`, options)
            if (res.success) {
                removeComponentFromList(moduleId)
                setModuleId(null)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const changeArea = (e, idx) => {
        let areasCopy = [...areas]
        areasCopy[idx] = e.target.value
        setAreas(areasCopy)
    }

    const handleHeadImg = data => setHeadImg(data)
    const handleOpen = data => setOpen(data)

    const updateFormData = module => {
        if (!!module._id) {
            let formKeys = Object.keys(initialFormDataState)
            let parentFormData = {}
            formKeys.forEach(key => {
                parentFormData[key] = module.component[key]
            })
            setFormData(parentFormData)
            setAreas(module.component.areas)
            if (module.component.headImg) {
                setHeadImgOriginal(module.component.headImg)
                setHeadImg(module.component.headImg)
            }
            setModuleId(module._id)
            setProjectHeaderId(module.component._id)
        }
    }

    const parseUpdateFormData = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value,
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
        moduleId,
    }
}
