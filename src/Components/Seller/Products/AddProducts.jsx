import React, { useEffect, useRef, useState } from 'react'
import axiosClient from '../../../axios-client';
import { useNavigate } from 'react-router-dom';
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
        const payload = {
            product_name: nameRef.current.value,
            product_description: descriptionRef.current.value,
            product_price: priceRef.current.value,
            product_image: imageRef.current.files[0],
            cat_id: selectedCategory,
            user_id: user.id
        }
        axiosClient.post('/seller/products/create', payload, {
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
    useEffect(() => {
        fetchCategories();
    }, [])
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