import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';

function ProductDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    return (
        <Layout>
            {loading ? (
                <Loader fullscreen="true" />
            ) : (
                <div>ProductDetail {id}</div>
            )}
        </Layout>
    )
}

export default ProductDetail