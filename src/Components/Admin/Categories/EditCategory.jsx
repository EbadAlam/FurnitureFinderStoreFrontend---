import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import Swal from 'sweetalert2';
function EditCategory() {
    const navigate = useNavigate();
    const { categoryName } = useParams();
    const [categoryData, setCategoryData] = useState({
        id: '',
        cat_title: '',
        cat_description: '',
        cat_image: null,
    });
    const imageInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleInputChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value,
        });
        // console.log(categoryData);
    };

    const handleImageChange = (e) => {
        const file = imageInputRef.current.files[0];
        setCategoryData({
            ...categoryData,
            cat_image: file,
        });
    };
    const getCategoryDetail = () => {
        setLoading(true);
        axiosClient.get(`/categories/cat_detail/${categoryName}`)
            .then((data) => {
                setCategoryData(data.data.category);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }
    useEffect(() => {
        getCategoryDetail();
    }, [])
    const catUpdateFormhandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('cat_title', categoryData.cat_title);
        formData.append('cat_description', categoryData.cat_description);
        formData.append('cat_image', categoryData.cat_image);
        axiosClient.post(`/categories/update/${categoryData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Category Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
                navigate('/admin/categories');
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }
    return (
        <AdminLayout>
            <div className='container-fluid dashboard-content'>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="card">
                            <h5 class="card-header">Edit Category</h5>
                            <div class="card-body">
                                {loading ? (<Loader fullScreen={true} />) : (
                                    <form onSubmit={catUpdateFormhandler}>
                                        <div class="form-group">
                                            <label for="inputText3" class="col-form-label">Category Title</label>
                                            <input
                                                onChange={handleInputChange}
                                                value={categoryData.cat_title}
                                                name='cat_title'
                                                id="inputText3"
                                                type="text"
                                                class="form-control"
                                            />
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
                                            <label class="custom-file-label" for="customFile">Category Image</label>
                                            <img style={{ width: '7%' }} src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${categoryData.cat_image}`} alt={categoryData.cat_title} />
                                        </div>
                                        <div class="form-group mt-4">
                                            <label for="exampleFormControlTextarea1">Category Description</label>

                                            <textarea name='cat_description' onChange={handleInputChange} class="form-control" id="exampleFormControlTextarea1" rows="3">{categoryData.cat_description}</textarea>
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

export default EditCategory