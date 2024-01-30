import React from 'react'
import { NavLink } from 'react-router-dom';
function SideBar() {
    return (
        <div className="nav-left-sidebar sidebar-dark">
            <div className="menu-list">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="d-xl-none d-lg-none" href="#">Dashboard</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav flex-column">
                            <li className="nav-divider">
                                Menu
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link active" to="/seller/dashboard"><i className="fa fa-fw fa-user-circle"></i> Dashboard</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link" to="/seller/products"><i className="fa fa-fw fa-table"></i> Products</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav >
            </div >
        </div >
    )
}

export default SideBar