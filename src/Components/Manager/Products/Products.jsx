import React, { useState } from 'react'
import Loader from '../../Loader/Loader'
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import NoData from '../NoData/NoData';
import { useStateContext } from '../../../contexts/ContextProvider';
import ManagerLayout from '../Layout/Layout';
import Swal from 'sweetalert2';

function ManagerProducts() {
    const { user, truncateText, _loading } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({});
    const [selectAll, setSelectAll] = useState(false);
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

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
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
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleApply = () => {
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
                axiosClient.put('/manager/products/bulk-action', {
                    action: selectedOption,
                    product_ids: selectedIds,
                    user_id: user.id,
                })
                    .then(() => {
                        console.log('Bulk action performed successfully');
                        setLoading(false);
                        fetchProducts();
                        setSelectedOption('');
                        Swal.fire(`Products ${selectedOption}!`, "", "success");
                    })
                    .catch(error => {
                        console.error('Error performing bulk action:', error);
                        setLoading(false);
                        fetchProducts();
                    });


            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        })
    }

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
                                <div className="col-lg-6 mt-3">
                                    <div class="row">
                                        <div class="col-lg-6 col-sm-12">
                                            <div id="bulkOptionContainer" class="col-xs-4">
                                                <select class="form-control" name="bulk_options" id="bulk_options" onChange={handleOptionChange}>
                                                    <option value="">Select Options</option>
                                                    <option value="available">Available</option>
                                                    <option value="Out Of Stock">Out Of Stock</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-lg-3">
                                            <input onClick={handleApply} type="submit" name="submit" class="btn btn-success" value="Apply" id="applyCheckbox" />
                                        </div>
                                    </div>
                                </div>
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
                                                        <th><input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} /></th>
                                                        <th>S.No</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Category</th>
                                                        <th>Stock Status</th>
                                                        <th>Add By</th>
                                                        <th>Edit</th>
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
                                                                <td> <span className="badge badge-primary">{product.add_by.position}</span></td>
                                                                <td>
                                                                    <NavLink className='btn btn-success' to={`/manager/products/edit/${product.id}`}>Edit</NavLink>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : <NoData content={'No Products'} tag="p" />}
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