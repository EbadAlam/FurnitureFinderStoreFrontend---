import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Hamburger from '../../assets/images/icon1.png'
import './Navbar.css'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
    }

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="logo">
                        {/* <img src={Brand} alt="" /> */}
                    </div>
                    <div className="menu-icon" onClick={handleShowNavbar}>
                        <img src={Hamburger} alt="" style={{ width: 20 }} />
                    </div>
                    <div className={`nav-elements  ${showNavbar && 'active'}`}>
                        <ul>
                            <li>
                                <NavLink className="nav-links" to="/" activeClassName="active">HOME</NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-links" to="/about" activeClassName="active">ABOUT</NavLink>
                            </li>
                            <li><NavLink className="nav-links" to="/shop" activeClassName="active">SHOP</NavLink></li>
                            <li><NavLink className="nav-links" to="/vendors" activeClassName="active">VENDORS</NavLink></li>
                            <li><NavLink className="nav-links" to="/blog" activeClassName="active">BLOG</NavLink></li>
                            <li><NavLink className="nav-links" to="/contact" activeClassName="active">CONTACT</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;