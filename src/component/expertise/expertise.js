import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './expertise.css';
import { useLanguage } from '../../i18n/LanguageContext';
import useReveal from '../../hooks/useReveal';

gsap.registerPlugin(ScrollTrigger);

const DOMAIN_META = [
    { id: 'frontend', command: 'npm create vite@latest interface' },
    { id: 'integration', command: 'npm run layout:responsive -- --all-breakpoints' },
    { id: 'cms', command: 'wp scaffold site --commerce --custom-theme' },
    { id: 'scripting', command: 'python automate.py --source ./data' },
    { id: 'performance', command: 'npm run audit -- --performance --a11y' },
    { id: 'techwatch', command: 'git pull origin future --rebase' },
    { id: 'seo', command: 'npm run seo:inspect -- --semantic --metadata' },
];

const SCROLL_PER_CARD = 190; // px of scroll dedicated to each card's entrance
const STACK_STEP_Y = 14; // px the stack shifts back per depth level
const STACK_STEP_SCALE = 0.045; // scale reduction per depth level
const MAX_DEPTH = 4; // cards deeper than this fade out of the visible stack

const DIAGRAMS = {
    frontend: (
        <g>
            <rect x="35" y="28" width="150" height="122" rx="8" />
            <path d="M35 52h150M54 42h2m10 0h2m10 0h2M55 72h42m-42 15h105m-105 15h64" />
            <rect x="55" y="118" width="40" height="20" rx="3" />
            <rect x="108" y="118" width="58" height="20" rx="3" />
            <path d="M110 80l11 10-11 10m20-10h19" />
        </g>
    ),
    integration: (
        <g>
            <rect x="38" y="48" width="45" height="88" rx="7" />
            <rect x="94" y="38" width="63" height="98" rx="7" />
            <rect x="168" y="25" width="54" height="111" rx="7" />
            <path d="M47 62h26m-26 9h26m-26 9h17m-17 40h26M104 52h43m-43 12h43m-43 12h28m-28 45h43M178 41h34m-34 12h34m-34 12h23m-23 57h34" />
        </g>
    ),
    cms: (
        <g>
            <ellipse cx="126" cy="47" rx="61" ry="19" />
            <path d="M65 47v74c0 11 27 20 61 20s61-9 61-20V47M65 82c0 11 27 20 61 20s61-9 61-20" />
            <path d="M91 56h70m-70 10h48m-48 27h70m-70 10h52m-52 31h70" />
            <circle cx="49" cy="47" r="8" /><path d="M57 47h8m122 0h19m-9-8 9 8-9 8" />
        </g>
    ),
    scripting: (
        <g>
            <rect x="37" y="35" width="176" height="108" rx="8" />
            <path d="M37 58h176m-160-12h2m9 0h2m9 0h2M60 78l10 8-10 8m22 0h22m-44 17 10 8-10 8m22 0h48" />
            <circle cx="185" cy="120" r="8" />
            <path d="M185 109v-9m0 40v-9m-11-11h-9m40 0h-9" />
        </g>
    ),
    performance: (
        <g>
            <path d="M53 132a73 73 0 1 1 146 0" />
            <path d="M71 119a55 55 0 0 1 17-49m39-15a55 55 0 0 1 48 30m-9 45h23" />
            <circle cx="126" cy="126" r="7" />
            <path d="m126 126 39-42m-95 63h22m72 0h22" />
            <path d="M91 137h70" />
        </g>
    ),
    techwatch: (
        <g>
            <path d="M47 55h130m-130 0 10-10m-10 10 10 10m120 44H57m120 0-10-10m10 10-10 10" />
            <circle cx="78" cy="55" r="12" /><circle cx="145" cy="99" r="12" />
            <path d="M78 67v32m0 0h55m0 0 12-12m-67-20 12-12" />
            <rect x="101" y="32" width="63" height="32" rx="5" />
            <path d="M113 43h39m-39 9h26" />
        </g>
    ),
    seo: (
        <g>
            <path d="M58 30h93l28 28v88H58zM151 30v29h28" />
            <path d="M76 76h69m-69 15h53m-53 15h42" />
            <circle cx="165" cy="117" r="21" />
            <path d="m180 132 18 18m-42-33 8-8 8 6 11-13" />
        </g>
    ),
};

const TerminalVisual = ({ id }) => (
    <svg className="terminal-diagram" viewBox="0 0 250 180" role="img" aria-label={`${id} process diagram`}>
        <g>{DIAGRAMS[id]}</g>
    </svg>
);

const Expertise = () => {
    const { t, language } = useLanguage();
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
                    const isFinalCard = raw >= count && i === count - 1;
                    opacity = isFinalCard ? 1 : 0;
                    z = isFinalCard ? count : i;
                }
                gsap.set(card, { y, scale, opacity, zIndex: z });
                card.classList.toggle('is-current', raw > i && raw < i + 1);
            });
            stack.classList.toggle('has-current', raw > 0);
        };

        if (prefersReducedMotion) {
            stack.classList.add('is-static-stack');
            wrap.classList.add('is-static-expertise');
            gsap.set(cards, { clearProps: 'all' });
            cards.forEach((card) => card.classList.add('is-visible'));
            return;
        }

        if (isNarrow) {
            stack.classList.add('is-static-stack');
            wrap.classList.add('is-static-expertise');
            gsap.set(cards, { clearProps: 'all' });

            if (typeof IntersectionObserver === 'undefined') {
                cards.forEach((card) => card.classList.add('is-visible'));
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

            cards.forEach((card) => observer.observe(card));
            return () => observer.disconnect();
        }

        paint(0);

        const ctx = gsap.context(() => {
            const st = ScrollTrigger.create({
                trigger: wrap,
                start: 'top top',
                end: () => `+=${count * SCROLL_PER_CARD}`,
                scrub: 0.15,
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
                    <div className="expertise-terminal">
                        <div className="terminal-titlebar">
                            <div className="terminal-window-controls" aria-hidden="true"><i></i><i></i><i></i></div>
                            <span>portfolio — expertise.sh</span>
                            <span className="terminal-live"><i></i> LIVE</span>
                        </div>
                        <div className="expertise-stack" ref={stackRef}>
                            <div className="terminal-welcome" aria-hidden="true">
                                <span>FRANÇOIS SERGENT DE JOANNIS</span>
                                <strong>{language === 'fr' ? <>Du concept<br /><em>à la mise en ligne.</em></> : <>From concept<br /><em>to production.</em></>}</strong>
                                <span className="terminal-welcome-rule"></span>
                            </div>
                            {domains.map((d, index) => (
                                <div
                                    className={`expertise-card expertise-card-${d.id}`}
                                    key={d.id}
                                    ref={(el) => { if (el) cardRefs.current[index] = el; }}
                                >
                                    <div className="terminal-command-line">
                                        <span className="terminal-prompt">$</span>
                                        <code className="terminal-command">{d.command}</code>
                                        <span className="terminal-caret" aria-hidden="true">▌</span>
                                    </div>
                                    <div className="terminal-result">
                                        <div className={`terminal-visual terminal-visual-${d.id}`} aria-hidden="true">
                                            <TerminalVisual id={d.id} />
                                            <span className="terminal-visual-label">{String(index + 1).padStart(2, '0')}</span>
                                        </div>
                                        <div className="terminal-result-copy">
                                            <span className="expertise-tag"><span className="expertise-dot"></span>{d.tag}</span>
                                            <h3>{d.title}</h3>
                                            <p>{d.text}</p>
                                            <span className="terminal-success"><i>✓</i> {language === 'fr' ? 'Opération terminée' : 'Process completed'}</span>
                                        </div>
                                    </div>
                                    <div className="terminal-footer-line"><span>0{index + 1} / 07</span><span>{language === 'fr' ? 'prêt' : 'ready'} <i></i></span></div>
                                </div>
                            ))}
                        </div>
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
