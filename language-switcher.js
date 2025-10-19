// Language Switcher - Shared across all pages
const supportedLanguages = ['en', 'de', 'es', 'fr', 'it'];

// Detect language from URL
function getLanguageFromURL() {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part.length > 0);
    
    // Check if first part of path is a language code
    if (pathParts.length > 0 && supportedLanguages.includes(pathParts[0])) {
        return pathParts[0];
    }
    
    // Check localStorage as fallback
    const savedLang = localStorage.getItem('language');
    if (savedLang && supportedLanguages.includes(savedLang)) {
        return savedLang;
    }
    
    return 'en'; // Default to English
}

// Update navigation links to include current language prefix
function updateNavigationLinks(lang) {
    const prefix = lang === 'en' ? '' : `/${lang}`;
    
    // Update all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks[0]) navLinks[0].href = `${prefix}/`;
    if (navLinks[1]) navLinks[1].href = `${prefix}/pricing`;
    if (navLinks[2]) navLinks[2].href = `${prefix}/how-it-works`;
    
    // Update mobile menu links
    const mobileLinks = document.querySelectorAll('.mobile-menu-content a');
    if (mobileLinks[0]) mobileLinks[0].href = `${prefix}/`;
    if (mobileLinks[1]) mobileLinks[1].href = `${prefix}/pricing`;
    if (mobileLinks[2]) mobileLinks[2].href = `${prefix}/how-it-works`;
    
    // Update floating language dropdown links to preserve current page
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part.length > 0);
    
    // Remove language code from path if present
    const pagePathParts = pathParts.filter(part => !supportedLanguages.includes(part));
    const currentPage = pagePathParts.join('/');
    
    document.querySelectorAll('.floating-language-dropdown a').forEach(link => {
        const targetLang = link.dataset.lang;
        if (targetLang === 'en') {
            // English doesn't have language prefix
            link.href = currentPage ? `/${currentPage}` : '/';
        } else {
            // Other languages have /<lang>/ prefix
            link.href = currentPage ? `/${targetLang}/${currentPage}` : `/${targetLang}`;
        }
    });
}

// Update active language in dropdown
function updateActiveLanguage(lang) {
    document.querySelectorAll('.language-option').forEach(opt => {
        opt.classList.remove('active');
    });
    document.querySelectorAll(`[data-lang="${lang}"]`).forEach(opt => {
        opt.classList.add('active');
    });
    
    // Update floating button text
    const floatingCurrentLang = document.getElementById('floatingCurrentLang');
    if (floatingCurrentLang) {
        floatingCurrentLang.textContent = lang.toUpperCase();
    }
}

// Initialize floating language button
function initFloatingLanguageButton() {
    const floatingLanguageButton = document.getElementById('floatingLanguageButton');
    const floatingLanguageDropdown = document.getElementById('floatingLanguageDropdown');
    
    if (floatingLanguageButton && floatingLanguageDropdown) {
        floatingLanguageButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            floatingLanguageDropdown.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!floatingLanguageButton.contains(e.target) && !floatingLanguageDropdown.contains(e.target)) {
                floatingLanguageDropdown.classList.remove('open');
            }
        });

        // Don't close when clicking links (let them navigate)
        floatingLanguageDropdown.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                e.stopPropagation();
            }
        });
    }
}

// Initialize language system
function initLanguageSystem() {
    const currentLanguage = getLanguageFromURL();
    
    console.log('🌐 Language detected:', currentLanguage);
    console.log('📍 Current path:', window.location.pathname);
    
    updateActiveLanguage(currentLanguage);
    updateNavigationLinks(currentLanguage);
    initFloatingLanguageButton();
    
    // Update content if updateContent function exists (from translations.js)
    if (typeof updateContent === 'function') {
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                console.log('📄 DOM loaded, updating content');
                updateContent(currentLanguage);
            });
        } else {
            console.log('📄 Updating content immediately');
            updateContent(currentLanguage);
        }
    }
    
    // Save language preference
    localStorage.setItem('language', currentLanguage);
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSystem);
} else {
    initLanguageSystem();
}
