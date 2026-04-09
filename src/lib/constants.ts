// Color palette
export const colors = {
  // Primary colors
  blue: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  electricBlue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  // Dark mode backgrounds
  dark: {
    900: '#0a0a0a',
    800: '#121212',
    700: '#1a1a1a',
    600: '#242424',
    500: '#2e2e2e',
  },
  // Accent colors for chaos section
  chaos: {
    red: '#7f1d1d',
    orange: '#9a3412',
    yellow: '#a16207',
  },
} as const;

// Animation timings
export const timings = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 1.0,
  heroEntrance: 2.5,
} as const;

// Easing functions
export const easings = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  bounce: [0.68, -0.55, 0.265, 1.55],
  expo: [0.16, 1, 0.3, 1],
} as const;

// Breakpoints (matching Tailwind)
export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 640,
  lg: 768,
  xl: 1024,
  '2xl': 1280,
  '3xl': 1536,
} as const;

// Section IDs for navigation
export const sectionIds = {
  hero: 'hero',
  problem: 'problem',
  features: 'features',
  experience: 'experience',
  comparison: 'comparison',
  cta: 'cta',
} as const;

// Feature data
export const features = [
  {
    id: 'ai-categorization',
    title: 'AI Smart Categorization',
    description: 'Our AI instantly sorts your items into categories, learns your preferences, and suggests optimal shopping routes through the store.',
    icon: 'brain',
    size: 'large',
    color: 'blue',
  },
  {
    id: 'collaboration',
    title: 'Real-Time Collaboration',
    description: 'Share lists with family instantly. See updates in real-time as others add or check off items. Never duplicate purchases again.',
    icon: 'users',
    size: 'large',
    color: 'blue',
  },
  {
    id: 'recipes',
    title: 'Recipe Integration',
    description: 'Browse thousands of recipes, tap to add all ingredients to your list automatically. Adjust for dietary restrictions and allergies.',
    icon: 'chef-hat',
    size: 'medium',
    color: 'orange',
  },
  {
    id: 'voice',
    title: 'Voice Control',
    description: 'Use Siri shortcuts to add items, create lists, and check what\'s on your list without touching your phone.',
    icon: 'mic',
    size: 'medium',
    color: 'purple',
  },
  {
    id: 'deals',
    title: 'Store Deals',
    description: 'View current store flyers and sales. Get recommendations based on what\'s on discount this week.',
    icon: 'tag',
    size: 'small',
    color: 'pink',
  },
  {
    id: 'allergies',
    title: 'Allergy Management',
    description: 'Set your dietary restrictions and allergies. Get instant substitution suggestions for any incompatible ingredients.',
    icon: 'shield',
    size: 'small',
    color: 'red',
  },
  {
    id: 'achievements',
    title: 'Achievements',
    description: 'Earn points and unlock badges as you use the app. Track your cooking streaks and recipe creation milestones.',
    icon: 'trophy',
    size: 'small',
    color: 'yellow',
  },
] as const;

// Problem cards data
export const problemCards = [
  {
    id: 'forgotten',
    title: 'Forgot milk... again?',
    subtitle: 'Paper lists get lost, torn, and forgotten',
    icon: 'file-question',
  },
  {
    id: 'disorganization',
    title: 'Chaos in Every Aisle',
    subtitle: 'Wasting time searching for randomly placed items',
    icon: 'shuffle',
  },
  {
    id: 'coordination',
    title: 'Shopping Solo, Together',
    subtitle: 'Family members buying duplicates or missing items',
    icon: 'users-x',
  },
  {
    id: 'recipes',
    title: 'Lost in Translation',
    subtitle: 'Recipes need 15 ingredients, you forget 5',
    icon: 'book-x',
  },
  {
    id: 'waste',
    title: 'Buy It Twice, Waste It Once',
    subtitle: 'Duplicates, expired food, and unnecessary purchases',
    icon: 'trash-2',
  },
] as const;

// Comparison data
export const comparisons = [
  {
    feature: 'Real-Time Sync',
    oldWay: { text: 'None', available: false },
    newWay: { text: 'Instant updates across all devices', available: true },
  },
  {
    feature: 'Auto-Categorization',
    oldWay: { text: 'Manual sorting', available: false },
    newWay: { text: 'AI-powered organization', available: true },
  },
  {
    feature: 'Recipe → Cart',
    oldWay: { text: 'Copy one by one', available: false },
    newWay: { text: 'One-tap add all ingredients', available: true },
  },
  {
    feature: 'Family Sharing',
    oldWay: { text: 'Solo shopping', available: false },
    newWay: { text: 'Share with 6-digit code', available: true },
  },
  {
    feature: 'Voice Assistant',
    oldWay: { text: 'Not available', available: false },
    newWay: { text: 'Hey Siri, add milk', available: true },
  },
  {
    feature: 'Store Deals',
    oldWay: { text: 'Search flyers manually', available: false },
    newWay: { text: 'Live flyer integration', available: true },
  },
  {
    feature: 'Allergy Protection',
    oldWay: { text: 'Check every label', available: false },
    newWay: { text: 'Auto-substitution', available: true },
  },
  {
    feature: 'Offline Mode',
    oldWay: { text: 'Only if you have paper', available: false },
    newWay: { text: 'Full offline access', available: true },
  },
] as const;
