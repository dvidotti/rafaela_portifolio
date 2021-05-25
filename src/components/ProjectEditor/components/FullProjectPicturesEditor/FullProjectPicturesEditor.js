import React, {useState, useEffect} from "react";
import ChoseMedia from "../../../Medias/components/ChoseMedia/ChoseMedia";

// import "./FullProjectsPictures.css";
const imageKey = process.env.REACT_APP_IMAGE_USED

const FullProjectPicturesEditor = (props) => {
  const imagesList = typeof props.module.module !== "undefined" ? props.module.module.images : [];

  let [imageIdList, handleImageIdList] = useState([])
  let [open, handleOpen] = useState(false)
  let [fullImageId, handleFullImageId] = useState(null)
  let [isEdit, handleIsEdit] = useState(false)


  const postImageIdList = async () => {
    let method = isEdit ? "PUT" : "POST"
    // let method = "POST"
    let body = {
      images: imageIdList,
      moduleId: props.modulesCollId,
      fullImageModuleId: fullImageId
    }
    try{
      let res = await fetch(`${process.env.REACT_APP_API_URL}/full-image`, {
        method: method,
        headers: new Headers({
          'content-type': 'application/json',
          'Access-Control-Allow-Credentials': true
        }),
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(body)
      })
      let resBkc = await res.json();
      console.log("FULLIMAGERES",resBkc)
      handleFullImageId(resBkc.data._id)
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
    console.log("PARAARAr", props)
    let fullImageModuleId =  props.module.length > 0 ? props.module.module._id : null;
    handleImageIdList(imageIdList)
    handleIsEdit(imageIdList.length > 0)
    handleFullImageId(fullImageModuleId)
  },[])

  return (
    <React.Fragment>
      <ChoseMedia
        open={open}
        title={'Chose media'}
        getMediaId={addToImageList}
        postMedia={postImageIdList}
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