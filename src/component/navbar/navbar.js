import React from 'react';
import './navbar.css';
import Logo from '../../img/logo.jpg';

export default function Navbar() {
    return (
        <div className='background_bleu'>
            <div className='wrapper'>
                <div className='navbar'>
                    <h1>
                        <img src={Logo} className='logo' alt="Logo Kasa" />
                    </h1>
                    <nav className='nav'>
                        <ul className='nav_ul'>
                            <li className='nav_elem'>
                                <a href="#Projets">Projets</a>
                            </li>
                            <li className='nav_elem'>
                                <a href="#Competences">Mes Compétences</a>
                            </li>
                            <li className='nav_elem'>
                                <a href="#cardss">Cards</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
