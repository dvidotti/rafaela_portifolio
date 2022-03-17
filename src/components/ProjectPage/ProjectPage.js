import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useGetProjectComponents } from "hooks/useGetProjectComponents"
import { useGetRendersHelper } from "hooks/useGetRendersHelper";

const ProjectPage = React.memo(({projects, getPortfolio, handleIsProjectPage}) => {
  useGetRendersHelper()
  
  let [ project, handleProject] = useState(null)
  
  let params = useParams()
  let project_link = params.project_name
  const { 
    getComponentsCollection,
    componentsList
  } = useGetProjectComponents()
  
  useEffect(() => {
    handleIsProjectPage(true)
    return function cleanup() {
      handleIsProjectPage(false)
    }
  },[])
  
  useEffect(() => {
    if (projects.length === 0) getPortfolio()
    else filterProject(projects)
  },[projects])

  const filterProject = (projects) => {
    let projectFiltered = projects.filter(i => i.link === project_link)[0]
    handleProject(projectFiltered) 
  }

  useEffect(() => {
    if(project) getComponentsCollection(project.modules)   
  }, [project])


  return (
    <div style={{width: "100%"}}>
      {componentsList}
    </div>
  )
})

export default ProjectPage;