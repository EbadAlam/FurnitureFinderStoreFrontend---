import React, { useEffect, useRef, useState } from 'react';
import './Login.css';
import Header from '../Header/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import Loader from '../Loader/Loader';
function Login() {
    const Navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('overflowHidden');
        return () => {
            document.body.classList.remove('overflowHidden');
        };
    }, []);
    const [passwordShow, setPasswordShow] = useState(true);
    const [passwordState, setPasswordState] = useState('password');
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUser, setToken, token } = useStateContext();
    const emailRef = useRef();
    const passwordRef = useRef();
    const togglePasswordField = () => {
        setPasswordShow(!passwordShow);
        checkPasswordState();
    }
    useEffect(() => {
        if (token) {
            Navigate('/');
        }
    }, [Navigate]);
    const checkPasswordState = () => {
        if (passwordShow) {
            setPasswordState('text');
        } else {
            setPasswordState('password');
        }
    }
    const LoginFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setErrors(null);
        axiosClient.post('/user/login', payload)
            .then(({ data }) => {
                // console.log(data.access_token);
                setUser(data.user);
                setToken(data.access_token);
                setLoading(false);
                Navigate('/');
            })
            .catch(error => {
                const response = error.response;
                if (response && response.status === 422 || response.status === 401) {
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
            })
    }
    return (
        <>
            <Header />
            <div className="loginDivMain">
                {loading ? (
                    <Loader fullScreen={true} />
                ) : (
                    <div className="loginForm">
                        <h2 className='title'>Login</h2>
                        {errors &&
                            <div className='alert'>
                                {Object.keys(errors).map(key => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        }
                        <form onSubmit={LoginFormSubmit}>
                            <div className="emailInputLoginForm loginFormInputs">
                                <input
                                    type="email"
                                    placeholder='Email'
                                    name='email'
                                    ref={emailRef}
                                />
                            </div>
                            <div className="passwordInputLoginForm loginFormInputs">
                                <input
                                    type={passwordState}
                                    placeholder='Password'
                                    name='password'
                                    ref={passwordRef}
                                />
                                <div className="eye" onClick={togglePasswordField}>
                                    {passwordShow ? (
                                        <EyeInvisibleOutlined />
                                    ) : (
                                        <EyeOutlined />
                                    )}
                                </div>
                            </div>
                            <div className="submitBtnDiv">
                                <button className="submitBtn" type='submit'>Login</button>
                            </div>
                            <div className='label'>
                                <label>Dont Have An Account <NavLink className="NavLink" to="/">Register Today</NavLink></label>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default Login