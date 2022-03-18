import React , {useState, useEffect} from 'react';
import './EditMediaUnit.css'
import { useFetchAPI } from 'hooks/useFetchAPI'

const EditMediaUnit = ({media, handleEditMediaOpen, getMedias}) => {
  const { fetchAPI } = useFetchAPI()
  
  const [name, setName] = useState('')
  const [mediaType, setMediaType] = useState(null)

  useEffect(() => {
    setName(media.name)
    setMediaType(media.media_type)
  }, [])

  const handleUpdateMedia = async (id) => {
    const options = {
      method: "PUT",
      body: {
        name,
        mediaId: id
      }
    }

    const bckRes = await fetchAPI(`/media`, options)
    handleEditMediaOpen(false)
    getMedias()
  }

  return (
    <div>
      <h4>Edit Media</h4>
      <h4 className='edit-media-container'>
        {mediaType == "image" ? 
          <img src={media[process.env.REACT_APP_IMAGE_USED]} alt={media.name}/>
        : mediaType == "video" ?
          <video className="video" controls src={media[process.env.REACT_APP_IMAGE_USED]}/>
        : null
        }
      </h4>
      <div>
        <div className='control-edit-media'>
          <div>
            <label className="block" htmlFor="media-name">Name</label>
            <input
              className="block"
              id="media-name"
              type="text" 
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="dialog-control">
            <div>
              <span className="clean-button" onClick={() => handleEditMediaOpen(false)}>CANCEL</span>
            </div>
            <div>
              <span className="clean-button" onClick={() => handleUpdateMedia(media._id)}>SAVE</span>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};


export default EditMediaUnit;