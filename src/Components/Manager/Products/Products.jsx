import React, { useState } from 'react'
import Loader from '../../Loader/Loader'
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import NoData from '../NoData/NoData';
import { useStateContext } from '../../../contexts/ContextProvider';
import ManagerLayout from '../Layout/Layout';

function ManagerProducts() {
    const { user, truncateText, _loading } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({});
    const fetchProducts = () => {
        setLoading(true);
        axiosClient.get(`/manager/products/all/${user.id}`)
            .then(({ data }) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <ManagerLayout>
            {_loading ? (
                <Loader fullScreen={true} />
            ) : (
                <div className='container-fluid dashboard-content'>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <h5 className="card-header">Products</h5>
                                <div className="col-lg-2">
                                    <div className="row">
                                        <NavLink to="/manager/products/add" className='btn btn-light ml-3 mt-3'>Add Product</NavLink>
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
                                                        <th>S.No</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Category</th>
                                                        <th>Stock Status</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {products.length > 0 ? (
                                                        products.map((product, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{product.product_name}<span class="badge badge-primary ml-3">{product.product_status}</span></td>
                                                                <td>{truncateText(product.product_description, 10)}</td>
                                                                <td>{product.category.cat_title}</td>
                                                                <td>{product.product_stock_status}</td>
                                                                <td>
                                                                    <NavLink className='btn btn-success' to={`/seller/products/edit/${product.id}`}>Edit</NavLink>
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
            )}
        </ManagerLayout >
    )
}

export default ManagerProducts