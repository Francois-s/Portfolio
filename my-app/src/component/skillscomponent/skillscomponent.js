import React from 'react';
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

const calculateRemaining = (level) => {
    const numLevel = parseInt(level);
    return `${100 - numLevel}%`;
};


const SkillsComponent = () => {
    return (
        <div className="skills-container" id="Competences">
            <div className="skills-title">
                <h2 className='project-title'>MES COMPÉTENCES</h2>
            </div>
            <div className="skills-list">
                {skills.map((skill) => (
                    <div className="skill" key={skill.name}>
                        <FontAwesomeIcon icon={skill.icon} size="3x" className="skill-icon" />
                        <div className="skill-progress">
                            <div className="skill-level" style={{ width: skill.level, backgroundColor: skill.color }}></div>
                            <div className="skill-remaining" style={{ width: calculateRemaining(skill.level) }}></div>
                        </div>
                        <span className="skill-percent">{skill.level}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsComponent;