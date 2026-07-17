import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

export function App() {
    return (
        <Router basename="/Portfolio">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
