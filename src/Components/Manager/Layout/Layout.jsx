import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SideBar from '../SideBar/SideBar'
import { useStateContext } from '../../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'
import 'sweetalert2/dist/sweetalert2.min.css';
import Loader from '../../Loader/Loader'


function ManagerLayout({ children }) {
    const navigate = useNavigate();
    const { token, user, _loading } = useStateContext();
    if (_loading === false) {
        if (token) {
            if (user) {
                if (user.position == 'manager') {
                    return (
                        <>
                            <div className='dashboard-main-wrapper'>
                                <Header />
                                <SideBar />
                                <div className='dashboard-wrapper'>
                                    {children}
                                    <Footer />
                                </div>
                            </div>

                        </>
                    )
                }
            } else {
                // return (<Navigate to="/login" />)
                navigate('/login')
            }
        } else {
            navigate('/login')
            // return (<Navigate to="/login" />)
        }
    } else {
        return (
            <Loader fullScreen={true} />
        )
    }
}

export default ManagerLayout