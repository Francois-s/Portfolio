import React from 'react';
import './contactform.css';

const ContactForm = () => {
    return (
        <div className="contact-form-container">
            <form className="contact-form">
                <h2>Contactez-moi</h2>

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

                <button type="submit" className="submit-button">Envoyer</button>
            </form>
        </div>
    );
};

export default ContactForm;
