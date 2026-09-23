import React, { useEffect, useRef } from 'react';
import './scrolldivider.css';

const ScrollDivider = ({ className = '', phrase, marker = '✳' }) => {
    const dividerRef = useRef(null);

    useEffect(() => {
        const divider = dividerRef.current;
        if (!divider) return undefined;

        let frame = 0;
        const updatePosition = () => {
            frame = 0;
            const bounds = divider.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
            const direction = divider.classList.contains('scroll-divider--contact') ? -1 : 1;
            divider.style.setProperty('--divider-shift', `${(0.5 - progress) * 18 * direction}vw`);
        };
        const scheduleUpdate = () => {
            if (!frame) frame = window.requestAnimationFrame(updatePosition);
        };

        updatePosition();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        return () => {
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div className={`scroll-divider ${className}`} ref={dividerRef} aria-hidden="true">
            <div className="scroll-divider-track">
                {[0, 1, 2, 3, 4, 5].map((copy) => (
                    <span className="scroll-divider-copy" key={copy}>
                        {phrase} <i>{marker}</i>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ScrollDivider;
