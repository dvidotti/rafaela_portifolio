import React, {useState, useRef} from "react"

import "./Body.css"
import SideMenu from "../SideMenu/SideMenu"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Home from "../Home/Home"
import ProjectPage from "../ProjectPage/ProjectPage"
import About from "../About/About"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";

const Body = (props) => {
  const port = useRef(null)
  const [open, handleOpen] = useState("off")
  const [showArrow, handleArrow] = useState(true)
  const [isProjectPage, handleIsProjectPage] = useState(false)
  const [isHome, handleIsHome] = useState(false)

  const closeSide = (e) => {
    e.stopPropagation();
    if(open === true) handleOpen(false);
  }

  const openSide = (e) => {
    e.stopPropagation();
    if(open === false) handleOpen(true);
  }

  const scrollTo = (reference) => {
    reference.current.scrollIntoView()
  } 

  return (
    <div className="body-container">
      <SideMenu open={open} handleOpen={handleOpen} />
      <div>
        <Header 
          showArrow={isHome} 
          port={port} 
          scrollTo={scrollTo} 
          handleArrow={handleArrow}
          isProjectPage={isProjectPage}
        />

        <section className="site-body" onClick={(e) => closeSide(e)}>
          <Switch>
            <Route 
              exact path="/" 
              render={() => 
                <Home 
                  refProp={port} 
                  handleIsHome={handleIsHome} 
                  openSide={openSide}
                />
              }
            />
            <Route exact path="/about" render={() => <About/>}/>
            <Route 
              path="/projects/:project_name" 
              render={() => 
                <ProjectPage 
                  handleIsProjectPage={handleIsProjectPage} 
                  handleArrow={handleArrow}
                />
              }
            />
          </Switch>
        </section>
        <Footer/>
      </div>
    </div>
  )
}

export default Body;

