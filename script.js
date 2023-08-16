// Contenu du fichier script.js
// Changer de theme
function toggleTheme() {
    const themeLink = document.getElementById('theme');
    const themeIcon = document.getElementById('themeIcon');
    if (themeLink.getAttribute('href') === 'css/dark.styles.css') {
        themeLink.href = 'css/light.styles.css';
        themeIcon.className = 'fas fa-sun'; // Icône soleil
        localStorage.setItem('theme', 'light');
    } else {
        themeLink.href = 'css/dark.styles.css';
        themeIcon.className = 'fas fa-moon'; // Icône lune
        localStorage.setItem('theme', 'dark');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeLink = document.getElementById('theme');
    const themeIcon = document.getElementById('themeIcon');

    if (savedTheme) {
        if (savedTheme === 'light') {
            themeLink.href = 'css/light.styles.css';
            themeIcon.className = 'fas fa-sun'; // Icône soleil
        } else {
            themeLink.href = 'css/dark.styles.css';
            themeIcon.className = 'fas fa-moon'; // Icône lune
        }
    }
});


// Fonction pour animer le défilement en douceur vers la section cible
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    const headerHeight = document.querySelector('header').offsetHeight; // Hauteur de l'en-tête, ajuster si nécessaire
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Durée de l'animation en millisecondes
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // Fonction d'accélération de l'animation
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    requestAnimationFrame(animation);
}

// Gestionnaire d'événements pour les liens de la navigation
const navLinks = document.querySelectorAll('.nav-link a');
navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const target = link.getAttribute('href');
        smoothScrollTo(target);
    });
});


// Contenu du fichier script.js (suite)
function isMobileDevice() {
    return window.innerWidth <= 768; // Vous pouvez ajuster cette valeur selon vos besoins
}

let isHeaderSticky = false;

function handleHeaderSticky() {
    const header = document.querySelector("header");
    const aboutSection = document.querySelector("#about");

    if (!isMobileDevice()) {
        const headerHeight = header.offsetHeight;
        const aboutSectionPosition = aboutSection.getBoundingClientRect().top;

        if (aboutSectionPosition - headerHeight <= 0) {
            if (!isHeaderSticky) {
                header.style.animation = "fadeInDown 0.3s ease-in-out";
                header.classList.add("sticky");
                isHeaderSticky = true;
            }
        } else {
            if (isHeaderSticky) {
                header.style.animation = "fadeOutUp 0.3s ease-in-out";
                setTimeout(() => {
                    header.classList.remove("sticky");
                }, 300);
                isHeaderSticky = false;
            }
        }
    } else {
        header.classList.remove("sticky");
        isHeaderSticky = false;
    }
}


// Ajouter un écouteur d'événement pour gérer le changement d'état du header lors du défilement
window.addEventListener("scroll", handleHeaderSticky);
// Ajouter un écouteur d'événement pour gérer le changement d'état du header lors du redimensionnement de la fenêtre
window.addEventListener("resize", handleHeaderSticky);

// Assurez-vous d'appeler cette fonction au chargement initial de la page pour initialiser l'état du header
handleHeaderSticky();
