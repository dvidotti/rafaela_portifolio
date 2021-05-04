import React, {useState, useEffect} from 'react';


const ProjectEdit = (props) => {
  let [project, handleProject] = useState([])

  
  const getProject = async (id) => {
    const bckRes = await fetch(`${process.env.REACT_APP_API_URL}/project/${id}`, {
      method: "GET",
    })
    const res = await bckRes.json()
    handleProject(res)
  }

  useEffect(() => {
    // getProject(props.id)
    getProject("606d7f4164f3d57e35910750")
    
  }, [])
  
  return(
    <div>
      {JSON.stringify(project)}
    </div>

  )

}

export default ProjectEdit;