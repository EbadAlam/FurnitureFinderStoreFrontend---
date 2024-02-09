import React, { useState } from 'react'
import AdminLayout from '../Layout/Layout'
import Loader from '../../Loader/Loader'
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import NoData from '../../NoData/NoData';

function Categories() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const fetchCategories = () => {
        setLoading(true);
        axiosClient.get('/categories/all')
            .then((data) => {
                // console.log(data.data.categories);
                setCategories(data.data.categories);
                setLoading(false);
            })
            .catch((e) => {
                setErrors(e);
                console.error(e);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchCategories();
    }, [])
    const categoryDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete the user?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                // console.log(id, 'CategoryId');
                axiosClient.delete(`/categories/delete/${id}`)
                    .then(() => {
                        fetchCategories();
                        setLoading(false);
                    })
                    .catch((e) => {
                        console.error(e);
                        setErrors(e);
                        setLoading(false);
                    })
                Swal.fire("Category Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked); // Update the checked state for all checkboxes in the tbody
        const updatedCategories = categories.map(category => {
            return { ...category, isChecked };
        });

        setCategories(updatedCategories);
    };


    const handleCheckboxChange = (event, categoryId) => {
        const isChecked = event.target.checked;


        const updatedCategories = categories.map(category => {
            if (category.id === categoryId) {
                return { ...category, isChecked };
            }
            return category;
        });

        setCategories(updatedCategories);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleApply = () => {
        if (selectedOption === 'delete') {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete selected categories? This process is not reversible",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Delete",
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedIds = categories.filter(category => category.isChecked).map(category => category.id);
                    setLoading(true);
                    axiosClient.post('/categories/bulk-action', {
                        action: selectedOption,
                        category_ids: selectedIds,
                    })
                        .then(() => {
                            console.log('Bulk action performed successfully');
                            setLoading(false);
                        })
                        .catch(error => {
                            console.error('Error performing bulk action:', error);
                            setLoading(false);
                        });
                    setSelectedOption('');
                    fetchCategories();
                    Swal.fire("Category Deleted!", "", "success");

                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            })
        }
    }
    return (
        <AdminLayout>
            <div className='container-fluid dashboard-content'>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <h5 className="card-header">Categories</h5>
                            <div className="col-lg-2">
                                <div className="row">
                                    <NavLink to="/admin/categories/add" className='btn btn-light ml-3 mt-3'>Add Category</NavLink>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-12">
                                        <div id="bulkOptionContainer" className="col-xs-4">
                                            <select className="form-control" name="bulk_options" id="bulk_options" onChange={handleOptionChange}>
                                                <option value="">Select Options</option>
                                                <option value="delete">Delete</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-lg-3">
                                        <input onClick={handleApply} type="submit" name="submit" className="btn btn-success" value="Apply" id="applyCheckbox" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th><input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} /></th>
                                                <th>S.No</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Image</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <Loader fullScreen={false} />
                                            ) : (
                                                categories.length > 0 ? (
                                                    categories.map((category, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <input
                                                                    className="allCheckboxes"
                                                                    type="checkbox"
                                                                    value={category.id}
                                                                    checked={category.isChecked}
                                                                    onChange={(event) => handleCheckboxChange(event, category.id)}
                                                                />
                                                            </td>
                                                            <td>{index + 1}</td>
                                                            <td>{category.cat_title}</td>
                                                            <td>{category.cat_description}</td>
                                                            <td>
                                                                <img style={{ width: '45%' }} src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${category.cat_image}`} alt={category.cat_title} />
                                                            </td>
                                                            <td>
                                                                <NavLink className='btn btn-success' to={`/admin/categories/edit/${category.cat_title}`}>Edit</NavLink>
                                                            </td>
                                                            <td>
                                                                <button className='btn btn-danger' onClick={() => categoryDelete(category.id)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : <NoData content={'No Categories'} tag="p" />
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout >
    )
}

export default Categories