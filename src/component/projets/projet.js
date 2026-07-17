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
import { useLanguage } from '../../i18n/LanguageContext';

const openUrl = (url) => {
    window.open(url, '_blank');
};

const ProjectSection = () => {
    const { t } = useLanguage();

    return (
        <div className="project-section" id="Projets">
            <div className="project-head">
                <h2 className="section-title">{t.projects.title}</h2>
                <p className="section-subtitle">{t.projects.subtitle}</p>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={m2fctg1} alt="Project Thumbnail" className="project-image" />
                    <img src={m2fctg2} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoM2fctg} alt="M2 FCTG Logo" className="project-logo" />
                    <p>{t.projects.m2fctg}</p>
                    <button onClick={() => openUrl("https://m2fctg.fr/")} className="btn btn-primary">{t.projects.viewMore}</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={versuscoins1} alt="Project Thumbnail" className="project-image" />
                    <img src={versuscoins2} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoVersusCoins} alt="Versus Coins Logo" className="project-logo" />
                    <p>{t.projects.versuscoins}</p>
                    <button onClick={() => openUrl("https://versuscoins.com/")} className="btn btn-primary">{t.projects.viewMore}</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet11} alt="Project Thumbnail" className="project-image" />
                    <img src={projet12} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoBooki} alt="Booki Logo" className="project-logo" />
                    <p>{t.projects.booki}</p>

                    <button onClick={() => openUrl("https://francois-s.github.io/P3---Booki-/")} className="btn btn-primary">{t.projects.viewMore}</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet21} alt="Project Thumbnail" className="project-image" />
                    <img src={projet22} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoHomyFood} alt="ohmyfood Logo" className="project-logo" id="ohmyfood" />
                    <p>{t.projects.ohmyfood}</p>
                    <button onClick={() => openUrl("https://francois-s.github.io/P4-ohmyfood/")} className="btn btn-primary">{t.projects.viewMore}</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet31} alt="Project Thumbnail" className="project-image" />
                    <img src={projet32} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>
                <div className="project-description">
                    <img src={logoKasa} alt="Kasa Logo" className="project-logo" />
                    <p>{t.projects.kasa}</p>
                    <button onClick={() => openUrl("https://francois-s.github.io/P4-ohmyfood/")} className="btn btn-primary">{t.projects.viewMore}</button>
                </div>
            </div>
            <div className="project-content">
                <div className="project-image-container">
                    <img src={projet41} alt="Project Thumbnail" className="project-image" />
                    <img src={projet42} alt="Another Project Thumbnail" className="project-image project-image-top" />
                </div>        <div className="project-description">
                    <img src={marines2j} alt="marines2j Logo" className="project-logo" id='marines2j' />
                    <p>{t.projects.marines2j}</p>
                    <button onClick={() => openUrl("https://francois-s.github.io/Marines2j/index.html")} className="btn btn-primary">{t.projects.viewMore}</button>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;
