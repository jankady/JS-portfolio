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

// Theme toggle - slider verze
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    html.classList.remove('light', 'dark');
    html.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

    // Synchronizuj oba slidery (desktop + mobile)
    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');

    if (desktopToggle) desktopToggle.checked = (newTheme === 'dark');
    if (mobileToggle) mobileToggle.checked = (newTheme === 'dark');
}

// Event listeners pro oba slidery
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(savedTheme);

    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');

    // Nastav správnou pozici slideru
    if (desktopToggle) {
        desktopToggle.checked = (savedTheme === 'dark');
        desktopToggle.addEventListener('change', toggleTheme);
    }

    if (mobileToggle) {
        mobileToggle.checked = (savedTheme === 'dark');
        mobileToggle.addEventListener('change', toggleTheme);
    }
});