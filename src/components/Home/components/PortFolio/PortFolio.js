import React from "react"
import {Container, Row, Col} from 'react-bootstrap'
import ProjectCoverSmall from "../../../ProjectCoverSmall/ProjectCoverSmall"
// import {projects, portfolio} from "../../../../data/projects"

import './PortFolio.css'




const PortFolio = (props) => {
  
  return (
    <Container fluid={true} className="porfolio">
        <Row noGutters>
          {!props.loading && props.projects.map((project, idx)=> (
            <Col key={idx} xs={12} md={4}>
              <ProjectCoverSmall key={idx} project={project}/>
            </Col>
          ))}
        </Row> 
    </Container>
  )
}

export default PortFolio;
