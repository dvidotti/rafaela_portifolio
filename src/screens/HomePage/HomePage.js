import React, { useState, useRef, useEffect } from 'react'

import './HomePage.css'
import SideMenu from './components/SideMenu/SideMenu'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import ProjectPage from './components/ProjectPage/ProjectPage'
import About from './components/About/About'
import PageNotFound from 'screens/PageNotFound/PageNotFound'

import { Switch, Route, useHistory } from 'react-router-dom'

import { useGetPortfolio } from 'hooks/useGetPorfolio'

const HomePage = ({ user }) => {
    let history = useHistory()
    const port = useRef(null)
    const [open, setOpen] = useState('off')
    const [isProjectPage, setIsProjectPage] = useState(false)
    const [isHome, setIsHome] = useState(false)

    const { loading, projects, getPortfolio } = useGetPortfolio()

    const closeSide = e => {
        e.stopPropagation()
        if (open === true) setOpen(false)
    }

    const openSide = e => {
        e.stopPropagation()
        if (open === false) setOpen(true)
    }

    const scrollTo = reference => {
        reference.current.scrollIntoView()
    }

    return (
        <div className="body-container">
            {!loading && (
                <SideMenu
                    open={open}
                    handleOpen={setOpen}
                    projects={projects}
                />
            )}
            <div className="header-outer-container">
                <Header
                    showArrow={isHome}
                    port={port}
                    scrollTo={scrollTo}
                    isProjectPage={isProjectPage}
                    user={user}
                />

                <section className="site-body" onClick={e => closeSide(e)}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Home
                                    refProp={port}
                                    handleIsHome={setIsHome}
                                    openSide={openSide}
                                    projects={projects}
                                    loading={loading}
                                />
                            )}
                        />
                        <Route exact path="/about" render={() => <About />} />
                        <Route
                            exact
                            path="/projects/:project_name"
                            render={() => (
                                <ProjectPage
                                    handleIsProjectPage={setIsProjectPage}
                                    projects={projects}
                                    key={history.location.pathname}
                                    getPortfolio={getPortfolio}
                                />
                            )}
                        />
                        <Route path="/projects/*" component={PageNotFound} />
                    </Switch>
                </section>
                <Footer />
            </div>
        </div>
    )
}

export default HomePage
