import React from 'react';
import './myparallax.css'; 
import { Parallax } from 'react-parallax';
import ImageOne from '../../img/logo-booki.png';
import ImageTwo from '../../img/logo-kasa.png';
import ImageThree from '../../img/logo-marine-s2j.png';
import ImageFour from '../../img/logo-ohmyfood.png';

const MyParallax = () => {
    return (
        <div className="parallax-container">
            <Parallax bgImage={ImageOne} strength={500}>
                <div className="parallax-section">
                    <div className="parallax-content">First Element Content</div>
                </div>
                <Parallax bgImage={ImageTwo} strength={500}>
                    <div className="parallax-section">
                        <div className="parallax-content">Second Element Content</div>
                    </div>
                    <Parallax bgImage={ImageThree} strength={500}>
                        <div className="parallax-section">
                            <div className="parallax-content">Third Element Content</div>
                        </div>
                        <Parallax bgImage={ImageFour} strength={500}>
                            <div className="parallax-section">
                                <div className="parallax-content">Fourth Element Content</div>
                            </div>
                        </Parallax>
                    </Parallax>
                </Parallax>
            </Parallax>
        </div>
    );
};

export default MyParallax;
