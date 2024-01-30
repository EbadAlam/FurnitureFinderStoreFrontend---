import React from 'react'
import './Home.css';
import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';



function SecondSection() {
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
            <div className="container">
                <div>
                    <h1 className="topHeadingHome">Furniture For Homes</h1>
                    <p className='paraHome'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                </div>
                <div className="sliderSectionTwo">
                    <Slider {...settings}>
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
                    </Slider>
                </div>
            </div>
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

export default SecondSection