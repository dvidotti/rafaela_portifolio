import React from "react";
import { Link } from "react-router-dom";

import "./Header.css"


const Header = (props) => {

  return (
    <section className="header-container">
      <section className="header-top-container">
        <div className="title-box">
          <Link className="title-link" to="/">
            <span className="title">RAFAELA VINOTTI</span>
          </Link>
        </div>
        <div className="text-two-container">
          <span className="text-two-header"
            > Experienced in Strategy, Brand, Graphic<br></br> and Digital Design
          </span>
        </div>
        <Link to="projects">
          <div className="arrow-down-outer-container">
            <div className="arrow-down-inner-container">
              {props.showArrow &&
                <span>
                  <img className="arrow-size" src="/imgs/rv_icon_direction_down.svg" alt="Arrow Down"/>
                </span>
              }
            </div>
          </div>
        </Link>
        <div className="header-right-container">
          <span className="about-menu"
            >ABOUT
          </span>
        </div>
      </section>
    </section>
  )
}

export default Header;