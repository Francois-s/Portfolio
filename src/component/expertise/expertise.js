import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './expertise.css';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const DOMAIN_META = [
    { glyph: '</>', hue: 'violet' },
    { glyph: '▦', hue: 'sky' },
    { glyph: '◈', hue: 'teal' },
    { glyph: '{ }', hue: 'amber' },
    { glyph: '⚡', hue: 'pink' },
    { glyph: '◎', hue: 'green' },
    { glyph: '⌕', hue: 'rose' },
];

const Expertise = () => {
    const { t } = useLanguage();
    const wrapRef = useRef(null);
    const trackRef = useRef(null);
    const cardRefs = useRef([]);

    cardRefs.current = [];

    const domains = t.expertise.domains.map((d, index) => ({
        ...d,
        ...DOMAIN_META[index],
    }));

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
                    <h2 className="section-title">{t.expertise.title}</h2>
                    <p className="section-subtitle">{t.expertise.subtitle}</p>
                </div>
                <div className="expertise-track" ref={trackRef}>
                    {domains.map((d, index) => (
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
