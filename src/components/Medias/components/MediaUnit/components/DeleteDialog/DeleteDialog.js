import React from 'react'

const DeleteDialog = (props) => {
  const {media, handleOpen, deleteMedia} = props;
  return (
    <div>
      <div className="dialog-subtitle">Please press DELETE to confirm delete</div>
      <div className="dialog-control">
        <div>
          <span className="clean-button" onClick={() => deleteMedia(media._id, media.public_id)}>DELETE</span>
        </div>
        <div>
          <span className="clean-button" onClick={() => handleOpen(false)}>CANCEL</span>
        </div>
      </div>
    </div>
  )
}

export default DeleteDialog;