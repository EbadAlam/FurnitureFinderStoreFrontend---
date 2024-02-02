import React, { useEffect, useRef, useState } from 'react'
import SellerLayout from '../Layout/Layout'
import { useStateContext } from '../../../contexts/ContextProvider'
import axiosClient from '../../../axios-client';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Loader/Loader';
import { DeleteOutlined, CloseCircleFilled, SafetyCertificateFilled } from '@ant-design/icons';
import Swal from 'sweetalert2';

function SellerAccount() {
    const { user, setUser } = useStateContext();
    const [stL, setStL] = useState(false);
    const [stIm, setStIm] = useState(false);
    const storeLocationRef = useRef();
    const storeLocationImageRef = useRef();
    const [loading, setLoading] = useState(false);
    const [loadingFullPage, setLoadingFullPage] = useState(false);
    const toggleStL = () => {
        setStL(!stL);
    }
    const toggleStIm = () => {
        setStIm(!stIm);
    }
    const getUser = () => {
        axiosClient.get(`/user/${JSON.parse(localStorage.getItem('user_email'))}`)
            .then(({ data }) => {
                setUser(data.user);
            })
            .catch((err) => {
                console.error(err);
            })
    }
    const storeLocationRequest = () => {
        setLoading(true);
        const payload = {
            'store_location': storeLocationRef.current.value,
            'user_id': user.id,
        }
        axiosClient.post('/seller/products/locationstore', payload)
            .then(({ data }) => {
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
                setStL(false);
                setLoading(false);
                getUser();
            })
            .catch((err) => {
                setLoading(false);
                console.error(err, "error");
            })
    }
    const deleteStoreLocation = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete this location?`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoadingFullPage(true);
                axiosClient.delete(`/seller/products/locationstore/delete/${id}`)
                    .then(({ data }) => {
                        getUser();
                        setLoadingFullPage(false);
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
                    })
                    .catch(error => {
                        console.error(error);
                        setLoadingFullPage(false);
                    });


            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            };
        });
    }
    const storeLocationImageRequest = () => {
        setLoading(true);
        const imagePayload = {
            'store_image': storeLocationImageRef.current.files[0],
        };
        axiosClient.post(`/seller/products/locationstoreimage/${user.id}`, imagePayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(({ data }) => {
                getUser();
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
                setLoading(false);
                setStIm(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                toast("An error occured. Please try again in few minutes", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
    }
    const verifyEmailHandler = () => {

    }
    useEffect(() => {
        getUser();
    }, [])
    return (
        <SellerLayout>
            <ToastContainer />
            <div className='container-fluid dashboard-content'>
                <div className="card">
                    <h5 className="card-header">Account Information</h5>
                    <div className="card-body">
                        <div className="form-group">
                            <label for="inputText3" className="col-form-label">Name</label>
                            <input id="inputText3" type="text" name='name' value={user.name} className="form-control" disabled />
                        </div>
                        <div className="form-group">
                            <label for="inputEmail">Email address</label>
                            <span className={`badge badge-${user.email_status == 'non-verified' ? 'danger' : 'primary'} ml-3`}>{user.email_status == 'non-verified' ? <><CloseCircleFilled /> Non Verified</> : <><SafetyCertificateFilled /> Verified</>}</span>
                            {user.email_status == 'non-verified' && (
                                <a href="#" onClick={verifyEmailHandler} className='ml-2'>Verify Now</a>
                            )}
                            <input id="inputEmail" type="email" name='email' value={user.email} className="form-control" disabled />
                        </div>
                        <div className="form-group">
                            <label for="inputText4" className="col-form-label">Phone Number</label>
                            <input id="inputText4" type="number" value={user.phone_number} className="form-control" name="phone_number" disabled />
                        </div>

                        <div className="form-group">
                            <label for="inputText4" className="col-form-label">Address</label>
                            <input id="inputText4" type="text" value={user.store_detail.address} className="form-control" name="address" disabled />
                        </div>
                        <div className="form-group">
                            <label for="inputText4" className="col-form-label">Store Image</label>
                            {user.store_detail.store_image ? (
                                <img style={{ width: '150px', display: 'block' }} src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${user.store_detail.store_image}`} alt="" />
                            ) : (
                                <p>No image added yet!</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label for="inputText4" className="col-form-label">Store Location</label>
                            {loadingFullPage ? (
                                <Loader fullScreen={false} />
                            ) : (
                                user.store_locations.length > 0 && (
                                    user.store_locations.map((lc) => (
                                        <div class="p-3 mb-2 bg-light text-dark" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {lc.store_location}
                                            <DeleteOutlined
                                                style={{
                                                    color: 'red',
                                                    cursor: 'pointer',
                                                    fontSize: '18px'
                                                }}
                                                onClick={() => deleteStoreLocation(lc.id)}
                                            />
                                        </div>
                                    ))
                                ))}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-3">
                                <button onClick={toggleStL} className="btn btn-primary">Add Store Location</button>
                            </div>
                            {!user.store_detail.store_image && (
                                <div className="col-lg-3">
                                    <button onClick={toggleStIm} className="btn btn-primary">Add Store Image</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="card-body">
                        {loading ? (
                            <Loader fullScreen={false} />
                        ) : (
                            <>
                                {stL && (
                                    <form onSubmit={storeLocationRequest}>
                                        <div className="form-group">
                                            <label htmlFor="inputText4" className="col-form-label">Store Location</label>
                                            <input
                                                id="inputText4"
                                                type="text"
                                                ref={storeLocationRef}
                                                className="form-control"
                                                name="store_location"
                                                placeholder='Add Store Location'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type='submit' className='btn btn-primary'>Submit</button>
                                        </div>
                                    </form>
                                )}
                                {stIm && (
                                    <form onSubmit={storeLocationImageRequest}>
                                        <div className="form-group">
                                            <label htmlFor="inputText4" className="col-form-label">Store Image</label>
                                            <input
                                                id="inputText4"
                                                type="file"
                                                ref={storeLocationImageRef}
                                                className="form-control"
                                                name="store_image"
                                                placeholder='Add Store Image'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type='submit' className='btn btn-primary'>Upload</button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}

                    </div>

                </div>
            </div>
        </SellerLayout>
    )
}

export default SellerAccount;