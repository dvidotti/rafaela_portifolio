import React, {useEffect, useState} from "react";
import Dialog from '../Dialog/Dialog'
import DeleteDialog from '../DeleteDialog/DeleteDialog'

import {useParams, useHistory} from "react-router-dom";
import './ProjectEditor.css'
import { useGetProjectComponents } from 'hooks/useGetProjectComponents'

const componentsOptions = [
  {
    onModel:"ProjectHeader"
  }, 
  { 
    onModel:"FullImageModule"
  },
  {
    onModel:"DoublePicture"
  }
]

const ProjectEditor = () => {
  let { projectId } = useParams();

  const history = useHistory()
  const backToProjects = () =>{ 
    history.push('/admin/projects');
  }

  let [deleteDialog, handleDeleteDialog] = useState(false)
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
              onClick={() => handleDeleteDialog(true)}
              >Delete Project
            </button>
          </div>
        </div>
        </div>
      </section>

      <section style={{margin:"2px 2px 0px 0px", border: "4px solid black"}}>
        {parsedComponentList}
      </section>

      {/* TODO: Break bellow into a new component <ComponentsEditor/>*/}
      <section className="flex align-center" style={{padding: "65px 65px 100px 0px", border: "4px solid black", marginBottom: 50}}>
        <h1 style={{paddingLeft: 40}}>Add Component</h1>
          <div>
            <select
              style={{
                height: "60px",
                 width: "400px",
                 fontSize: "1.2rem",
                 margin:"0px 70px 0px 70px",
                padding: 5
              }}
              name="module"
              onChange={(e) => handleSelectedComponent(e)}
              >
              {componentsOptions.map((i, idx) => (
                <option key={idx} selected={i.onModel === selectedComponent.onModel}>{i.onModel}</option>
                )
              )}
            </select>
            <button 
              onClick={() => addComponentToList()} 
              className="clean-button white-bck force-big-padding"
              >+ ADD COMPONENT
            </button>
          </div>
        {/* </div> */}
      </section>
    </div>
  )
}

export default ProjectEditor;