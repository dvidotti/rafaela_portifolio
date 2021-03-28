import React from "react"
import {Container, Row, Col} from 'react-bootstrap'
import ProjectCoverSmall from "../../../ProjectCoverSmall/ProjectCoverSmall"
import {projects, portfolio} from "../../../../data/projects"

import './PortFolio.css'

let orderedProjects = []
portfolio.forEach(i => {
  let project = projects.filter(proj => proj.name === i)[0];
  orderedProjects.push(project)
})

const PortFolio = () => {

  return (
      <Container fluid={true} className="porfolio" >
        <Row noGutters>
          {orderedProjects.map((project, idx)=> (
            <Col xs={12} md={4}>
              <ProjectCoverSmall key={idx} project={project}/>
            </Col>
          ))}
        </Row>
      </Container>
  )
}

export default PortFolio;
