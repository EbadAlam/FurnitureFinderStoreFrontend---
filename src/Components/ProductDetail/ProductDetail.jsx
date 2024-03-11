import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';
import axiosClient from '../../axios-client';
import ImageGallery from "react-image-gallery";
import './ProductDetail.css'; // Update with the correct CSS file path
import { ToastContainer, toast } from 'react-toastify';
import { useStateContext } from '../../contexts/ContextProvider';

function ProductDetail() {
    const { token, fetchUserData, setToken } = useStateContext();
    const { productId } = useParams();
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState(null);
    const [errors, setErrors] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [loginDiv, setLoginDiv] = useState(false);
    const emailRefLogin = useRef();
    const passwordRefLogin = useRef();
    const Navigate = useNavigate();

    const loginDivShowHandler = () => {
        setLoginDiv(!loginDiv);
    }

    const getProductDetail = (id) => {
        setLoading(true);
        axiosClient.get(`/products/detail/${id}`)
            .then(({ data }) => {
                // console.log(data.product);
                setProductData(data.product);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setErrors("Failed to fetch product details. Please try again later.");
                setLoading(false);
            });
    }

    useEffect(() => {
        getProductDetail(productId);
    }, [productId]);

    useEffect(() => {
        if (productData && productData.gallery && Array.isArray(productData.gallery)) {
            const images = productData.gallery.map(image => ({
                original: `${process.env.REACT_APP_LARAVEL_BASE_URL}/${image.image}`,
                thumbnail: `${process.env.REACT_APP_LARAVEL_BASE_URL}/${image.image}`,
            }));
            setGalleryImages(images);
        }
    }, [productData]);

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
                    toast.error('Account Inactive. Please contact admin', { theme: "dark" });
                } else {
                    localStorage.setItem('user_email', JSON.stringify(data.user.email));
                    setToken(data.access_token);
                    fetchUserData();
                    setLoading(false);
                    toast.success(data.message, { theme: "dark" });
                    if (data.user.role === 'master-admin') {
                        Navigate('/admin/dashboard');
                    } else if (data.user.role === 'seller') {
                        Navigate('/seller/dashboard');
                    } else if (data.user.position === 'manager') {
                        Navigate('/manager/dashboard');
                    }
                }
            })
            .catch(error => {
                const response = error.response;
                if (response) {
                    if (response.status === 422 || response.status === 401) {
                        if (response.data.errors) {
                            setErrors(response.data.errors);
                        } else {
                            setErrors({ email: [response.data.message] });
                        }
                    }
                    setLoading(false);
                }
            })
    }

    return (
        <Layout>
            <ToastContainer />
            {/* {loading ? (
                <Loader fullscreen={true} />
            ) : ( */}
            <div className="product-detail-container">
                <div className="galleryDetailPage">
                    {galleryImages.length > 0 ? (
                        <ImageGallery items={galleryImages} />
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="descriptionDetailPage">
                    {errors && <p className="error-message">{errors}</p>} {/* Display error message */}
                    {productData && (
                        <div>
                            <div className="productTitle">
                                <p>{productData.product_description}</p>
                            </div>
                            {loading && (
                                <Loader fullScreen={true} />
                            )}
                            <div className="productPrice mt-2">
                                <p>Price: {productData.product_price} AED</p>
                            </div>
                            <div className="productCategory mt-2">
                                <p>Category: {productData.category.cat_title}</p>
                            </div>
                            <div className="contactInfo mt-5">
                                <h3>Contact Info</h3>
                                <div className="row">
                                    <div className="col-1">
                                        <img src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${productData.user.store_image}`} width={50} className="rounded-circle mr-3" alt="User Profile" />
                                    </div>
                                    <div className="col-5">
                                        {token ? (
                                            <>
                                                <div className="contactEmailInfo">
                                                    <p>Email: <a href={`mailto:${productData.user.email}`}>{productData.user.email}</a></p>
                                                </div>
                                                <div className="contactNumberInfo">
                                                    <p>Phone Number: <a href={`tel:${productData.user.phone_number}`}>{productData.user.phone_number}</a></p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="alert alert-info" role="alert">
                                                    To see contact info. <NavLink onClick={loginDivShowHandler}>Please login</NavLink>
                                                </div>
                                                {loginDiv && (
                                                    <div className="loginDiv">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h3 className="mb-1">Login Form</h3>
                                                                <p>Please enter your user information.</p>
                                                            </div>
                                                            <div className="card-body">
                                                                <form onSubmit={LoginFormSubmit}>
                                                                    <div className="form-group">
                                                                        <input className="form-control form-control-lg" ref={emailRefLogin} type="email" name="email" required="" placeholder="E-mail" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input className="form-control form-control-lg" ref={passwordRefLogin} id="pass1" type="password" required="" placeholder="Password" />
                                                                    </div>
                                                                    <div className="form-group pt-2">
                                                                        <button className="btn btn-block btn-primary" type="submit">Login</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="visitStoreBtnDiv mt-3">
                                <NavLink className="visitStoreBtn btn btn-secondary">Visit Store</NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* )} */}
        </Layout>
    );
}

export default ProductDetail;