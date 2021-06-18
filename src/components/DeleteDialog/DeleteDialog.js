import React from 'react'
import './DeleteDialog.css'

const DeleteDialog = (props) => {

  return (
    <div className='add-media-container'>
      <div>
        <h4>{props.title}</h4>
        {/* <h4>Delete Project</h4> */}
        <div className="dialog-body">
          <span>{props.message}</span>
        </div>
        <div className="action-dialog">
          <button 
            style={{marginRight: 20}}
            className="clean-button white-bck"
            onClick={() => props.closeDialog(false)}
            >Cancel
          </button>
          <button
            className="clean-button white-bck"
            onClick={() => props.deleteAction()}
            >Delete
          </button>
        </div>
      </div>
    </div>
  )
}



export default DeleteDialog;

