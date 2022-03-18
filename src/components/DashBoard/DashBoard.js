import React from 'react';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'

import './DashBoard.css'


const DashBoard = () => {
  
  return (
    <div>
      <HeaderAdmin 
        showArrow={false} 
        isProjectPage={false}
      />
    </div>
  )
}

export default DashBoard;