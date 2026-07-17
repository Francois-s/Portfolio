import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        try {
            const stored = window.localStorage.getItem('portfolio-lang');
            return stored === 'en' || stored === 'fr' ? stored : 'fr';
        } catch {
            return 'fr';
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem('portfolio-lang', language);
        } catch {
            // ignore storage errors (e.g. private browsing)
        }
    }, [language]);

    const toggleLanguage = () => setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'));

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return ctx;
};
