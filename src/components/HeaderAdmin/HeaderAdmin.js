import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './HeaderAdmin.css'

const HeaderAdmin = props => {
    let history = useHistory().location.pathname

    let [page, handlePage] = useState('portfolio')

    useEffect(() => {
        let arr = history.split('/')
        let pageLink = arr[arr.length - 1]
        handlePage(pageLink)
    }, [])
    return (
        <section className="header-container-admin">
            <section className="header-top-container">
                <div className="title-box">
                    <Link className="title-link" to="/">
                        <span className="title">RAFAELA VINOTTI</span>
                    </Link>
                </div>
                <div className="header-right-container-flex">
                    <div className="link-box">
                        <Link
                            className={
                                page === 'portfolio'
                                    ? 'link-selected'
                                    : 'link-light'
                            }
                            to="/admin/portfolio"
                        >
                            Portfolio
                        </Link>
                    </div>
                    <div className="link-box">
                        <Link
                            className={
                                page === 'medias'
                                    ? 'link-selected'
                                    : 'link-light'
                            }
                            to="/admin/medias"
                        >
                            Medias
                        </Link>
                    </div>
                    <div className="link-box">
                        <Link
                            className={
                                page === 'projects'
                                    ? 'link-selected'
                                    : 'link-light'
                            }
                            to="/admin/projects"
                        >
                            Projects
                        </Link>
                    </div>
                    {/* <div className="link-box">
            <Link to='/admin/about'>About</Link>
          </div> */}
                </div>
            </section>
        </section>
    )
}

export default HeaderAdmin
