import React, { useEffect, useRef } from 'react';
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
import tabletM2fctg from '../../img/tablet-m2fctg.png';
import tabletVersuscoins from '../../img/tablet-versuscoins.png';
import tabletBooki from '../../img/tablet-booki.png';
import tabletOhmyfood from '../../img/tablet-ohmyfood.png';
import tabletMarineS2J from '../../img/tablet-marines2j.png';
import logoM2fctg from '../../img/logo-m2fctg.png';
import logoVersusCoins from '../../img/logo-versuscoins.png';
import logoKasa from '../../img/logo-kasa.png';
import logoHomyFood from '../../img/logo-ohmyfood.png';
import logoBooki from '../../img/logo-booki.png';
import marines2j from '../../img/logo-marine-s2j.png';
import { useLanguage } from '../../i18n/LanguageContext';
import useReveal from '../../hooks/useReveal';

const ProjectVisual = ({ desktop, mobile, tablet, name, projectRef, onPointerMove, onPointerLeave }) => {
    const visualRef = useRef(null);

    useEffect(() => {
        const visual = visualRef.current;
        const project = projectRef.current;
        if (!visual || !project) return undefined;

        let frame = 0;
        const updateScrollProgress = () => {
            frame = 0;
            const bounds = project.getBoundingClientRect();
            const travel = window.innerHeight + bounds.height * 0.5;
            const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.82 - bounds.top) / travel));
            visual.style.setProperty('--page-progress', progress.toFixed(4));
        };
        const scheduleUpdate = () => {
            if (!frame) frame = window.requestAnimationFrame(updateScrollProgress);
        };

        updateScrollProgress();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [projectRef]);

    return (
        <div className="project-image-container" ref={visualRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
            {tablet ? (
                <div className="project-browser-device">
                    <div className="project-browser-bar" aria-hidden="true"><i /><i /><i /><span>{name}</span></div>
                    <div className="project-browser-screen"><img src={tablet} alt={`Version ordinateur de ${name}`} loading="lazy" /></div>
                </div>
            ) : (
                <img src={desktop} alt={`Version ordinateur de ${name}`} className="project-image project-image-desktop" loading="lazy" />
            )}
            <span className="project-device-caption project-device-desktop">Version navigateur</span>
            {tablet && (
                <div className="project-tablet-device">
                    <span className="project-tablet-camera" aria-hidden="true" />
                    <img src={tablet} alt={`Version tablette de ${name}`} loading="lazy" />
                    <span className="project-tablet-caption">TABLETTE</span>
                </div>
            )}
            <div className="project-phone-device">
                <div className="project-phone-screen">
                    <img src={tablet || mobile} alt={`Version mobile de ${name}`} loading="lazy" />
                </div>
            </div>
            <span className="project-device-caption project-device-mobile">Version mobile</span>
        </div>
    );
};

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
                <ProjectVisual desktop={m2fctg1} mobile={m2fctg2} tablet={tabletM2fctg} name="M2 FCTG" projectRef={projectRefs[0]} onPointerMove={moveMockup} onPointerLeave={resetMockup} />
                <div className="project-description">
                    <img src={logoM2fctg} alt="M2 FCTG Logo" className="project-logo" />
                    <p>{t.projects.m2fctg}</p>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[1]} style={{ '--reveal-delay': '70ms' }}>
                <ProjectVisual desktop={versuscoins1} mobile={versuscoins2} tablet={tabletVersuscoins} name="Versus Coins" projectRef={projectRefs[1]} onPointerMove={moveMockup} onPointerLeave={resetMockup} />
                <div className="project-description">
                    <img src={logoVersusCoins} alt="Versus Coins Logo" className="project-logo" />
                    <p>{t.projects.versuscoins}</p>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[2]} style={{ '--reveal-delay': '0ms' }}>
                <ProjectVisual desktop={projet11} mobile={projet12} tablet={tabletBooki} name="Booki" projectRef={projectRefs[2]} onPointerMove={moveMockup} onPointerLeave={resetMockup} />
                <div className="project-description">
                    <img src={logoBooki} alt="Booki Logo" className="project-logo" />
                    <p>{t.projects.booki}</p>

                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[3]} style={{ '--reveal-delay': '70ms' }}>
                <ProjectVisual desktop={projet21} mobile={projet22} tablet={tabletOhmyfood} name="Ohmyfood" projectRef={projectRefs[3]} onPointerMove={moveMockup} onPointerLeave={resetMockup} />
                <div className="project-description">
                    <img src={logoHomyFood} alt="ohmyfood Logo" className="project-logo" id="ohmyfood" />
                    <p>{t.projects.ohmyfood}</p>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[4]} style={{ '--reveal-delay': '0ms' }}>
                <ProjectVisual desktop={projet31} mobile={projet32} name="Kasa" projectRef={projectRefs[4]} onPointerMove={moveMockup} onPointerLeave={resetMockup} />
                <div className="project-description">
                    <img src={logoKasa} alt="Kasa Logo" className="project-logo" />
                    <p>{t.projects.kasa}</p>
                </div>
            </div>
            <div className="project-content reveal-on-scroll" ref={projectRefs[5]} style={{ '--reveal-delay': '70ms' }}>
                <ProjectVisual desktop={projet41} mobile={projet42} tablet={tabletMarineS2J} name="Marine S2J" projectRef={projectRefs[5]} onPointerMove={moveMockup} onPointerLeave={resetMockup} />
                <div className="project-description">
                    <img src={marines2j} alt="marines2j Logo" className="project-logo" id='marines2j' />
                    <p>{t.projects.marines2j}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;
