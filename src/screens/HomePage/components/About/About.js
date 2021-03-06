import React, { useState } from 'react'

import { aboutInfo } from 'data/about.js'
import './About.css'

let initialState = {
    openEducation: true,
    openSkilled: false,
    openMarketplace: false,
}

const About = () => {
    let [menuStatus, setMenuStatus] = useState(initialState)

    const handleDropDowns = idx => {
        switch (idx) {
            case 0:
                setMenuStatus({
                    openEducation: !menuStatus.openEducation,
                    openSkilled: menuStatus.openEducation,
                    openMarketplace: menuStatus.openEducation,
                })
                break
            case 1:
                setMenuStatus({
                    openEducation: menuStatus.openSkilled,
                    openSkilled: !menuStatus.openSkilled,
                    openMarketplace: menuStatus.openSkilled,
                })
                break
            case 2:
                setMenuStatus({
                    openEducation: menuStatus.openMarketplace,
                    openSkilled: menuStatus.openMarketplace,
                    openMarketplace: !menuStatus.openMarketplace,
                })
                break
            default: {
                setMenuStatus(initialState)
            }
        }
    }

    const getOpenStatus = idx => {
        switch (idx) {
            case 0:
                return menuStatus.openEducation
            case 1:
                return menuStatus.openSkilled
            case 2:
                return menuStatus.openMarketplace
        }
    }

    return (
        <div className="about-info-container">
            <div className="about-title">Summary</div>
            <div className="description-box">{aboutInfo.bio}</div>
            <div className="summary-box">
                {aboutInfo.summary.map((item, idx) => (
                    <div key={item.name} className="summary-item-box">
                        <div
                            onClick={() => handleDropDowns(idx)}
                            className="summary-item-title"
                        >
                            <span className="summary-item-title-text">
                                {item.name}
                            </span>
                        </div>
                        {getOpenStatus(idx) && (
                            <div className="summary-item-list">
                                {item.list.map(i => (
                                    <div
                                        key={i}
                                        className="summary-subitem-box"
                                    >
                                        <span>{i}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="image-box">
                <img
                    className="image-about"
                    src={aboutInfo.img_link}
                    alt={aboutInfo.alt}
                />
            </div>
        </div>
    )
}

export default About
