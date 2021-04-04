import React, {useEffect, useRef} from "react";
import {projects} from "../../data/projects"

import {useParams} from "react-router-dom";

import ProjectHeader from "./components/ProjectHeader/ProjectHeader"
import FullProjectPictures from "./components/FullProjectsPictures/FullProjectsPictures"

const ProjectPage = (props) => {
  const portPict = useRef(null)
  let params = useParams()
  let project_link = params.project_name
  
  let project = projects.filter(i => i.link === project_link)[0]

  useEffect(() => {
    props.handleIsProjectPage(true)
    return function cleanup() {
      props.handleIsProjectPage(false)
    }
  })

  const scrollTo = (reference) => {
    reference.current.scrollIntoView()
  } 

  return (
    <div>
      <ProjectHeader scrollTo={scrollTo} project={project} refProp={portPict}/>
      <div id="projects" style={{height: "75px", width: "100%"}}></div>
      <FullProjectPictures refProp={portPict} project={project}/>
      <div id="projects" style={{height: "75px", width: "100%"}}></div>
    </div>
  )
}

export default ProjectPage;