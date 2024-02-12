import React, { useEffect, useRef, useState } from 'react'
import SellerLayout from '../Layout/Layout'
import { useStateContext } from '../../../contexts/ContextProvider'
import axiosClient from '../../../axios-client';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Loader/Loader';
import { DeleteOutlined, CloseCircleFilled, SafetyCertificateFilled } from '@ant-design/icons';
import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';

function SellerAccount() {
    // const Navigate = useNavigate();

    const { user, fetchUserData } = useStateContext();
    const [stL, setStL] = useState(false);
    const [stIm, setStIm] = useState(false);
    const [stAd, setStAd] = useState(false);
    const [ll, setLl] = useState(false);
    const addressRef = useRef();
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
    const toggleStAd = () => {
        setStAd(!stAd);
    }
    const storeLocationRequest = () => {
        setLoading(true);
        const payload = {
            'store_location': storeLocationRef.current.value,
            'user_id': user.id,
        }
        axiosClient.post('/seller/locationstore', payload)
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
                fetchUserData();
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
                axiosClient.delete(`/seller/locationstore/delete/${id}`)
                    .then(({ data }) => {
                        fetchUserData();
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
        axiosClient.post(`/seller/locationstoreimage/${user.id}`, imagePayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(({ data }) => {
                fetchUserData();
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
    const addressRequest = () => {
        setLoading(true);
        const addressPayload = {
            address: addressRef.current.value,
        }
        axiosClient.post(`/seller/addaddress/${user.id}`, addressPayload)
            .then(({ data }) => {
                setStAd(false);
                setLoading(false);
                fetchUserData();
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
            .catch((err) => {
                setLoading(false);
                console.error(err);
            })
    }
    const verifyEmailHandler = () => {
        setLl(true);
        axiosClient.post(`/user/emailtokencheck/${user.email}`)
            .then(({ data }) => {
                setLl(false);
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
            .catch((err) => {
                setLl(false);
                console.log(err, 'error');
                toast("An error occured", {
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
    }
    useEffect(() => {
        fetchUserData();
    }, [])
    return (
        <SellerLayout>
            <ToastContainer />
            {ll && (
                <Loader fullScreen={true} />
            )}
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
                            <span className={`badge badge-${user.email_status === 'non-verified' ? 'danger' : 'primary'} ml-3`}>{user.email_status === 'non-verified' ? <><CloseCircleFilled /> Non Verified</> : <><SafetyCertificateFilled /> Verified</>}</span>
                            {user.email_status === 'non-verified' && (
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
                            <input id="inputText4" type="text" value={user.address} className="form-control" name="address" disabled />
                        </div>

                        <div className="form-group">
                            <label for="inputText4" className="col-form-label">Store Image</label>
                            {user.store_image ? (
                                <img style={{ width: '150px', display: 'block' }} src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${user.store_image}`} alt="" />
                            ) : (
                                <p>No image added yet!</p>
                            )}
                        </div>


                        {/* store locations */}
                        <div className="form-group">
                            <label for="inputText4" className="col-form-label">Store Location</label>
                            {loadingFullPage ? (
                                <Loader fullScreen={false} />
                            ) : (
                                user.store_locations && (
                                    user.store_locations.length > 0 ? (
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
                                    ) : (<p>No locations added</p>)))}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-3">
                                <button onClick={toggleStL} className="btn btn-primary">Add Store Location</button>
                            </div>
                            {
                                !user.store_image && (
                                    <div className="col-lg-3">
                                        <button onClick={toggleStIm} className="btn btn-primary">Add Store Image</button>
                                    </div>
                                )
                            }
                            {!user.address && (
                                <div className="col-lg-3">
                                    <button onClick={toggleStAd} className="btn btn-primary">Add Address</button>
                                </div>
                            )
                            }
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
                                {stAd && (
                                    <form onSubmit={addressRequest}>
                                        <div className="form-group">
                                            <label htmlFor="inputText4" className="col-form-label">Address</label>
                                            <input
                                                id="inputText4"
                                                type="text"
                                                ref={addressRef}
                                                className="form-control"
                                                name="address"
                                                placeholder='Address'
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type='submit' className='btn btn-primary'>Update</button>
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