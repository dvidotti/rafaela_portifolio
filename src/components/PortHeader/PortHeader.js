import React, {useState, useEffect} from "react";
import { projects } from "../../data/projects";
import {Link} from "react-router-dom";


import "./PortHeader.css"


const PortHeader = () => {
  let [projectNumber, handleProject] = useState(1);
  let [time, handleTime] = useState(0);
  let [seconds, handleSeconds] = useState(100);
  let [isLoaded, handleIsLoaded] = useState(false)

  const timer = () => {
    if(seconds === 1000) {
      changeProject()
      handleSeconds(0);
    } 
  }


  const changeProject = () => {
    if(projectNumber === 3) {
      handleProject(1)
    } else handleProject(projectNumber + 1);
  }


  useEffect(() => {
    const interval = setInterval(() => {
      handleSeconds(seconds =>  seconds + 1);
      handleIsLoaded(true);
    }, 10)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // console.log("TIME2", seconds)
    timer()
    // return () => {
    //   cleanup
    // }
  }, [seconds])

  // redirectTo = (url) => {
  //   history.push(url)
  // }



  return (
    <section className="portfolio-big-window">
      <div className="frame-container">
        <video className={`video-big-portfolio ${projectNumber === 1  ? "slide-video" : "slide-out"}`} autoPlay muted loop>
          <source src="video/video1.mp4"></source>
        </video>
        <video className={`video-big-portfolio ${projectNumber === 2 ? "slide-video" : "slide-out"}`} autoPlay muted loop>
          <source src="video/video2.mp4"></source>
        </video>
        <video className={`video-big-portfolio ${projectNumber === 3 ? "slide-video" : "slide-out"}`} autoPlay muted loop>
          <source src="video/video3.mp4"></source>
        </video>
      </div>
      <div className="control-container">
        <div 
          className={`box1 ${projectNumber === 1 && isLoaded? "box-big": ""}`}
          >
          <Link className="no-link-decoration--portHeader" to="projects/curt_table">
            <div className={`${projectNumber === 1 ? "overlay": "" }`}></div>
            <span className="inner-text-box">
              <div className="text-box-projects">Caelum _ Branding & Design</div>
            </span>
          </Link>
        </div>

        <div
          className={`box2 ${projectNumber === 2 ? "box-big": ""}`}
          >
          <Link className="no-link-decoration--portHeader" to="projects/curt_table">
            <div className={`${projectNumber === 2 ? "overlay": "" }`}></div>
            <span className="inner-text-box">
              <div className="text-box-projects">Expor Revestir</div> 
            </span>
          </Link>
        </div>

        <div
          className={`box3 ${projectNumber === 3 ? "box-big": ""}`}>
          <Link className="no-link-decoration--portHeader" to="projects/curt_table">
            <div className={`${projectNumber === 3 ? "overlay": "" }`}></div>
            <span className="inner-text-box">
              <div className="text-box-projects">Raison Pure</div>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PortHeader;