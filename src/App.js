import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import { LanguageProvider } from './i18n/LanguageContext';

export function App() {
    return (
        <LanguageProvider>
            <Router basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </LanguageProvider>
    );
}

export default App;
