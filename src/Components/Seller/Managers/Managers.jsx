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

function SellerManagers() {
    const { user, truncateText } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [managers, setManagers] = useState({});
    const [errors, setErrors] = useState();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const fetchManagers = () => {
        setLoading(true);
        axiosClient.get(`/seller/manager/all/${user.id}`)
            .then(({ data }) => {
                // console.log(data.user.managers);
                setManagers(data.user.managers);
                setLoading(false);
            })
            .catch((e) => {
                setErrors(e);
                console.error(e);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchManagers();
    }, [])

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked); // Update the checked state for all checkboxes in the tbody
        const updatedmanagers = managers.map(manager => {
            return { ...manager, isChecked };
        });

        setManagers(updatedmanagers);
    };


    const handleCheckboxChange = (event, managerId) => {
        const isChecked = event.target.checked;


        const updatedmanagers = managers.map(manager => {
            if (manager.id === managerId) {
                return { ...manager, isChecked };
            }
            return manager;
        });

        setManagers(updatedmanagers);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleApply = () => {
        if (selectedOption) {
            Swal.fire({
                title: "Are you sure?",
                text: `You want to ${selectedOption} selected managers?`,
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Yes",
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedIds = managers.filter(manager => manager.isChecked).map(manager => manager.id);
                    const selectedUserIds = managers.filter(manager => manager.isChecked).map(manager => manager.user.id);
                    setLoading(true);
                    axiosClient.post('/seller/manager/bulkaction', {
                        action: selectedOption,
                        manager_ids: selectedIds,
                        user_ids: selectedUserIds,
                    })
                        .then(({ data }) => {
                            setLoading(false);
                            setSelectedOption('');
                            fetchManagers();
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
                            <h5 className="card-header">Managers</h5>
                            <div className="col-lg-2">
                                <div className="row">
                                    <NavLink to="/seller/managers/add" className='btn btn-light ml-3 mt-3'>Add Manager</NavLink>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-3">
                                <div class="row">
                                    <div class="col-lg-6 col-sm-12">
                                        <div id="bulkOptionContainer" class="col-xs-4">
                                            <select class="form-control" name="bulk_options" id="bulk_options" onChange={handleOptionChange}>
                                                <option value="">Select Options</option>
                                                <option value="Restricted">Restrict</option>
                                                <option value="Unrestrict">Unrestrict</option>
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
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {managers.length > 0 ? (
                                                    managers.map((manager, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <input
                                                                    className="allCheckboxes"
                                                                    type="checkbox"
                                                                    value={manager.id}
                                                                    checked={manager.isChecked}
                                                                    onChange={(event) => handleCheckboxChange(event, manager.id)}
                                                                />
                                                            </td>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {manager.user.name}
                                                                <span class="badge badge-primary ml-3">{manager.user.account_status}</span>
                                                                {manager.status === 'Restricted' && (<span class="badge badge-danger ml-3">{manager.status}</span>)}
                                                            </td>
                                                            <td>{manager.user.email}</td>
                                                        </tr>
                                                    ))
                                                ) : <NoData content={'No managers'} />}
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

export default SellerManagers