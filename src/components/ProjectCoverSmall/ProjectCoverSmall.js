import React, { useState, useEffect } from 'react'
import ChoseMedia from 'components/ChoseMedia/ChoseMedia'
import './projectCoverSmall.css'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useFetchAPI } from 'hooks/useFetchAPI'

const ProjectCoverSmall = ({
    project,
    isEdit,
    getProjects,
    isPortfolioEdit,
}) => {
    const { fetchAPI } = useFetchAPI()
    const linkRef = isEdit
        ? `/edit/${project._id}`
        : `/projects/${project.link}`

    const history = useHistory()

    const routeChange = path => {
        history.push(path)
    }

    let [openChoseCover, setOpenChoseCover] = useState(false)
    let [projectId, setProjectId] = useState('')
    let [media, setMedia] = useState('')

    const updateCoverImage = async () => {
        const options = {
            method: 'PUT',
            body: {
                cover: media,
                projectId: projectId,
            },
        }
        await fetchAPI(`/project-cover`, options)
        getProjects()
        setOpenChoseCover()
    }

    useEffect(() => {
        setProjectId(project._id)
    }, [])

    return isEdit ? (
        <React.Fragment>
            <ChoseMedia
                open={openChoseCover}
                title={'Chose media'}
                getMedia={setMedia}
                postMedia={updateCoverImage}
                handleOpen={setOpenChoseCover}
            />
            <div className="proj_cover_container">
                <div className="image-container">
                    {isEdit && (
                        <button
                            onClick={e => {
                                e.stopPropagation()
                                setOpenChoseCover(true)
                            }}
                            className="clean-button edit-cover-btn "
                        >
                            Edit Cover
                        </button>
                    )}
                    <span
                        className={
                            project.published
                                ? 'badge-published'
                                : 'badge-unpublished'
                        }
                    >
                        {project.published ? 'PUBLISHED' : 'UNPUBLISHED'}
                    </span>

                    {project.cover ? (
                        <img
                            className="image"
                            src={
                                project.cover[process.env.REACT_APP_IMAGE_USED]
                            }
                            alt={project.cover.alt}
                        />
                    ) : (
                        <img
                            className="image"
                            src={'/imgs/default_media_image.png'}
                            alt="Default Image"
                        />
                    )}
                </div>
                <div className="projec-legend-container">
                    <div className="cover-title_1">{project.name}</div>
                    {isEdit && (
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                routeChange(linkRef)
                            }}
                            className="edit-project-btn clean-button"
                        >
                            Edit Project
                        </span>
                    )}
                    <div className="cover-title_2">{project.type}</div>
                </div>
            </div>
        </React.Fragment>
    ) : isPortfolioEdit ? (
        <div className="proj_cover_container">
            <div className="image-container">
                {project.cover ? (
                    <img
                        className="image"
                        src={project.cover[process.env.REACT_APP_IMAGE_USED]}
                        alt={project.cover.alt}
                    />
                ) : (
                    <img
                        className="image"
                        src={'/imgs/default_media_image.png'}
                        alt="Default Image"
                    />
                )}
            </div>
            <div className="projec-legend-container">
                <div className="cover-title_1">{project.name}</div>
                <div className="cover-title_2">{project.type}</div>
            </div>
        </div>
    ) : (
        <Link className="image-link" to={linkRef}>
            <div className="proj_cover_container">
                <div className="image-container">
                    {project.cover ? (
                        <img
                            className="image"
                            src={
                                project.cover[process.env.REACT_APP_IMAGE_USED]
                            }
                            alt={project.cover.alt}
                        />
                    ) : (
                        <img
                            className="image"
                            src={'/imgs/default_media_image.png'}
                            alt="Default Image"
                        />
                    )}
                </div>
                <div className="projec-legend-container">
                    <div className="cover-title_1">{project.name}</div>
                    <div className="cover-title_2">{project.type}</div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCoverSmall
