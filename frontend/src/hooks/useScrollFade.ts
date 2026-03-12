import { useEffect } from 'react';

export const useScrollFade = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Optionally unobserve if we only want it to animate once
            // observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Timeout allows DOM to be fully mounted and painted before querying
    const timeoutId = setTimeout(() => {
        const elements = document.querySelectorAll('.scroll-fade');
        elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);
};
