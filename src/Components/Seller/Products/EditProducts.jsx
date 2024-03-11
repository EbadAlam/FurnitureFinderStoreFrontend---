import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import SellerLayout from '../Layout/Layout';
import { useStateContext } from '../../../contexts/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import './product.css';

function SellerEditProduct() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [productData, setProductData] = useState({});
    const [categories, setCategories] = useState();
    const imageInputRef = useRef(null);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(false);
    const [gLoading, setGLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [galleryImages, setGalleryImages] = useState();
    const { user } = useStateContext();

    const handleInputChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = imageInputRef.current.files[0];
        setProductData({
            ...productData,
            product_image: file,
        });
    };
    const getProductDetail = () => {
        setLoading(true);
        axiosClient.get(`/seller/products/product/${productId}`)
            .then(({ data }) => {
                setProductData(data.product);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }
    const fetchCategories = () => {
        setLoading(true);
        axiosClient.get('/categories/all')
            .then(({ data }) => {
                setCategories(data.categories);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }
    const handleCategoryChange = (event) => {
        setProductData({
            ...productData,
            cat_id: event.target.value
        });
    };
    useEffect(() => {
        getProductDetail();
        fetchCategories();
        console.log(productData);
    }, [])
    const productUpdateFormhandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        const formData = new FormData();
        formData.append('product_name', productData.product_name);
        formData.append('product_description', productData.product_description);
        formData.append('product_price', productData.product_price);
        formData.append('cat_id', productData.cat_id);
        formData.append('product_image', productData.product_image);
        formData.append('product_stock_status', productData.product_stock_status);
        formData.append('user_id', user.id);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('gallery[]', selectedFiles[i]);
        }
        axiosClient.post(`/seller/products/edit/${productData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(({ data }) => {
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
                setLoading(false);
                navigate('/seller/products');
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                setErrors(err);
            })
    }
    const handleStockStatusChange = (event) => {
        setProductData({
            ...productData,
            product_stock_status: event.target.value,
        });
    }

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };
    const deleteGalleryImageHandler = (id) => {
        console.log(id);
        setGLoading(true);
        axiosClient.delete(`/seller/products/product/galleryimages/delete/${id}`)
            .then(() => {
                getProductGallery();
                setGLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setGLoading(false);
            });
    }
    const getProductGallery = () => {
        setGLoading(true);
        axiosClient.get(`/seller/products/product/galleryimages/${productId}`)
            .then(({ data }) => {
                setGalleryImages(data.productGallery);
                setGLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setGLoading(false);
            });
    }
    useEffect(() => {
        getProductGallery();
    }, []);
    useEffect(() => {
        if (errors) {
            Object.keys(errors).forEach(key => {
                toast(errors[key][0], {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            });
        }
    }, [errors])
    return (
        <SellerLayout>
            <ToastContainer />
            <div className='container-fluid dashboard-content'>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header">Edit Product</h5>
                            <div class="card-body">
                                {loading ? (<Loader fullScreen={true} />) : (
                                    <form onSubmit={productUpdateFormhandler}>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Product Name</label>
                                            <input
                                                onChange={handleInputChange}
                                                value={productData.product_name}
                                                name='product_name'
                                                id="inputText3"
                                                type="text"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Product Price</label>
                                            <input
                                                onChange={handleInputChange}
                                                value={productData.product_price}
                                                name='product_price'
                                                id="inputText3"
                                                type="text"
                                                class="form-control"
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Select Category</label>
                                            <select class="form-control" name="category" value={productData.cat_id} onChange={handleCategoryChange}>
                                                {categories && categories.length > 0 && (
                                                    categories.map((cat) => (
                                                        <option value={cat.id}>{cat.cat_title}</option>
                                                    ))
                                                )
                                                }
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Stock Status</label>
                                            <select class="form-control" name="stock_status" value={productData.product_stock_status} onChange={handleStockStatusChange}>
                                                <option value="Available">Available</option>
                                                <option value="Out Of Stock">Out Of Stock</option>
                                            </select>
                                        </div>
                                        <div class="custom-file mb-3">
                                            <input
                                                type="file"
                                                class="custom-file-input"
                                                id="customFile"
                                                name='cat_image'
                                                onChange={handleImageChange}
                                                ref={imageInputRef}
                                            />
                                            <label class="custom-file-label" for="customFile">Product Image</label>
                                            <img style={{ width: '7%' }} src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${productData.product_image}`} alt={productData.product_name} />
                                        </div>
                                        <div class="custom-file mt-4">
                                            <input
                                                type="file"
                                                class="custom-file-input"
                                                onChange={handleFileChange}
                                                multiple
                                            />
                                            <label class="custom-file-label" for="customFile">Product Gallery</label>
                                            <div className="gallery_images">
                                                {gLoading ? (
                                                    <Loader fullScreen={false} />
                                                ) : (
                                                    galleryImages && (
                                                        galleryImages.length > 0 ? (
                                                            galleryImages.map((gimg) => (
                                                                <div className="image">
                                                                    <img src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${gimg.image}`} />
                                                                    <i onClick={() => deleteGalleryImageHandler(gimg.id)} className="fas fa-window-close"></i>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No gallery images</p>
                                                        )
                                                    ))}
                                            </div>
                                        </div>
                                        <div class="form-group mt-5">
                                            <label for="exampleFormControlTextarea1">Product Description</label>
                                            <textarea name='cat_description' onChange={handleInputChange} class="form-control" id="exampleFormControlTextarea1" rows="3">{productData.product_description}</textarea>
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
        </SellerLayout>
    )
}

export default SellerEditProduct