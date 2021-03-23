import React, {useState} from "react"

import PortRow from "./components/portRow/PortRow"
import "./Home.css"
import PortFolio from "./components/PortFolio/PortFolio"
import SideMenu from "../SideMenu/SideMenu"
import PortHeader from "../PortHeader/PortHeader"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import ViewMore from "../ViewMore/ViewMore"


const Home = () => {

  const [open, handleOpen] = useState("off")

  const openSide = (e) => {
    e.stopPropagation();
    handleOpen(true);
  }

  return (
    <div className="home-container">
      <SideMenu open={open} handleOpen={handleOpen} />
      <section className="site-body" onClick={() => handleOpen(false)}>
        <Header showArrow={true}/>
        <PortHeader/>
        <div id="projects" style={{height: "75px", width: "100%"}}></div>
        <PortFolio/>
        <div style={{height: "15px", width: "100%"}}></div>
        <ViewMore openSide={openSide}/>
        <Footer/>
      </section>
    </div>
  )
}

export default Home;

