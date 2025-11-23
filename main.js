// Elementy pro theme toggle
const desktopToggle = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('theme-toggle-mobile');
// Mobilní menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
// Vyberu vsechny skills
const skill_list = document.querySelectorAll('[id^="skill-"]'); // ^= starts with

// Theme toggle - slider verze s ikonou
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark'; // ternary operator

    html.classList.remove('light', 'dark');
    html.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);

    // Synchronizuj oba slidery
    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');

    // Změň ikony uvnitř slideru
    const desktopIcon = document.querySelector('.theme-icon');
    const mobileIcon = document.querySelector('.theme-icon-mobile');

    const headerIcon1 = document.getElementById('header-icon-1');
    const headerIcon2 = document.getElementById('header-icon-2');
    const headerIcon3 = document.getElementById('header-icon-3');

    if (desktopToggle || mobileToggle) {
        desktopToggle.checked = (newTheme === 'dark');
        mobileToggle.checked = (newTheme === 'dark');
        desktopIcon.textContent = (newTheme === 'dark') ? '🌙' : '☀️';
        mobileIcon.textContent = (newTheme === 'dark') ? '🌙' : '☀️';

        if (newTheme === 'dark') {
            headerIcon1.src = '../img/age_dark.png';
            headerIcon2.src = '../img/experience_dark.png';
            headerIcon3.src = '../img/location_dark.png';
        } else {
            headerIcon1.src = '../img/age_light.png';
            headerIcon2.src = '../img/experience_light.png';
            headerIcon3.src = '../img/location_light.png';
        }
    }

}

function initializeTheme() {
    // Localstorage je vlastnost window a ukládá se mi tam thema
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(savedTheme);


    const desktopIcon = document.querySelector('.theme-icon');
    const mobileIcon = document.querySelector('.theme-icon-mobile');

    const headerIcon1 = document.getElementById('header-icon-1');
    const headerIcon2 = document.getElementById('header-icon-2');
    const headerIcon3 = document.getElementById('header-icon-3');
    // Nastaim správnou pozici slideru a ikonu
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

    if (savedTheme === 'dark') {
        headerIcon1.src = 'img/age_dark.png';
        headerIcon2.src = 'img/experience_dark.png';
        headerIcon3.src = 'img/location_dark.png';
    } else {
        headerIcon1.src = 'img/age_light.png';
        headerIcon2.src = 'img/experience_light.png';
        headerIcon3.src = 'img/location_light.png';
    }
}

// Aktualizace progress baru v pravo při scrollování
function updateProgressBar() {
    const scrollProgress = document.getElementById('scroll-progress-fill');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = ((scrollTop / docHeight) * 100);

    scrollProgress.style.height = scrollPercent + '%';
}

// Načte skill podle vybrané kategorie
function handleSkillInteraction(skillType) {
    const skillData = {
        'cyber': [
            {name: 'HackTheBox', percentage: 20},
            {name: 'Network security (ACL, STP etc.)', percentage: 70},
            {name: 'TryHackMe', percentage: 40}
        ],
        '3d': [
            {name: 'Blender', percentage: 45},
            {name: 'Unreal Engine', percentage: 60},
            {name: 'Texturing', percentage: 32},
            {name: 'Modelling', percentage: 48},
            {name: 'Animation', percentage: 65}
        ],
        'programming': [
            {name: 'rust ', percentage: 10},
            {name: 'C', percentage: 40},
            {name: 'Java', percentage: 75},
            {name: 'Python', percentage: 87},
            {name: 'OOP', percentage: 70},
            {name: 'Functional/procedural', percentage: 50}
        ],
        'web': [
            {name: 'HTML/CSS', percentage: 85},
            {name: 'JavaScript/typescript', percentage: 70},
            {name: 'React', percentage: 35},
            {name: 'Django', percentage: 40},
        ],
        'ai': [
            {name: 'Machine Learning', percentage: 40},
            {name: 'MCP', percentage: 15},
            {name: 'Python', percentage: 70}
        ]
    };

    // vrati jenom strukturu pozadovaneho skillu
    updateSkillBars(skillData[skillType]);
}

// Vykreslí skill bary pro jednotlivou kategorii
function updateSkillBars(skills) {
    const skillsContainer = document.getElementById('skills-container');

    // Vzčistí kontejner
    skillsContainer.innerHTML = '';

    // Vytvořit nové skills bary podle dat
    skills.forEach((skill, index) => {
        const skillBarDiv = document.createElement('div');
        skillBarDiv.id = `skill-bar-${index}`;

        // Získá šířku pro tailwind
        const widthClass = getWidthClass(skill.percentage);

        // jeden řádek skillu
        skillBarDiv.innerHTML = `
            <div class="flex justify-between text-sm text-secondary">
                <span class="font-bold skill-name">${skill.name}</span>
                <span class="text skill-percentage">${skill.percentage}%</span>
            </div>
            <div class="w-full h-2 bg-paragraph/10 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-fourth to-primary skill-progress ${widthClass}"></div>
            </div>
        `;

        skillsContainer.appendChild(skillBarDiv);
    });
}

// Vrátí Tailwind šířku podle procent
function getWidthClass(percentage) {
    if (percentage >= 90) return 'w-9/10';
    if (percentage >= 80) return 'w-8/10';
    if (percentage >= 70) return 'w-7/10';
    if (percentage >= 60) return 'w-6/10';
    if (percentage >= 50) return 'w-5/10';
    if (percentage >= 40) return 'w-4/10';
    if (percentage >= 30) return 'w-3/10';
    if (percentage >= 20) return 'w-2/10';
    if (percentage >= 10) return 'w-1/10';

    return 'w-4/10';
}

// První nacteni stranky
document.addEventListener('DOMContentLoaded', () => {
    // Inicializace tématu
    initializeTheme();
    // Inicializace progress baru
    updateProgressBar();
    // Inicializace skillu
    handleSkillInteraction('cyber');
});

// Poslouchání kliknutí na jednotlivé skilly
skill_list.forEach(list => {
    //kontroluji kliknuti pro kazdy jednotlivy skill
    list.addEventListener('click', event => {
        // Odstranit aktivní třídu ze všech
        skill_list.forEach(element => {
            element.classList.remove('bg-primary/75');
            element.classList.add('bg-secondary/15');
        });

        // Přidat aktivní třídu na kliknutý skill
        event.currentTarget.classList.remove('bg-secondary/15');
        event.currentTarget.classList.add('bg-primary/75');

        const skillType = event.currentTarget.id.replace('skill-', '');
        handleSkillInteraction(skillType);
    });
});

// Event listenery pro theme toggly
desktopToggle.addEventListener('change', toggleTheme);
mobileToggle.addEventListener('change', toggleTheme);

// Toggle mobilního menu a změna mezi krizkem a hamburgerem
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    const svg = mobileMenuButton.querySelector('svg path');
    if (mobileMenu.classList.contains('hidden')) {
        svg.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    } else {
        svg.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    }
});

// Ukaž aktuální rok
document.getElementById("year").innerHTML = new Date().getFullYear();

// Event listeners pro scrolování a načitání
window.addEventListener('scroll', updateProgressBar);
window.addEventListener('load', updateProgressBar);
