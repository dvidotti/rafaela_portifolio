import React, {useState, useEffect} from 'react';
import '../AddMedia/AddMedia.css';
import './ChoseMedia.css'

import Dialog from '../../../Dialog/Dialog'
import MediaGrid from '../MediaGrid/MediaGrid'



const ChoseMedia = (props) => {

  let [media, handleMedia] = useState('')
  let [mediasOrig, handleMediaOrig] = useState([])
  let [mediasCopy, handleMediaCopy] = useState([])



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
      handleMediaOrig(res)
      handleMediaCopy(res)
    } catch(error) {
      console.log("Failed to get medias", error)
    }
  }

  const choseMedia = (media) => {
    console.log("MEDIIIIA", media)
    props.getMediaId(media)
    handleMedia(media)
  }

  useEffect(() => {
    getMedias()
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
            cover={media._id}
          />
        </div>
        <div className="add-media-control flex-end">
          <div className="margin-top15">
            <span 
              className="clean-button" 
              onClick={() => {
                props.getMedia(props.mediaOriginal)
                props.handleOpen(false)
              }}
              >
              Cancel
            </span>
            <span
              className={!media ? "disabled-btn" : "clean-button"}
              onClick={() => {
                {/* updateCoverImage() */}
                props.postMedia()
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