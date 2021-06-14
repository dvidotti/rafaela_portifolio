import React, {useState, useEffect} from 'react';

import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
// import './Medias.css'
import AddProject from './components/AddProject/AddProject'
import Dialog from '../Dialog/Dialog';
import ProjectGrid from './components/ProjectGrid/ProjectGrid';
// import MediaGrid from './components/MediaGrid/MediaGrid'

const apiUrl  = process.env.REACT_APP_API_URL;


function Projects(props) {

  let [projects, handleProjects] = useState([]);
  let [openAddProject, handleOpen] = useState(false)

  useEffect(() => {
    getProjects()
  }, [])

  const getProjects = async () => {
    try {
      const bckRes = await fetch(`${apiUrl}/portfolio` , {
        mode: 'cors',
      })
      const res = await bckRes.json()
      console.log("PROJECTSSS", res)
      if(res.success) handleProjects(res.data.portfolio)
      else throw Error('Failed to fetch portfolio')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Dialog
        open={openAddProject}
        children={
          <AddProject
            openAddProject={openAddProject}
            handleOpen={handleOpen}
            getProjects={getProjects}
          />
        }
      />
      <HeaderAdmin
          showArrow={false} 
          isProjectPage={false}
      />
      <section className="media-section">
        <div className="margin-bottom-20 justify-flex-right padding-20">
          <span onClick={() => handleOpen(true)} className="clean-button force-big-padding">
            <span className="big-font">Add Project</span>
          </span>
        </div>
        <ProjectGrid getProjects={getProjects} projects={projects}/>
      </section>
    </div>
  )
}

export default Projects;