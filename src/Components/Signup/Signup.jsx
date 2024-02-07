import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout/Layout'
import './Signup.css';
import image from '../../assets/images/bg-2.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';
import Loader from '../Loader/Loader';
import { Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

function Signup() {
    const Navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { fetchUserData, setToken, token } = useStateContext();
    const emailRefLogin = useRef();
    const passwordRefLogin = useRef();
    const nameRefSignup = useRef();
    const emailRefSignup = useRef();
    const phoneRefSignup = useRef();
    const passwordRefSignup = useRef();
    const [role, setRole] = useState();

    useEffect(() => {
        if (token) {
            Navigate('/');
        }
    }, [Navigate]);
    const LoginFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            email: emailRefLogin.current.value,
            password: passwordRefLogin.current.value,
        }
        setErrors(null);
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                if (data.user.account_status === 'Inactive') {
                    setLoading(false);
                    toast('Account Inactive. Please contact admin', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setInterval(() => {
                        setErrors(null);
                    }, 3500);

                } else {
                    localStorage.setItem('user_email', JSON.stringify(data.user.email));
                    fetchUserData();
                    setToken(data.access_token);
                    setLoading(false);
                    toast(data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    // Navigate('/');
                }
            })
            .catch(error => {
                const response = error.response;
                if (response) {
                    if (response.status === 422 || response.status === 401) {


                        if (response.data.errors) {
                            setErrors(response.data.errors);
                        } else {
                            setErrors({
                                email: [response.data.message],
                            })
                        }
                        setInterval(() => {
                            setErrors(null);
                        }, 3500);
                    }
                    setLoading(false);
                }
            })
    }
    const SignupFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        const payloadSignup = {
            name: nameRefSignup.current.value,
            email: emailRefSignup.current.value,
            phone_number: phoneRefSignup.current.value,
            role: role,
            password: passwordRefSignup.current.value,
        }
        axiosClient.post('/signup', payloadSignup)
            .then(() => {
                setLoading(false);
                setRole(null);
                Navigate('/');
            })
            .catch(error => {
                const response = error.response;
                if (response) {
                    if (response.status === 422 || response.status === 401) {


                        if (response.data.errors) {
                            setErrors(response.data.errors);
                        } else {
                            setErrors({
                                email: [response.data.message],
                            })
                        }
                        setInterval(() => {
                            setErrors(null);
                        }, 3000);
                    }
                    setLoading(false);
                    setRole(null);
                }
            })
    }
    const handleChangeRole = (value) => {
        setRole(value);
    };
    return (
        <Layout>
            <ToastContainer />
            {loading ? (
                <Loader fullScreen={true} />
            ) : (
                <>
                    {errors &&
                        Object.keys(errors).map(key => (
                            toast(errors[key][0], {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            })
                        ))
                    }
                    <div class="containerSignup">
                        <input type="checkbox" id="flip" />
                        <div class="cover">
                            <div class="front">
                                <img src={image} alt="" />
                                <div class="text">
                                    <span class="text-1">Every new friend is a <br /> new adventure</span>
                                    <span class="text-2">Let's get connected</span>
                                </div>
                            </div>
                            <div class="back">
                                <div class="text">
                                    <span class="text-1">Complete miles of journey <br /> with one step</span>
                                    <span class="text-2">Let's get started</span>
                                </div>
                            </div>
                        </div>
                        <div class="forms">
                            <div class="form-content">
                                <div class="login-form">
                                    <div class="title">Login</div>
                                    <form onSubmit={LoginFormSubmit}>
                                        <div class="input-boxes">
                                            <div class="input-box">
                                                <i class="fas fa-envelope"></i>
                                                <input type="text" ref={emailRefLogin} placeholder="Enter your email" required />
                                            </div>
                                            <div class="input-box">
                                                <i class="fas fa-lock"></i>
                                                <input type="password" ref={passwordRefLogin} placeholder="Enter your password" required />
                                            </div>
                                            <div class="text"><NavLink className="forgot_password" to="/">Forgot password?</NavLink></div>
                                            <div class="button input-box">
                                                <input type="submit" value="Sumbit" />
                                            </div>
                                            <div class="text sign-up-text">Don't have an account? <label for="flip">Sigup now</label></div>
                                        </div>
                                    </form>
                                </div>
                                <div class="signup-form">
                                    <div class="title">Signup</div>
                                    <form onSubmit={SignupFormSubmit}>
                                        <div class="input-boxes">
                                            <div class="input-box">
                                                <input type="text" ref={nameRefSignup} placeholder="Enter your name" required />
                                            </div>
                                            <div class="input-box">
                                                <input type="email" ref={emailRefSignup} placeholder="Enter your email" required />
                                            </div>
                                            <div class="input-box">
                                                <input type="tel" ref={phoneRefSignup} placeholder="Enter your Phone Number" required />
                                            </div>
                                            <Select
                                                className='role_select'
                                                defaultValue="Select Role"
                                                style={{
                                                    width: 120,
                                                }}
                                                onChange={handleChangeRole}
                                                options={[
                                                    {
                                                        value: 'buyer',
                                                        label: 'Buyer',
                                                    },
                                                    {
                                                        value: 'seller',
                                                        label: 'Seller',
                                                    },
                                                ]}
                                            />
                                            <div class="input-box">
                                                <input type="password" ref={passwordRefSignup} placeholder="Enter your password" required />
                                            </div>
                                            <div class="button input-box">
                                                <input type="submit" value="Sumbit" />
                                            </div>
                                            <div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout >
    )
}

export default Signup