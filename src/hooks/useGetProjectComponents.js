import { useState, useEffect, useRef } from 'react'
import ProjectHeaderEdit from 'screens/ProjectEditor/components/ProjectHeaderEdit/ProjectHeaderEdit'
import FullProjectPicturesEditor from 'screens/ProjectEditor/components/FullProjectPicturesEditor/FullProjectPicturesEditor'
import DoublePictureEdit from 'screens/ProjectEditor/components/DoublePictureEdit/DoublePictureEdit'

import ProjectHeader from 'screens/HomePage/components/ProjectPage/components/ProjectHeader/ProjectHeader'
import FullProjectPictures from 'screens/HomePage/components/ProjectPage/components/FullProjectsPictures/FullProjectsPictures'
import DoublePicture from 'screens/HomePage/components/ProjectPage/components/DoublePicture/DoublePicture'
import { useFetchAPI } from './useFetchAPI'

const initialProjectMeta = {
    areas: '',
    link: '',
    name: '',
    type: '',
    published: '',
}

export const useGetProjectComponents = (
    projectId,
    backToProjects,
    isEditPage
) => {
    let [modules, setModules] = useState([])
    let [componentsList, setCompList] = useState([])
    let [modulesCollectionId, setModulesCollectionId] = useState('')
    let [selectedComponent, setSelectComponent] = useState({
        onComponent: 'ProjectHeader',
    })
    let [isEdit, setIsEdit] = useState(false)
    let [projectMeta, setProjectMeta] = useState(initialProjectMeta)
    let [saved, setSaved] = useState(false)
    let [loading, setLoading] = useState(true)

    const portPict = useRef(null)

    const { fetchAPI } = useFetchAPI()

    useEffect(() => {
        setIsEdit(isEditPage)
        if (!!projectId) getProject()
    }, [])

    const getProject = async id => {
        let projId = projectId || id
        setLoading(true)
        try {
            let res = await fetchAPI(`/project/${projId}`)
            if (res.modules) {
                setProjectMeta(res)
                setModulesCollectionId(res.modules)
                getComponentsCollection(res.modules)
                setSaved(true)
                setLoading(false)
            } else {
                console.error('Modules ID does not exist in the project')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getComponentsCollection = async modulesCollectionId => {
        try {
            const res = await fetchAPI(`/modules/${modulesCollectionId}`)
            if (res.success) {
                setModules(res.data.modules)
            } else console.error('Failed to fetch components collection')
        } catch (errors) {
            console.error(errors)
        } finally {
            setLoading(false)
        }
    }

    const handleProjectMeta = e => {
        if (e.target.name === 'published') {
            setProjectMeta(meta => ({
                ...meta,
                published: !meta.published,
            }))
        } else {
            setProjectMeta(meta => ({
                ...meta,
                [e.target.name]: e.target.value,
            }))
        }
        setSaved(false)
    }

    const handleSelectedComponent = e => {
        let parsedSelectedComp = { onComponent: e.target.value }
        setSelectComponent(parsedSelectedComp)
    }

    const handleModules = (module, isEditModule) => {
        if (isEditModule) {
            setModules(l => {
                let list = [...l]
                let idx = list.findIndex(i => i._id === module._id)
                list[idx] = module
                return list
            })
        } else {
            setModules(l => {
                let list = [...l]
                list = list.filter(i => !!i._id) // remove comp without id
                list.push(module)
                return list
            })
        }
    }

    const deleteProject = async () => {
        let body = {
            modCollId: modulesCollectionId,
        }
        let options = {
            body,
            method: 'DELETE',
        }
        try {
            await fetchAPI(`/project/${projectId}`, options)
            backToProjects()
        } catch (error) {
            console.error(error)
        }
    }

    const updateProject = async () => {
        const body = projectMeta
        body.projectId = projectId
        const options = {
            body,
            method: 'PUT',
        }
        try {
            let res = await fetchAPI(`/project/`, options)
            getProject()
        } catch (error) {
            console.error(error)
        }
    }

    const mapCollectionItemToComponent = (module, idx) => {
        let component = null
        // IF item still doesn't have a onComponent property, it's a new component
        // Item in this case component will be the module name (ProjectHeader, FullImageModule and so on ...)
        let componentModelName = module.onComponent
        if (isEdit) {
            switch (componentModelName) {
                case 'ProjectHeader':
                    component = (
                        <ProjectHeaderEdit
                            key={module._id || idx}
                            module={module}
                            modulesCollectionId={modulesCollectionId}
                            removeComponentFromList={removeComponentFromList}
                            handleModules={handleModules}
                        />
                    )
                    break
                case 'FullImageModule':
                    component = (
                        <FullProjectPicturesEditor
                            key={module._id || idx}
                            // id={module._id}
                            module={module}
                            // getProject={getProject}
                            // module={!module.onComponent ? null : module }
                            modulesCollectionId={modulesCollectionId}
                            removeComponentFromList={removeComponentFromList}
                            handleModules={handleModules}
                        />
                    )
                    break
                case 'DoublePicture':
                    component = (
                        <DoublePictureEdit
                            key={module._id || idx}
                            id={module._id || idx}
                            module={
                                typeof module.onComponent === 'undefined'
                                    ? null
                                    : module
                            }
                            // refProp={portPict}
                            modulesCollectionId={modulesCollectionId}
                            // getProject={getProject}
                        />
                    )
                    break
            }
        } else {
            switch (componentModelName) {
                case 'ProjectHeader':
                    component = (
                        <ProjectHeader
                            refProp={portPict}
                            module={module}
                            scrollTo={scrollTo}
                        />
                    )
                    break
                case 'FullImageModule':
                    component = (
                        <FullProjectPictures
                            key={module._id || idx}
                            id={module._id || idx}
                            module={module}
                            refProp={portPict}
                        />
                    )
                    break
                case 'DoublePicture':
                    component = (
                        <DoublePicture
                            key={module._id || idx}
                            id={module._id || idx}
                            project={module}
                            refProp={portPict}
                        />
                    )
                    break
            }
        }
        return component
    }

    // From list of modules create a list of components and update modules state
    const createComponentsList = () => {
        // idx used as a key while creating new components
        // if item has ._id used that as key instead
        let compList = modules.map((item, idx) =>
            mapCollectionItemToComponent(item, idx)
        )
        setCompList(compList)
    }

    // Update components list when the modules list changes
    useEffect(
        () => {
            createComponentsList()
        },
        [modules]
    )

    const addComponentToList = () => {
        setModules(l => {
            let list = [...l]
            list.push(selectedComponent)
            return list
        })
    }

    // Create a new filtered list
    // Filters components without an id and the one matching the id arg.
    const removeComponentFromList = id => {
        let filteredList = modules.filter(item => {
            if (!item._id) return false
            if (!item.component) return false
            if (item._id == id) return false
            else return true
        })
        setModules(filteredList)
    }

    const scrollTo = reference => {
        reference.current.scrollIntoView()
    }

    return {
        getComponentsCollection,
        componentsList,
        getProject,
        handleSelectedComponent,
        selectedComponent,
        addComponentToList,
        handleProjectMeta,
        projectMeta,
        updateProject,
        deleteProject,
        saved,
        loading,
    }
}
