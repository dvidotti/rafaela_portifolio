import React from 'react';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'

import {Link} from 'react-router-dom'

import './DashBoard.css'


const DashBoard = (props) => {
  
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