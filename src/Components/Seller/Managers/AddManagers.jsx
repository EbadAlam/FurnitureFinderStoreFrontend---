import React, { useRef, useState } from 'react'
import axiosClient from '../../../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../contexts/ContextProvider';
import SellerLayout from '../Layout/Layout';
function SellerAddManagers() {
    const { user } = useStateContext();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const ManagerFormSubmitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            user_id: user.id,
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/seller/manager/add', payload)
            .then(({ data }) => {
                Swal.fire({
                    position: "top-end",
                    icon: data.nt_type,
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
                navigate('/seller/managers');
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            })
    }
    if (user.user_detail === null || user.store_locations === null || user.email_status === 'non-verified') {
        return (<Navigate to="/seller/dashboard" />)
    }
    return (
        <SellerLayout>
            <div className='container-fluid dashboard-content'>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header">Add Manager</h5>
                            <div class="card-body">
                                {loading ? (<Loader fullScreen={true} />) : (
                                    <form onSubmit={ManagerFormSubmitHandler}>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Name</label>
                                            <input ref={nameRef} id="inputText3" type="text" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Email</label>
                                            <input ref={emailRef} id="inputText3" type="email" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Password</label>
                                            <input ref={passwordRef} id="inputText3" type="password" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <button type='submit' className='btn btn-success'>Submit</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout>
    )
}

export default SellerAddManagers