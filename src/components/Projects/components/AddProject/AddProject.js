import React, {useState, useEffect} from 'react';

import './AddProject.css'

function AddProject(props) {
  let [name, handleName] = useState('');
  let [type, handleType] = useState('')
  let [areas, handleAreas] = useState([])
  let [link, handleLink] = useState('')

  

  const postProject = async () => {
    let areaArr = areas.split(',')
    const body = {
      name,
      type,
      areas: areaArr,
      link
    }
    try {
      let bckRes = await fetch(`${process.env.REACT_APP_API_URL}/project`, {
        method: "POST",
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(body)
      })
      bckRes = await bckRes.json()
      console.log("PROJECT-BACK-RES", bckRes)
      handleAreas("")
      handleType("")
      handleName("")
      handleLink("")
      props.getProjects();
      props.handleOpen(false);
    } catch(error) {
      console.log("Failed to create project", error)
    }
  }

  useEffect(() => {
  }, [])

  return (
    <div className='add-media-container'>
      <div className="add-media-header">
        <h4>Add Project</h4>
      </div>

      <div className="add-media-control">
        <div>
          <input 
            placeholder="Project Name"
            onChange={(e) => handleName(e.target.value)}
            className="input-project" 
            type="text"
            value={name}
          />
          <input 
            placeholder="Project Type"
            onChange={(e) => handleType(e.target.value)}
            className="input-project" 
            type="text"
            value={type}
          />
        </div>
        <div>
          <input 
            placeholder="Areas (use comas e.g. Branding, Editorial)"
            onChange={(e) => handleAreas(e.target.value)}
            className="input-project" 
            type="text"
            value={areas}
          />
          <input 
            placeholder="Project Link (e.g. danilo-vidotti)"
            onChange={(e) => handleLink(e.target.value)}
            className="input-project" 
            type="text"
            value={link}
          />
        </div>
 
      </div>
      <div className="dialog-control-container">
        <div className="dialog-control-box">
          <span 
            className="clean-button" 
            onClick={() => {
              props.handleOpen(false)
              handleAreas("")
              handleName("")
              handleLink("")
              handleType("")
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

export default AddProject;