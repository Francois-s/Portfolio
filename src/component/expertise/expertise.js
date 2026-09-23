import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './expertise.css';
import { useLanguage } from '../../i18n/LanguageContext';
import useReveal from '../../hooks/useReveal';

gsap.registerPlugin(ScrollTrigger);

const DOMAIN_META = [
    { id: 'frontend', glyph: '</>' },
    { id: 'integration', glyph: '▦' },
    { id: 'cms', glyph: '◈' },
    { id: 'scripting', glyph: '{ }' },
    { id: 'performance', glyph: '⚡' },
    { id: 'techwatch', glyph: '◎' },
    { id: 'seo', glyph: '⌕' },
];

const SCROLL_PER_CARD = 350; // px of scroll dedicated to each card's entrance
const STACK_STEP_Y = 14; // px the stack shifts back per depth level
const STACK_STEP_SCALE = 0.045; // scale reduction per depth level
const MAX_DEPTH = 4; // cards deeper than this fade out of the visible stack

const Expertise = () => {
    const { t } = useLanguage();
    const headRef = useReveal();
    const wrapRef = useRef(null);
    const stackRef = useRef(null);
    const progressFillRef = useRef(null);
    const cardRefs = useRef([]);

    cardRefs.current = [];

    const domains = t.expertise.domains.map((d, index) => ({
        ...d,
        ...DOMAIN_META[index],
    }));

    useEffect(() => {
        const wrap = wrapRef.current;
        const stack = stackRef.current;
        if (!wrap || !stack) return;

        const cards = cardRefs.current;
        const count = cards.length;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isNarrow = window.innerWidth < 768;

        const paint = (progress) => {
            if (progressFillRef.current) {
                gsap.set(progressFillRef.current, { scaleY: progress });
            }

            const raw = progress * count;
            cards.forEach((card, i) => {
                let y, scale, opacity, z;
                if (raw <= i) {
                    y = 70;
                    scale = 0.92;
                    opacity = 0;
                    z = i;
                } else if (raw < i + 1) {
                    const local = raw - i;
                    const eased = 1 - Math.pow(1 - local, 3);
                    y = 70 * (1 - eased);
                    scale = 0.92 + 0.08 * eased;
                    opacity = eased;
                    z = i;
                } else {
                    const depth = Math.min(Math.floor(raw) - i, MAX_DEPTH);
                    y = -STACK_STEP_Y * depth;
                    scale = 1 - STACK_STEP_SCALE * depth;
                    opacity = depth >= MAX_DEPTH ? 0 : 1;
                    z = i;
                }
                gsap.set(card, { y, scale, opacity, zIndex: z });
            });
        };

        if (prefersReducedMotion || isNarrow) {
            stack.classList.add('is-static-stack');
            gsap.set(cards, { clearProps: 'all' });
            return;
        }

        paint(0);

        const ctx = gsap.context(() => {
            const st = ScrollTrigger.create({
                trigger: wrap,
                start: 'top top',
                end: () => `+=${count * SCROLL_PER_CARD}`,
                scrub: 0.5,
                pin: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => paint(self.progress),
                onRefresh: (self) => paint(self.progress),
            });

            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => ScrollTrigger.refresh());
            }

            return () => st.kill();
        }, wrap);

        return () => ctx.revert();
    }, []);

    return (
        <section className="expertise" id="Expertise">
            <div className="expertise-pin-wrap" ref={wrapRef}>
                <div className="expertise-head reveal-on-scroll" ref={headRef}>
                    <h2 className="section-title">{t.expertise.title}</h2>
                    <p className="section-subtitle">{t.expertise.subtitle}</p>
                </div>
                <div className="expertise-row">
                    <div className="expertise-stack" ref={stackRef}>
                        {domains.map((d, index) => (
                            <div
                                className="expertise-card"
                                key={d.id}
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
                    <div className="expertise-progress">
                        <div className="expertise-progress-track">
                            <div className="expertise-progress-fill" ref={progressFillRef}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
