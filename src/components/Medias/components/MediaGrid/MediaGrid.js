import React from 'react';

import {Container, Row, Col} from 'react-bootstrap'
import MediaUnit from '../MediaUnit/MediaUnit'


const MediaGrid = (props) => {
  const {mediaList} = props;
  return (
      <Container fluid={true} >
        <Row>
          {mediaList.map((media, idx) => {
            return (
              <Col key={idx} xs={12} md={4}>
                <MediaUnit handleFetchMedias={props.handleFetchMedias} media={media}/>
              </Col>
            )
          })}
        </Row>
      </Container>
  )
}

export default MediaGrid;