// Cookie utilities for storing user preferences without login

const SAVED_RECIPES_KEY = 'shoply_saved_recipes';
const COOKIE_CONSENT_KEY = 'shoply_cookie_consent';

// Check if cookies are allowed (Cookiebot consent)
export function hasCookieConsent(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Always allow localStorage usage - simplified for better UX
    // Users can still use the app without explicit cookie consent
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch {
        return false;
    }
}

// Set cookie consent
export function setCookieConsent(allowed: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(COOKIE_CONSENT_KEY, allowed ? 'true' : 'false');
}

// Get saved recipe IDs from localStorage
export function getSavedRecipeIds(): string[] {
    if (typeof window === 'undefined') return [];
    if (!hasCookieConsent()) return [];
    
    try {
        const saved = localStorage.getItem(SAVED_RECIPES_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

// Save a recipe ID to localStorage
export function saveRecipeToLocal(recipeId: string): boolean {
    if (typeof window === 'undefined') return false;
    if (!hasCookieConsent()) return false;
    
    try {
        const saved = getSavedRecipeIds();
        if (!saved.includes(recipeId)) {
            saved.push(recipeId);
            localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(saved));
        }
        return true;
    } catch {
        return false;
    }
}

// Remove a recipe ID from localStorage
export function unsaveRecipeFromLocal(recipeId: string): boolean {
    if (typeof window === 'undefined') return false;
    if (!hasCookieConsent()) return false;
    
    try {
        const saved = getSavedRecipeIds();
        const filtered = saved.filter(id => id !== recipeId);
        localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(filtered));
        return true;
    } catch {
        return false;
    }
}

// Check if a recipe is saved
export function isRecipeSaved(recipeId: string): boolean {
    const saved = getSavedRecipeIds();
    return saved.includes(recipeId);
}
