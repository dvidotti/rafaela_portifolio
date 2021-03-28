import React, {useState, useRef,  useEffect} from "react"

import "./Home.css"
import PortFolio from "./components/PortFolio/PortFolio"
import SideMenu from "../SideMenu/SideMenu"
import PortHeader from "../PortHeader/PortHeader"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import ViewMore from "../ViewMore/ViewMore"


const Home = (props) => {
  // const port = props.port;
  const [open, handleOpen] = useState("off")



  useEffect(() => {
    props.handleIsHome(true)
    return function cleanup() {
      props.handleIsHome(false)
    }
  })

  // const scrollTo = (reference) => {
  //   reference.current.scrollIntoView()
  // } 

  return (
    <div>
      <PortHeader/>
      <div ref={props.refProp} style={{height: "75px", width: "100%"}}></div>
      <PortFolio/>
      <div style={{height: "15px", width: "100%"}}></div>
      <ViewMore openSide={props.openSide}/>
    </div> 
  )
}


export default Home;


//   return (
//     <div className="home-container">
//       <SideMenu open={open} handleOpen={handleOpen} />
//       <section className="site-body" onClick={(e) => openSide(e)}>
//         <Header showArrow={true} port={port} scrollTo={scrollTo}/>
//         <PortHeader/>
//         <div ref={port} style={{height: "75px", width: "100%"}}></div>
//         <PortFolio/>
//         <div style={{height: "15px", width: "100%"}}></div>
//         <ViewMore handleOpen={handleOpen} open={open}/>
//         <Footer/>
//       </section>
//     </div>
//   )
// }