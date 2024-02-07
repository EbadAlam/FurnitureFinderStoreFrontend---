import React, { useEffect, useState } from 'react'
import './Home.css';
import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';
import Loader from '../Loader/Loader';

function ForthSection() {
    const { truncateText } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({});
    const fetchProducts = () => {
        setLoading(true);
        axiosClient.get('/products/all')
            .then(({ data }) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="sectionTwo">
            {loading ? (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Loader fullScreen={false} />
                </div>
            ) : (
                <div className="container">
                    <div>
                        <h1 className="topHeadingHome">Furniture For Commercials</h1>
                        <p className='paraHome'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    </div>
                    <div className="sliderSectionTwo">
                        <Slider {...settings}>
                            {products && products.length > 0 && (
                                products.map((product) => (
                                    product.product_status === 'Active' && (
                                        <div className="slider" key={product.id}>
                                            <div className="slidesImage">
                                                <img src={`${process.env.REACT_APP_LARAVEL_BASE_URL}/${product.product_image}`} alt={product.product_name} />
                                            </div>
                                            <div className="slidesName">
                                                <h3>{product.product_name}
                                                    <span className={`badge badge-${product.product_stock_status == 'Available' ? 'info' : 'secondary'} ml-3`}>{product.product_stock_status}</span>
                                                </h3>
                                            </div>
                                            <div className="slidesText">
                                                <p>{truncateText(product.product_description, 40)}</p>
                                            </div>
                                            <div className="slidesDetailBtn">
                                                <button>View Details</button>
                                            </div>
                                        </div>
                                    )
                                ))
                            )}
                            {/* <div className="slider">
                            <div className="slidesImage">
                                <img src="https://source.unsplash.com/collection/1163637/480x480" alt="Slider" />
                            </div>
                            <div className="slidesName">
                                <h3>Product Name</h3>
                            </div>
                            <div className="slidesText">
                                <p>Lorem ipsum is simply a dummy text.</p>
                            </div>
                            <div className="slidesDetailBtn">
                                <button>View Details</button>
                            </div>
                        </div>
                        <div className="slider">
                            <div className="slidesImage">
                                <img src="https://source.unsplash.com/collection/1163637/480x480" alt="Slider" />
                            </div>
                            <div className="slidesName">
                                <h3>Product Name</h3>
                            </div>
                            <div className="slidesText">
                                <p>Lorem ipsum is simply a dummy text.</p>
                            </div>
                            <div className="slidesDetailBtn">
                                <button>View Details</button>
                            </div>
                        </div>
                        <div className="slider">
                            <div className="slidesImage">
                                <img src="https://source.unsplash.com/collection/1163637/480x480" alt="Slider" />
                            </div>
                            <div className="slidesName">
                                <h3>Product Name</h3>
                            </div>
                            <div className="slidesText">
                                <p>Lorem ipsum is simply a dummy text.</p>
                            </div>
                            <div className="slidesDetailBtn">
                                <button>View Details</button>
                            </div>
                        </div>
                        <div className="slider">
                            <div className="slidesImage">
                                <img src="https://source.unsplash.com/collection/1163637/480x480" alt="Slider" />
                            </div>
                            <div className="slidesName">
                                <h3>Product Name</h3>
                            </div>
                            <div className="slidesText">
                                <p>Lorem ipsum is simply a dummy text.</p>
                            </div>
                            <div className="slidesDetailBtn">
                                <button>View Details</button>
                            </div>
                        </div>
                        <div className="slider">
                            <div className="slidesImage">
                                <img src="https://source.unsplash.com/collection/1163637/480x480" alt="Slider" />
                            </div>
                            <div className="slidesName">
                                <h3>Product Name</h3>
                            </div>
                            <div className="slidesText">
                                <p>Lorem ipsum is simply a dummy text.</p>
                            </div>
                            <div className="slidesDetailBtn">
                                <button>View Details</button>
                            </div>
                        </div>
                        <div className="slider">
                            <div className="slidesImage">
                                <img src="https://source.unsplash.com/collection/1163637/480x480" alt="Slider" />
                            </div>
                            <div className="slidesName">
                                <h3>Product Name</h3>
                            </div>
                            <div className="slidesText">
                                <p>Lorem ipsum is simply a dummy text.</p>
                            </div>
                            <div className="slidesDetailBtn">
                                <button>View Details</button>
                            </div>
                        </div> */}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    )
}

const CustomPrevArrow = (props) => (
    <div className="custom-arrow custom-prev" onClick={props.onClick}>
        <LeftOutlined />
    </div>
);

const CustomNextArrow = (props) => (
    <div className="custom-arrow custom-next" onClick={props.onClick}>
        <RightOutlined />
    </div>
);

export default ForthSection