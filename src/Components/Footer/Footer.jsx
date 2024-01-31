import React from 'react'
import logo from '../../assets/images/logo.png';
import './Footer.css';
import { DoubleRightOutlined, EnvironmentOutlined, PhoneOutlined, RedEnvelopeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import faceBookLogo from '../../assets/images/facebook.png'
import instaLogo from '../../assets/images/instagram.png'
import twitterLogo from '../../assets/images/twitter.png'

function Footer() {
    var copyrightYear = new Date().getFullYear();
    return (
        <div className='footer'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="inputForm">
                <input type="email" className='emailInput' placeholder='Enter Your Email Address' />
                <button className='btncs'>SUBSCRIBE</button>
            </div>
            <div className="container footerNav">
                <div className="footerNavSubDiv">
                    <h3>INFORMATION CONTACT</h3>
                    <div className="df">
                        <div className="icon">
                            <PhoneOutlined />
                        </div>
                        <div className="text">
                            <p><a href="tel:0989177556">0989 177 556</a></p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <RedEnvelopeOutlined />
                        </div>
                        <div className="text">
                            <p><a href="mailto:info@furniture_finder.com">info@furniture_finder.com</a></p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <EnvironmentOutlined />
                        </div>
                        <div className="text">
                            <p>5th floor, 150 Burj Al A</p>
                        </div>
                    </div>
                </div>
                <div className="footerNavSubDiv">
                    <h3>INFORMATION</h3>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link to="/about">About Us</Link>
                            </p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>Manufactures</Link>
                            </p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>Tracking Orders</Link>
                            </p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>Privacy & Policy</Link>
                            </p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>Terms & Condition</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footerNavSubDiv">
                    <h3>MY ACCOUNT</h3>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>Login</Link>
                            </p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>My Cart</Link>
                            </p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>Wishlist</Link>
                            </p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>Compare</Link>
                            </p>
                        </div>
                    </div>
                    <div className="df">
                        <div className="icon">
                            <DoubleRightOutlined />
                        </div>
                        <div className="text">
                            <p>
                                <Link>My Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footerNavSubDiv">
                    <h3>GET CONNECTED</h3>
                    <div className="df socialIcons">
                        <div className="sIcon">
                            <a href="https://www.facebook.com/">
                                <img src={faceBookLogo} alt="Facebook Icon" />
                            </a>
                        </div>
                        <div className="sIcon">
                            <a href="https://www.instagram.com/">
                                <img src={instaLogo} alt="Insta Icon" />
                            </a>
                        </div>
                        <div className="sIcon">
                            <a href="https://www.twitter.com/">
                                <img src={twitterLogo} alt="Twitter Icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="hr" />
            <div className="copyright">
                <p>&copy; <span className='copyrightYear '>{copyrightYear}</span>, Furniture Finder. All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer
