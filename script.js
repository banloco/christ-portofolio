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

// Données des projets (À compléter avec tes vrais textes)
const projectDetails = {
    "Sentiment Analysis (Kafka)": {
        description: "Ce projet utilise Apache Kafka pour streamer des données Reddit en temps réel. Un modèle de NLP (Natural Language Processing) analyse le sentiment des commentaires pour détecter les tendances d'opinion sur des films. Idéal pour le marketing prédictif.",
        demo: "#",
        image: "img/project1.jpg"
    },
    "Fashion-MNIST Classifier": {
        description: "Développement d'un réseau de neurones convolutif (CNN) capable de classifier 10 catégories d'articles de mode. Précision atteinte : 94%. Utilisation de data augmentation pour améliorer la robustesse du modèle.",
        demo: "#",
        image: "img/project2.jpg"
    },
    "YOWL Network": {
        description: "Ce projet regroupe une communaute YOWL, ou ses membres se partagent des avis sur n'importe que element sur internet.",
        demo: "https://yowl-frontend-v1.vercel.app/",
        image: "images/yowl1.jpg"
    }
};

const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('close-modal');

// Ouvrir le modal
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').innerText;
        const details = projectDetails[title];

        if (details) {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-description').innerText = details.description;
            document.getElementById('modal-badge').innerText = card.querySelector('span').innerText;
            document.getElementById('modal-image').src = card.querySelector('.h-52 i') ? '' : card.querySelector('img').src;
            // document.getElementById('modal-link-github').href = details.github;
            document.getElementById('modal-link-demo').href = details.demo;

            // Copier les badges (tags)
            const tags = card.querySelector('.flex-wrap').innerHTML;
            document.getElementById('modal-tags').innerHTML = tags;

            // Afficher avec animation
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
            }, 10);
        }
    });
});

// Fermer le modal
const closeModal = () => {
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300);
};

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if(e.target === modal.firstElementChild) closeModal(); });

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

// Vérifier les préférences au chargement
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggleLightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
    // Basculer les icônes
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // Basculer le mode
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

const form = document.getElementById('contact-form');
const result = document.getElementById('result');

const contactForm = document.getElementById('contact-form');
const btnText = document.getElementById('btn-text');
const btnIcon = document.getElementById('btn-icon');
const btnLoader = document.getElementById('btn-loader');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // État de chargement
    btnText.textContent = "Envoi en cours...";
    btnIcon.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    contactForm.style.pointerEvents = "none"; // Empêcher le double clic

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let res = await response.json();
            formStatus.classList.remove('hidden');

            if (response.status == 200) {
                formStatus.classList.add('bg-green-500/20', 'text-green-200');
                formStatus.innerHTML = "✓ Message envoyé avec succès !";
                contactForm.reset();
            } else {
                formStatus.classList.add('bg-red-500/20', 'text-red-200');
                formStatus.innerHTML = "Erreur : " + res.message;
            }
        })
        .catch(error => {
            formStatus.classList.remove('hidden');
            formStatus.classList.add('bg-red-500/20', 'text-red-200');
            formStatus.innerHTML = "Un problème est survenu. Réessayez plus tard.";
        })
        .finally(() => {
            // Rétablir le bouton
            btnText.textContent = "Envoyer le message";
            btnIcon.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            contactForm.style.pointerEvents = "auto";

            // Cacher le message de statut après 5 secondes
            setTimeout(() => {
                formStatus.classList.add('hidden');
                formStatus.classList.remove('bg-green-500/20', 'text-green-200', 'bg-red-500/20', 'text-red-200');
            }, 5000);
        });
});