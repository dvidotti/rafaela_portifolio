import React, { useState, useEffect } from 'react'
import ChoseMedia from 'components/ChoseMedia/ChoseMedia'
import FullProjectPicturesEditor from '../FullProjectPicturesEditor/FullProjectPicturesEditor'

import './DoublePictureEdit.css'

const DoublePictureEdit = props => {
    const { imageOne, imageTwo } =
        typeof props.id === 'number'
            ? { imageOne: null, imageTwo: null }
            : props.module.module
    const [doublePictureId, handleDoublePictureId] = useState(null)
    const [open, handleOpen] = useState(false)
    const [imageOneId, handleImageOneId] = useState(null)
    const [imageTwoId, handleImageTwoId] = useState(null)
    const [isImageOne, handleIsImageOne] = useState(false)
    const [isEdit, handleIsEdit] = useState(false)

    const postImages = async imageNumber => {
        let method = isEdit ? 'PUT' : 'POST'
        let imageOne = imageOneId
        let imageTwo = imageTwoId
        if (imageNumber === 'one') {
            imageOne = null
            handleImageOneId(null)
        } else if (imageNumber === 'two') {
            imageTwo = null
            handleImageTwoId(null)
        }

        let body = {
            imageOne,
            imageTwo,
            moduleId: isEdit
                ? props.module.module._id
                : props.modulesCollectionId,
        }
        try {
            let res = await fetch(
                `${process.env.REACT_APP_API_URL}/double-picture`,
                {
                    method: method,
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Access-Control-Allow-Credentials': true,
                    }),
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify(body),
                }
            )
            let resBkc = await res.json()
            // handleFullImageId(resBkc.data._id)
            props.getProject()
        } catch (error) {
            console.error(error)
        }
    }

    const deleteDoublePictureModule = async () => {
        let body = {
            // images: imageList,
            modulesId: props.module._id,
            doublePictureModuleId: doublePictureId,
        }
        try {
            let res = await fetch(
                `${process.env.REACT_APP_API_URL}/double-picture`,
                {
                    method: 'DELETE',
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Access-Control-Allow-Credentials': true,
                    }),
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify(body),
                }
            )
            let resBkc = await res.json()
            props.getProject()
        } catch (error) {
            console.error(error)
        }
    }

    const openChoseMedia = picture => {
        handleIsImageOne(picture === 'pictureOne')
        handleOpen(true)
    }

    const getMedia = mediaId => {
        if (isImageOne) {
            handleImageOneId(mediaId)
        } else handleImageTwoId(mediaId)
    }

    useEffect(() => {
        if (props.module === null) {
            handleImageOneId(null)
            handleImageTwoId(null)
        } else {
            let imgOneFlag = props.module.module.imageOne === null
            let imgTwoFlag = props.module.module.imageTwo === null
            handleImageOneId(
                imgOneFlag ? null : props.module.module.imageOne._id
            )
            handleImageTwoId(
                imgTwoFlag ? null : props.module.module.imageTwo._id
            )
        }
        let doublePictureModuleId =
            typeof props.id === 'number' ? null : props.module.module._id
        handleDoublePictureId(doublePictureModuleId)
        handleIsEdit(!(imageOne === null && imageTwo === null))
    }, [])

    return (
        <section ref={props.refProp} className="full-pictures-container">
            {open && (
                <ChoseMedia
                    open={open}
                    title={'Chose media'}
                    getMedia={getMedia}
                    postMedia={postImages}
                    handleOpen={handleOpen}
                />
            )}
            <div
                style={{
                    padding: '15px 15px 15px',
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '2px solid black',
                }}
            >
                <span
                    onClick={() => deleteDoublePictureModule()}
                    className="clean-button force-big-padding "
                >
                    DELETE DOUBLE PICTURE MODULE
                </span>
            </div>
            <div className="picture-double-container">
                {imageOne ? (
                    <div className="left-pict relative">
                        <button
                            onClick={() => openChoseMedia('pictureOne')}
                            className="right-top-btn"
                        >
                            Edit Picture
                        </button>
                        <button
                            className="left-top-btn"
                            onClick={() => postImages('one')}
                        >
                            Delete Picture
                        </button>
                        <img
                            className="full-img"
                            src={
                                !imageOne[process.env.REACT_APP_IMAGE_USED]
                                    ? '/imgs/default_media_image.png'
                                    : imageOne[process.env.REACT_APP_IMAGE_USED]
                            }
                            alt={imageOne.alt}
                        />
                    </div>
                ) : (
                    <div className="left-pict relative">
                        <button
                            onClick={() => openChoseMedia('pictureOne')}
                            className="right-top-btn"
                        >
                            Add Picture
                        </button>
                        <img
                            className="full-img"
                            src="/imgs/default_media_image.png"
                        />
                    </div>
                )}
                {imageTwo ? (
                    <div className="right-pict relative">
                        <button
                            onClick={() => openChoseMedia('pictureTwo')}
                            className="right-top-btn"
                        >
                            Edit Picture
                        </button>
                        <button
                            className="left-top-btn"
                            onClick={() => postImages('two')}
                        >
                            Delete Picture
                        </button>
                        <img
                            className="full-img"
                            src={
                                !imageTwo[process.env.REACT_APP_IMAGE_USED]
                                    ? '/imgs/default_media_image.png'
                                    : imageTwo[process.env.REACT_APP_IMAGE_USED]
                            }
                            alt={imageTwo.alt}
                        />
                    </div>
                ) : (
                    <div className="right-pict relative">
                        <button
                            onClick={() => openChoseMedia('pictureTwo')}
                            className="right-top-btn"
                        >
                            Add Picture
                        </button>
                        <img
                            className="full-img"
                            src="/imgs/default_media_image.png"
                        />
                    </div>
                )}
            </div>
        </section>
    )
}

export default DoublePictureEdit
