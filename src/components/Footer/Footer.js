import React from "react";

import "./Footer.css"

const Footer = () => {

  return (
    <section class="footer-container">
      <div class="footer-inner-container" style={{padding: "40px 20px", display: "flex", justifyContent: "space-between"}}>
        <span
          style={{
            fontSize: "1.8rem",
            fontWeight: 300,
            display: "inline-flex"
          }}
          >LET'S TALK
        </span>
        <span 
          style={{
              padding: "10px 0px",
              fontWeight: 300,
              display: "inline-flex"
            }}
          >
          <img style={{height: "80%"}} src="/imgs/rv_icon_direction_up.svg"/>
        </span>
      </div>
    </section>
  )
}

export default Footer;