import React, { useEffect, useState } from 'react'
import './Home.css';
import { NavLink } from 'react-router-dom';
import Loader from '../Loader/Loader';
import axiosClient from '../../axios-client';
function Categories() {
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setLoading(true);
        axiosClient.get('/categories/all')
            .then(({ data }) => {
                setCategories(data.categories);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    };
    return (

        <div className="categoriesDiv">
            {loading ? (
                <Loader fullScreen={true} />

            ) : (
                <div className="container">
                    <div className="topHeadingHome">
                        <h2>Search by categories</h2>
                    </div>
                    <div className="categories">
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <NavLink key={category.id} to={`/category/${category.cat_title.toLowerCase()}`} className="catLink">
                                    <div className="category">
                                        {category.cat_image && (
                                            <div className="catIcon">
                                                <img
                                                    src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${category.cat_image}`}
                                                    alt={category.cat_title} />
                                            </div>
                                        )}
                                        <div className="catTitle">
                                            <p>{category.cat_title}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            ))
                        ) : (
                            <p>No categories</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Categories