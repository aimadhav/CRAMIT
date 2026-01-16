/**
 * CRAMIT - Explore Logic (Concept C: Glass Stack + Tactical Modal)
 */

// ============================================
// DATA STORE
// ============================================

const DUMMY_SUBTOPICS = [
    "Key Concepts",
    "Derivations",
    "Formulas",
    "Problem Solving",
    "Past Year Questions",
    "Critical Models"
];

const APP_DATA = {
    subjects: [
        {
            id: 'physics',
            name: 'Physics',
            color: 'purple',
            chapters: [
                "Units and Measurements", "Motion in a Straight Line", "Motion in a Plane",
                "Laws of Motion", "Work, Energy and Power", "System of Particles",
                "Gravitation", "Mechanical Properties of Solids", "Fluids",
                "Thermal Properties", "Thermodynamics", "Kinetic Theory",
                "Oscillations", "Waves", "Ray Optics"
            ]
        },
        {
            id: 'chemistry',
            name: 'Chemistry',
            color: 'teal',
            chapters: [
                "Basic Concepts", "Structure of Atom", "Classification",
                "Bonding", "States of Matter", "Thermodynamics",
                "Equilibrium", "Redox", "Hydrogen", "s-Block",
                "p-Block", "Organic Basic Principles", "Hydrocarbons",
                "Environmental", "Solid State"
            ]
        },
        {
            id: 'mathematics',
            name: 'Mathematics',
            color: 'coral',
            chapters: [
                "Sets", "Relations & Functions", "Trigonometry",
                "Induction", "Complex Numbers", "Inequalities",
                "Permutations", "Binomial Theorem", "Sequences",
                "Straight Lines", "Conic Sections", "3D Geometry",
                "Limits", "Reasoning", "Statistics"
            ]
        }
    ]
};

let currentTabId = 'physics';
let currentChapter = '';

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    renderTabs();
    switchTab('physics');
});

// ============================================
// RENDER TABS & LIST
// ============================================

function renderTabs() {
    const tabBar = document.getElementById('subjectTabBar');
    if (!tabBar) return;

    let html = '';
    APP_DATA.subjects.forEach(subject => {
        html += `
            <div class="tab-pill" 
                 id="tab-${subject.id}" 
                 data-color="${subject.color}"
                 onclick="switchTab('${subject.id}')">
                ${subject.name}
            </div>
        `;
    });
    tabBar.innerHTML = html;
}

function switchTab(subjectId) {
    if (!APP_DATA.subjects.find(s => s.id === subjectId)) return;
    currentTabId = subjectId;

    // Style Update
    document.querySelectorAll('.tab-pill').forEach(pill => pill.classList.remove('active'));

    const activePill = document.getElementById(`tab-${subjectId}`);
    if (activePill) {
        activePill.classList.add('active');
        activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    renderGlassStack(subjectId);
}

function renderGlassStack(subjectId) {
    const container = document.getElementById('chapterList');
    container.innerHTML = '';

    const subject = APP_DATA.subjects.find(s => s.id === subjectId);

    let html = '';
    subject.chapters.forEach((chapterName, index) => {
        // Concept C: Glass Stack Cards
        html += `
            <div class="glass-stack-card" style="animation-delay: ${index * 0.04}s" onclick="openModal('${chapterName}')">
                <div class="card-inner-row">
                    <div class="card-content">
                        <span class="card-index">${(index + 1).toString().padStart(2, '0')}</span>
                        <span class="card-title">${chapterName}</span>
                    </div>
                    <svg class="card-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Trigger Animation
    requestAnimationFrame(() => {
        container.querySelectorAll('.glass-stack-card').forEach(c => c.classList.add('animating'));
    });
}

// ============================================
// TACTICAL MODAL LOGIC
// ============================================

function openModal(chapterName) {
    currentChapter = chapterName;

    // 1. Set Title
    document.getElementById('modalTitle').textContent = chapterName;

    // 2. Render Subtopics (Default all selected)
    const grid = document.getElementById('modalSubtopics');
    let pillsHtml = '';
    DUMMY_SUBTOPICS.forEach(topic => {
        pillsHtml += `<div class="subtopic-pill selected" onclick="togglePill(this)">${topic}</div>`;
    });
    grid.innerHTML = pillsHtml;

    // 3. Show
    document.getElementById('modalOverlay').classList.add('visible');
    document.getElementById('tacticalModal').classList.add('visible');

    // Haptic if available
    if (navigator.vibrate) navigator.vibrate(10);
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('visible');
    document.getElementById('tacticalModal').classList.remove('visible');
}

function togglePill(element) {
    element.classList.toggle('selected');
    // Haptic
    if (navigator.vibrate) navigator.vibrate(5);
}

// ============================================
// BUTTON ACTIONS
// ============================================

function startCramSession() {
    // Collect active subtopics
    const selected = Array.from(document.querySelectorAll('.subtopic-pill.selected'))
        .map(el => el.textContent);

    if (selected.length === 0) {
        alert("Please select at least one subtopic to continue.");
        return;
    }

    console.log(`🚀 STARTING CRAM SESSION`);
    console.log(`Chapter: ${currentChapter}`);
    console.log(`Subtopics: ${selected.join(', ')}`);

    const btn = document.querySelector('.btn-cram-mode');
    const originalContent = btn.innerHTML;

    btn.innerHTML = '<span class="btn-cram-label">Initiating...</span>';

    setTimeout(() => {
        alert(`⚡ Cram Mode Started for: ${currentChapter}\nFocused on: ${selected.length} Subtopics`);
        closeModal();
        btn.innerHTML = originalContent;
    }, 800);
}
