import React, {useState} from "react"

import SideMenu from "../SideMenu/SideMenu"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import AboutInfo from "./components/AboutInfo"

import "../Home/Home.css"

const About = () => {

  const [open, handleOpen] = useState("off")

  const openSide = (e) => {
    e.stopPropagation();
    handleOpen(true);
  }

  return (
    <div className="home-container">
      <SideMenu open={open} handleOpen={handleOpen} />
      <section className="site-body" onClick={() => handleOpen(false)}>
        <Header/>
        <div id="projects" style={{height: "75px", width: "100%"}}></div>
        <AboutInfo /> 
        <div style={{height: "15px", width: "100%"}}></div>
        <Footer/>
      </section>
    </div>
  )
}

export default About;

