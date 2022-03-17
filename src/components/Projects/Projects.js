import React, {useState, useEffect} from 'react';

import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
// import './Medias.css'
import AddProject from './components/AddProject/AddProject'
import Dialog from '../Dialog/Dialog';
import ProjectGrid from './components/ProjectGrid/ProjectGrid';
// import MediaGrid from './components/MediaGrid/MediaGrid'

import { useGetPortfolio } from "hooks/useGetPorfolio"


const apiUrl  = process.env.REACT_APP_API_URL;


function Projects(props) {

  let [openAddProject, handleOpen] = useState(false)

  const {loading, projects, getPortfolio } = useGetPortfolio()

  return (
    <div>
      <Dialog
        open={openAddProject}
        children={
          <AddProject
            openAddProject={openAddProject}
            handleOpen={handleOpen}
            getProjects={getPortfolio}
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
        <ProjectGrid getProjects={getPortfolio} projects={projects}/>
      </section>
    </div>
  )
}

export default Projects;