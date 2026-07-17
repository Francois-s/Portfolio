import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './skillscomponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faReact, faJsSquare, faWordpress, faShopify, faPython } from '@fortawesome/free-brands-svg-icons';
import { SiCplusplus } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const skills = [
    { name: 'HTML5', level: 95, color: '#e34f26', icon: <FontAwesomeIcon icon={faHtml5} /> },
    { name: 'CSS', level: 95, color: '#1572b6', icon: <FontAwesomeIcon icon={faCss3Alt} /> },
    { name: 'JavaScript', level: 90, color: '#d4b800', icon: <FontAwesomeIcon icon={faJsSquare} /> },
    { name: 'React', level: 90, color: '#61dafb', icon: <FontAwesomeIcon icon={faReact} /> },
    { name: 'Shopify', level: 85, color: '#95bf47', icon: <FontAwesomeIcon icon={faShopify} /> },
    { name: 'WordPress', level: 80, color: '#21759b', icon: <FontAwesomeIcon icon={faWordpress} /> },
    { name: 'Python', level: 75, color: '#3776ab', icon: <FontAwesomeIcon icon={faPython} /> },
    { name: 'C++', level: 65, color: '#00599c', icon: <SiCplusplus /> },
];

const SkillsComponent = () => {
    const sectionRef = useRef(null);
    const ringRefs = useRef([]);
    const valueRefs = useRef([]);

    ringRefs.current = [];
    valueRefs.current = [];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            skills.forEach((skill, index) => {
                const ring = ringRefs.current[index];
                const valueEl = valueRefs.current[index];
                if (!ring || !valueEl) return;

                const offset = CIRCUMFERENCE * (1 - skill.level / 100);

                if (prefersReducedMotion) {
                    gsap.set(ring.closest('.skill-ring'), { opacity: 1, scale: 1 });
                    gsap.set(ring, { strokeDashoffset: offset });
                    valueEl.textContent = `${skill.level}%`;
                    return;
                }

                const counter = { value: 0 };

                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        once: true,
                    },
                    delay: index * 0.09,
                })
                    .fromTo(
                        ring.closest('.skill-ring'),
                        { opacity: 0, scale: 0.8 },
                        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' },
                        0
                    )
                    .fromTo(
                        ring,
                        { strokeDashoffset: CIRCUMFERENCE },
                        { strokeDashoffset: offset, duration: 1.2, ease: 'power2.out' },
                        0
                    )
                    .to(
                        counter,
                        {
                            value: skill.level,
                            duration: 1.2,
                            ease: 'power2.out',
                            onUpdate: () => {
                                valueEl.textContent = `${Math.round(counter.value)}%`;
                            },
                        },
                        0
                    );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="skills-container" id="Competences" ref={sectionRef}>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="skillRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7c5cfc" />
                        <stop offset="100%" stopColor="#4c6ef5" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="skills-head">
                <h2 className="section-title">Les outils que je maîtrise, en un coup d'œil</h2>
                <p className="section-subtitle">Huit technologies que j'utilise au quotidien.</p>
            </div>

            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <div className="skill-item" key={skill.name}>
                        <div className="skill-ring">
                            <svg viewBox="0 0 120 120">
                                <circle className="ring-track" cx="60" cy="60" r={RADIUS} />
                                <circle
                                    className="ring-fill"
                                    cx="60"
                                    cy="60"
                                    r={RADIUS}
                                    ref={(el) => { if (el) ringRefs.current[index] = el; }}
                                    style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE }}
                                />
                            </svg>
                            <div className="ring-center">
                                <span className="skill-icon" style={{ color: skill.color }}>
                                    {skill.icon}
                                </span>
                            </div>
                        </div>
                        <div className="skill-label">
                            <span className="skill-name">{skill.name}</span>
                            <span
                                className="skill-percent"
                                ref={(el) => { if (el) valueRefs.current[index] = el; }}
                            >
                                0%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsComponent;
