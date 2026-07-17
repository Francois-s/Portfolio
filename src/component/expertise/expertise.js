import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './expertise.css';

gsap.registerPlugin(ScrollTrigger);

const DOMAINS = [
    {
        tag: 'Front-end',
        glyph: '</>',
        title: 'Développement Front-End',
        text: 'React & JavaScript moderne pour des interfaces interactives et réactives.',
    },
    {
        tag: 'Intégration',
        glyph: '▦',
        title: 'Intégration & Responsive',
        text: 'HTML5/CSS3 pixel-perfect, accessible sur tous les écrans.',
    },
    {
        tag: 'CMS',
        glyph: '◈',
        title: 'CMS & E-commerce',
        text: 'WordPress et Shopify : sites sur-mesure, optimisés pour le SEO.',
    },
    {
        tag: 'Scripting',
        glyph: '{ }',
        title: 'Automatisation & Scripts',
        text: 'Python pour automatiser des tâches et traiter des données.',
    },
    {
        tag: 'Performance',
        glyph: '⚡',
        title: 'Performance & Accessibilité',
        text: 'Sites rapides, optimisés et conformes aux bonnes pratiques web.',
    },
    {
        tag: 'Veille',
        glyph: '◎',
        title: 'Veille technologique',
        text: 'Toujours à jour sur les tendances et outils du développement web.',
    },
    {
        tag: 'SEO',
        glyph: '⌕',
        title: 'SEO & Référencement',
        text: 'Structure sémantique, balisage et bonnes pratiques on-page pour améliorer la visibilité sur les moteurs de recherche.',
    },
];

const Expertise = () => {
    const wrapRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const track = trackRef.current;
        if (!wrap || !track) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isNarrow = window.innerWidth < 768;

        if (prefersReducedMotion || isNarrow) {
            track.classList.add('is-static-scroll');
            return;
        }

        const ctx = gsap.context(() => {
            const getScrollDistance = () => track.scrollWidth - wrap.offsetWidth;

            const tween = gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    start: 'top top',
                    end: () => `+=${getScrollDistance()}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            return () => {
                if (tween.scrollTrigger) tween.scrollTrigger.kill();
                tween.kill();
            };
        }, wrap);

        return () => ctx.revert();
    }, []);

    return (
        <section className="expertise" id="Expertise">
            <div className="expertise-pin-wrap" ref={wrapRef}>
                <div className="expertise-head">
                    <h2 className="section-title">Du code à la mise en ligne</h2>
                    <p className="section-subtitle">
                        Sept domaines que je pratique au quotidien, du front-end à la veille technologique.
                    </p>
                </div>
                <div className="expertise-track" ref={trackRef}>
                    {DOMAINS.map((d) => (
                        <div className="expertise-card" key={d.title}>
                            <span className="expertise-glyph">{d.glyph}</span>
                            <span className="expertise-tag">{d.tag}</span>
                            <h3>{d.title}</h3>
                            <p>{d.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
