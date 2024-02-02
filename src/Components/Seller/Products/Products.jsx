import React, { useState } from 'react'
import Loader from '../../Loader/Loader'
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { NavLink, Navigate } from 'react-router-dom';
import NoData from '../NoData/NoData';
import { useStateContext } from '../../../contexts/ContextProvider';
import SellerLayout from '../Layout/Layout';
import { ToastContainer, toast } from 'react-toastify';

function SellerProducts() {
    const { user, truncateText } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const fetchProducts = () => {
        setLoading(true);
        axiosClient.get(`/seller/products/all/${user.id}`)
            .then(({ data }) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((e) => {
                setErrors(e);
                console.error(e);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    const productDeletehandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: 'you want to delete the product?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axiosClient.delete(`/seller/products/delete/${id}`)
                    .then(() => {
                        setLoading(false);
                        fetchProducts();
                    })
                    .catch((e) => {
                        console.error(e);
                        setErrors(e);
                        setLoading(false);
                    })
                Swal.fire("Product Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked); // Update the checked state for all checkboxes in the tbody
        const updatedProducts = products.map(product => {
            return { ...product, isChecked };
        });

        setProducts(updatedProducts);
    };


    const handleCheckboxChange = (event, productId) => {
        const isChecked = event.target.checked;


        const updatedProducts = products.map(product => {
            if (product.id === productId) {
                return { ...product, isChecked };
            }
            return product;
        });

        setProducts(updatedProducts);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleApply = () => {
        if (selectedOption) {
            Swal.fire({
                title: "Are you sure?",
                text: `You want to ${selectedOption} selected products?`,
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Yes",
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedIds = products.filter(product => product.isChecked).map(product => product.id);
                    setLoading(true);
                    axiosClient.post('/seller/products/bulk-action', {
                        action: selectedOption,
                        product_ids: selectedIds,
                    })
                        .then(({ data }) => {
                            setLoading(false);
                            setSelectedOption('');
                            fetchProducts();
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
                            console.error('Error performing bulk action:', error);
                            setLoading(false);
                        });


                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }
            })
        } else {
            toast("Please select any option", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    if (user.user_detail === null || user.store_locations === null || user.email_status === 'non-verified') {
        return (<Navigate to="/seller/dashboard" />)
    }
    return (
        <SellerLayout>
            <ToastContainer />
            <div className='container-fluid dashboard-content'>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <h5 className="card-header">Products</h5>
                            <div className="col-lg-2">
                                <div className="row">
                                    <NavLink to="/seller/products/add" className='btn btn-light ml-3 mt-3'>Add Product</NavLink>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div class="row">
                                    <div class="col-lg-6 col-sm-12">
                                        <div id="bulkOptionContainer" class="col-xs-4">
                                            <select class="form-control" name="bulk_options" id="bulk_options" onChange={handleOptionChange}>
                                                <option value="">Select Options</option>
                                                <option value="Available">Available</option>
                                                <option value="Out Of Stock">Out Of Stock</option>
                                                <option value="delete">Delete</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xs-4 col-lg-3">
                                        <input onClick={handleApply} type="submit" name="submit" class="btn btn-success" value="Apply" id="applyCheckbox" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    {loading ? (
                                        <Loader fullScreen={false} />
                                    ) : (
                                        <table className="table table-striped table-bordered first">
                                            <thead>
                                                <tr>
                                                    <th><input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} /></th>
                                                    <th>S.No</th>
                                                    <th>Title</th>
                                                    <th>Description</th>
                                                    <th>Category</th>
                                                    <th>Stock Status</th>
                                                    <th>Details</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {products.length > 0 ? (
                                                    products.map((product, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <input
                                                                    className="allCheckboxes"
                                                                    type="checkbox"
                                                                    value={product.id}
                                                                    checked={product.isChecked}
                                                                    onChange={(event) => handleCheckboxChange(event, product.id)}
                                                                />
                                                            </td>
                                                            <td>{index + 1}</td>
                                                            <td>{product.product_name}<span class="badge badge-primary ml-3">{product.product_status}</span></td>
                                                            <td>{truncateText(product.product_description, 10)}</td>
                                                            <td>{product.category.cat_title}</td>
                                                            <td>{product.product_stock_status}</td>
                                                            <td>
                                                                <NavLink className='btn btn-success' to={`/seller/products/edit/${product.id}`}>Edit</NavLink>
                                                            </td>
                                                            <td>
                                                                <NavLink className='btn btn-dark' to={``}>Details</NavLink>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => productDeletehandler(product.id)} className='btn btn-danger'>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : <NoData content={'No Products'} />}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SellerLayout >
    )
}

export default SellerProducts