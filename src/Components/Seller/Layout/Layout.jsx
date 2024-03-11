import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SideBar from '../SideBar/SideBar'
import { useStateContext } from '../../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'
import 'sweetalert2/dist/sweetalert2.min.css';


function SellerLayout({ children }) {
    const { token, user } = useStateContext();
    const navigate = useNavigate();
    if (token) {
        if (user) {
            if (user.role === 'seller') {
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
            } else {
                // return (<Navigate to="/" />)
                navigate('/');
            }
        } else {
            navigate('/login');
            // return (<Navigate to="/login" />)
        }
    } else {
        navigate('/login');
        // return (<Navigate to="/login" />)
    }

}

export default SellerLayout