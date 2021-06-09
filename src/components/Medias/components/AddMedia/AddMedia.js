import React, {useState, useEffect} from 'react';
import './AddMedia.css';
import {uploadFile} from 'react-s3';

const url = '	https://api.cloudinary.com/v1_1/dw1mohoww/image/upload'

const AddMedia = (props) => {
  let [file, handleFile] = useState(null);
  let [fileView, handleFileView] = useState(null);
  let [name, handleName] = useState('');
  let [fileType, handleFileType] = useState(null)
  
  const checkMedia = () => {
    console.log(" ------->>>>>>>+++++++",file)
    let type = null
    if(file) {
      if(file.type.includes('video')) type = 'video'
      if(file.type.includes('image')) type = 'image'
    }
    handleFileType(type)
  }

  const hiddenFileInput = React.useRef(null)

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    // bucketName: "rafavinotti",
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
}

  const handleUpload = (e) => {
    if(e.target.files[0]) {
      handleFileView(URL.createObjectURL(e.target.files[0]));
      handleFile(e.target.files[0])
    } 
    /* this contains the file we want to send */
  }

  const handlePostImage = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    const options = {
      method: 'POST',
      body: formData,
    };
    const res = await fetch(url, options)
    const resCloudinary = await res.json();
    const linkCloudinary = resCloudinary.secure_url;
    const {public_id} = resCloudinary;
    const media_type = resCloudinary.resource_type;

    const resAws = await uploadFile(file, config)
    const linkS3 = resAws.location;
    const linkMyDomain = `http://images.rafaelavinotti.com/${resAws.key}`;
    const body = {
      name,
      linkCloudinary,
      public_id,
      media_type,
      linkS3,
      linkMyDomain
    }
    const bckRes = await fetch(`${process.env.REACT_APP_API_URL}/media`, {
      method: "POST",
      headers: new Headers({
        'content-type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }),
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(body)
    })
    console.log("BCKRES", bckRes)
    props.handleAddMediaOpen(false)
    props.handleFetchMedias(true)
    handleFileView(null)
    handleFile(null)
    handleName("")
  }

  useEffect(() => {
    checkMedia()
  }, [file])

  return (
    <div className='add-media-container'>
      <div className="add-media-header">
        <h4>Add Media</h4>
        <div>
          <span onClick={(e) => handleClick(e)} className="clean-button">Choose file</span>
        </div>
      </div>
      <div className="add-media-pict-container">
        {fileType === null ? 
          <img className="add-image-pict" src="/imgs/default_media_image.png"/>
          : fileType === "image" ?
          <img className="add-image-pict" src={fileView}/>
          : fileType === "video" ?
          <video className="video" controls src={fileView}></video>
          : null
        }
      </div>
      <div className="add-media-control">
        <div>
          <input 
            id="pict-name"
            placeholder="Name"
            onChange={(e) => handleName(e.target.value)}
            className="input" 
            type="text"
            value={name}
          />
          <input 
            id="select-pict" 
            className="input-hidden" 
            type="file"
            ref={hiddenFileInput}
            onChange={(e) => handleUpload(e)}
          />
        </div>
        <div>
          <span 
            className="clean-button" 
            onClick={() => {
              props.handleAddMediaOpen(false)
              handleName("")
              handleFileView(null)
              handleFile(null)
            }}
            >
            Cancel
          </span>
          <span
            className={(file === null || name === "") ? "disabled-btn" : "clean-button"}
            onClick={() => {
                if(file === null || name === "") return
                handlePostImage()
                handleFileView(null)
                handleFile(null)
                handleName("")
              }
            }
            >
            Save
          </span>
        </div>
      </div>
    </div>
  )
}

export default AddMedia;