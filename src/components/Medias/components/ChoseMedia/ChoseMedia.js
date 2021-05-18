import React, {useState, useEffect} from 'react';
import '../AddMedia/AddMedia.css';
import './ChoseMedia.css'

import Dialog from '../../../Dialog/Dialog'
import MediaGrid from '../MediaGrid/MediaGrid'



const ChoseMedia = (props) => {

  let [mediaId, handleMediaId] = useState('')
  let [projectId, handleProjectId] = useState('')
  let [mediasOrig, handleMediaOrig] = useState([])
  let [mediasCopy, handleMediaCopy] = useState([])


  const updateCoverImage = async () => {
    const obj = {
      name: props.project.name,
      type: props.project.type,
      areas: props.project.areas,
      cover: mediaId,
      link: props.project.link,
      projectId: projectId
    }
    const bckRes = await fetch(`${process.env.REACT_APP_API_URL}/project`, {
      method: "PUT",
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }),
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(obj)
    })
    props.getProjects()
    props.handleOpen()
  }

  const getMedias = async () => {
    try {
      const bckRes = await fetch(`${process.env.REACT_APP_API_URL}/medias`, {
        method: "GET",
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }),
        mode: 'cors',
        credentials: 'include',
      })
      let res = await bckRes.json()
      console.log("RESMEDIAS", res)
      handleMediaOrig(res)
      handleMediaCopy(res)
    } catch(error) {
      console.log("Failed to get medias", error)
    }
  }

  const choseMedia = (mediaId) => {
    handleMediaId(mediaId)
  }

  useEffect(() => {
    console.log("+++++", props)
    getMedias()
    handleProjectId(props.project._id)
  }, [])

  return props.open ? (
    <Dialog
      open={props.open}
      width={"big"}
      >
      <div className='chose-media-container'>
        <div className="add-media-header">
          <h4>{props.title}</h4>
          
        </div>
        <div className="media-grid-container">
          <MediaGrid 
            mediaList={mediasCopy}
            choseMedia={choseMedia}
            cover={mediaId}
          />
        </div>
        <div className="add-media-control flex-end">
          <div className="margin-top15">
            <span 
              className="clean-button" 
              onClick={() => {
                props.handleOpen(false)
              }}
              >
              Cancel
            </span>
            <span
              className={mediaId.length === 0 ? "disabled-btn" : "clean-button"}
              onClick={() => {
                updateCoverImage()
                props.handleOpen(false)
                }
              }
              >
              Save
            </span>
          </div>
        </div>
      </div>

    </Dialog>
  ): null
}

export default ChoseMedia;