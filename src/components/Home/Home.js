import React, { useEffect, useState } from 'react'

import './Home.css'
import PortFolio from 'components/Home/components/PortFolio/PortFolio'
import PortHeader from 'components/PortHeader/PortHeader'
import ViewMore from 'components/ViewMore/ViewMore'

const Home = props => {
    let [projects, setProject] = useState([])

    useEffect(() => {
        props.handleIsHome(true)
        return function cleanup() {
            props.handleIsHome(false)
        }
    })

    useEffect(
        () => {
            let projectList = props.projects.filter(
                project => !!project.published
            )
            setProject(projectList)
        },
        [props.projects]
    )

    return (
        <div className="home-body">
            <PortHeader />
            <div ref={props.refProp} className="white-divider75" />
            <PortFolio projects={projects} loading={props.loading} />
            <div className="white-divider15" />
            <ViewMore openSide={props.openSide} />
        </div>
    )
}

export default Home
