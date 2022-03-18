import React from 'react';
import './Dialog.css'


const Dialog = ({width, open, children}) => {
  let widthClass = width === "big" ? "dialog-big" : "";
  return (
    <div>
      <div className={`overlay-dialog ${open ? "overlay-open" : "overlay-closed"}`}></div>
      <div className="dialog-container">
        <div className={`dialog ${widthClass} ${open ? "dialog-open" : "dialog-closed"}`}>
          <div className="children-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog;