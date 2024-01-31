import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';
import axiosClient from '../../axios-client';

const CategoryPage = ({ categoryName }) => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();
    const [error, setError] = useState();
    const fetchData = async () => {
        setLoading(true);
        axiosClient.get(`/categories/cat_detail/${categoryName.toLowerCase()}`)
            .then(({ data }) => {
                setContent(data.category);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Layout>
                {loading ? (
                    <Loader fullScreen={true} />
                ) : (
                    <div>
                        <h2>{content.cat_title}</h2>
                        <p>{content.cat_description}</p>
                    </div>
                )}
            </Layout>
        </div>
    );
};

export default CategoryPage;