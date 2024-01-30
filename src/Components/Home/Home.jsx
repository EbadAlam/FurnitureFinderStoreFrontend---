import React from 'react'
import Layout from '../Layout/Layout'
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SecondSection from './SecondSection';
import FirstSection from './FirstSection';
import ForthSection from './ForthSection';

function Home() {
    return (
        <Layout>
            <div className='mainDiv'>
                <FirstSection />
                <SecondSection />
                <ForthSection />
            </div>
        </Layout>
    )
}
export default Home