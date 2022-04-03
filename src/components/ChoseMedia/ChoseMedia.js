import React, { useState, useEffect } from 'react'
// import 'components/Medias/components/AddMedia/AddMedia.css'
import './ChoseMedia.css'

import Dialog from 'components/Dialog/Dialog'
import MediaGrid from 'components/MediaGrid/MediaGrid'
import { useFetchAPI } from 'hooks/useFetchAPI'

const ChoseMedia = props => {
    const { fetchAPI } = useFetchAPI()

    let [media, setMedia] = useState('')
    let [mediasOrig, setMediaOrig] = useState([])
    let [mediasCopy, setMediaCopy] = useState([])

    const getMedias = async () => {
        try {
            const res = await fetchAPI(`/medias`)
            setMediaOrig(res)
            setMediaCopy(res)
        } catch (error) {
            console.error(error)
        }
    }

    const choseMedia = media => {
        props.getMedia(media)
        setMedia(media)
    }

    useEffect(() => {
        getMedias()
    }, [])

    return props.open ? (
        <Dialog open={props.open} width={'big'}>
            <div className="chose-media-container">
                <div className="add-media-header">
                    <h4>{props.title}</h4>
                </div>
                <div className="media-grid-container">
                    <MediaGrid
                        mediaList={mediasCopy}
                        choseMedia={choseMedia}
                        cover={media._id}
                    />
                </div>
                <div className="add-media-control flex-end">
                    <div className="margin-top15">
                        <span
                            className="clean-button"
                            onClick={() => {
                                props.getMedia(props.mediaOriginal)
                                props.handleOpen(false)
                            }}
                        >
                            Cancel
                        </span>
                        <span
                            className={!media ? 'disabled-btn' : 'clean-button'}
                            onClick={() => {
                                props.postMedia()
                                props.handleOpen(false)
                            }}
                        >
                            Save
                        </span>
                    </div>
                </div>
            </div>
        </Dialog>
    ) : null
}

export default ChoseMedia
