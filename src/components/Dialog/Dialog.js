import React from 'react';
import './Dialog.css'


const Dialog = (props) => {
  console.log('PROPS', props)
  return (
    <div>
      <div className={`overlay-dialog ${props.open ? "overlay-open" : "overlay-closed"}`}></div>
      <div className="dialog-container">
        <div className={`dialog ${props.open ? "dialog-open" : "dialog-closed"}`}>
          <div style={{widht: "100%", height: "100%"}}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog;