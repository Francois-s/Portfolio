import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './expertise.css';

gsap.registerPlugin(ScrollTrigger);

const DOMAINS = [
    {
        tag: 'Front-end',
        glyph: '</>',
        hue: 'violet',
        title: 'Développement Front-End',
        text: 'React & JavaScript moderne pour des interfaces interactives et réactives.',
    },
    {
        tag: 'Intégration',
        glyph: '▦',
        hue: 'sky',
        title: 'Intégration & Responsive',
        text: 'HTML5/CSS3 pixel-perfect, accessible sur tous les écrans.',
    },
    {
        tag: 'CMS',
        glyph: '◈',
        hue: 'teal',
        title: 'CMS & E-commerce',
        text: 'WordPress et Shopify : sites sur-mesure, optimisés pour le SEO.',
    },
    {
        tag: 'Scripting',
        glyph: '{ }',
        hue: 'amber',
        title: 'Automatisation & Scripts',
        text: 'Python pour automatiser des tâches et traiter des données.',
    },
    {
        tag: 'Performance',
        glyph: '⚡',
        hue: 'pink',
        title: 'Performance & Accessibilité',
        text: 'Sites rapides, optimisés et conformes aux bonnes pratiques web.',
    },
    {
        tag: 'Veille',
        glyph: '◎',
        hue: 'green',
        title: 'Veille technologique',
        text: 'Toujours à jour sur les tendances et outils du développement web.',
    },
    {
        tag: 'SEO',
        glyph: '⌕',
        hue: 'rose',
        title: 'SEO & Référencement',
        text: 'Structure sémantique, balisage et bonnes pratiques on-page pour améliorer la visibilité sur les moteurs de recherche.',
    },
];

const Expertise = () => {
    const wrapRef = useRef(null);
    const trackRef = useRef(null);
    const cardRefs = useRef([]);

    cardRefs.current = [];

    useEffect(() => {
        const wrap = wrapRef.current;
        const track = trackRef.current;
        if (!wrap || !track) return;

        const cards = cardRefs.current;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isNarrow = window.innerWidth < 768;

        if (prefersReducedMotion || isNarrow) {
            track.classList.add('is-static-scroll');
            return;
        }

        const ctx = gsap.context(() => {
            // Avoid track.scrollWidth: it gets inflated by the active card's
            // CSS scale transform. Use untransformed layout metrics instead.
            const getScrollDistance = () => {
                const lastCard = cards[cards.length - 1];
                const trackPaddingRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
                const naturalWidth = lastCard.offsetLeft + lastCard.offsetWidth + trackPaddingRight;
                return naturalWidth - wrap.offsetWidth;
            };

            const setActiveCard = (self) => {
                const progress = self ? self.progress : 0;
                const activeIndex = Math.round(progress * (cards.length - 1));
                cards.forEach((card, i) => card.classList.toggle('is-active', i === activeIndex));
            };

            const tween = gsap.to(track, {
                x: () => -getScrollDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    start: 'top top',
                    end: () => `+=${getScrollDistance()}`,
                    scrub: 0.4,
                    pin: true,
                    invalidateOnRefresh: true,
                    onUpdate: setActiveCard,
                    onRefresh: setActiveCard,
                },
            });

            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => ScrollTrigger.refresh());
            }

            return () => {
                if (tween.scrollTrigger) tween.scrollTrigger.kill();
                tween.kill();
                cards.forEach((card) => card.classList.remove('is-active'));
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
                    {DOMAINS.map((d, index) => (
                        <div
                            className="expertise-card"
                            data-hue={d.hue}
                            key={d.title}
                            ref={(el) => { if (el) cardRefs.current[index] = el; }}
                        >
                            <span className="expertise-glyph">{d.glyph}</span>
                            <span className="expertise-tag">
                                <span className="expertise-dot"></span>
                                {d.tag}
                            </span>
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
