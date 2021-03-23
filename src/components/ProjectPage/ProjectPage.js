import React, {useState} from "react";
import {projects} from "../../data/projects"

import SideMenu from "../SideMenu/SideMenu"
import Header from "../Header/Header.js"
import Footer from "../Footer/Footer.js"
import ProjectHeader from "./components/ProjectHeader/ProjectHeader"
import FullProjectPictures from "./components/FullProjectsPictures/FullProjectsPictures"
import "../Home/Home.css";

const ProjectPage = (props) => {
  let project_link = props.match.params.project_name
  console.log(projects)
  
  let project = projects.filter(i => i.link === project_link)[0]

  const [open, handleOpen] = useState("off")

  return (
    <div className="home-container">
      <SideMenu open={open} handleOpen={handleOpen} />  
      <section className="site-body" onClick={() => handleOpen(false)}>
        <Header/>
        <ProjectHeader project={project}/>
        <div id="projects" style={{height: "75px", width: "100%"}}></div>
        <FullProjectPictures project={project}/>
        <div id="projects" style={{height: "75px", width: "100%"}}></div>
        <Footer/>
      </section>
    </div>
  )
}

export default ProjectPage;