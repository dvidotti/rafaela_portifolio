import React, { useState, useRef, useEffect } from 'react'

import './Footer.css'

const Footer = () => {
    const copyright = useRef(null)
    let [openFooter, setOpenFooter] = useState(false)

    const executeScroll = () => {
        if (openFooter) copyright.current.scrollIntoView()
    }

    const handleFooter = () => {
        setOpenFooter(!openFooter)
        if (openFooter) {
            executeScroll()
        }
    }

    useEffect(
        () => {
            executeScroll()
        },
        [openFooter]
    )

    return (
        <section className="footer-container">
            <div className="footer-inner-container">
                {openFooter ? (
                    <span
                        onClick={() => handleFooter(!openFooter)}
                        className="footer-title"
                    >
                        <span className="line-through">LET'S TALK</span>
                    </span>
                ) : (
                    <span
                        onClick={() => handleFooter(!openFooter)}
                        className="footer-title"
                    >
                        <span className="hover-bottom-border">LET'S TALK</span>
                    </span>
                )}
                <span
                    onClick={() => window.scrollTo(0, 0)}
                    className="arrow-box-footer"
                >
                    <img
                        className="arrowIcon"
                        src="/imgs/rv_icon_direction_up.svg"
                    />
                </span>
            </div>
            {openFooter && (
                <div id="footer">
                    <div className="lower-footer-container">
                        <div className="footer-left-box">
                            <p>hello@rafaelavinotti.com</p>
                            <p>T + 44 07988 874719 UK</p>
                            <p className="brief-description">
                                I’m Italian-Brazilian Designer living between
                                London and Sao Paulo.<br />
                                Let’s talk about how design can help to
                                transform our ideas for the better!
                            </p>
                            <div className="widget-container">
                                <span className="widget-box">
                                    <img
                                        className="widget-image"
                                        src="/imgs/rv_social_icon_linkedin.svg"
                                        alt="Linkedin"
                                    />
                                </span>
                                <span className="widget-box">
                                    <img
                                        className="widget-image"
                                        src="/imgs/rv_social_icon_instagram.svg"
                                        alt="Instagram"
                                    />
                                </span>
                                <span className="widget-box">
                                    <img
                                        className="widget-image"
                                        src="/imgs/rv_social_icon_pinterest.svg"
                                        alt="Pinterest"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="footer-right-box">
                            <div className="footer-map-box">
                                <img
                                    className="map_image"
                                    src="/imgs/london_snap.png"
                                />
                            </div>
                        </div>
                    </div>
                    <div ref={copyright} className="copyright">
                        ©2021 RAFAELA VINOTTI — All Rights Reserved
                    </div>
                </div>
            )}
        </section>
    )
}

export default Footer
