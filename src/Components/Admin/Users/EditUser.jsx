import React, { useEffect, useState } from 'react'
import AdminLayout from '../Layout/Layout'
import axiosClient from '../../../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
function EditUser() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();
    const getUserData = (id) => {
        setLoading(true);
        axiosClient(`/user/detail/${id}`)
            .then((data) => {
                setUser(data.data.user);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setErrors(err);
                setLoading(false);
            })
    }
    useEffect(() => {
        getUserData(userId);
    }, []);
    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const UserFormSubmitHandler = (e) => {
        setLoading(true);
        e.preventDefault();
        setErrors();
        const payload = {
            name: user.name,
            email: user.email,
            password: user.password,
        }
        axiosClient.put(`/user/edit/${userId}`, payload)
            .then(({ data }) => {
                setLoading(false);
                toast(data.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/admin/users');
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            })
    }

    return (
        <AdminLayout>
            <ToastContainer />
            <div className='container-fluid dashboard-content'>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header">Edit User</h5>
                            <div class="card-body">
                                {loading ? (<Loader fullScreen={true} />) : (
                                    <form onSubmit={UserFormSubmitHandler}>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Name</label>
                                            <input
                                                id="inputText3"
                                                type="text"
                                                name='name'
                                                class="form-control"
                                                value={user.name}
                                                placeholder='Name'
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Email</label>
                                            <input
                                                id="inputText3"
                                                type="email"
                                                name='email'
                                                class="form-control"
                                                value={user.email}
                                                placeholder='Email'
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Password</label>
                                            <input
                                                id="inputText3"
                                                type="password"
                                                name='password'
                                                class="form-control"
                                                onChange={handleInputChange}
                                                placeholder='Password'
                                            />
                                        </div>
                                        <div class="form-group">
                                            <button type='submit' className='btn btn-success'>Update</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditUser