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
function updateProgressBar() {
    const scrollProgress = document.getElementById('scroll-progress-fill');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = ((scrollTop / docHeight) * 100);

    scrollProgress.style.height = scrollPercent + '%';
}

// Skills bar interakce
function handleSkillInteraction(skillType) {
    const skillData = {
        cyber: [
            { name: 'Network Security', percentage: 90 },
            { name: 'Penetration Testing', percentage: 85 },
            { name: 'Incident Response', percentage: 75 },
            { name: 'Cryptography', percentage: 80 }
        ],
        '3d': [
            { name: 'Blender', percentage: 70 },
            { name: 'Maya', percentage: 60 },
            { name: 'Unity 3D', percentage: 75 },
            { name: 'Texturing', percentage: 65 }
        ],
        lowend: [
            { name: 'Assembly', percentage: 70 },
            { name: 'C/C++', percentage: 85 },
            { name: 'Embedded Systems', percentage: 75 },
            { name: 'Hardware Programming', percentage: 60 }
        ],
        web: [
            { name: 'HTML/CSS', percentage: 95 },
            { name: 'JavaScript', percentage: 90 },
            { name: 'React', percentage: 85 },
            { name: 'Node.js', percentage: 80 }
        ],
        ai: [
            { name: 'Machine Learning', percentage: 80 },
            { name: 'Deep Learning', percentage: 75 },
            { name: 'Natural Language Processing', percentage: 70 },
            { name: 'Computer Vision', percentage: 65 }
        ]
    };

    updateSkillBars(skillData[skillType]);
}

function updateSkillBars(skills) {
    const skillsContainer = document.getElementById('skills-container');

    // Vyčistit kontejner
    skillsContainer.innerHTML = '';

    // Vytvořit nové skill bary podle dat
    skills.forEach((skill, index) => {
        const skillBarDiv = document.createElement('div');
        skillBarDiv.id = `skill-bar-${index}`;

        const widthClass = getWidthClass(skill.percentage);

        skillBarDiv.innerHTML = `
            <div class="flex justify-between text-sm text-secondary">
                <span class="font-bold skill-name">${skill.name}</span>
                <span class="text skill-percentage">${skill.percentage}%</span>
            </div>
            <div class="w-full h-2 bg-paragraph/10 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-primary skill-progress ${widthClass}"></div>
            </div>
        `;

        skillsContainer.appendChild(skillBarDiv);
    });
}

function getWidthClass(percentage) {
    if (percentage >= 90) return 'w-9/10';
    if (percentage >= 80) return 'w-8/10';
    if (percentage >= 70) return 'w-7/10';
    if (percentage >= 60) return 'w-6/10';
    if (percentage >= 50) return 'w-5/10';
    return 'w-4/10';
}

// Centrální DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Inicializace tématu
    initializeTheme();

    // Inicializace progress baru
    updateProgressBar();

    // Inicializace skills
    handleSkillInteraction('cyber');

    // Nastavení výchozího aktivního skill pillu
    const defaultPill = document.getElementById('skill-cyber');
    if (defaultPill) {
        defaultPill.classList.add('bg-primary/75');
        defaultPill.classList.remove('bg-secondary/15');
    }

    // Event listeners pro skill pills
    const skill_list = document.querySelectorAll('[id^="skill-"]');
    console.log('Nalezené skill pills:', skill_list.length); // Debug
    
    skill_list.forEach(list => {
        list.addEventListener('click', function() {
            console.log('Kliknuto na:', this.id); // Debug
            
            // Odstranit aktivní třídu ze všech pills
            skill_list.forEach(p => {
                p.classList.remove('bg-primary/75');
                p.classList.add('bg-secondary/15');
            });

            // Přidat aktivní třídu na kliknutý pill
            this.classList.remove('bg-secondary/15');
            this.classList.add('bg-primary/75');

            const skillType = this.id.replace('skill-', '');
            console.log('Skill type:', skillType); // Debug
            handleSkillInteraction(skillType);
        });
    });
});

// Event listeners pro ostatní funkce
window.addEventListener('scroll', updateProgressBar);
window.addEventListener('load', updateProgressBar);
