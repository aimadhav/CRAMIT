/**
 * CRAMIT - Smart Flashcard App
 * Main Application JavaScript
 */

// ============================================
// APP STATE
// ============================================
const AppState = {
    currentTab: 'explore',
    decks: {
        chemistry: {
            name: 'Chemistry',
            total: 85,
            due: 0,
            status: 'caught-up',
            color: 'purple'
        },
        mathematics: {
            name: 'Mathematics',
            total: 120,
            due: 22,
            status: 'has-due',
            color: 'coral'
        },
        biology: {
            name: 'Biology',
            total: 65,
            due: 0,
            status: 'caught-up',
            color: 'teal'
        },
        physics: {
            name: 'Physics',
            total: 100,
            due: 15,
            status: 'critical',
            color: 'purple'
        }
    },
    streak: 12,
    recommended: {
        subject: 'physics',
        topic: 'Electrostatics & Current',
        reviews: 15,
        estimatedTime: '~8m'
    }
};

// ============================================
// NAVIGATION
// ============================================
function switchTab(tabName) {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.classList.remove('active');
    });

    event.currentTarget.classList.add('active');
    AppState.currentTab = tabName;

    // Add haptic feedback animation
    addRippleEffect(event.currentTarget);

    console.log(`Switched to ${tabName} tab`);
}

// ============================================
// DECK INTERACTIONS
// ============================================
function openDeck(deckId) {
    const deck = AppState.decks[deckId];

    if (!deck) {
        console.error(`Deck ${deckId} not found`);
        return;
    }

    // Add press animation
    const card = event.currentTarget;
    card.style.transform = 'scale(0.97)';

    setTimeout(() => {
        card.style.transform = '';
        console.log(`Opening ${deck.name} deck`);
        // Here you would navigate to the deck view
        // For now, we'll just log the action
    }, 150);
}

// ============================================
// QUICK ACTIONS
// ============================================
function addCards() {
    console.log('Opening Add Cards modal');
    // Navigate to add cards screen or open modal
    alert('Add Cards feature coming soon!');
}

function startDailyMix() {
    console.log('Starting Daily Mix session');
    // Start an interleaved session with all subjects
    const btn = event.currentTarget;
    btn.style.transform = 'scale(0.95)';

    setTimeout(() => {
        btn.style.transform = '';
        alert('Daily Mix: Review cards from all your subjects!');
    }, 100);
}

// ============================================
// SESSION MANAGEMENT
// ============================================
function startSession(subject) {
    const deck = AppState.decks[subject];

    if (!deck) {
        console.error(`Subject ${subject} not found`);
        return;
    }

    // Button press animation
    const btn = event.currentTarget;
    btn.style.transform = 'scale(0.95)';

    setTimeout(() => {
        btn.style.transform = '';

        // Show loading state
        btn.innerHTML = `
            <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" opacity="0.25"/>
                <path d="M12 2a10 10 0 0110 10" stroke-linecap="round"/>
            </svg>
            Loading...
        `;

        // Simulate loading delay
        setTimeout(() => {
            console.log(`Starting ${deck.name} session with ${deck.due} cards due`);
            // Reset button
            btn.innerHTML = `
                <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                Start ${deck.name}
            `;
            // Here you would transition to the study session view
        }, 1000);
    }, 100);
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));

    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('focused');
    });

    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('focused');
    });
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();

    if (query.length === 0) {
        // Reset view - show all decks
        document.querySelectorAll('.deck-card').forEach(card => {
            card.style.display = '';
            card.style.opacity = '1';
        });
        return;
    }

    // Filter decks based on search
    const deckCards = document.querySelectorAll('.deck-card');

    deckCards.forEach(card => {
        const deckName = card.querySelector('.deck-name').textContent.toLowerCase();

        if (deckName.includes(query)) {
            card.style.display = '';
            card.style.opacity = '1';
        } else {
            card.style.opacity = '0.3';
        }
    });

    console.log(`Searching for: ${query}`);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function addRippleEffect(element) {
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 100);
}

// ============================================
// HERO CARD INTERACTIONS
// ============================================
const heroCard = document.getElementById('heroCard');

if (heroCard) {
    heroCard.addEventListener('mouseenter', () => {
        const atom = heroCard.querySelector('.atom-decoration');
        if (atom) {
            atom.style.transform = 'translateY(-50%) scale(1.1)';
            atom.style.transition = 'transform 0.3s ease';
        }
    });

    heroCard.addEventListener('mouseleave', () => {
        const atom = heroCard.querySelector('.atom-decoration');
        if (atom) {
            atom.style.transform = 'translateY(-50%) scale(1)';
        }
    });
}

// ============================================
// STREAK ANIMATION
// ============================================
function animateStreak() {
    const streakBadge = document.querySelector('.streak-badge');
    if (streakBadge) {
        streakBadge.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            streakBadge.style.animation = '';
        }, 500);
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cramit App Initialized');

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize animations
    initializeAnimations();
});

function initializeAnimations() {
    // Add staggered entrance animations to deck cards
    const deckCards = document.querySelectorAll('.deck-card');
    deckCards.forEach((card, index) => {
        card.style.animationDelay = `${0.1 + index * 0.1}s`;
    });

    // Observe scroll for lazy animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.deck-card, .hero-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (event) => {
    // Press 'S' to focus search
    if (event.key === 's' && !event.ctrlKey && !event.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement.tagName !== 'INPUT') {
            event.preventDefault();
            searchInput?.focus();
        }
    }

    // Press 'Escape' to clear search
    if (event.key === 'Escape') {
        if (searchInput) {
            searchInput.value = '';
            searchInput.blur();
            handleSearch({ target: { value: '' } });
        }
    }
});

// ============================================
// TOUCH INTERACTIONS
// ============================================
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;

    // Pull to refresh detection (future feature)
    if (diff < -50 && window.scrollY === 0) {
        // Could trigger refresh animation here
    }
}, { passive: true });
