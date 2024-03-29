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
                                <NavLink className="nav-link active" to="/admin/dashboard"><i className="fa fa-fw fa-user-circle"></i> Dashboard</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link active" to="/admin/users"><i className="fa fa-fw fa-users"></i> Users</NavLink>
                            </li>

                            <li className="nav-item ">
                                <NavLink className="nav-link active" to="/admin/categories"><i className="fa fa-fw fa-table"></i> Categories</NavLink>
                            </li>

                            <li className="nav-item ">
                                <NavLink className="nav-link active" to="/admin/products"><i className="fa fa-fw fa-table"></i> Products</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"><i className="fa fa-fw fa-rocket"></i>UI Elements</a>
                                <div id="submenu-2" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="cards.html">Cards <span className="badge badge-secondary">New</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="general.html">General</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="carousel.html">Carousel</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="listgroup.html">List Group</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="typography.html">Typography</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="accordions.html">Accordions</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="tabs.html">Tabs</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-3" aria-controls="submenu-3"><i className="fas fa-fw fa-chart-pie"></i>Chart</a>
                                <div id="submenu-3" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="chart-c3.html">C3 Charts</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="chart-chartist.html">Chartist Charts</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="chart-charts.html">Chart</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="chart-morris.html">Morris</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="chart-sparkline.html">Sparkline</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="chart-gauge.html">Guage</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-4" aria-controls="submenu-4"><i className="fab fa-fw fa-wpforms"></i>Forms</a>
                                <div id="submenu-4" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="form-elements.html">Form Elements</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="form-validation.html">Parsely Validations</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="multiselect.html">Multiselect</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-5" aria-controls="submenu-5"><i className="fas fa-fw fa-table"></i>Tables</a>
                                <div id="submenu-5" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="general-table.html">General Tables</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="data-tables.html">Data Tables</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-divider">
                                Features
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-6" aria-controls="submenu-6"><i className="fas fa-fw fa-file"></i>Pages</a>
                                <div id="submenu-6" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="invoice.html">Invoice</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="blank-page.html">Blank Page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="blank-page-header.html">Blank Page Header</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="login.html">Login</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="404-page.html">404 page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="sign-up.html">Sign up Page</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="forgot-password.html">Forgot Password</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="pricing.html">Pricing Tables</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="timeline.html">Timeline</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="calendar.html">Calendar</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="sortable-nestable-lists.html">Sortable/Nestable List</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="widgets.html">Widgets</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="media-object.html">Media Objects</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="cropper-image.html">Cropper</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="color-picker.html">Color Picker</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-7" aria-controls="submenu-7"><i className="fas fa-fw fa-inbox"></i>Apps <span className="badge badge-secondary">New</span></a>
                                <div id="submenu-7" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="inbox.html">Inbox</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="email-details.html">Email Detail</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="email-compose.html">Email Compose</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="message-chat.html">Message Chat</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-8" aria-controls="submenu-8"><i className="fas fa-fw fa-columns"></i>Icons</a>
                                <div id="submenu-8" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="icon-fontawesome.html">FontAwesome Icons</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="icon-material.html">Material Icons</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="icon-simple-lineicon.html">Simpleline Icon</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="icon-themify.html">Themify Icon</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="icon-flag.html">Flag Icons</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="icon-weather.html">Weather Icon</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-9" aria-controls="submenu-9"><i className="fas fa-fw fa-map-marker-alt"></i>Maps</a>
                                <div id="submenu-9" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="map-google.html">Google Maps</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="map-vector.html">Vector Maps</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-10" aria-controls="submenu-10"><i className="fas fa-f fa-folder"></i>Menu Level</a>
                                <div id="submenu-10" className="collapse submenu">
                                    <ul className="nav flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Level 1</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-11" aria-controls="submenu-11">Level 2</a>
                                            <div id="submenu-11" className="collapse submenu">
                                                <ul className="nav flex-column">
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">Level 1</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" href="#">Level 2</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">Level 3</a>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </nav >
            </div >
        </div >
    )
}

export default SideBar