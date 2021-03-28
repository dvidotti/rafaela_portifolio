import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import './SideMenu.css'

import {projects} from "../../data/projects"


let projectList = projects.map(i => i.name).sort()

const SideMenu = (props) => {

  let history = useHistory()

  const redirectTo = (projectName) => {
    console.log(projectName)
    const project = projects.filter(i => i.name === projectName)[0]
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
              <span className="header-font">RV</span>
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
                >PROJECTS
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SideMenu;