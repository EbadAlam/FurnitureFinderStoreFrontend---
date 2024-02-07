import React from 'react'
import { useStateContext } from '../../../contexts/ContextProvider'
import ManagerLayout from '../Layout/Layout';
import Loader from '../../Loader/Loader';

function ManagerDashboard() {
    const { user, _loading } = useStateContext();
    return (
        <ManagerLayout>
            <div className='container-fluid dashboard-content'>Dashboard</div>
            {_loading ? (
                <Loader fullScreen={true} />
            ) : (
                <div className="card-body">
                    {user.position.status === 'restricted' && (
                        <div className="alert alert-danger" role="alert">
                            Your account is restricted by store owner!
                        </div>
                    )}
                </div>
            )}
        </ManagerLayout>
    )
}

export default ManagerDashboard