import React from 'react'
import './DeleteDialog.css'

const DeleteDialog = ({ title, message, closeDialog, deleteAction }) => {
    return (
        <div className="add-media-container">
            <div>
                <h4>{title}</h4>
                <div className="dialog-body">
                    <span>{message}</span>
                </div>
                <div className="action-dialog">
                    <button
                        className="clean-button white-bck mgRight20"
                        onClick={() => closeDialog(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="clean-button white-bck"
                        onClick={() => deleteAction()}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog
