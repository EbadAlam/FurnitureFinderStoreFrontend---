import React, { useRef, useState } from 'react'
import AdminLayout from '../Layout/Layout'
import axiosClient from '../../../axios-client';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Swal from 'sweetalert2';
function AddCategory() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();
    const CategoryFormSubmitHandler = (e) => {
        e.preventDefault();
        setErrors();
        setLoading(true);
        const payload = {
            cat_title: titleRef.current.value,
            cat_description: descriptionRef.current.value,
            cat_image: imageRef.current.files[0],
        }
        axiosClient.post('/categories/add', payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category Added Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/admin/categories');
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
            })
        setLoading(false);
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

    return (
        <AdminLayout>
            <div className='container-fluid dashboard-content'>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header">Add Category</h5>
                            <div class="card-body">
                                {loading ? (<Loader fullScreen={true} />) : (
                                    <form onSubmit={CategoryFormSubmitHandler}>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Category Title</label>
                                            <input ref={titleRef} id="inputText3" type="text" class="form-control" />
                                        </div>
                                        <div class="custom-file mb-3">
                                            <input ref={imageRef} type="file" class="custom-file-input" id="customFile" />
                                            <label class="custom-file-label" for="customFile">Category Image</label>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Category Description</label>
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
        </AdminLayout>
    )
}

export default AddCategory