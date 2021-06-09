import React, {useState, useEffect} from 'react'
import './MediaUnit.css'
import Dialog from '../../../Dialog/Dialog'
import DeleteDialog from './components/DeleteDialog/DeleteDialog'
import EditMediaUnit from './components/EditMediaUnit/EditMediaUnit'

const url = '	http://api.cloudinary.com/v1_1/dw1mohoww/image/destroy'



const MediaUnit = (props) => {
  const {media, choseMedia} = props;

  const [open, handleOpen] = useState(false)
  let [editMediaOpen, handleEditMediaOpen] = useState(false)

  const deleteMedia = async (id, public_id) => {
    const options = {
      method: 'POST',
      body: {
        "public_id": public_id,
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      }),
      mode: 'cors',
      credentials: 'include'
      }
    };
    try {
      const cldRes = await fetch(url, options)
      console.log("------>",cldRes)
  
      const bckRes = await fetch(`${process.env.REACT_APP_API_URL}/media/${id}`, {
        method: "DELETE",
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }),
        mode: 'cors',
        credentials: 'include',
      })
      handleOpen(false)
      console.log("=======>",bckRes)
      props.handleFetchMedias(true)
    } catch(error) {
      console.log("Error saving picture: => ", error)
    }
  }


  return  (
  <div className={`media-card ${props.cover === media._id ? "selected-border" : ""}`}>
    <Dialog open={open || editMediaOpen}>
      {!editMediaOpen ? 
        <DeleteDialog
          deleteMedia={deleteMedia}
          media={media}
          handleOpen={handleOpen}
        />
        :
        <EditMediaUnit
          handleEditMediaOpen={handleEditMediaOpen}
          editMediaOpen={editMediaOpen}
          media={media}
          handleFetchMedias={props.handleFetchMedias}
        />
      }
    </Dialog>
    {choseMedia ? (
      <div onClick={() => props.choseMedia(media._id)}>
        <div className="media-container">
          <img className="media-unit" src={media[process.env.REACT_APP_IMAGE_USED]} alt={media.name}/>
        </div>
        <div className='media-bottom-container'>
          <div className='media-name'>
            {media.name}
          </div>
        </div>
      </div>
      )
      :
      (
      <React.Fragment>
        <div className="media-container">
          <img className="media-unit" src={media[process.env.REACT_APP_IMAGE_USED]} alt={media.name}/>
        </div>
        <div className='media-bottom-container'>
          <div className='media-name'>
            {media.name}
          </div>
          <div className="media-control">
            <div 
              onClick={() => handleEditMediaOpen(true)}
              className="clean-button"
              >
              <span>EDIT</span>
            </div>
            <div
              onClick={() => handleOpen(true)}
              className="clean-button"
              >
              <span>DELETE</span>
            </div>
          </div>
        </div>
      </React.Fragment>
      )
    }
  </div>
  )
}

export default MediaUnit;