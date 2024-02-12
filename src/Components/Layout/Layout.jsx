import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

const Layout = ({ children }) => {
    const { token, user, _loading } = useStateContext();
    if (_loading === false) {
        if (token && user.role === 'master-admin') {
            return (<Navigate to="/admin/dashboard" />)
        }
        if (token && user.position === 'manager') {
            return (<Navigate to="/manager/dashboard" />)
        }
        if (token && user.role === 'seller') {
            return (<Navigate to="/seller/dashboard" />)
        }
    }
    return (
        <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;