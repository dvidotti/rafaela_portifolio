import React, {Component, useState, useEffect} from "react"
import {Container, Row, Col} from 'react-bootstrap'
import ProjectCoverSmall from "../ProjectCoverSmall/ProjectCoverSmall"
import GridLayout from 'react-grid-layout';


// import {projects, portfolio} from "../../../../data/projects"
import './PortFolioEdit.css'

const apiUrl  = process.env.REACT_APP_API_URL;



class PortFolioEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [],
      loading: true
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
        credentials: 'include',
      })
      const res = await bckRes.json()
      console.log("PROJECTSSS", res)
      if(res.success) this.handlePortfolio(res.data.portfolio)
      else throw Error('Failed to fetch portfolio')
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
        i: idx, x: Math.floor(idx/3), y: counter , w: 1, h:4, maxW: 1,
      }
      counter += 1;
      return objProject
    })
    console.log("LAYOUT", layout)
  }
  
  // useEffect(() => {
  //   getPortfolio()
  // },[])
  
  // useEffect(() => {
  //   handleLoading(false)
  //   console.log("PORTFOLIO", portfolio)
  // }, [portfolio])
 render() {
    const layout = this.generateLayout()
    // const layout = [
    //   {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    //   {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    //   {i: 'c', x: 4, y: 0, w: 1, h: 2}
    // ]



  return !this.state.loading && this.state.portfolio.length > 0? (
    <GridLayout className="layout portfolio" layout={layout} cols={3} rowHeight={290} width={1200} >
      {this.state.portfolio.map((project, idx)=> (
        <div key={idx}>
          <ProjectCoverSmall project={project} isPortfolioEdit={true}/>
        </div>
      ))}
    </GridLayout>
  )
  :
  null
 }
}

export default PortFolioEdit;

// className="porfolio" 