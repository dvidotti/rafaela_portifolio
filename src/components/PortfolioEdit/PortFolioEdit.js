import React, {Component, useState, useEffect} from "react"
import {Container, Row, Col} from 'react-bootstrap'
import ProjectCoverSmall from "../ProjectCoverSmall/ProjectCoverSmall"
import GridLayout from 'react-grid-layout';


// import {projects, portfolio} from "../../../../data/projects"
import './PortFolioEdit.css'
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";

const apiUrl  = process.env.REACT_APP_API_URL;



class PortFolioEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [],
      portfolioId: null,
      loading: true,
      sortedProjectsIds: []

    }
  }
  
  handlePortfolio = (portfolio) => {
    this.setState({portfolio}, () => this.setState({loading: false}))
  }

  getPortfolio = async () => {
    this.setState({loading: true})
    try {
      const bckRes = await fetch(`${apiUrl}/portfolio` , {
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }),
        mode: 'cors',
        // credentials: 'include',
      })
      const res = await bckRes.json()
      console.log("PROJECTSSS", res)
      if(res.success) {
        let portfolio = res.data.portfolio.filter(
          project => typeof project.published !== 'undefined' &&  project.published === true
        )
        this.handlePortfolio(portfolio)
        this.setState({portfolioId:res.data._id})
      } else throw Error('Failed to fetch portfolio')
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getPortfolio()
  }

  generateLayout = () => {
    let counter = 0;
    let layout = this.state.portfolio.map((i, idx) => {
      if(counter === 3) counter = 0
      let objProject = {
        i: i.name, y: Math.floor(idx/3), x: counter , w: 1, h:1
        // i: (idx + 1).toString(), x: Math.floor(idx/3), y: counter , w: 1, h:1, maxW: 1,
      }
      counter += 1;
      return objProject
    })
    return layout
  }

  updateProjectsOrderIds = (layout) => {
    let sortedLayout = []
    let projectsSorted = []
    layout.forEach((i, idx) => {
      let oneLevelSorted = layout.filter(i => i.y === idx)
      oneLevelSorted.sort((a,b) => a.x - b.x)
      oneLevelSorted.forEach(i => {
        sortedLayout.push(i)
      })
    })
    let projectNamelist = sortedLayout.map(i => i.i)
    projectNamelist.forEach(projectName => {
      let portIdx = null;
      this.state.portfolio.forEach((item, idx) => {
        if(item.name === projectName) portIdx = idx
      })
      projectsSorted.push(this.state.portfolio[portIdx])
    })
    let sortedProjectsIds = projectsSorted.map(i => i._id)
    this.setState({sortedProjectsIds})
    console.log("SORTEDPROJECTs", projectsSorted)
  }

  savePortfolio = async () => {
    try {
      const bckRes = await fetch(`${apiUrl}/portfolio` , {
        method: "PUT",
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          portfolio: this.state.sortedProjectsIds,
          portfolioId: this.state.portfolioId
        })
      })
      let res = await bckRes.json()
    } catch(errors) {
      console.log("Failed to save portfolio", errors)
    }
  }

  render() {
    const layout = this.generateLayout()

    return (
      <section>
        <HeaderAdmin/>
        {!this.state.loading && this.state.portfolio.length > 0 ? (
          <div style={{padding: 20}}>
            <div style={{display: "flex", justifyContent: "flex-end", paddingRight: 20}}>
              <span onClick={() => this.savePortfolio()} className="clean-button force-big-padding">
                <span className="big-font">SAVE</span>
              </span>
            </div>
            <div style={{padding: "20px 50px"}}>
              <GridLayout 
                className="layout portfolio" 
                layout={layout}
                cols={3} 
                rowHeight={270} 
                width={1200}
                onLayoutChange={(layout) => this.updateProjectsOrderIds(layout)}
                >
                {this.state.portfolio.map((project, idx)=> (
                  <div key={project.name}>
                    <ProjectCoverSmall project={project} isPortfolioEdit={true}/>
                  </div>
                ))}
              </GridLayout>
            </div>
          </div>
        )
        :
        null
      }
      </section>
    )
  }
}

export default PortFolioEdit