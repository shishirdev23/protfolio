// Robust Preloader Fix
const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => preloader.style.display = 'none', 500);
    }
};

// Fire on load, or fallback after 2 seconds
window.addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 2000);

document.addEventListener('DOMContentLoaded', () => {
    // AOS Init
    AOS.init({ duration: 800, once: true });

    // Year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // PRO HERO LOGIC
    const hero = document.getElementById('hero');
    let ticking = false;
    const updateHero = (x) => {
        const percent = (x / window.innerWidth) * 100;
        document.documentElement.style.setProperty('--split-pos', `${percent}%`);
        document.documentElement.style.setProperty('--split-pos-val', percent);
        ticking = false;
    };
    const handleMove = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        if (x && !ticking) {
            window.requestAnimationFrame(() => updateHero(x));
            ticking = true;
        }
    };
    if (hero) {
        hero.addEventListener('mousemove', handleMove);
        hero.addEventListener('touchmove', handleMove);
        hero.addEventListener('mouseleave', () => updateHero(window.innerWidth / 2));
    }

    // Scroll Parallax
    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-y', window.scrollY);
    });

    // Back to Top
    const btt = document.getElementById('backToTop');
    if (btt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) btt.style.display = 'block';
            else btt.style.display = 'none';
        });
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
