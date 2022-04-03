import React, { Component } from 'react'
import ProjectCoverSmall from 'components/ProjectCoverSmall/ProjectCoverSmall'
import GridLayout from 'react-grid-layout'

import './PortFolioEdit.css'
import HeaderAdmin from 'components/HeaderAdmin/HeaderAdmin'

const apiUrl = process.env.REACT_APP_API_URL

//TODO: Check react-grid-layout already has hooks implementation. Refact
class PortFolioEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            portfolio: [],
            portfolioId: null,
            notPublishedProjectListIds: [],
            loading: true,
            sortedProjectsIds: [],
        }
    }

    handlePortfolio = (portfolio, notPublishedProjectListIds) => {
        this.setState({ portfolio, notPublishedProjectListIds }, () =>
            this.setState({ loading: false })
        )
    }

    getPortfolio = async () => {
        this.setState({ loading: true })
        try {
            const bckRes = await fetch(`${apiUrl}/portfolio`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                }),
                mode: 'cors',
            })
            const res = await bckRes.json()
            if (res.success) {
                let portfolio = res.data.portfolio.filter(
                    project => !!project.published
                )
                let notPublishedProjects = res.data.portfolio.filter(
                    project => !project.published
                )
                let notPublishedProjectListIds = notPublishedProjects.map(
                    i => i._id
                )
                this.handlePortfolio(portfolio, notPublishedProjectListIds)
                this.setState({ portfolioId: res.data._id, loading: false })
            } else throw Error('Failed to fetch portfolio')
        } catch (error) {
            this.setState({ loading: false })
            console.error(error)
        }
    }

    componentDidMount() {
        this.getPortfolio()
    }

    generateLayout = () => {
        let counter = 0
        let layout = this.state.portfolio.map((i, idx) => {
            if (counter === 3) counter = 0
            let objProject = {
                i: i.name,
                y: Math.floor(idx / 3),
                x: counter,
                w: 1,
                h: 1,
            }
            counter += 1
            return objProject
        })
        return layout
    }

    updateProjectsOrderIds = layout => {
        let sortedLayout = []
        let projectsSorted = []
        layout.forEach((i, idx) => {
            let oneLevelSorted = layout.filter(i => i.y === idx)
            oneLevelSorted.sort((a, b) => a.x - b.x)
            oneLevelSorted.forEach(i => {
                sortedLayout.push(i)
            })
        })
        let projectNamelist = sortedLayout.map(i => i.i)
        projectNamelist.forEach(projectName => {
            let portIdx = null
            this.state.portfolio.forEach((item, idx) => {
                if (item.name === projectName) portIdx = idx
            })
            projectsSorted.push(this.state.portfolio[portIdx])
        })
        let sortedProjectsIds = projectsSorted.map(i => i._id)
        this.setState({ sortedProjectsIds })
    }

    savePortfolio = async () => {
        let projectsIdsJoinedList = [...this.state.sortedProjectsIds]
        this.state.notPublishedProjectListIds.forEach(i => {
            projectsIdsJoinedList.push(i)
        })
        try {
            const bckRes = await fetch(`${apiUrl}/portfolio`, {
                method: 'PUT',
                headers: new Headers({
                    'content-type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                }),
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({
                    portfolio: projectsIdsJoinedList,
                    portfolioId: this.state.portfolioId,
                }),
            })
            let res = await bckRes.json()
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        const layout = this.generateLayout()

        return (
            <section>
                <HeaderAdmin />
                {!this.state.loading && this.state.portfolio.length > 0 ? (
                    <div className="portfolio-outer-container">
                        <div className="control-container">
                            <span
                                onClick={() => this.savePortfolio()}
                                className="clean-button force-big-padding"
                            >
                                <span className="big-font">SAVE</span>
                            </span>
                        </div>
                        <div style={{ padding: '20px 50px' }}>
                            <GridLayout
                                className="layout portfolio"
                                layout={layout}
                                cols={3}
                                rowHeight={270}
                                width={1200}
                                onLayoutChange={layout =>
                                    this.updateProjectsOrderIds(layout)
                                }
                            >
                                {this.state.portfolio.map((project, idx) => (
                                    <div key={project.name}>
                                        <ProjectCoverSmall
                                            project={project}
                                            isPortfolioEdit={true}
                                        />
                                    </div>
                                ))}
                            </GridLayout>
                        </div>
                    </div>
                ) : null}
            </section>
        )
    }
}

export default PortFolioEdit
