import React from 'react';

import {Container, Row, Col} from 'react-bootstrap'
import ProjectCoverSmall from 'components/ProjectCoverSmall/ProjectCoverSmall';


const ProjectGrid = (props) => {
  return (
      <Container fluid={true} className="porfolio" >
        <Row noGutters>
          {props.projects && props.projects.map((project, idx)=> (
            <Col key={idx} xs={12} md={4}>
              <ProjectCoverSmall getProjects={props.getProjects} key={idx} project={project} isEdit={true}/>
            </Col>
          ))}
        </Row>
      </Container>
  );
}

export default ProjectGrid;