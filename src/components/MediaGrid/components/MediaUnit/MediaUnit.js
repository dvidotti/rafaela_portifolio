import React, { useState } from 'react'
import './MediaUnit.css'
import Dialog from 'components/Dialog/Dialog'
import DeleteDialog from './components/DeleteDialog/DeleteDialog'
import EditMediaUnit from './components/EditMediaUnit/EditMediaUnit'
import { useFetchAPI } from 'hooks/useFetchAPI'

// TODO: put in ENV (not deleting ATM Cloudnary => statusText: "Unauthorized")
// TODO: include delete in AWS also
const url = process.env.REACT_APP_CLOUDINARY_DELETE_URL

const MediaUnit = props => {
    const { fetchAPI } = useFetchAPI()

    const { media, choseMedia } = props

    const [open, setOpen] = useState(false)
    let [editMediaOpen, handleEditMediaOpen] = useState(false)

    const deleteMedia = async (id, public_id) => {
        const options = {
            method: 'POST',
            body: {
                public_id: public_id,
                headers: new Headers({
                    'content-type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                }),
                mode: 'cors',
                credentials: 'include',
            },
        }
        try {
            const cldRes = await fetch(url, options)
            const bckRes = await fetchAPI(`/media/${id}`, { method: 'DELETE' })
            setOpen(false)
            props.getMedias()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div
            className={`media-card ${
                props.cover === media._id ? 'selected-border' : ''
            }`}
        >
            <Dialog open={open || editMediaOpen}>
                {!editMediaOpen ? (
                    <DeleteDialog
                        deleteMedia={deleteMedia}
                        media={media}
                        handleOpen={setOpen}
                    />
                ) : (
                    <EditMediaUnit
                        handleEditMediaOpen={handleEditMediaOpen}
                        editMediaOpen={editMediaOpen}
                        media={media}
                        getMedias={props.getMedias}
                    />
                )}
            </Dialog>
            {choseMedia ? (
                <div onClick={() => props.choseMedia(media)}>
                    <div className="media-container">
                        {media.media_type === 'image' ? (
                            <img
                                className="media-unit"
                                src={media[process.env.REACT_APP_IMAGE_USED]}
                                alt={media.name}
                            />
                        ) : media.media_type === 'video' ? (
                            <video
                                controls
                                className="media-unit"
                                src={media[process.env.REACT_APP_IMAGE_USED]}
                                alt={media.name}
                            />
                        ) : null}
                    </div>
                    <div className="media-bottom-container">
                        <div className="media-name">{media.name}</div>
                    </div>
                </div>
            ) : (
                <React.Fragment>
                    <div className="media-container">
                        {media.media_type === 'image' ? (
                            <img
                                className="media-unit"
                                src={media[process.env.REACT_APP_IMAGE_USED]}
                                alt={media.name}
                            />
                        ) : media.media_type === 'video' ? (
                            <video
                                className="media-unit"
                                controls
                                src={media[process.env.REACT_APP_IMAGE_USED]}
                                alt={media.name}
                            />
                        ) : null}
                    </div>
                    <div className="media-bottom-container">
                        <div className="media-name">{media.name}</div>
                        <div className="media-control">
                            <div
                                onClick={() => handleEditMediaOpen(true)}
                                className="clean-button"
                            >
                                <span>EDIT</span>
                            </div>
                            <div
                                onClick={() => setOpen(true)}
                                className="clean-button"
                            >
                                <span>DELETE</span>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}

export default MediaUnit
