import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import MediaUnit from './components/MediaUnit/MediaUnit'

const MediaGrid = props => {
    const { mediaList, choseMedia } = props
    return (
        <Container fluid={true}>
            <Row>
                {mediaList.map((media, idx) => {
                    return (
                        <Col key={idx} xs={12} md={4}>
                            <MediaUnit
                                choseMedia={choseMedia}
                                getMedias={props.getMedias}
                                media={media}
                                cover={props.cover}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default MediaGrid
