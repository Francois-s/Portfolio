import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './about.css';
import profilePhoto from '../../img/profile-photo.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const photoRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const photo = photoRef.current;
        const text = textRef.current;
        if (!section || !photo || !text) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            gsap.set([photo, text], { opacity: 1, x: 0, y: 0, scale: 1 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    once: true,
                },
            })
                .fromTo(
                    photo,
                    { opacity: 0, scale: 0.85, y: 30 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' },
                    0
                )
                .fromTo(
                    text,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
                    0.2
                );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about" id="About" ref={sectionRef}>
            <div className="about-head">
                <h2 className="section-title">À propos de moi</h2>
                <p className="section-subtitle">Qui se cache derrière l'écran</p>
            </div>
            <div className="about-content">
                <div className="about-photo-wrap" ref={photoRef}>
                    <img src={profilePhoto} alt="François S." className="about-photo" />
                </div>
                <div className="about-text" ref={textRef}>
                    <h3 className="about-name">François Sergent de Joannis</h3>
                    <p className="about-bio">
                        Développeur Front-End passionné, je conçois des interfaces modernes et
                        interactives avec React et JavaScript. J'aime aussi m'appuyer sur des CMS
                        comme WordPress ou Shopify pour donner vie à des projets sur-mesure.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
