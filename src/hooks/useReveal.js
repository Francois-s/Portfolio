import { useEffect, useRef } from 'react';

/** Reveal an element once it enters the viewport, without hiding it by default. */
export default function useReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || typeof IntersectionObserver === 'undefined') {
            if (element) element.classList.add('is-revealed');
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                element.classList.add('is-revealed');
                observer.unobserve(element);
            }
        }, {
            threshold: options.threshold || 0.12,
            rootMargin: options.rootMargin || '0px 0px -40px 0px',
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [options.rootMargin, options.threshold]);

    return ref;
}
