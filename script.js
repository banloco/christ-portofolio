// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {

    // --- Initialisation AOS ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic'
    });

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('opacity-0');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500); // Petit délai pour voir l'animation
    });

    // --- Menu Mobile ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const icon = btn.querySelector('i');
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Fermer le menu au clic sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.querySelector('i').classList.remove('fa-times');
            btn.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md', 'bg-white/95', 'py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95', 'py-2');
            navbar.classList.add('py-4');
        }
    });

    // --- Filtrage des Projets ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Gestion style boutons
            filterBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
                b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
            });
            btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
            btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600');

            // Logique filtre
            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.classList.remove('hidden');
                    project.classList.add('fade-in');
                    setTimeout(() => project.classList.remove('fade-in'), 500);
                } else {
                    project.classList.add('hidden');
                }
            });
        });
    });

    // --- Compteur Animé (Stats) ---
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 50; // Vitesse

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 30);
            } else {
                counter.innerText = target + "+"; // Ajoute le + à la fin
            }
        });
    };

    // Déclencher le compteur quand on scroll sur la section about
    const aboutSection = document.getElementById('about');
    window.addEventListener('scroll', () => {
        if (!hasAnimated && window.scrollY + window.innerHeight > aboutSection.offsetTop + 100) {
            animateCounters();
            hasAnimated = true;
        }
    });

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-10');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-10');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Formulaire de Contact (Simulation) ---
    const form = document.getElementById('contact-form');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const btnLoader = document.getElementById('btn-loader');
    const statusDiv = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // UI Loading State
        btnText.textContent = 'Envoi en cours...';
        btnIcon.classList.add('hidden');
        btnLoader.classList.remove('hidden');

        // Simulation d'envoi (API Call fictif)
        setTimeout(() => {
            // Reset UI
            btnText.textContent = 'Envoyer le message';
            btnIcon.classList.remove('hidden');
            btnLoader.classList.add('hidden');

            // Success Message
            statusDiv.classList.remove('hidden', 'text-red-400');
            statusDiv.classList.add('text-green-400');
            statusDiv.textContent = 'Message envoyé avec succès ! Je vous répondrai très vite.';

            form.reset();

            // Cacher le message après 5s
            setTimeout(() => {
                statusDiv.classList.add('hidden');
            }, 5000);
        }, 2000);
    });
});