import React, {useEffect, useState} from "react";
import Dialog from 'components/Dialog/Dialog'
import DeleteDialog from 'components/DeleteDialog/DeleteDialog'

import {useParams, useHistory} from "react-router-dom";
import './ProjectEditor.css'
import { useGetProjectComponents } from 'hooks/useGetProjectComponents'

const componentsOptions = [
  {
    onComponent:"ProjectHeader"
  }, 
  { 
    onComponent:"FullImageModule"
  },
  {
    onComponent:"DoublePicture"
  }
]

const ProjectEditor = () => {
  let { projectId } = useParams();

  const history = useHistory()
  const backToProjects = () =>{ 
    history.push('/admin/projects');
  }

  let [deleteDialog, setDeleteDialog] = useState(false)
  let [parsedComponentList, setParsedComponentList] = useState([])

  const { 
    componentsList,
    addComponentToList,
    handleSelectedComponent,
    selectedComponent,
    handleProjectMeta,
    projectMeta,
    updateProject,
    deleteProject,
    saved,
    loading
   } = useGetProjectComponents(projectId, backToProjects, true)

 
  useEffect(()=> {
    setParsedComponentList(componentsList)
  }, [componentsList])
   

  return (
    <div className="mgLeft60">
      <Dialog
        open={deleteDialog}
        children={
          <DeleteDialog
            title={'Delete Project'}
            message={'Are you sure you want to delete this project'}
            closeDialog={setDeleteDialog}
            deleteAction={deleteProject}
          />
        }
        >
      </Dialog>

      <section className="top-control-container">
        <div className="top-control-header">
          <h1 className="mgRight15">Project Infos</h1>
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
                name="name"
                type="text"
                placeholder="Name"
                value={projectMeta.name}
                onChange={(e) => handleProjectMeta(e)}
              />
            </div>
            <div className="horizontal-input">
              <label className="horizontal-label"  htmlFor="type">Type</label>
              <input
                id="type"
                name="type"
                type="text"
                placeholder="Type"
                value={projectMeta.type}
                onChange={(e) => handleProjectMeta(e)}
              />
            </div>
          </div>

          <div className="project-box-input">
            <div className="horizontal-input">
              <label className="horizontal-label"  htmlFor="areas">Areas</label>
              <input
                id="areas"
                name="areas"
                type="text"
                placeholder="Areas"
                value={projectMeta.areas}
                onChange={(e) => handleProjectMeta(e)}
              />
            </div>
            <div className="horizontal-input">
              <div>
                <label className="horizontal-label"  htmlFor="link">Link</label>
              </div>
              <input
                id="link"
                name="link"
                type="text"
                placeholder="Link"
                value={projectMeta.link}
                onChange={(e) => handleProjectMeta(e)}
              />
            </div>
          </div>

          <div className="project-box-input">
            <div className="horizontal-input-auto">
              <input
                id="published"
                name="published"
                type="checkbox"
                placeholder="Published"
                checked={projectMeta.published}
                value={projectMeta.published}
                onChange={(e) => handleProjectMeta(e)}
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
              onClick={() => setDeleteDialog(true)}
              >Delete Project
            </button>
          </div>
        </div>
        </div>
      </section>

      <section className="component-list-container">
        {parsedComponentList}
      </section>

      {/* TODO: Break bellow into a new component <ComponentsEditor/>*/}
      <section className="bottom-control-container">
        <h1 className="pdLeft40">Add Component</h1>
        <div>
          <select
            className="select-component"
            name="module"
            onChange={(e) => handleSelectedComponent(e)}
            >
            {componentsOptions.map((i, idx) => (
              <option 
                key={idx} 
                selected={i.onComponent === selectedComponent.onComponent}
              >
                {i.onComponent}
              </option>
              )
            )}
          </select>
          <button 
            onClick={() => addComponentToList()} 
            className="clean-button white-bck force-big-padding"
            >+ ADD COMPONENT
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProjectEditor;