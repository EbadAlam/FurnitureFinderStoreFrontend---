import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React from 'react'
import Categories from './Categories'
import sofa from '../../assets/images/Sofa1.png';

function FirstSection() {
    // const settingsTop = {
    //     dots: false,
    //     infinite: true,
    //     speed: 600,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    // };
    return (
        <div className="topBannerHome">
            <div className="container">
                {/* <Slider {...settingsTop}> */}
                <div className="sliderHome">
                    <div>
                        <h1 className='topHeadingHome'>Modern Collections</h1>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        <button className="btnHome buyers">BUYERS</button>
                        <button className="btnHome sellers">SELLERS</button>
                        <div className="sliderHomeIcon">
                            <div className="leftIcon">
                                <LeftOutlined />
                            </div>
                            <div className="rightIcon">
                                <RightOutlined />
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={sofa} alt="Sofa" />
                    </div>
                </div>
                {/* </Slider> */}
            </div>
            <Categories />
        </div>
    )
}

export default FirstSection