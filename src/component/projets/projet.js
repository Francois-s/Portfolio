import React from 'react';
import './projet.css'; // Assurez-vous de créer un fichier CSS correspondant
import m2fctg1 from '../../img/m2fctg-1.png'
import m2fctg2 from '../../img/m2fctg-2.png'
import versuscoins1 from '../../img/versuscoins-1.png'
import versuscoins2 from '../../img/versuscoins-2.png'
import projet11 from '../../img/projet1-1.png'
import projet12 from '../../img/projet1-2.png'
import projet21 from '../../img/projet2-1.png'
import projet22 from '../../img/projet2-2.png'
import projet31 from '../../img/projet3-1.png'
import projet32 from '../../img/projet3-2.png'
import projet41 from '../../img/projet4-1.png'
import projet42 from '../../img/projet4-2.png'
import logoM2fctg from '../../img/logo-m2fctg.png';
import logoVersusCoins from '../../img/logo-versuscoins.png';
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
            <div className="project-head">
                <h2 className="section-title">Mes projets</h2>
                <p className="section-subtitle">Une sélection de sites que j'ai conçus et développés.</p>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={m2fctg1} alt="Project Thumbnail" className="project-image" />
                    <img src={m2fctg2} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoM2fctg} alt="M2 FCTG Logo" className="project-logo" />
                    <p>M2 FCTG est le site vitrine du Master 2 Finances des Collectivités Territoriales et des Groupements. Il présente la formation, l'équipe pédagogique, les promotions et les événements, en mettant en avant l'alternance, l'expertise du secteur et la forte insertion professionnelle du diplôme.</p>
                    <button onClick={() => openUrl("https://m2fctg.fr/")} className="btn btn-primary">Voir plus</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={versuscoins1} alt="Project Thumbnail" className="project-image" />
                    <img src={versuscoins2} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoVersusCoins} alt="Versus Coins Logo" className="project-logo" />
                    <p>Versus Coins est un site vitrine ludique autour d'un projet crypto qui oppose deux générations, Team Z et Team Y, à travers une roadmap par paliers et une identité visuelle inspirée du monde des memecoins.</p>
                    <button onClick={() => openUrl("https://versuscoins.com/")} className="btn btn-primary">Voir plus</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet11} alt="Project Thumbnail" className="project-image" />
                    <img src={projet12} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoBooki} alt="Booki Logo" className="project-logo" />
                    <p>Booki est une solution tout-en-un pour les voyageurs, offrant une gamme complète de services pour enrichir l'expérience de voyage. Du choix de logements uniques à des activités palpitantes, Booki permet aux utilisateurs de planifier et de réserver tous les aspects de leur voyage en quelques clics.</p>

                    <button onClick={() => openUrl("https://francois-s.github.io/P3---Booki-/")} className="btn btn-primary">Voir plus</button>
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
                    <button onClick={() => openUrl("https://francois-s.github.io/P4-ohmyfood/")} className="btn btn-primary">Voir plus</button>
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
                    <button onClick={() => openUrl("https://francois-s.github.io/P4-ohmyfood/")} className="btn btn-primary">Voir plus</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet41} alt="Project Thumbnail" className="project-image" />
                    <img src={projet42} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>        <div className="project-description">
                    <img src={marines2j} alt="marines2j Logo" className="project-logo" id='marines2j' />
                    <p>Marine s2j est un site vitrine élégant et contemporain pour une hairstylist renommée basée à Paris. Le site met en lumière les shootings et projets auxquels Marine a contribué, et offre aux visiteurs toutes les informations nécessaires pour découvrir son travail et prendre rendez-vous.</p>
                    <button onClick={() => openUrl("https://francois-s.github.io/Marines2j/index.html")} className="btn btn-primary">Voir plus</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;