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
import useReveal from '../../hooks/useReveal';

const ProjectSection = () => {
    const { t } = useLanguage();
    const headRef = useReveal();
    const projectRefs = [useReveal(), useReveal(), useReveal(), useReveal(), useReveal(), useReveal()];

    const moveMockup = (event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        const style = event.currentTarget.style;
        style.setProperty('--base-x', `${x * -12}px`);
        style.setProperty('--base-y', `${y * -10}px`);
        style.setProperty('--second-x', `${x * 22 + 12}px`);
        style.setProperty('--second-y', `${y * 18 + 14}px`);
        style.setProperty('--tilt-x', `${y * -7}deg`);
        style.setProperty('--tilt-y', `${x * 9}deg`);
    };

    const resetMockup = (event) => {
        ['--base-x', '--base-y', '--tilt-x', '--tilt-y'].forEach((property) => {
            event.currentTarget.style.removeProperty(property);
        });
        event.currentTarget.style.setProperty('--second-x', '12px');
        event.currentTarget.style.setProperty('--second-y', '14px');
    };

    return (
        <div className="project-section" id="Projets">
            <div className="project-head reveal-on-scroll" ref={headRef}>
                <h2 className="section-title">{t.projects.title}</h2>
                <p className="section-subtitle">{t.projects.subtitle}</p>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[0]} style={{ '--reveal-delay': '0ms' }}>
                <div className="project-image-container" onPointerMove={moveMockup} onPointerLeave={resetMockup}>
                    <img src={m2fctg1} alt="Aperçu du site M2 FCTG" className="project-image" loading="lazy" />
                    <img src={m2fctg2} alt="Deuxième aperçu du site M2 FCTG" className="project-image project-image-top" loading="lazy" />
                </div>
                <div className="project-description">
                    <img src={logoM2fctg} alt="M2 FCTG Logo" className="project-logo" />
                    <p>{t.projects.m2fctg}</p>
                    <a href="https://m2fctg.fr/" target="_blank" rel="noreferrer" className="btn btn-primary">{t.projects.viewMore}</a>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[1]} style={{ '--reveal-delay': '70ms' }}>
                <div className="project-image-container" onPointerMove={moveMockup} onPointerLeave={resetMockup}>
                    <img src={versuscoins1} alt="Aperçu de Versus Coins" className="project-image" loading="lazy" />
                    <img src={versuscoins2} alt="Deuxième aperçu de Versus Coins" className="project-image project-image-top" loading="lazy" />
                </div>
                <div className="project-description">
                    <img src={logoVersusCoins} alt="Versus Coins Logo" className="project-logo" />
                    <p>{t.projects.versuscoins}</p>
                    <a href="https://versuscoins.com/" target="_blank" rel="noreferrer" className="btn btn-primary">{t.projects.viewMore}</a>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[2]} style={{ '--reveal-delay': '0ms' }}>
                <div className="project-image-container" onPointerMove={moveMockup} onPointerLeave={resetMockup}>
                    <img src={projet11} alt="Aperçu de Booki" className="project-image" loading="lazy" />
                    <img src={projet12} alt="Deuxième aperçu de Booki" className="project-image project-image-top" loading="lazy" />
                </div>
                <div className="project-description">
                    <img src={logoBooki} alt="Booki Logo" className="project-logo" />
                    <p>{t.projects.booki}</p>

                    <a href="https://francois-s.github.io/P3---Booki-/" target="_blank" rel="noreferrer" className="btn btn-primary">{t.projects.viewMore}</a>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[3]} style={{ '--reveal-delay': '70ms' }}>
                <div className="project-image-container" onPointerMove={moveMockup} onPointerLeave={resetMockup}>
                    <img src={projet21} alt="Aperçu de Ohmyfood" className="project-image" loading="lazy" />
                    <img src={projet22} alt="Deuxième aperçu de Ohmyfood" className="project-image project-image-top" loading="lazy" />
                </div>
                <div className="project-description">
                    <img src={logoHomyFood} alt="ohmyfood Logo" className="project-logo" id="ohmyfood" />
                    <p>{t.projects.ohmyfood}</p>
                    <a href="https://francois-s.github.io/P4-ohmyfood/" target="_blank" rel="noreferrer" className="btn btn-primary">{t.projects.viewMore}</a>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[4]} style={{ '--reveal-delay': '0ms' }}>
                <div className="project-image-container" onPointerMove={moveMockup} onPointerLeave={resetMockup}>
                    <img src={projet31} alt="Aperçu de Kasa" className="project-image" loading="lazy" />
                    <img src={projet32} alt="Deuxième aperçu de Kasa" className="project-image project-image-top" loading="lazy" />
                </div>
                <div className="project-description">
                    <img src={logoKasa} alt="Kasa Logo" className="project-logo" />
                    <p>{t.projects.kasa}</p>
                    <a href="https://francois-s.github.io/P8-Kasa/" target="_blank" rel="noreferrer" className="btn btn-primary">{t.projects.viewMore}</a>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[5]} style={{ '--reveal-delay': '70ms' }}>
                <div className="project-image-container" onPointerMove={moveMockup} onPointerLeave={resetMockup}>
                    <img src={projet41} alt="Aperçu du site Marine S2J" className="project-image" loading="lazy" />
                    <img src={projet42} alt="Deuxième aperçu du site Marine S2J" className="project-image project-image-top" loading="lazy" />
                </div>        <div className="project-description">
                    <img src={marines2j} alt="marines2j Logo" className="project-logo" id='marines2j' />
                    <p>{t.projects.marines2j}</p>
                    <a href="https://francois-s.github.io/Marines2j/index.html" target="_blank" rel="noreferrer" className="btn btn-primary">{t.projects.viewMore}</a>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;
