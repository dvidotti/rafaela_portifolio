import React, {useState, useEffect, useRef} from "react";
import ChoseMedia from "../../../Medias/components/ChoseMedia/ChoseMedia";

import "./FullProjectPicturesEditor.css";
const imageKey = process.env.REACT_APP_IMAGE_USED

const FullProjectPicturesEditor = (props) => {
  const addRef = useRef(false)
  // let imagesList = !props.module.module ? [] : props.module.module.images;

  let [imageIdList, handleImageIdList] = useState([])
  let [imagesList, handleImagesList] = useState([])
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
      moduleId: props.componentsCollectionId,
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
      handleFullImageId(resBkc.data._id)
      props.getProject()
    } catch(error) {
      console.error(error)
    }
  }

  const deleteImg = async (imageList) => {
    let body = {
      images: imageList,
      moduleId: props.componentsCollectionId,
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
      // props.getProject()
    } catch(error) {
      console.error(error)
    }
  }

  const editImageList = (mediaId) => {
    let imageList = [...imagesList];
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
    handleImageIdList(imageList.map(i=>i._id))
    handleImagesList(imageList)
  }

  const handleDelete = (mediaId) => {
    let idx = imageIdList.indexOf(mediaId)
    if(imageIdList.length === 1) {
      deleteImageModule()
      return;
    }
    let imageIdList = [...imageIdList].splice(idx, 1)
    let imagesList = [...imagesList].splice(idx,1)
    deleteImg(imageIdList)
    handleImageIdList(imageIdList)
    handleImagesList(imagesList)
  }

  const addMedia = (position, target) => {
    handleTarget(target)
    handleAdd({bol: add, state: position})
  }

  const deleteImageModule = async () => {
    let body = {
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
    let imagesList = !props.module.module ? [] : props.module.module.images;
    let imageIdList = imagesList.map(i => i._id)
    let fullImageModuleId = !props.id ? null : props.module.module._id
    handleImagesList(imagesList)
    handleImageIdList(imageIdList)
    handleIsEdit(imageIdList.length > 0)
    handleFullImageId(fullImageModuleId)
  },[props.module])
  
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