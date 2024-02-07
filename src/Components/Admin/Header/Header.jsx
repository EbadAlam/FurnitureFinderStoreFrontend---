import React, { useState } from 'react'
import '../css/bootstrap/css/bootstrap.min.css';
import '../css/fonts/circular-std/style.css';
import '../css/fonts/fontawesome/css/fontawesome-all.css';
import '../css/fonts/material-design-iconic-font/css/materialdesignicons.min.css';
import '../css/libs/css/style.css';
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import axiosClient from '../../../axios-client';
import Loader from '../../Loader/Loader';

function Header() {
    const { user, setToken, setUser } = useStateContext();
    const [headerProfile, setHeaderProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const headerProfileClick = () => {
        setHeaderProfile(!headerProfile);
    }
    const adminLogout = (e) => {
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
        <div class="dashboard-header">
            <nav class="navbar navbar-expand-lg bg-white fixed-top">
                <NavLink class="navbar-brand" to="/admin/dashboard">Furniture Finder Store</NavLink>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    {loading ? (
                        <Loader fullScreen={true} />
                    ) : (
                        <ul class="navbar-nav ml-auto navbar-right-top">
                            <li class="nav-item dropdown nav-user">
                                <a onClick={headerProfileClick} class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2">
                                    <img src="https://avatar.iran.liara.run/public/boy?username=Josh" alt="" class="user-avatar-md rounded-circle" />
                                </a>
                                {headerProfile ? (
                                    <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" style={{ display: 'block' }}>

                                        <div class="nav-user-info">
                                            <h5 class="mb-0 text-white nav-user-name">{user.name}</h5>
                                            <span class="status"></span><span class="ml-2">Available</span>
                                        </div>
                                        <a class="dropdown-item" href="#"><i class="fas fa-user mr-2"></i>Account</a>
                                        <a class="dropdown-item" href="#"><i class="fas fa-cog mr-2"></i>Setting</a>
                                        <a onClick={adminLogout} style={{ cursor: 'pointer' }} class="dropdown-item"><i class="fas fa-power-off mr-2"></i>Logout</a>
                                    </div>
                                ) : null}
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Header