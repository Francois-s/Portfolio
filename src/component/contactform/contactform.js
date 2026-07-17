import React from 'react';
import './contactform.css';

const ContactForm = () => {
    return (
        <div className="contact-form-container" id="contact">
            <form className="contact-form">
                <div className="contact-head">
                    <h2 className="section-title">Contactez-moi</h2>
                    <p className="section-subtitle">Une question, un projet&nbsp;? Écris-moi.</p>
                </div>

                <div className="input-group animated-field">
                    <input type="text" id="name" required />
                    <label htmlFor="name">Nom</label>
                    <span className="underline"></span>
                </div>

                <div className="input-group animated-field">
                    <input type="email" id="email" required />
                    <label htmlFor="email">Email</label>
                    <span className="underline"></span>
                </div>

                <div className="input-group animated-field">
                    <textarea id="message" required></textarea>
                    <label htmlFor="message">Message</label>
                    <span className="underline"></span>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
            </form>
        </div>
    );
};

export default ContactForm;
