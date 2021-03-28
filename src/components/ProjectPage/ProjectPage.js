import React, {useState, useEffect} from "react";
import {projects} from "../../data/projects"

import {useParams} from "react-router-dom";

import ProjectHeader from "./components/ProjectHeader/ProjectHeader"
import FullProjectPictures from "./components/FullProjectsPictures/FullProjectsPictures"

const ProjectPage = (props) => {
  let params = useParams()
  let project_link = params.project_name
  console.log(projects)
  
  let project = projects.filter(i => i.link === project_link)[0]

  useEffect(() => {
    props.handleArrow(false)
    props.handleIsProjectPage(true)
    return function cleanup() {
      props.handleIsProjectPage(false)
    }
  })

  return (
    <div>
      <ProjectHeader project={project}/>
      <div id="projects" style={{height: "75px", width: "100%"}}></div>
      <FullProjectPictures project={project}/>
      <div id="projects" style={{height: "75px", width: "100%"}}></div>
    </div>
  )
}

export default ProjectPage;