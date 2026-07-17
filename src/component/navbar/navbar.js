import React, { useState, useEffect, useCallback } from 'react';
import './navbar.css';

const NAV_LINKS = [
    { href: '#Projets', label: 'Projets' },
    { href: '#Expertise', label: 'Expertise' },
    { href: '#Competences', label: 'Compétences' },
    { href: '#About', label: 'À propos' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <a href="#contact" className="btn btn-primary nav-cta" onClick={closeMenu}>
                        Me contacter
                    </a>
                </nav>

                <button
                    type="button"
                    className={`hamburger ${isMenuOpen ? 'is-open' : ''}`}
                    aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
