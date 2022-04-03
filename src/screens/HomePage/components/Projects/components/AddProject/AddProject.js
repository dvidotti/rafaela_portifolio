import React, { useState } from 'react'
import { useFetchAPI } from 'hooks/useFetchAPI'

import './AddProject.css'

let initialBody = {
    name: '',
    type: '',
    areas: '',
    link: '',
}

function AddProject(props) {
    const { fetchAPI } = useFetchAPI()

    let [body, setBody] = useState(initialBody)

    const handleBody = e => {
        setBody(b => ({
            ...b,
            [e.target.name]: e.target.value,
        }))
    }

    const postProject = async () => {
        let areaArr = body.areas.split(',')
        let postBody = {
            ...body,
            areas: areaArr,
        }
        const options = {
            body: postBody,
            method: 'POST',
        }
        try {
            await fetchAPI(`/project`, options)
            setBody(initialBody)
            props.getProjects()
            props.handleOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="add-media-container">
            <div className="add-media-header">
                <h4>Add Project</h4>
            </div>

            <div className="add-media-control">
                <div>
                    <input
                        placeholder="Project Name"
                        name="name"
                        onChange={e => handleBody(e)}
                        className="input-project"
                        type="text"
                        value={body.name}
                    />
                    <input
                        placeholder="Project Type"
                        name="type"
                        onChange={e => handleBody(e)}
                        className="input-project"
                        type="text"
                        value={body.type}
                    />
                </div>
                <div>
                    <input
                        placeholder="Areas (use comas e.g. Branding, Editorial)"
                        name="areas"
                        onChange={e => handleBody(e)}
                        className="input-project"
                        type="text"
                        value={body.areas}
                    />
                    <input
                        name="link"
                        placeholder="Project Link (e.g. danilo-vidotti)"
                        onChange={e => handleBody(e)}
                        className="input-project"
                        type="text"
                        value={body.link}
                    />
                </div>
            </div>
            <div className="dialog-control-container">
                <div className="dialog-control-box">
                    <span
                        className="clean-button"
                        onClick={() => {
                            props.handleOpen(false)
                            setBody(initialBody)
                        }}
                    >
                        Cancel
                    </span>
                    <span
                        className="clean-button"
                        onClick={() => postProject()}
                    >
                        Save
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AddProject
