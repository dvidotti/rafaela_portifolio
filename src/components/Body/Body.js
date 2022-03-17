import React, {useState, useRef, useEffect} from "react"

import "./Body.css"
import SideMenu from "components/SideMenu/SideMenu"
import Footer from "components/Footer/Footer"
import Header from "components/Header/Header"
import Home from "components/Home/Home"
import ProjectPage from "components/ProjectPage/ProjectPage"
import About from "components/About/About"
import PageNotFound from "components/PageNotFound/PageNotFound"

import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import { useGetPortfolio } from "hooks/useGetPorfolio"

const Body = (props) => {

  let history = useHistory()
  const port = useRef(null)
  const [open, handleOpen] = useState("off")
  const [isProjectPage, handleIsProjectPage] = useState(false)
  const [isHome, handleIsHome] = useState(false)

  const {loading, projects, getPortfolio } = useGetPortfolio()
  console.log("PROJECTS", projects)

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

  useEffect(() => {
    console.log("Is HOMMI ???? ---->", isHome)
  },[isHome])

  useEffect(() => {
    console.log("Is isProjectPage ???? ---->", isProjectPage)
  },[isProjectPage])

  return (
    <div className="body-container">
      {!loading && 
        <SideMenu 
          open={open} 
          handleOpen={handleOpen} 
          projects={projects}
        />
      }
      <div style={{width: "100%"}}>
        <Header 
          showArrow={isHome} 
          port={port} 
          scrollTo={scrollTo} 
          isProjectPage={isProjectPage}
          user={props.user}
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
                  projects={projects}
                  loading={loading}
                />
              }
            />
            <Route exact path="/about" render={() => <About/>}/>
            <Route 
              exact path="/projects/:project_name" 
              render={() => 
                <ProjectPage 
                  handleIsProjectPage={handleIsProjectPage}
                  projects={projects}
                  key={history.location.pathname}
                  getPortfolio={getPortfolio}
                />
              }
            />
            <Route path="*" component={PageNotFound}/>
          </Switch>
        </section>
        <Footer/>
      </div>
    </div>
  )
}

export default Body;

