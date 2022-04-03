import React, { useState, useEffect } from 'react'
// import { projects } from "../../data/projects";
import { Link } from 'react-router-dom'

import './PortHeader.css'

const PortHeader = () => {
    let [projectNumber, setProject] = useState(1)
    let [time, setTime] = useState(100)
    let [isLoaded, setIsLoaded] = useState(false)

    const timer = () => {
        if (time === 1000) {
            changeProject()
            setTime(100)
        }
    }

    const changeProject = () => {
        if (projectNumber === 3) setProject(1)
        else setProject(projectNumber + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(s => s + 1)
        }, 10)
        setIsLoaded(true)
        return () => clearInterval(interval)
    }, [])

    // Couldn't control state using ref,
    // timer() lose reference if called in setInterval
    // so time dep is doing the same as milisec, probably change to only trac
    useEffect(
        () => {
            timer()
        },
        [time]
    )

    return (
        <section className="portfolio-big-window">
            <div className="frame-container">
                <a href="/projects/caelum">
                    <video
                        playsInline
                        className={`video-big-portfolio ${
                            projectNumber === 1 ? 'slide-video' : 'slide-out'
                        }`}
                        autoPlay
                        muted
                        loop
                    >
                        <source src="video/video1.mp4" />
                    </video>
                </a>
                <a href="/">
                    <video
                        playsinline
                        className={`video-big-portfolio ${
                            projectNumber === 2 ? 'slide-video' : 'slide-out'
                        }`}
                        autoPlay
                        muted
                        loop
                    >
                        <source src="video/video2.mp4" />
                    </video>
                </a>
                <a href="/">
                    <video
                        playsinline
                        className={`video-big-portfolio ${
                            projectNumber === 3 ? 'slide-video' : 'slide-out'
                        }`}
                        autoPlay
                        muted
                        loop
                    >
                        <source src="video/video3.mp4" />
                    </video>
                </a>
            </div>
            <div className="control-header-container">
                <div
                    className={`box1 ${
                        projectNumber === 1 && isLoaded ? 'box-big' : ''
                    }`}
                >
                    <Link
                        className="no-link-decoration--portHeader"
                        to="projects/caelum"
                    >
                        <div
                            className={`${
                                projectNumber === 1 ? 'overlay' : ''
                            }`}
                        />
                        <span className="inner-text-box">
                            <div className="text-box-projects">
                                Caelum _ Branding & Design
                            </div>
                        </span>
                    </Link>
                </div>

                <div className={`box2 ${projectNumber === 2 ? 'box-big' : ''}`}>
                    <Link
                        className="no-link-decoration--portHeader"
                        to="projects/curt_table"
                    >
                        <div
                            className={`${
                                projectNumber === 2 ? 'overlay' : ''
                            }`}
                        />
                        <span className="inner-text-box">
                            <div className="text-box-projects">
                                Expor Revestir
                            </div>
                        </span>
                    </Link>
                </div>

                <div className={`box3 ${projectNumber === 3 ? 'box-big' : ''}`}>
                    <Link
                        className="no-link-decoration--portHeader"
                        to="projects/curt_table"
                    >
                        <div
                            className={`${
                                projectNumber === 3 ? 'overlay' : ''
                            }`}
                        />
                        <span className="inner-text-box">
                            <div className="text-box-projects">Raison Pure</div>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default PortHeader
