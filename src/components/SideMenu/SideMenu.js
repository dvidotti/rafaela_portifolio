import React from "react";
import { useHistory } from "react-router-dom";

import './SideMenu.css'

// import {projects} from "../../data/projects"



const SideMenu = (props) => {
  
  let projectList = props.projects.map(i => i.name).sort()
  let history = useHistory({forceRefresh:true})

  const redirectTo = (projectName) => {
    const project = props.projects.filter(i => i.name === projectName)[0]
    if(history.location.pathname.includes('projects')){
      history.push(`${project.link}`)
    } else history.push(`projects/${project.link}`)
    props.handleOpen(false)
  }

  const sideMenuClass = props.open === "off" ? 
    "" : 
      props.open ?
      'menu-opened' 
      : 'menu-closed'

  return (
    <div>
      <div className={`toggled-side-menu ${sideMenuClass}`}>
        <div className="side-menu-inner-container">
          <div className="side-menu-header">
            <div>
              <span className="header-font mini-title" onClick={() => history.push("/")}>RV</span>
            </div>
            <button 
              className="fake-button" 
              onClick={() => props.handleOpen(false)}
              >
              <span>
                <img className="x-button" src="/imgs/rv_icon_close.svg"></img>
              </span>
            </button>
          </div>
          <div className="side-menu-body">
            {/* {props.projects.map((i,idx) => { */}
            {projectList.map((i,idx) => {
              return (
                <div key={idx} className="side-menu-item-container">
                  <button onClick={() => redirectTo(i)} className="side-menu-item">
                    {i}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="side-menu-container">
          <div className="text-out-container">
            <div className="text-box">
              <button 
                className="fake-button" 
                onClick={() => props.handleOpen(true)}
                >
                <span className="hover-bottom-border">PROJECTS</span>
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SideMenu;