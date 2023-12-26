import React from 'react';
import './projet.css'; // Assurez-vous de créer un fichier CSS correspondant
import projet11 from '../../img/projet1-1.png'
import projet12 from '../../img/projet1-2.png'
import projet21 from '../../img/projet2-1.png'
import projet22 from '../../img/projet2-2.png'
import projet31 from '../../img/projet3-1.png'
import projet32 from '../../img/projet3-2.png'
import projet41 from '../../img/projet4-1.png'
import projet42 from '../../img/projet4-2.png'
import logoKasa from '../../img/logo-kasa.png';
import logoHomyFood from '../../img/logo-ohmyfood.png';
import logoBooki from '../../img/logo-booki.png';
import marines2j from '../../img/logo-marine-s2j.png';

const openUrl = (url) => {
    window.open(url, '_blank');
};

const ProjectSection = () => {
    return (
        <div className="project-section" id="Projets">
            <div className='block_white'></div>
            <h2 className="project-title">PROJETS</h2>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet11} alt="Project Thumbnail" className="project-image" />
                    <img src={projet12} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoBooki} alt="Booki Logo" className="project-logo" />
                    <p>Booki est une solution tout-en-un pour les voyageurs, offrant une gamme complète de services pour enrichir l'expérience de voyage. Du choix de logements uniques à des activités palpitantes, Booki permet aux utilisateurs de planifier et de réserver tous les aspects de leur voyage en quelques clics.</p>

                    <button onClick={() => openUrl("https://francois-s.github.io/P3---Booki-/")} className="case-study-button">Voir plus</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet21} alt="Project Thumbnail" className="project-image" />
                    <img src={projet22} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoHomyFood} alt="ohmyfood Logo" className="project-logo" id="ohmyfood" />
                    <p>Ohmyfood révolutionne l'expérience culinaire en proposant une plateforme intuitive pour réserver des menus exclusifs auprès d'une sélection de restaurants. Les utilisateurs peuvent explorer une variété de cuisines, réserver leur menu préféré et profiter d'une expérience gastronomique inoubliable.</p>
                    <button onClick={() => openUrl("https://francois-s.github.io/P4-ohmyfood/")} className="case-study-button">Voir plus</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet31} alt="Project Thumbnail" className="project-image" />
                    <img src={projet32} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoKasa} alt="Kasa Logo" className="project-logo" />
                    <p>Kasa est une plateforme innovante conçue pour simplifier la recherche de logements en voyage. Inspirée par le modèle de Airbnb, Kasa offre une expérience utilisateur exceptionnelle, permettant aux voyageurs de trouver facilement des hébergements confortables et abordables, adaptés à leurs besoins spécifiques.</p>
                    <button onClick={() => openUrl("https://francois-s.github.io/P4-ohmyfood/")} className="case-study-button">Voir plus</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet41} alt="Project Thumbnail" className="project-image" />
                    <img src={projet42} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>        <div className="project-description">
                    <img src={marines2j} alt="marines2j Logo" className="project-logo" id='marines2j' />
                    <p>Marine s2j est un site vitrine élégant et contemporain pour une hairstylist renommée basée à Paris. Le site met en lumière les shootings et projets auxquels Marine a contribué, et offre aux visiteurs toutes les informations nécessaires pour découvrir son travail et prendre rendez-vous.</p>
                    <button onClick={() => openUrl("https://francois-s.github.io/Marines2j/index.html")} className="case-study-button">Voir plus</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;