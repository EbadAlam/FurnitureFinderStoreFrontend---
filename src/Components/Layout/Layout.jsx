import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

const Layout = ({ children }) => {
    const { token, user, _loading } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        // if (!_loading && token && user) {
        if (user.role === 'master-admin') {
            navigate("/admin/dashboard");
        }
        if (user.position === 'manager') {
            navigate("/manager/dashboard");
        }
        if (user.role === 'seller') {
            navigate("/seller/dashboard");
        }
        // }
    }, [_loading, token, user, navigate]);


    return (
        <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
