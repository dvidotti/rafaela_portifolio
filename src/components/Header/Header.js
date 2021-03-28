import React, {useState, useEffect} from "react";
import {Link, useHistory } from "react-router-dom";

import "./Header.css"


const Header = (props) => {
  let history = useHistory().location.pathname;

  let [getFrom, handleGetFrom] = useState("/about")

  const updateGetFrom = () => {
    if(history !== "/about") handleGetFrom(history)
  }

  useEffect(() => {
    updateGetFrom()
  })

  const scrollToBottom = () => {
    if(props.showArrow) {
      props.scrollTo(props.port)
    }
  }

  return (
    <section className="header-container">
      <section className="header-top-container">
        <div className="title-box">
          <Link className="title-link" to="/">
            <span onClick={() => props.handleArrow(true)} className="title">RAFAELA VINOTTI</span>
          </Link>
        </div>
        <div className="text-two-container">
          <span className="text-two-header"
            > Experienced in Strategy, Brand, Graphic<br></br> and Digital Design
          </span>
        </div>
        <div className="arrow-down-outer-container">
          <div className="arrow-down-inner-container">
              <span onClick={() => scrollToBottom()}>
                {props.showArrow &&
                  <img className="arrow-size" src="/imgs/rv_icon_direction_down.svg" alt="Arrow Down"/>
                }
              </span>
          </div>
        </div>
        <div className="header-right-container">
          {props.showArrow  ?
            <Link className="no-link-decoration" to="/about">
              <span onClick={() => props.handleArrow(!props.showArrow)} className="about-menu">ABOUT</span>
            </Link>
            : props.isProjectPage ? 
            <Link className="no-link-decoration" to="/about">
              <span onClick={() => props.handleArrow(!props.showArrow)} className="about-menu">ABOUT</span>
            </Link>
            :
            <Link className="no-link-decoration" to={getFrom}>
              <span onClick={() => props.handleArrow(!props.showArrow)} className="about-menu stroke-line">ABOUT</span>
            </Link>
          }
        </div>
      </section>
    </section>
  )
}

export default Header;