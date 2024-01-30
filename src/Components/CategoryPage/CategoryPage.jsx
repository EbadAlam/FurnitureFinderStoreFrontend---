import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';

const CategoryPage = ({ categoryName }) => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();
    const [error, setError] = useState();
    // setTimeout(() => {
    //     setLoading(false);
    // }, 1500);
    // const categoryContent = {
    //     bedroom: {
    //         key: 1,
    //         title: 'Bedroom Products',
    //         description: 'Explore our collection of bedroom furniture.',
    //     },
    //     chair: {
    //         key: 2,
    //         title: 'Chair Products',
    //         description: 'Discover a variety of chairs for your home.',
    //     },
    // };

    // const content = categoryContent[categoryName.toLowerCase()] || {
    //     title: 'Category Not Found',
    //     description: 'Sorry, the requested category was not found.',
    // };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.REACT_APP_API_BASE_URL || process.env.API_BASE_URL;
            const response = await fetch(`${apiUrl}/categories/cat_detail/${categoryName.toLowerCase()}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setContent(result.category);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
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