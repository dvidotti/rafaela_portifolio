import React from "react"
import {Container, Row, Col} from 'react-bootstrap'
import ProjectCoverSmall from "../../../ProjectCoverSmall/ProjectCoverSmall"
import {projects} from "../../../../data/projects"

import './PortFolio.css'



const PortFolio = () => {

  return (
      <Container fluid={true} className="porfolio" >
        <Row noGutters>
          {projects.map((project, idx)=> (
            <Col xs={12} md={4}>
              <ProjectCoverSmall key={idx} project={project}/>
            </Col>
          ))}
        </Row>
      </Container>
  )
}

export default PortFolio;
