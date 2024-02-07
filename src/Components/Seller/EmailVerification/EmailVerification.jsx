import React, { useEffect, useState } from 'react'
import { NavLink, useParams, Navigate } from 'react-router-dom'
import axiosClient from '../../../axios-client';
import Loader from '../../Loader/Loader';
import Layout from '../../Layout/Layout';
import { useStateContext } from '../../../contexts/ContextProvider';

function EmailVerification() {
    const { email, _token } = useParams();
    const { token } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [evt, setEvt] = useState('');
    const sendStatusUpdateRequest = (email, token) => {
        setLoading(true);
        const payload = {
            email: email,
            token: token,
        }
        axiosClient.put('/user/emailtokenstatusupdate', payload)
            .then(({ data }) => {
                setLoading(false);
                setEvt(data.message);
                return <Navigate to="/login" />
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            })
    }

    useEffect(() => {
        if (email && _token) {
            sendStatusUpdateRequest(email, _token);
        }
    }, []);

    return (
        <Layout>
            {loading ? (
                <Loader fullScreen={true} />
            ) : (
                <div style={{ textAlign: 'center' }} className='mt-5 mb-5'>
                    <h1 className='pt-5'>{evt ? evt : 'An error occurred. Verify again.'}</h1>
                    {token ? (
                        <NavLink to="/seller/dashboard" className="btn btn-primary">Dashboard</NavLink>
                    ) : (
                        <NavLink to="/login" className="btn btn-primary">Login</NavLink>
                    )}
                </div>
            )}
        </Layout>
    )
}

export default EmailVerification;

// js is per aye ga to request jaye gy jisme status change hoga