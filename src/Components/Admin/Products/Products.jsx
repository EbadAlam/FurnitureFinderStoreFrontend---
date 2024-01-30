import React, { useState } from 'react'
import AdminLayout from '../Layout/Layout'
import Loader from '../../Loader/Loader'
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import NoData from '../NoData/NoData';

function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState();
    const fetchProducts = () => {
        setLoading(true);
        axiosClient.get('/products/all')
            .then((data) => {
                setProducts(data.data.products);
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
    const productDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete this product?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                // console.log(id, 'userId');
                axiosClient.delete(`/products/delete/${id}`)
                    .then(() => {
                        fetchProducts();
                    })
                    .catch((e) => {
                        console.error(e);
                        setErrors(e);
                    })
                setLoading(false);
                Swal.fire("Product Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }
    const productStatusChange = (id) => {
        setLoading(true);
        axiosClient.put(`/products/activeinactive/${id}`)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Status Change!",
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchProducts();
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setErrors(e);
                setLoading(false);
            })
    }
    return (
        <AdminLayout>
            <div className='container-fluid dashboard-content'>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <h5 className="card-header">Products</h5>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Product Name</th>
                                                <th>User</th>
                                                <th>Product Price</th>
                                                <th>Status</th>
                                                <th>Change Status</th>
                                                <th>Details</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <Loader fullScreen={false} />
                                            ) : (
                                                products.length > 0 ? (
                                                    products.map((product, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{product.product_name}</td>
                                                            <td>{product.user.name}</td>
                                                            <td>{product.product_price}</td>
                                                            <td>{product.product_status}</td>
                                                            <td>
                                                                <button onClick={() => productStatusChange(product.id)}
                                                                    className="btn btn-dark">{product.product_status == 'Active' ? 'Inactive' : 'Active'}</button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-primary">Details</button>
                                                            </td>
                                                            <td>
                                                                <NavLink to="/" className="btn btn-secondary">Edit</NavLink>

                                                            </td>
                                                            <td>
                                                                <button onClick={() => productDelete(product.id)} className="btn btn-danger">Delete</button>

                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : <NoData content={'No Products'} />
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

export default Products