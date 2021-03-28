import React, {useEffect} from "react"

import "./Home.css"
import PortFolio from "./components/PortFolio/PortFolio"
import PortHeader from "../PortHeader/PortHeader"
import ViewMore from "../ViewMore/ViewMore"


const Home = (props) => {

  useEffect(() => {
    props.handleIsHome(true)
    return function cleanup() {
      props.handleIsHome(false)
    }
  })

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