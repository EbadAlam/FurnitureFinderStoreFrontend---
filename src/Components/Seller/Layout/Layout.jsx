import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SideBar from '../SideBar/SideBar'
import { useStateContext } from '../../../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'
import 'sweetalert2/dist/sweetalert2.min.css';


function SellerLayout({ children }) {
    const { token, user } = useStateContext();
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
                return (<Navigate to="/" />)
            }
        } else {
            return (<Navigate to="/login" />)
        }
    } else {
        return (<Navigate to="/login" />)
    }

}

export default SellerLayout