import React from 'react';
import './cardcontainer.css';
import photo1 from '../../img/landing_page.svg';
import photo2 from '../../img/wireframe.svg';
//import photo3 from '../../img/knowledge.svg';


const CardContainer = () => {
    return (
        <div className='wrapper' id="cardss">
            <h2 className="project-title">MES SERVICES</h2>
            <div className="card-container">
                <div className="card">
                    <img src={photo1} alt=" 1" />
                    <h3>Applications</h3>
                    <p>Développe des sites vitrines, e-commerce, applications web, mobile ou de bureau.</p>
                </div>
                <div className="card">
                    <img src={photo2} alt=" 2" />
                    <h3>Expérience utilisateur & Design</h3>
                    <p>Une expérience fluide et magnifique pour vos clients.</p>
                </div>
                <div className="card">
                    <img src={photo1} alt=" 3" />
                    <h3>Accessibilité   </h3>
                    <p>Nous avons tous le droit d'explorer le web. HTML sémantique et ARIA si pertinent.</p>
                </div>
            </div>
        </div>
    );
};

export default CardContainer;
