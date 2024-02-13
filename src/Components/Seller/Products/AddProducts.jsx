import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../../axios-client';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Swal from 'sweetalert2';
import { useStateContext } from '../../../contexts/ContextProvider';
import SellerLayout from '../Layout/Layout';
function SellerAddProduct() {
    const { user } = useStateContext();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();

    const fetchCategories = () => {
        setLoading(true);
        axiosClient.get('/categories/all')
            .then(({ data }) => {
                // console.log(data);
                setCategories(data.categories);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                setErrors(err);
            })
    }
    const ProductFormSubmitHandler = (e) => {
        e.preventDefault();
        setErrors();
        setLoading(true);
        const formData = new FormData();

        formData.append('product_name', nameRef.current.value);
        formData.append('product_description', descriptionRef.current.value);
        formData.append('product_price', priceRef.current.value);
        formData.append('cat_id', selectedCategory);
        formData.append('user_id', user.id);
        formData.append('product_image', imageRef.current.files[0]);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('gallery[]', selectedFiles[i]);
        }
        axiosClient.post('/seller/products/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(({ data }) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
                navigate('/seller/products');
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422 || response.status === 401) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        })
                    }
                }
                setLoading(false);
            })
    }
    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Validation Errors',
            text: errorMessage,
            showConfirmButton: true,
        });
    };
    if (errors) {
        const errorMessage = Object.keys(errors)
            .map((key) => errors[key].map((message) => `- ${message}`).join('\n'))
            .join('\n');

        showErrorAlert(errorMessage);
    }
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };
    useEffect(() => {
        fetchCategories();
    }, [])
    if (user.user_detail === null || user.store_locations === null || user.email_status === 'non-verified') {
        return (<Navigate to="/seller/dashboard" />)
    }
    return (
        <SellerLayout>
            <div className='container-fluid dashboard-content'>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header">Add Product</h5>
                            <div class="card-body">
                                {loading ? (<Loader fullScreen={true} />) : (
                                    <form onSubmit={ProductFormSubmitHandler}>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Product Title</label>
                                            <input ref={nameRef} id="inputText3" type="text" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Product Price</label>
                                            <input ref={priceRef} id="inputText3" type="text" class="form-control" />
                                        </div>
                                        <div class="custom-file mb-3">
                                            <label class="custom-file-label" for="customFile">Product Image</label>
                                            <input ref={imageRef} type="file" class="custom-file-input" id="customFile" />
                                        </div>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Select Category</label>
                                            <select class="form-control" name="category" value={selectedCategory} onChange={handleCategoryChange}>
                                                <option value="">Select Category</option>
                                                {categories && categories.length > 0 && (
                                                    categories.map((cat) => (
                                                        <option value={cat.id}>{cat.cat_title}</option>
                                                    ))
                                                )
                                                }
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Product Description</label>
                                            <textarea ref={descriptionRef} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                        </div>
                                        <div class="custom-file">
                                            <input
                                                type="file"
                                                class="custom-file-input"
                                                onChange={handleFileChange}
                                                multiple
                                            />
                                            <label class="custom-file-label" for="customFile">Product Gallery</label>
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

export default SellerAddProduct