import React, {useState, useEffect} from "react";
import ChoseMedia from "../../../Medias/components/ChoseMedia/ChoseMedia";

// import "./FullProjectsPictures.css";
const imageKey = process.env.REACT_APP_IMAGE_USED

const FullProjectPicturesEditor = (props) => {
  const imagesList = typeof props.module.module !== "undefined" ? props.module.module.images : [];

  let [imageIdList, handleImageIdList] = useState([])
  let [open, handleOpen] = useState(false)


  const postImageIgList = async () => {
    let body = {
      images: imageIdList,
      moduleId: props.modulesCollId
    }
    try{
      let res = await fetch(`${process.env.REACT_APP_API_URL}/full-image`, {
        method:"POST",
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(body)
      })
      let resBkc = await res.json();
      props.getProject()
    } catch(errors) {
      console.log("Failed to post Image", errors)
    }
  }

  const addToImageList = (mediaId) => {
    let imageList = [...imageIdList];
    imageList.push(mediaId);
    handleImageIdList(imageList)
  }

  useEffect(() => {
    let imageIdList = imagesList.map((i, idx) => i._id)
    handleImageIdList(imageIdList)    
  },[])

  return (
    <React.Fragment>
      <ChoseMedia
        open={open}
        title={'Chose media'}
        getMediaId={addToImageList}
        postMedia={postImageIgList}
        handleOpen={handleOpen}
      />
      <section ref={props.refProp} className="full-pictures-container">
        {imagesList.length > 0 && imagesList.map((img, idx) => {
          return (
            <div className="full-pict-box" key={idx}>
              <img className="full-img" src={img[imageKey]} alt={img.alt}/>
            </div>
          )
        })}
        <div className="full-pict-box">
          <button onClick={() => handleOpen(true)}>+ Add Media</button>
          <img className="full-img" src='/imgs/default_media_image.png' alt={"Default image"}/>
        </div>
      </section>
    </React.Fragment>
  )
}

export default FullProjectPicturesEditor;