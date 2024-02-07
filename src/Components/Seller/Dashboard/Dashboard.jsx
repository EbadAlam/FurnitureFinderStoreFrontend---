import React from 'react'
import SellerLayout from '../Layout/Layout'
import { useStateContext } from '../../../contexts/ContextProvider'
import { NavLink } from 'react-router-dom';

function SellerDashboard() {
    const { user } = useStateContext();
    return (
        <SellerLayout>
            <div className='container-fluid dashboard-content'>Dashboard</div>
            <div className="card-body">
                {user.store_detail.address === null && (
                    <div className="alert alert-danger" role="alert">
                        <NavLink to="/seller/account">Please add address to your profile</NavLink>
                    </div>
                )}
                {user.store_detail.store_image === null && (
                    <div className="alert alert-danger" role="alert">
                        <NavLink to="/seller/account">Please add store image</NavLink>
                    </div>
                )}
                {user.email_status === 'non-verified' ? (
                    <div className="alert alert-danger" role="alert">
                        Your email is not verified. Go to <NavLink to="/seller/account">account info</NavLink> to verify email!
                    </div>
                ) : null}
            </div>
        </SellerLayout>
    )
}

export default SellerDashboard