import React , {useState, useEffect} from 'react';
import './EditMediaUnit.css'

const EditMediaUnit = props => {
  const {media, handleEditMediaOpen} = props;
  
  const [name, handleName] = useState('')
  const [mediaType, handleMediaType] = useState(null)
  console.log("MEDIAAAA", mediaType)
  console.log("P----->", props.media.media_type)

  useEffect(() => {
    handleName(media.name)
    handleMediaType(props.media.media_type)
  }, [])

  const handleUpdateMedia = async (id) => {
    let body = {
      name,
      mediaId: id
    }
    const bckRes = await fetch(`${process.env.REACT_APP_API_URL}/media`, {
      method: "PUT",
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }),
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body)
    })
    handleEditMediaOpen(false)
    props.handleFetchMedias(true)

    console.log(bckRes)
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
              onChange={(e) => handleName(e.target.value)}
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