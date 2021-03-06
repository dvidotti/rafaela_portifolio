import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProjectCoverSmall from 'components/ProjectCoverSmall/ProjectCoverSmall'

import './PortFolio.css'

const PortFolio = ({ loading, projects }) => {
    return (
        <Container fluid={true} className="porfolio">
            <Row noGutters>
                {!loading &&
                    projects.map((project, idx) => (
                        <Col key={idx} xs={12} md={4}>
                            <ProjectCoverSmall key={idx} project={project} />
                        </Col>
                    ))}
            </Row>
        </Container>
    )
}

export default PortFolio
