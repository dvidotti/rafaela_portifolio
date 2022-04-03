import React, { useState, useEffect, useRef } from 'react'

import ChoseMedia from 'components/Medias/components/ChoseMedia/ChoseMedia'
import './FullProjectPicturesEditor.css'

import { useFetchAPI } from 'hooks/useFetchAPI'

const imageKey = process.env.REACT_APP_IMAGE_USED

const FullProjectPicturesEditor = ({
    removeComponentFromList,
    modulesCollectionId,
    module,
    refProp,
}) => {
    const { fetchAPI } = useFetchAPI()

    const addRef = useRef(false)

    let [imageIdList, setImageIdList] = useState([])
    let [imagesList, setImagesList] = useState([])
    let [open, setOpen] = useState(false)
    let [fullImageId, setFullImageId] = useState(null)
    let [isEdit, setIsEdit] = useState(false)
    let [addState, setAddState] = useState({ bol: false, state: 'new' })
    let [target, setTarget] = useState('')
    let [moduleId, setModuleId] = useState(null)

    const handleImageIdList = async newImageList => {
        let method = isEdit ? 'PUT' : 'POST'
        let body = {
            images: !newImageList ? imageIdList : newImageList,
            moduleCollId: modulesCollectionId,
            fullImageModuleId: fullImageId,
        }

        let payload = { method, body }
        try {
            let resBkc = await fetchAPI('/full-image', payload)
            if (!isEdit) {
                setIsEdit(true)
                setModuleId(resBkc.module._id)
                setFullImageId(resBkc.module.component)
            }
            setImagesList(resBkc.data.images)
            let imgIdList = resBkc.data.images.map(i => i._id)
            setImageIdList(imgIdList)
        } catch (error) {
            console.error(error)
        }
    }

    const editImageList = media => {
        let imageList = [...imagesList]
        let idx = 0
        switch (addState.state) {
            case 'new':
                imageList.push(media)
                break
            case 'after':
                idx = imageList.findIndex(i => i._id === target)
                imageList.splice(idx + 1, 0, media)
                break
            case 'before':
                idx = imageList.findIndex(i => i._id === target)
                imageList.splice(idx, 0, media)
                break
        }
        if (!!media) {
            setImageIdList(imageList.map(i => i._id))
            setImagesList(imageList)
        }
    }

    const handleDelete = mediaId => {
        let newImageIdList = imageIdList.filter(i => i !== mediaId)
        if (newImageIdList.length === 0) {
            deleteImageModule()
            return
        }
        let newImagesList = imagesList.filter(i => i._id !== mediaId)
        handleImageIdList(newImageIdList)
        setImageIdList(newImageIdList)
        setImagesList(newImagesList)
    }

    const addMedia = (position, target) => {
        setTarget(target)
        setAddState({ bol: addState, state: position })
    }

    const deleteImageModule = async () => {
        let body = {
            moduleId,
            fullImageModuleId: fullImageId,
            modulesCollectionId,
        }
        let method = 'DELETE'
        let payload = { body, method }

        try {
            await fetchAPI('/full-image', payload)
            removeComponentFromList(moduleId)
        } catch (errors) {
            console.error(errors)
        }
    }

    useEffect(
        () => {
            if (addRef.current) {
                setOpen(true)
            } else {
                addRef.current = true
            }
        },
        [addState.bol]
    )

    useEffect(
        () => {
            let imagesList = !module._id
                ? []
                : !module.component ? [] : module.component.images
            let imageIdList = imagesList.map(i => i._id)
            let fullImageModuleId = !module.component
                ? null
                : module.component._id
            setImagesList(imagesList)
            setImageIdList(imageIdList)
            setIsEdit(imageIdList.length > 0)
            setFullImageId(fullImageModuleId)
            let modId = !module._id ? null : module._id
            setModuleId(modId)
        },
        [module]
    )

    return (
        <React.Fragment>
            {open && (
                <ChoseMedia
                    open={open}
                    title={'Chose media'}
                    getMedia={editImageList}
                    postMedia={handleImageIdList}
                    handleOpen={setOpen}
                />
            )}
            <section
                ref={refProp}
                className="full-pictures-container editable-module-box"
            >
                <div
                    style={{
                        padding: '15px 15px 15px',
                        display: 'flex',
                        justifyContent: 'center',
                        borderBottom: '2px solid black',
                    }}
                >
                    <span
                        onClick={() => deleteImageModule()}
                        className="clean-button force-big-padding "
                    >
                        DELETE FULL IMAGE MODULE
                    </span>
                </div>
                {imagesList.length > 0 &&
                    imagesList.map((img, idx) => {
                        return (
                            <div className="full-pict-box relative" key={idx}>
                                <button
                                    className="clean-button force-big-padding"
                                    style={{
                                        position: 'absolute',
                                        top: '35px',
                                        left: '35px',
                                    }}
                                    onClick={() => handleDelete(img._id)}
                                >
                                    X Delete Media
                                </button>
                                <button
                                    className="clean-button force-big-padding "
                                    style={{
                                        position: 'absolute',
                                        top: '35px',
                                        right: '35px',
                                    }}
                                    onClick={() => addMedia('before', img._id)}
                                >
                                    + Add Media Before
                                </button>
                                <button
                                    className="clean-button force-big-padding"
                                    style={{
                                        position: 'absolute',
                                        bottom: '35px',
                                        right: '35px',
                                    }}
                                    onClick={() => addMedia('after', img._id)}
                                >
                                    + Add Media After
                                </button>
                                {img.media_type === 'image' ? (
                                    <img
                                        className="full-img"
                                        src={img[imageKey]}
                                        alt={img.alt}
                                    />
                                ) : img.media_type === 'video' ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        className="full-img"
                                        src={img[imageKey]}
                                        alt={img.alt}
                                    />
                                ) : null}
                            </div>
                        )
                    })}
                {!imagesList.length > 0 && (
                    <div className="full-pict-box relative">
                        <button
                            className="clean-button"
                            style={{
                                position: 'absolute',
                                top: '35px',
                                letf: '35px',
                            }}
                            onClick={() => addMedia('new')}
                        >
                            + Add Media
                        </button>
                        <img
                            className="full-img"
                            src="/imgs/default_media_image.png"
                            alt={'Default image'}
                        />
                    </div>
                )}
            </section>
        </React.Fragment>
    )
}

export default FullProjectPicturesEditor
