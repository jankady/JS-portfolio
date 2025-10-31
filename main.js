// Mobilní menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        const svg = mobileMenuButton.querySelector('svg path');
        if (mobileMenu.classList.contains('hidden')) {
            svg.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            svg.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
    });
}

// Theme toggle - slider verze s ikonou
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    html.classList.remove('light', 'dark');
    html.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

    // Synchronizuj oba slidery
    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');

    // Změň ikony uvnitř slideru
    const desktopIcon = document.querySelector('.theme-icon');
    const mobileIcon = document.querySelector('.theme-icon-mobile');

    if (desktopToggle) desktopToggle.checked = (newTheme === 'dark');
    if (mobileToggle) mobileToggle.checked = (newTheme === 'dark');

    if (desktopIcon) desktopIcon.textContent = (newTheme === 'dark') ? '🌙' : '☀️';
    if (mobileIcon) mobileIcon.textContent = (newTheme === 'dark') ? '🌙' : '☀️';
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(savedTheme);

    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    const desktopIcon = document.querySelector('.theme-icon');
    const mobileIcon = document.querySelector('.theme-icon-mobile');

    // Nastav správnou pozici slideru a ikonu
    if (desktopToggle) {
        desktopToggle.checked = (savedTheme === 'dark');
        desktopToggle.addEventListener('change', toggleTheme);
    }

    if (mobileToggle) {
        mobileToggle.checked = (savedTheme === 'dark');
        mobileToggle.addEventListener('change', toggleTheme);
    }

    if (desktopIcon) desktopIcon.textContent = (savedTheme === 'dark') ? '🌙' : '☀️';
    if (mobileIcon) mobileIcon.textContent = (savedTheme === 'dark') ? '🌙' : '☀️';
}
// Event listeners pro oba slidery
window.addEventListener('DOMContentLoaded', initializeTheme);


function updateProgressBar() {
    const scrollProgress = document.getElementById('scroll-progress-fill');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = ((scrollTop / docHeight) * 100);

    scrollProgress.style.height = scrollPercent + '%';
}

// Aktualizace při scrollování
window.addEventListener('scroll', updateProgressBar);

// Aktualizace při načtení stránky
window.addEventListener('load', updateProgressBar);