import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';
import axiosClient from '../../axios-client';
import { NavLink } from 'react-router-dom';
import NoData from '../NoData/NoData';
import { useStateContext } from '../../contexts/ContextProvider';

const CategoryPage = ({ categoryName }) => {
    const { token } = useStateContext();
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState();
    const [products, setProducts] = useState();
    const [error, setError] = useState();
    const fetchData = async () => {
        setLoading(true);
        axiosClient.get(`/categories/cat_detail/${categoryName.toLowerCase()}`)
            .then(({ data }) => {
                setContent(data.category);
                setProducts(data.category.products);
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
                    <>
                        <div>
                            <h2>{content.cat_title}</h2>
                            <p>{content.cat_description}</p>
                        </div>
                        <div className="col-lg-12 mt-3">
                            <div className="row">
                                {/* {products && products.length > 0 ? (
                                    products.map((product, index) => (
                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="card card-figure">
                                                <figure className="figure">
                                                    <div className="figure-img">
                                                        <img className="img-fluid" src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${product.product_image}`} alt={product.product_name} />
                                                        <div className="figure-description">
                                                            <h3 className="figure-title"> {product.product_name} </h3>
                                                            <p className="text-muted mb-0">
                                                                <small>{product.product_description}</small>
                                                            </p>
                                                        </div>
                                                        <div className="figure-tools">
                                                            <a href="#" className="tile tile-circle tile-sm mr-auto">   </a>
                                                            <span className="badge badge-success">{product.product_stock_status}</span>
                                                        </div>
                                                        {token ? (
                                                            <div className="figure-action">
                                                                <NavLink href="#" className="btn btn-block btn-sm btn-primary">Quick Action</NavLink>
                                                            </div>
                                                        ) : (null)}
                                                    </div>
                                                </figure>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <NoData content={'No products found under this category'} tag='h2' />
                                )} */}
                                {products && products.length > 0 ? (
                                    products.some(product => product.product_stock_status === 'Active') ? (
                                        products.map((product, index) => (
                                            product.product_stock_status === 'Active' && (
                                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12" key={index}>
                                                    <div className="card card-figure">
                                                        <figure className="figure">
                                                            <div className="figure-img">
                                                                <img className="img-fluid" src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${product.product_image}`} alt={product.product_name} />
                                                                <div className="figure-tools">
                                                                    <a href="#" className="tile tile-circle tile-sm mr-auto">
                                                                        <span className="oi-data-transfer-download"></span>
                                                                    </a>
                                                                    <span className="badge badge-success">{product.product_stock_status}</span>
                                                                </div>
                                                                {token && (
                                                                    <div className="figure-action">
                                                                        <NavLink to="#" className="btn btn-block btn-sm btn-primary">Quick Action</NavLink>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <figcaption className="figure-caption">
                                                                <h6 className="figure-title"><a href="#">{product.product_name}</a></h6>
                                                                <p className="text-muted mb-0">{product.product_description}</p>
                                                            </figcaption>
                                                        </figure>
                                                    </div>
                                                </div>
                                            )
                                        ))
                                    ) : (
                                        <NoData content={'No products found under this category'} tag='h2' />
                                    )
                                ) : (
                                    <NoData content={'No products found under this category'} tag='h2' />
                                )}

                            </div>
                        </div>
                    </>
                )}
            </Layout>
        </div>
    );
};

export default CategoryPage;