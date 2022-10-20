import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function AdminNavBar() {
  return (
    <>
    <ul className="dropdown-menu dropdown-menu-dark d-block position-static mx-0 border-0 shadow w-220px">
                            <li>
                                <NavLink className="dropdown-item d-flex gap-2 align-items-center active" to="/admin">
                                    <i className="bi bi-house-door-fill" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item d-flex gap-2 align-items-center" to="/admin/taxionomy">
                                    <i className="bi bi-tags-fill" />
                                    Etiketler
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item d-flex gap-2 align-items-center" to="/admin/location">
                                    <i className="bi bi-geo-alt-fill" />
                                    Lokasyan
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item d-flex gap-2 align-items-center" to="/admin/user">
                                    <i className="bi bi-person-fill" />
                                    Üyeler
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="dropdown-item d-flex gap-2 align-items-center" to="/admin/otel/list">
                                    <i className="bi bi-bookmark-plus-fill" />
                                    Oteller
                                </NavLink>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item d-flex gap-2 align-items-center" href="#">
                                    <i className="bi bi-door-open-fill" />
                                    Çıkış Yap
                                </a>
                            </li>
                        </ul>
    </>
  )
}

AdminNavBar.propTypes = {}

export default AdminNavBar
