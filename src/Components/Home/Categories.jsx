import React, { useEffect, useState } from 'react'
import './Home.css';
// import bed from '../../assets/images/bedroom.png';
// import chair from '../../assets/images/chair.png';
// import dining from '../../assets/images/dining.png';
// import lounge from '../../assets/images/lounge.png';
// import office_chair from '../../assets/images/office_chair.png';
import { NavLink } from 'react-router-dom';
import Loader from '../Loader/Loader';
function Categories() {
    const [categories, setCategories] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.REACT_APP_API_BASE_URL || process.env.API_BASE_URL;
            const response = await fetch(`${apiUrl}/categories/all`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setCategories(result.categories);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
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