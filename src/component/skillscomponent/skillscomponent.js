import React, { useState, useEffect, useRef } from 'react';
import './skillscomponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faReact, faJsSquare, faWordpress, faShopify, faPython } from '@fortawesome/free-brands-svg-icons';

const skills = [
    { icon: faHtml5, name: 'HTML5', level: '95%' },
    { icon: faCss3Alt, name: 'CSS', level: '95%' },
    { icon: faJsSquare, name: 'Javascript', level: '90%' },
    { icon: faReact, name: 'REACT', level: '90%' },
    { icon: faShopify, name: 'Shopify', level: '85%' },
    { icon: faWordpress, name: 'Wordpress', level: '80%' },
    { icon: faPython, name: 'Python', level: '75%' },
    // Ajoutez ici les compétences C et C++ si nécessaire
];

const SkillsComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);

    useEffect(() => {
        const currentRef = skillsRef.current; // Définir une variable locale pour la référence actuelle
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.5 });

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []); // Le tableau de dépendances est vide, donc cet effet s'exécute une seule fois

    return (
        <div className="skills-container" id="Competences" ref={skillsRef}>
            {/* ... le reste de votre code ... */}
            <div className="skills-list">
                {skills.map((skill, index) => (
                    <div className="skill" key={skill.name}>
                        <FontAwesomeIcon icon={skill.icon} size="3x" className="skill-icon" />
                        <div className="skill-progress">
                            <div className={`skill-level ${isVisible ? 'animate' : ''}`} 
                                 style={{ width: isVisible ? skill.level : '0%', backgroundColor: skill.color, animationDelay: `${index * 0.2}s` }}>
                            </div>
                            <div className="skill-remaining" style={{ width: isVisible ? `calc(100% - ${skill.level})` : '100%' }}></div>
                        </div>
                        <span className="skill-percent">{skill.level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsComponent;
