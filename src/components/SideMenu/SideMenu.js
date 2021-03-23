import React, {useState} from "react"

import './SideMenu.css'

let projectList = [
  "Caellum",
  "Vooz",
  "Curt's Table",
  "Natura",
  "Melissa",
  "DaniloVidotti",
  "Key",
  "Fabula Sonora",
  "Caellum",
  "Vooz",
  "Curt's Table",
  "Natura",
  "Melissa",
  "DaniloVidotti",
  "Key",
  "Fabula Sonora"
];


const SideMenu = (props) => {

  

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
                <div className="side-menu-item-container">
                  <button className="side-menu-item">
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