import React, { useState, useEffect } from 'react'
import './AddMedia.css'
import { uploadFile } from 'react-s3'
import { useFetchAPI } from 'hooks/useFetchAPI'

const AddMedia = props => {
    const { fetchAPI } = useFetchAPI()

    let [file, setFile] = useState(null)
    let [fileView, setFileView] = useState(null)
    let [name, setName] = useState('')
    let [fileType, setFileType] = useState(null)
    let [loading, setLoading] = useState(false)
    //TODO: set backup for video (S3?)
    const url =
        fileType === 'video'
            ? process.env.REACT_APP_CLOUDINARY_URL_VIDEO
            : process.env.REACT_APP_CLOUDINARY_URL

    const checkMedia = () => {
        let type = null
        if (file) {
            if (file.type.includes('video')) type = 'video'
            if (file.type.includes('image')) type = 'image'
        }
        setFileType(type)
    }

    const hiddenFileInput = React.useRef(null)

    const handleClick = event => {
        hiddenFileInput.current.click()
    }

    const config = {
        bucketName: process.env.REACT_APP_S3_BUCKET,
        // bucketName: "rafavinotti",
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    }

    const handleUpload = e => {
        if (e.target.files[0]) {
            setFileView(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
        /* this contains the file we want to send */
    }

    const handlePostImage = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append(
            'upload_preset',
            process.env.REACT_APP_CLOUDINARY_PRESET
        )
        const options = {
            method: 'POST',
            body: formData,
        }
        // save on Cloudinary
        const res = await fetch(url, options)
        const resCloudinary = await res.json()
        const linkCloudinary = resCloudinary.secure_url
        const { public_id } = resCloudinary
        const media_type = resCloudinary.resource_type

        // save backup on S3
        const resAws = await uploadFile(file, config)
        const linkS3 = resAws.location
        const linkMyDomain = `http://images.rafaelavinotti.com/${resAws.key}`

        const opt = {
            method: 'POST',
            body: {
                name,
                linkCloudinary,
                public_id,
                media_type,
                linkS3,
                linkMyDomain,
            },
        }
        // save both responses in DB
        await fetchAPI(`/media`, opt)
        props.handleAddMediaOpen(false)
        props.getMedias()
        setFileView(null)
        setFile(null)
        setName('')
        setLoading(false)
    }

    useEffect(
        () => {
            checkMedia()
        },
        [file]
    )

    return (
        <div className="add-media-container">
            <div className="add-media-header">
                <h4>Add Media</h4>
                <div>
                    <span
                        onClick={e => handleClick(e)}
                        className={loading ? 'disabled-btn' : 'clean-button'}
                    >
                        Choose file
                    </span>
                </div>
            </div>
            <div className="add-media-pict-container">
                {loading ? (
                    <div className="loading-box">
                        <span className="add-image-pict loading-text">
                            Saving ...{' '}
                        </span>
                    </div>
                ) : fileType === null ? (
                    <img
                        className="add-image-pict"
                        src="/imgs/default_media_image.png"
                    />
                ) : fileType === 'image' ? (
                    <img className="add-image-pict" src={fileView} />
                ) : fileType === 'video' ? (
                    <video className="video" controls src={fileView} />
                ) : null}
            </div>
            <div className="add-media-control">
                <div>
                    <input
                        id="pict-name"
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        className="input"
                        type="text"
                        value={name}
                    />
                    <input
                        id="select-pict"
                        className="input-hidden"
                        type="file"
                        ref={hiddenFileInput}
                        onChange={e => handleUpload(e)}
                    />
                </div>
                <div>
                    <span
                        className={loading ? 'disabled-btn' : 'clean-button'}
                        onClick={() => {
                            props.handleAddMediaOpen(false)
                            setName('')
                            setFileView(null)
                            setFile(null)
                        }}
                    >
                        Cancel
                    </span>
                    <span
                        className={
                            file === null || name === '' || loading
                                ? 'disabled-btn'
                                : 'clean-button'
                        }
                        onClick={() => {
                            if (file === null || name === '') return
                            handlePostImage()
                            setFileView(null)
                            setFile(null)
                            setName('')
                        }}
                    >
                        Save
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AddMedia
