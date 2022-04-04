import React, { useState } from 'react'

import HeaderAdmin from 'components/HeaderAdmin/HeaderAdmin'
import AddProject from './components/AddProject/AddProject'
import Dialog from 'components/Dialog/Dialog'
import ProjectGrid from './components/ProjectGrid/ProjectGrid'

import { useGetPortfolio } from 'hooks/useGetPorfolio'

function Projects() {
    let [openAddProject, setOpen] = useState(false)

    const { loading, projects, getPortfolio } = useGetPortfolio()

    return (
        <div>
            <Dialog
                open={openAddProject}
                children={
                    <AddProject
                        openAddProject={openAddProject}
                        handleOpen={setOpen}
                        getProjects={getPortfolio}
                    />
                }
            />
            <HeaderAdmin showArrow={false} isProjectPage={false} />
            <section className="media-section">
                <div className="margin-bottom-20 justify-flex-right padding-20">
                    <span
                        onClick={() => setOpen(true)}
                        className="clean-button force-big-padding"
                    >
                        <span className="big-font">Add Project</span>
                    </span>
                </div>
                <ProjectGrid getProjects={getPortfolio} projects={projects} />
            </section>
        </div>
    )
}

export default Projects
