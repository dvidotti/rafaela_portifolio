import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProjectComponents } from 'hooks/useGetProjectComponents'
// import { useGetRendersHelper } from "hooks/useGetRendersHelper";

const ProjectPage = React.memo(
    ({ projects, getPortfolio, handleIsProjectPage }) => {
        // useGetRendersHelper()

        let [project, setProject] = useState(null)

        let params = useParams()
        let project_link = params.project_name
        const { getProject, componentsList } = useGetProjectComponents()

        useEffect(() => {
            handleIsProjectPage(true)
            return function cleanup() {
                handleIsProjectPage(false)
            }
        }, [])

        useEffect(
            () => {
                if (projects.length === 0) getPortfolio()
                else filterProject(projects)
            },
            [projects]
        )

        const filterProject = projects => {
            let projectFiltered = projects.filter(
                i => i.link === project_link
            )[0]
            setProject(projectFiltered)
        }

        useEffect(
            () => {
                if (project) getProject(project._id)
            },
            [project]
        )

        return <div style={{ width: '100%' }}>{componentsList}</div>
    }
)

export default ProjectPage
