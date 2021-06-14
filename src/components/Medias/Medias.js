import React, {useState, useEffect} from 'react'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import './Medias.css'
import AddMedia from './components/AddMedia/AddMedia.js'
import Dialog from '../Dialog/Dialog.js';
import MediaGrid from './components/MediaGrid/MediaGrid'

const apiUrl  = process.env.REACT_APP_API_URL;
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


const Medias = (props) => {
  let [mediaList, handleMedias] = useState([])
  let [addMediaOpen, handleAddMediaOpen] = useState(false)
  let [fecthMedias, handleFetchMedias] = useState(false)

  const getMedias = async () => {
    const response = await fetch(`${apiUrl}/medias`, {
      method: 'GET',
      headers: myHeaders
    })
    const medias = await response.json()
    console.log(medias)
    handleMedias(medias)
  }

  useEffect(() => {
    getMedias()
  }, [])

  useEffect(() => {
    if(fecthMedias) {
      getMedias();
      handleFetchMedias(false)
    }
  }, [fecthMedias])

  useEffect(() => {
    console.log("---->",mediaList)
  })

  return (
    <div>
      <Dialog
        open={addMediaOpen}
        children={
          <AddMedia 
            handleAddMediaOpen={handleAddMediaOpen} 
            handleFetchMedias={handleFetchMedias}
          />
        }
      />
      <HeaderAdmin
          showArrow={false} 
          isProjectPage={false}
      />
      <section className="media-section">
        <div className="margin-bottom-20 justify-flex-right padding-20">
          <span className="clean-button force-big-padding" onClick={() => handleAddMediaOpen(true)}>
            <span className="big-font">Add Media</span>
          </span>
        </div>
        <MediaGrid 
          handleFetchMedias={handleFetchMedias}
          mediaList={mediaList}/>
      </section>
    </div>
  )
}

export default Medias;