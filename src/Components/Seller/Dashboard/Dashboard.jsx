import React from 'react'
import SellerLayout from '../Layout/Layout'
import { useStateContext } from '../../../contexts/ContextProvider'
import { NavLink } from 'react-router-dom';

function SellerDashboard() {
    const { user } = useStateContext();
    console.log(user);
    return (
        <SellerLayout>
            <div className='container-fluid dashboard-content'>Dashboard</div>
            <div className="card-body">
                {user.user_detail === null || user.store_locations === null ? (
                    <div className="alert alert-danger" role="alert">
                        In order to add products. Please complete you profile!
                    </div>
                ) : null}
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