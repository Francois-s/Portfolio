import React, { useState, useEffect, useCallback } from 'react';
import './navbar.css';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();

    const NAV_LINKS = [
        { href: '#Projets', label: t.nav.projects },
        { href: '#Expertise', label: t.nav.expertise },
        { href: '#Competences', label: t.nav.skills },
        { href: '#About', label: t.nav.about },
    ];

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    return (
        <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
            <div className="site-header-inner">
                <nav className={`nav ${isMenuOpen ? 'is-open' : ''}`}>
                    <ul className="nav-links">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href} className="nav-elem">
                                <a href={link.href} onClick={closeMenu}>{link.label}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-actions">
                        <button
                            type="button"
                            className="lang-toggle"
                            onClick={toggleLanguage}
                            aria-label={t.nav.switchLang}
                        >
                            <span className={`lang-flag ${language === 'fr' ? 'is-active' : ''}`}>
                                <span className="fi fi-fr"></span>
                            </span>
                            <span className={`lang-flag ${language === 'en' ? 'is-active' : ''}`}>
                                <span className="fi fi-gb"></span>
                            </span>
                            <span className="lang-thumb" data-side={language}></span>
                        </button>
                        <a href="#contact" className="btn btn-primary nav-cta" onClick={closeMenu}>
                            {t.nav.contact}
                        </a>
                    </div>
                </nav>

                <button
                    type="button"
                    className={`hamburger ${isMenuOpen ? 'is-open' : ''}`}
                    aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
