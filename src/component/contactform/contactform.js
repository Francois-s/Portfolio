import React from 'react';
import './contactform.css';
import { useLanguage } from '../../i18n/LanguageContext';

const ContactForm = () => {
    const { t } = useLanguage();

    return (
        <div className="contact-form-container" id="contact">
            <form className="contact-form">
                <div className="contact-head">
                    <h2 className="section-title">{t.contact.title}</h2>
                    <p className="section-subtitle">{t.contact.subtitle}</p>
                </div>

                <div className="input-group animated-field">
                    <input type="text" id="name" required />
                    <label htmlFor="name">{t.contact.name}</label>
                    <span className="underline"></span>
                </div>

                <div className="input-group animated-field">
                    <input type="email" id="email" required />
                    <label htmlFor="email">{t.contact.email}</label>
                    <span className="underline"></span>
                </div>

                <div className="input-group animated-field">
                    <textarea id="message" required></textarea>
                    <label htmlFor="message">{t.contact.message}</label>
                    <span className="underline"></span>
                </div>

                <button type="submit" className="btn btn-primary btn-block">{t.contact.send}</button>
            </form>
        </div>
    );
};

export default ContactForm;
