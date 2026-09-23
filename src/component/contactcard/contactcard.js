import React from 'react';
import './contactcard.css';
import profilePhoto from '../../img/profile-photo.jpg';
import { useLanguage } from '../../i18n/LanguageContext';
import useReveal from '../../hooks/useReveal';
import ScrollDivider from '../scrolldivider/scrolldivider';

const EMAIL = 'fsergent.m@gmail.com';

const ContactCard = () => {
    const { t, language } = useLanguage();
    const headRef = useReveal();
    const cardRef = useReveal({ threshold: 0.2 });

    return (
        <>
        <ScrollDivider
            className="scroll-divider--contact"
            phrase={language === 'fr' ? 'À PROPOS · ÉCHANGER · FAIRE ÉQUIPE' : 'ABOUT · CONNECT · COLLABORATE'}
        />
        <section className="contact-card-section" id="contact">
            <div className="contact-head reveal-on-scroll" ref={headRef}>
                <h2 className="section-title">{t.contact.title}</h2>
                <p className="section-subtitle">{t.contact.subtitle}</p>
            </div>

            <div className="contact-card-wrap reveal-on-scroll" ref={cardRef}>
                <div className="contact-card">
                    <div className="contact-card-face contact-card-front">
                        <span className="wave"></span>
                        <span className="wave"></span>
                        <span className="wave"></span>
                        <div className="contact-card-content">
                            <span className="contact-card-avatar">
                                <img src={profilePhoto} alt={t.about.name} />
                            </span>
                            <div className="contact-card-identity">
                                <h3 className="contact-card-name">{t.about.name}</h3>
                                <p className="contact-card-role">{t.contact.cardRole}</p>
                                <span className="contact-card-location">{t.contact.cardLocation}</span>
                            </div>
                        </div>
                    </div>
                    <div className="contact-card-face contact-card-back">
                        <div className="contact-card-content">
                            <span className="contact-card-label">{t.contact.cardEmailLabel}</span>
                            <a href={`mailto:${EMAIL}`} className="contact-card-email">
                                {EMAIL}
                            </a>
                            <a href={`mailto:${EMAIL}`} className="btn btn-outline contact-card-btn">
                                {t.contact.cardCta}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default ContactCard;
