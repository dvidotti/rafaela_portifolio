import React from 'react';
import Header from '../Header/Header'

import {Link} from 'react-router-dom'

import './DashBoard.css'


const DashBoard = (props) => {
  
  return (
    <div>
      <Header 
        showArrow={false} 
        isProjectPage={false}
      />
      <div className="link-container">
        <div className="link-box">
          <Link to='/admin/medias'>Medias</Link>
        </div>
        <div className="link-box">
          <Link to='/admin/projects'>Projects</Link>
        </div>
        <div className="link-box">
          <Link to='/admin/portfolio'>Portfolio</Link>
        </div>
        <div className="link-box">
          <Link to='/admin/about'>About</Link>
        </div>
      </div>

    </div>
  )
}

export default DashBoard;