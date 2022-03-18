import React, {useState, useEffect} from 'react'
import HeaderAdmin from 'components/HeaderAdmin/HeaderAdmin'
import 'components/Medias/Medias.css'
import AddMedia from 'components/Medias/components/AddMedia/AddMedia.js'
import Dialog from 'components/Dialog/Dialog.js';
import MediaGrid from 'components/Medias/components/MediaGrid/MediaGrid'
import { useFetchAPI } from 'hooks/useFetchAPI'


const Medias = () => {
  const { fetchAPI } = useFetchAPI()

  let [mediaList, setMediasList] = useState([])
  let [addMediaOpen, setAddMediaOpen] = useState(false)

  const getMedias = async () => {
    const medias = await fetchAPI(`/medias`)
    setMediasList(medias)
  }

  useEffect(() => {
    getMedias()
  }, [])


  return (
    <div>
      <Dialog
        open={addMediaOpen}
        children={
          <AddMedia 
            handleAddMediaOpen={setAddMediaOpen} 
            getMedias={getMedias}
          />
        }
      />
      <HeaderAdmin
          showArrow={false} 
          isProjectPage={false}
      />
      <section className="media-section">
        <div className="margin-bottom-20 justify-flex-right padding-20">
          <span 
            className="clean-button force-big-padding" 
            onClick={() => setAddMediaOpen(true)}
            >
            <span className="big-font">Add Media</span>
          </span>
        </div>
        <MediaGrid 
          getMedias={getMedias}
          mediaList={mediaList}/>
      </section>
    </div>
  )
}

export default Medias;