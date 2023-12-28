import React from 'react';
import './cardcontainer.css';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import photo1 from '../../img/landing_page.svg';
import photo2 from '../../img/wireframe.svg';
import photo3 from '../../img/veille.jpg';


const CardContainer = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const cardVariants = {
        visible: { opacity: 1, scale: 1, transition: { duration: 4 } },
        hidden: { opacity: 0, scale: 0.8 }
    };

    const cards = [
        {
            title: "Developpeur Front-End",
            description: "Spécialiste en HTML, CSS, React et JavaScript, je crée des interfaces utilisateur interactives, réactives et modernes.",
            image: photo1 
        },
        {
            title: "Maîtrise des CMS",
            description: "Expérimenté dans l'utilisation de systèmes de gestion de contenu tels que WordPress et Shopify, je développe des sites web personnalisés et optimisés pour le SEO.",
            image: photo2
        },
        {
            title: "Veille technologique",
            description: "Passionné par l'innovation, je me tiens constamment informé des dernières tendances et technologies en développement web, assurant ainsi des solutions avant-gardistes et performantes.",
            image: photo3
        }
    ];


    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const background = `radial-gradient(circle at ${x}px ${y}px, #E7E5E5, #F9F9F9)`;
        card.style.background = background;
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.background = '';
    };

    return (
        <div className='wrapper' id="cardss" ref={ref}>
            <h2 className="project-title">MES SERVICES</h2>
            <div className="card-container">
                <AnimatePresence>
                    {inView && cards.map((card, index) => (
                        <motion.div
                            className="card"
                            key={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img src={card.image} alt={`Card ${index + 1}`} />
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CardContainer;
