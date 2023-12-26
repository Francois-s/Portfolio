import React from 'react';
import './cardcontainer.css';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import photo1 from '../../img/landing_page.svg';
import photo2 from '../../img/wireframe.svg';

const CardContainer = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const cardVariants = {
        visible: { opacity: 1, scale: 1, transition: { duration: 4 } }, 
        hidden: { opacity: 0, scale: 0.8 }
    };

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
                    {inView && [photo1, photo2, photo1].map((photo, index) => (
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
                            <img src={photo} alt={`Card ${index + 1}`} />
                            <h3>Titre {index + 1}</h3>
                            <p>Description {index + 1}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CardContainer;
