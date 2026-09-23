import React from 'react';
import './hero.css';
import { useLanguage } from '../../i18n/LanguageContext';
import useReveal from '../../hooks/useReveal';

const scrollToId = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
    const { t } = useLanguage();
    const contentRef = useReveal({ threshold: 0.05 });

    return (
        <section className="hero">
            <div className="hero-glow" aria-hidden="true"></div>
            <div className="hero-orbit hero-orbit-one" aria-hidden="true"></div>
            <div className="hero-orbit hero-orbit-two" aria-hidden="true"></div>
            <div className="hero-content reveal-on-scroll" ref={contentRef}>
                <span className="hero-eyebrow">{t.hero.eyebrow}</span>
                <h1 className="hero-title">
                    {t.hero.titlePre}
                    <span className="hero-highlight">{t.hero.titleHighlight}</span>
                    {t.hero.titlePost}
                </h1>
                <p className="hero-subtitle">{t.hero.subtitle}</p>
                <div className="hero-actions">
                    <a href="#Projets" className="btn btn-primary" onClick={(e) => scrollToId(e, 'Projets')}>
                        {t.hero.ctaProjects}
                    </a>
                    <a href="#contact" className="btn btn-outline" onClick={(e) => scrollToId(e, 'contact')}>
                        {t.hero.ctaContact}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
