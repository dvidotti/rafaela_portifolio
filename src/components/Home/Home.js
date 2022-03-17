import React, {useEffect, useState} from "react"

import "./Home.css"
import PortFolio from "./components/PortFolio/PortFolio"
import PortHeader from "../PortHeader/PortHeader"
import ViewMore from "../ViewMore/ViewMore"


const Home = (props) => {
  let [projects, handleProject] = useState([])

  useEffect(() => {
    props.handleIsHome(true)
    return function cleanup() {
      props.handleIsHome(false)
    }
  })

  useEffect(() => {
    let projectList = props.projects.filter(project => !!project.published)
    handleProject(projectList)
  }, [props.projects])

  return (
    <div style={{width: "100%"}}>
      <PortHeader/>
      <div ref={props.refProp} style={{height: "75px", width: "100%"}}></div>
      <PortFolio projects={projects} loading={props.loading}/>
      <div style={{height: "15px", width: "100%"}}></div>
      <ViewMore openSide={props.openSide}/>
    </div> 
  )
}


export default Home;