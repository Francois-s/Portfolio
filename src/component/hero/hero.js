import React, { useCallback, useRef } from 'react';
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
    const heroRef = useRef(null);

    const handlePointerMove = useCallback((event) => {
        if (event.pointerType === 'touch' || !heroRef.current) return;
        const bounds = heroRef.current.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        heroRef.current.style.setProperty('--pointer-shift-x', `${(x * 30).toFixed(1)}px`);
        heroRef.current.style.setProperty('--pointer-shift-y', `${(y * 24).toFixed(1)}px`);
        heroRef.current.style.setProperty('--ribbon-shift-x', `${(x * -18).toFixed(1)}px`);
        heroRef.current.style.setProperty('--ribbon-shift-y', `${(y * -14).toFixed(1)}px`);
    }, []);

    const resetPointer = useCallback(() => {
        if (!heroRef.current) return;
        heroRef.current.style.setProperty('--pointer-shift-x', '0px');
        heroRef.current.style.setProperty('--pointer-shift-y', '0px');
        heroRef.current.style.setProperty('--ribbon-shift-x', '0px');
        heroRef.current.style.setProperty('--ribbon-shift-y', '0px');
    }, []);

    return (
        <section className="hero" ref={heroRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
            <div className="hero-glow" aria-hidden="true"></div>
            <svg className="hero-ribbon-scene" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                    <linearGradient id="heroRibbonA" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="48%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#0c4a6e" />
                    </linearGradient>
                    <linearGradient id="heroRibbonB" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#0c4a6e" />
                        <stop offset="55%" stopColor="#2dd4bf" />
                        <stop offset="100%" stopColor="#a5f3fc" />
                    </linearGradient>
                    <filter id="heroRibbonGlow" x="-30%" y="-50%" width="160%" height="200%">
                        <feGaussianBlur stdDeviation="18" />
                    </filter>
                </defs>
                <g className="hero-ribbon hero-ribbon-back" filter="url(#heroRibbonGlow)" opacity=".72">
                    <path d="M-120 490 C90 250 230 120 405 240 S680 600 855 440 1060 140 1330 210" />
                    <path d="M-100 250 C100 420 280 570 455 430 S710 100 900 260 1100 540 1320 440" />
                </g>
                <g className="hero-ribbon hero-ribbon-front">
                    <path className="ribbon-main" d="M-120 490 C90 250 230 120 405 240 S680 600 855 440 1060 140 1330 210" />
                    <path className="ribbon-second" d="M-100 250 C100 420 280 570 455 430 S710 100 900 260 1100 540 1320 440" />
                    <path className="ribbon-thread" d="M-80 370 C110 180 260 190 420 330 S700 500 875 350 1100 210 1300 330" />
                </g>
            </svg>
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
