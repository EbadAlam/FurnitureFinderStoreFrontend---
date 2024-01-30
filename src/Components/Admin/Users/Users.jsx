import React, { useState } from 'react'
import AdminLayout from '../Layout/Layout'
import Loader from '../../Loader/Loader'
import axiosClient from '../../../axios-client';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import NoData from '../NoData/NoData';
import { NavLink } from 'react-router-dom';

function Users() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState();
    const [selectAll, setSelectAll] = useState(false);
    const fetchUsers = () => {
        setLoading(true);
        axiosClient.get('/user/getusers')
            .then((data) => {
                setUsers(data.data[1]);
                setLoading(false);
            })
            .catch((e) => {
                setErrors(e);
                console.error(e);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchUsers();
    }, [])
    const userDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete the user?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                console.log(id, 'userId');
                axiosClient.post(`/user/delete/${id}`)
                    .then(() => {
                        fetchUsers();
                        setLoading(false);
                        Swal.fire("User Deleted!", "", "success");
                    })
                    .catch((e) => {
                        console.error(e);
                        setErrors(e);
                        setLoading(false);
                        Swal.fire("An error occured", "", "info");
                    })
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }
    const userEdit = (user) => {
        console.log(user);
    }
    const userActiveInactive = (user) => {
        setLoading(true);
        setErrors(null);
        axiosClient.put(`/user/activeinactive/${user.id}`)
            .then((data) => {
                // console.log(data.data.status);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} status updated to ${data.data.status}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
                fetchUsers();
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
                setErrors(err);
            })
    }

    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked); // Update the checked state for all checkboxes in the tbody
        const updatedUsers = users.map(user => {
            return { ...user, isChecked };
        });

        setUsers(updatedUsers);
    };


    const handleCheckboxChange = (event, userId) => {
        const isChecked = event.target.checked;


        const updatedUsers = users.map(user => {
            if (user.id === userId) {
                return { ...user, isChecked };
            }
            return user;
        });

        setUsers(updatedUsers);
    };
    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleApply = () => {
        // if (selectedOption === 'delete') {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to ${selectedOption} selected users?`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedIds = users.filter(user => user.isChecked).map(user => user.id);
                setLoading(true);
                axiosClient.post('/user/bulk-action', {
                    action: selectedOption,
                    user_ids: selectedIds,
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
                fetchUsers();
                Swal.fire(`Users ${selectedOption}!`, "", "success");

            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        })
        // }
    }
    return (
        <AdminLayout>
            <div className='container-fluid dashboard-content'>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <h5 className="card-header">Users</h5>
                            <div className="col-lg-6 mt-3">
                                <div class="row">
                                    <div class="col-lg-6 col-sm-12">
                                        <div id="bulkOptionContainer" class="col-xs-4">
                                            <select class="form-control" name="bulk_options" id="bulk_options" onChange={handleOptionChange}>
                                                <option value="">Select Options</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
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
                                    <table className="table table-striped table-bordered first">
                                        <thead>
                                            <tr>
                                                <th><input id="selectAllBoxes" type="checkbox" onChange={handleSelectAll} checked={selectAll} /></th>
                                                <th>S.No</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th>Change Status</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <Loader fullScreen={false} />
                                            ) : (
                                                users.length > 0 ? (
                                                    users.map((user, index) => (

                                                        <tr key={index}>
                                                            <td>
                                                                {user.role !== process.env.REACT_APP_ROLE_MASTER_ADMIN ? (
                                                                    <input
                                                                        className="allCheckboxes"
                                                                        type="checkbox"
                                                                        value={user.id}
                                                                        checked={user.isChecked}
                                                                        onChange={(event) => handleCheckboxChange(event, user.id)}
                                                                    />
                                                                ) : (null)}
                                                            </td>
                                                            <td>{index + 1}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.role}</td>
                                                            <td>{user.account_status}</td>
                                                            <td>
                                                                {user.role == process.env.REACT_APP_ROLE_MASTER_ADMIN ? (
                                                                    <button className='btn btn-dark' disabled>{user.account_status == 'Active' ? 'Inactive' : 'Active'}</button>
                                                                ) : (
                                                                    <button onClick={() => userActiveInactive(user)} className='btn btn-dark'>{user.account_status == 'Active' ? 'Inactive' : 'Active'}</button>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <NavLink className='btn btn-success' to={`/admin/users/edit/${user.id}`}>Edit</NavLink>
                                                            </td>
                                                            <td>
                                                                {user.role == process.env.REACT_APP_ROLE_MASTER_ADMIN ? (
                                                                    <button className='btn btn-danger' disabled>Delete</button>
                                                                ) : (
                                                                    <button className='btn btn-danger' onClick={() => userDelete(user.id)}>Delete</button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : <NoData content={'NO USERS'} />
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

export default Users