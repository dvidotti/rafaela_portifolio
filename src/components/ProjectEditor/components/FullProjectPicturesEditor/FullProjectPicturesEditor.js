import React, {useState, useEffect, useRef} from "react";
import ChoseMedia from "../../../Medias/components/ChoseMedia/ChoseMedia";

import "./FullProjectPicturesEditor.css";
const imageKey = process.env.REACT_APP_IMAGE_USED

const FullProjectPicturesEditor = (props) => {
  const addRef = useRef(false)
  console.log("------>",props.module)
  const imagesList = typeof props.module.module !== "undefined" ? props.module.module.images : [];

  let [imageIdList, handleImageIdList] = useState([])
  let [open, handleOpen] = useState(false)
  let [fullImageId, handleFullImageId] = useState(null)
  let [isEdit, handleIsEdit] = useState(false)
  let [add, handleAdd] = useState({bol: false, state: "new"})
  let [target, handleTarget] = useState('')


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

  const deleteImg = async (imageList) => {
    // let method = isEdit ? "PUT" : "POST"
    // let method = "POST"
    let body = {
      images: imageList,
      moduleId: props.modulesCollId,
      fullImageModuleId: fullImageId
    }
    try{
      let res = await fetch(`${process.env.REACT_APP_API_URL}/full-image`, {
        method: "PUT",
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

  const editImageList = (mediaId) => {
    let imageList = [...imageIdList];
    let idx = 0
    console.log("ADD", add.state)
    switch(add.state){
      case 'new':
        imageList.push(mediaId);
        break;
      case 'after':
        idx = imageList.indexOf(target)
        imageList.splice(idx + 1, 0, mediaId)
        break;
      case 'before':
        idx = imageList.indexOf(target)
        imageList.splice(idx, 0, mediaId)
        break;
    }
    handleImageIdList(imageList)
  }

  const handleDelete = (mediaId) => {
    let newImageIdList = [...imageIdList];
    let idx = newImageIdList.indexOf(mediaId)
    newImageIdList.splice(idx, 1)
    deleteImg(newImageIdList)
    handleImageIdList(newImageIdList)
  }

  const addMedia = (position, target) => {
    handleTarget(target)
    handleAdd({bol: add, state: position})
  }

  const deleteImageModule = async () => {
    let body = {
      // images: imageList,
      modulesId: props.module._id,
      fullImageModuleId: fullImageId
    }
    try{
      let res = await fetch(`${process.env.REACT_APP_API_URL}/full-image`, {
        method: "DELETE",
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
      // handleFullImageId(resBkc.data._id)
      props.getProject()
    } catch(errors) {
      console.log("Failed to delete Full Image Module", errors)
    }
  }

  useEffect(() => {
    if(addRef.current){
      handleOpen(true)
    } else {
      addRef.current = true
    }
  },[add.bol])

  useEffect(() => {
    let imageIdList = imagesList.map((i, idx) => i._id)
    let fullImageModuleId = (typeof props.id === 'number') ? null : props.module.module._id;
    handleImageIdList(imageIdList)
    handleIsEdit(imageIdList.length > 0)
    handleFullImageId(fullImageModuleId)
  },[])
  
  return (
    <React.Fragment>
      {open && 
        <ChoseMedia
          open={open}
          title={'Chose media'}
          getMediaId={editImageList}
          postMedia={postImageIdList}
          handleOpen={handleOpen}
        />
       }
      <section ref={props.refProp} className="full-pictures-container editable-module-box">
        <div style={{padding: "15px 15px 15px", display: "flex", justifyContent: "center", borderBottom: '2px solid black'}}>
          <span 
            onClick={() => deleteImageModule()}
            className="clean-button force-big-padding "
            >DELETE FULL IMAGE MODULE
          </span>
        </div>
        {imagesList.length > 0 && imagesList.map((img, idx) => {
          return (
            <div className="full-pict-box relative" key={idx}>
              <button
                className="clean-button force-big-padding"
                style={{
                  position: "absolute", 
                  top: "35px", 
                  left: "35px"
                }} 
                onClick={() => handleDelete(img._id)}
                >X Delete Media
              </button>
              <button
                className="clean-button force-big-padding "
                style={{
                  position: "absolute", 
                  top: "35px", 
                  right: "35px"
                }} onClick={() => addMedia('before', img._id)}
                >+ Add Media Before
              </button>
              <button 
                className="clean-button force-big-padding"
                style={{
                  position: "absolute", 
                  bottom: "35px", 
                  right: "35px"
                }} 
                onClick={() => addMedia('after', img._id)}
                >+ Add Media After
              </button>
              {img.media_type === "image" ? 
                <img className="full-img" src={img[imageKey]} alt={img.alt}/>
                : img.media_type === "video" ?
                <video autoPlay muted loop className="full-img" src={img[imageKey]} alt={img.alt}/>
                : null
              }
            </div>
          )
        })}
        {!imagesList.length > 0 &&
          <div className="full-pict-box relative">
            <button 
              className="clean-button"
              style={{
                position: "absolute", 
                top: "35px", 
                letf: "35px"
              }} 
              onClick={() => addMedia("new")}
              >+ Add Media
            </button>
            <img className="full-img" src='/imgs/default_media_image.png' alt={"Default image"}/>
          </div>
        }
      </section>
    </React.Fragment>
  )
}

export default FullProjectPicturesEditor;