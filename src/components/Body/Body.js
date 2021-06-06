import React, {useState, useRef, useEffect} from "react"

import "./Body.css"
import SideMenu from "../SideMenu/SideMenu"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Home from "../Home/Home"
import ProjectPage from "../ProjectPage/ProjectPage"
import About from "../About/About"
import SignUp from "../SignUp/SignUp"

import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";

const apiUrl  = process.env.REACT_APP_API_URL;

const Body = (props) => {

  let history = useHistory()
  console.log("HISTORY", history)
  const port = useRef(null)
  const [open, handleOpen] = useState("off")
  const [isProjectPage, handleIsProjectPage] = useState(false)
  const [isHome, handleIsHome] = useState(false)
  let [projects, handleProjects] = useState([])
  let [loading, handleLoading] = useState(true);



  // const sortProjects = (portfolio) => {
  //   let sortedProjects = []
  //   portfolio.forEach(i => {
  //     let project = portfolio.filter(proj => proj.name === i)[0];
  //     sortedProjects.push(project)
  //   })
  //   handleProjects(sortedProjects)
  //   handleLoading(false)
  // }

  const getPortfolio = async () => {
    handleLoading(true)
    try {
      const bckRes = await fetch(`${apiUrl}/portfolio` , {
        mode: 'cors',
        credentials: 'include'
      })
      const res = await bckRes.json()
      console.log("PROJECTSSS", res)
      if(res.success) {
        handleProjects(res.data.portfolio)
        handleLoading(false)
      } else throw Error('Failed to fetch portfolio')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPortfolio()
  },[])

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
              path="/projects/:project_name" 
              render={() => 
                <ProjectPage 
                  handleIsProjectPage={handleIsProjectPage}
                  projects={projects}
                  key={history.location.pathname}
                />
              }
            />
            {/* <Route exact path="/signup" render={() => <SignUp/>} /> */}
          </Switch>
        </section>
        <Footer/>
      </div>
    </div>
  )
}

export default Body;

