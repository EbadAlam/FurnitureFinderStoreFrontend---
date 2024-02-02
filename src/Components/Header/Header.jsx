import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png';
import contactLogo from '../../assets/images/contactLogo.png';
import { Link, NavLink } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';
import Loader from '../Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const { token, setUser, setToken, user } = useStateContext();
    const [loading, setLoading] = useState(false);
    const logoutHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosClient.post('/logout')
            .then(() => {
                setToken(null);
                setUser({});
                localStorage.removeItem('user_email');
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }
    return (

        <div className='header'>
            {loading ? (
                <Loader fullScreen={true} />
            ) : (
                <div className="container">
                    <div className="logo">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="nav">
                        <nav>
                            <ul>
                                <li>
                                    <NavLink className="nav-links" to="/" >HOME</NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-links" to="/about" >ABOUT</NavLink>
                                </li>
                                <li>SHOP</li>
                                <li>VENDORS</li>
                                <li>BLOG</li>
                                <li>CONTACT</li>
                                {!token ? (
                                    <li>
                                        <NavLink className="nav-links" to="/login" >LOGIN</NavLink>
                                    </li>

                                ) : (
                                    <li onClick={logoutHandler}>LOGOUT</li>
                                )}
                                {token && user.role == 'seller' ? (
                                    <li>
                                        <NavLink to="/seller/dashboard">DASHBOARD</NavLink>
                                    </li>
                                ) : (null)}
                            </ul>
                        </nav>
                    </div>
                    <div className="contactInfo">
                        <div className="contactInfoSubDiv">
                            <div className="contactIcon">
                                <img src={contactLogo} alt="" />
                            </div>
                            <div className="contactPara">
                                <p>Call Us: <a href="tel:0989177556">0989 177 556</a></p>
                                <p><a href="mailto:info@furniture_finder.com">info@furniture_finder.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Header;