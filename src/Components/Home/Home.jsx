import React from 'react'
import Layout from '../Layout/Layout'
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SecondSection from './SecondSection';
import FirstSection from './FirstSection';
import ForthSection from './ForthSection';
import Loader from '../Loader/Loader';
import { useStateContext } from '../../contexts/ContextProvider';
import ThirdSection from './ThirdSection';
// import { useNavigate } from 'react-router-dom';

function Home() {
    const { _loading } = useStateContext();
    return (
        <Layout>
            {_loading ? (
                <Loader fullScreen={true} />
            ) : (
                <div className='mainDiv'>
                    <FirstSection />
                    <SecondSection />
                    <ThirdSection />
                    <ForthSection />
                </div>
            )}
        </Layout>
    )
}
export default Home