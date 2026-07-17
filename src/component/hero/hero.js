import React from 'react';
import './hero.css';

const scrollToId = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-glow" aria-hidden="true"></div>
            <div className="hero-content">
                <span className="hero-eyebrow">Développeur Front-End</span>
                <h1 className="hero-title">
                    Je conçois des interfaces web <span className="hero-highlight">modernes</span> et sur-mesure.
                </h1>
                <p className="hero-subtitle">
                    Spécialisé en React, JavaScript et CMS (WordPress, Shopify), je transforme vos
                    idées en expériences web rapides, accessibles et soignées.
                </p>
                <div className="hero-actions">
                    <a href="#Projets" className="btn btn-primary" onClick={(e) => scrollToId(e, 'Projets')}>
                        Voir mes projets
                    </a>
                    <a href="#contact" className="btn btn-outline" onClick={(e) => scrollToId(e, 'contact')}>
                        Me contacter
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
