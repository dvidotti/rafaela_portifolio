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
    <section 
      className={history === "/" ? "header-container-home": "header-container"}>
      <section className="header-top-container">
        <div className="title-box">
          <Link className="title-link" to="/">   
              <span className={history === "/" ? "title-home non-mobile": "title-home non-mobile"}>RAFAELA VINOTTI</span>
              <span className={history === "/" ? "title-home mobile": "title-mobile mobile"}>RV</span>
          </Link>
        </div>
        <div className="text-two-container">
          <span className={history === "/" ? "text-two-header-home" :"text-two-header"}
            > Experienced in Strategy, Brand, Graphic<br></br> and Digital Design
          </span>
        </div>
        <div className="arrow-down-outer-container">
          <div className={history === "/" ?  "arrow-down-inner-container-home" : "arrow-down-inner-container"}>
              <span
                onClick={() => scrollToBottom()}>
                {props.showArrow &&
                  <img className="arrow-size" src="/imgs/rv_icon_direction_down.svg" alt="Arrow Down"/>
                }
              </span>
          </div>
        </div>
        {props.user && 
          <div className="header-right-container">
            <Link className="no-link-decoration" to="/admin/portfolio">
              <span className={"about-menu-home"}>
                <span className="hover-bottom-border">ADMIN</span>
              </span>
            </Link>
          </div>
        }
        <div className="header-right-container">
          {props.showArrow  ?
            <Link className="no-link-decoration" to="/about">
              <span className={history === "/" ? "about-menu-home":"about-menu"}>
                <span className="hover-bottom-border">ABOUT</span>
              </span>
            </Link>
            : props.isProjectPage ? 
            <Link className="no-link-decoration" to="/about">
              <span className={history === "/" ? "about-menu-home":"about-menu"}>
                <span className="hover-bottom-border">ABOUT</span>
              </span>
            </Link>
            :
            <Link className="no-link-decoration" to={getFrom}>
              <span className={history === "/" ? "about-menu-home":"about-menu"}>
                <span className="line-through">ABOUT</span>
              </span>
            </Link>
          }
        </div>
      </section>
    </section>
  )
}

export default Header;