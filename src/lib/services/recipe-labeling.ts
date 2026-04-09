/**
 * Recipe Auto-Labeling Service
 * 
 * Ports the Flutter app's recipe labeling algorithm to TypeScript.
 * Automatically assigns labels based on recipe content analysis.
 * 
 * Labels are from these categories:
 * - Time: quick, 30min, under-hour
 * - Diet: vegetarian, vegan, gluten-free, keto, low-carb
 * - Meal Type: breakfast, lunch, dinner, snack
 * - Difficulty: easy, medium, advanced
 * - Cuisine: italian, asian, mexican, mediterranean
 * - Other: healthy, comfort-food, seafood, soup, one-pot, meal-prep
 */

import type { RecipeLabel } from '@/lib/types/recipe';

interface IngredientInput {
    name: string;
    amount?: number | string;
    unit?: string;
}

interface RecipeInput {
    name: string;
    description: string;
    ingredients: IngredientInput[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    defaultServings?: number;
    instructions?: string[];
}

/**
 * Main function to auto-label a recipe
 * Returns a list of relevant labels based on content analysis
 */
export function labelRecipe(recipe: RecipeInput): RecipeLabel[] {
    const labels = new Set<RecipeLabel>();

    // Prepare text for analysis
    const recipeText = prepareRecipeText(recipe);
    const ingredientNames = recipe.ingredients.map(i => i.name.toLowerCase());
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    const ingredientCount = recipe.ingredients.length;
    const stepCount = recipe.instructions?.length || 0;

    // 1. Time-based Labels (always add one)
    labels.add(detectTimeLabel(totalTime));

    // 2. Difficulty Detection (always add one)
    labels.add(detectDifficulty(totalTime, ingredientCount, stepCount));

    // 3. Diet Type Detection
    for (const diet of detectDietTypes(recipeText, ingredientNames)) {
        labels.add(diet);
    }

    // 4. Meal Type Detection
    for (const meal of detectMealType(recipeText, recipe)) {
        labels.add(meal);
    }

    // 5. Cuisine Detection
    for (const cuisine of detectCuisine(recipeText)) {
        labels.add(cuisine);
    }

    // 6. Special Characteristics
    for (const special of detectSpecialCharacteristics(recipeText, recipe)) {
        labels.add(special);
    }

    return Array.from(labels);
}

/**
 * Combine all recipe text for analysis
 */
function prepareRecipeText(recipe: RecipeInput): string {
    const parts: string[] = [
        recipe.name.toLowerCase(),
        recipe.description.toLowerCase(),
        ...recipe.ingredients.map(i => i.name.toLowerCase()),
    ];

    if (recipe.instructions) {
        parts.push(...recipe.instructions.map(i => i.toLowerCase()));
    }

    return parts.join(' ');
}

/**
 * Detect time-based label (exactly one)
 */
function detectTimeLabel(totalMinutes: number): RecipeLabel {
    if (totalMinutes <= 15) {
        return 'quick';
    } else if (totalMinutes <= 30) {
        return '30min';
    } else {
        return 'under-hour';
    }
}

/**
 * Detect difficulty level (exactly one)
 */
function detectDifficulty(totalTime: number, ingredientCount: number, stepCount: number): RecipeLabel {
    // Easy: Few ingredients, few steps, quick
    if (ingredientCount <= 7 && stepCount <= 5 && totalTime <= 30) {
        return 'easy';
    }
    // Advanced: Many ingredients or many steps or long time
    else if (ingredientCount > 12 || stepCount > 10 || totalTime > 90) {
        return 'advanced';
    }
    // Medium: Everything in between
    else {
        return 'medium';
    }
}

// Keyword lists for diet detection (multilingual)
const ANIMAL_PRODUCTS = [
    // English
    'meat', 'chicken', 'beef', 'pork', 'fish', 'salmon', 'tuna', 'shrimp', 'seafood',
    'egg', 'eggs', 'milk', 'cheese', 'butter', 'cream', 'yogurt', 'honey',
    // German
    'fleisch', 'hähnchen', 'rind', 'schwein', 'fisch', 'lachs', 'thunfisch', 'garnelen',
    'ei', 'eier', 'milch', 'käse', 'sahne', 'joghurt', 'honig',
    // Spanish
    'carne', 'pollo', 'res', 'cerdo', 'pescado', 'salmón', 'atún', 'camarones',
    'huevo', 'huevos', 'leche', 'queso', 'mantequilla', 'crema', 'miel',
    // French
    'viande', 'poulet', 'boeuf', 'porc', 'poisson', 'saumon', 'thon', 'crevettes',
    'oeuf', 'oeufs', 'lait', 'fromage', 'beurre', 'crème', 'yaourt',
];

const MEAT_PRODUCTS = [
    // English
    'meat', 'chicken', 'beef', 'pork', 'lamb', 'fish', 'seafood', 'bacon', 'ham', 'sausage',
    // German
    'fleisch', 'hähnchen', 'rind', 'schwein', 'lamm', 'fisch', 'speck', 'schinken', 'wurst',
    // Spanish
    'carne', 'pollo', 'res', 'cerdo', 'cordero', 'pescado', 'tocino', 'jamón', 'salchicha',
];

const GLUTEN_SOURCES = [
    // English
    'flour', 'wheat', 'bread', 'pasta', 'noodles', 'barley', 'rye', 'couscous',
    // German
    'mehl', 'weizen', 'brot', 'nudeln', 'gerste', 'roggen',
    // Spanish
    'harina', 'trigo', 'pan', 'pasta', 'fideos', 'cebada', 'centeno',
];

const DAIRY_PRODUCTS = [
    'milk', 'cheese', 'butter', 'cream', 'yogurt',
    'milch', 'käse', 'sahne', 'joghurt',
    'leche', 'queso', 'mantequilla', 'crema',
];

const HIGH_CARB_FOODS = [
    'pasta', 'rice', 'bread', 'potato', 'potatoes', 'noodles', 'flour',
    'nudeln', 'reis', 'brot', 'kartoffel', 'kartoffeln', 'mehl',
    'sugar', 'zucker', 'honey', 'honig',
];

/**
 * Detect diet types (multiple possible)
 */
function detectDietTypes(text: string, ingredientNames: string[]): RecipeLabel[] {
    const labels: RecipeLabel[] = [];

    const hasAnimalProduct = ANIMAL_PRODUCTS.some(p =>
        text.includes(p) || ingredientNames.some(i => i.includes(p))
    );

    const hasMeat = MEAT_PRODUCTS.some(p =>
        text.includes(p) || ingredientNames.some(i => i.includes(p))
    );

    const hasGluten = GLUTEN_SOURCES.some(p =>
        text.includes(p) || ingredientNames.some(i => i.includes(p))
    );

    const hasDairy = DAIRY_PRODUCTS.some(p =>
        text.includes(p) || ingredientNames.some(i => i.includes(p))
    );

    const hasHighCarb = HIGH_CARB_FOODS.some(p =>
        text.includes(p) || ingredientNames.some(i => i.includes(p))
    );

    // Vegan: No animal products at all
    if (!hasAnimalProduct) {
        labels.push('vegan');
        labels.push('vegetarian');
    } else if (!hasMeat) {
        // Vegetarian: No meat but may have dairy/eggs
        labels.push('vegetarian');
    }

    // Gluten-free
    if (!hasGluten) {
        labels.push('gluten-free');
    }

    // Keto: Low carb, high fat/protein (no pasta, rice, bread, potato, sugar)
    if (!hasHighCarb) {
        labels.push('keto');
        labels.push('low-carb');
    }

    return labels;
}

// Keywords for meal type detection
const BREAKFAST_KEYWORDS = [
    'breakfast', 'brunch', 'pancake', 'omelette', 'müsli', 'granola', 'porridge',
    'waffel', 'waffle', 'croissant', 'french toast', 'frühstück', 'pfannkuchen',
    'smoothie bowl', 'eggs benedict', 'scrambled', 'rührei',
];

const DESSERT_SNACK_KEYWORDS = [
    'dessert', 'cake', 'kuchen', 'torte', 'brownie', 'cookie', 'keks',
    'muffin', 'cupcake', 'cheesecake', 'ice cream', 'eis', 'pudding',
    'nachtisch', 'süß', 'sweet', 'chocolate', 'schokolade', 'snack',
];

const LUNCH_KEYWORDS = [
    'salad', 'salat', 'sandwich', 'wrap', 'bowl', 'light', 'lunch', 'mittagessen',
];

const DINNER_KEYWORDS = [
    'roast', 'braten', 'stew', 'eintopf', 'casserole', 'auflauf', 'gratin',
    'dinner', 'abendessen', 'hauptgericht', 'main course',
];

/**
 * Detect meal type (at least one)
 */
function detectMealType(text: string, recipe: RecipeInput): RecipeLabel[] {
    const labels: RecipeLabel[] = [];

    // Check for breakfast
    if (BREAKFAST_KEYWORDS.some(k => text.includes(k))) {
        labels.push('breakfast');
    }

    // Check for dessert/snack
    if (DESSERT_SNACK_KEYWORDS.some(k => text.includes(k))) {
        labels.push('snack');
    }

    // Check for lunch indicators (salads, light meals)
    if (LUNCH_KEYWORDS.some(k => text.includes(k))) {
        labels.push('lunch');
    }

    // Check for dinner indicators
    if (DINNER_KEYWORDS.some(k => text.includes(k))) {
        labels.push('dinner');
    }

    // If no specific meal type detected, classify by time and complexity
    if (labels.length === 0) {
        const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
        const ingredientCount = recipe.ingredients.length;

        if (totalTime <= 20 && ingredientCount <= 8) {
            labels.push('snack');
        } else if (totalTime >= 45 || ingredientCount >= 12) {
            labels.push('dinner');
        } else {
            labels.push('lunch');
        }
    }

    return labels;
}

// Cuisine detection keywords
const CUISINE_KEYWORDS: Record<RecipeLabel, string[]> = {
    'italian': [
        'pasta', 'pizza', 'risotto', 'lasagne', 'italian', 'italienisch',
        'spaghetti', 'carbonara', 'bolognese', 'pesto', 'mozzarella', 'parmesan',
        'tiramisu', 'gnocchi', 'ravioli', 'bruschetta', 'parmigiana',
    ],
    'asian': [
        'asian', 'asiatisch', 'chinese', 'chinesisch', 'japanese', 'japanisch',
        'thai', 'vietnamese', 'korean', 'sushi', 'wok', 'curry', 'teriyaki',
        'ramen', 'pho', 'pad thai', 'gyoza', 'miso', 'kimchi', 'soy sauce',
        'tofu', 'sojasauce', 'ginger', 'sesame',
    ],
    'mexican': [
        'mexican', 'mexikanisch', 'taco', 'burrito', 'enchilada', 'tex-mex',
        'quesadilla', 'fajita', 'nachos', 'guacamole', 'salsa', 'tortilla',
        'jalapeño', 'chimichanga', 'churro',
    ],
    'mediterranean': [
        'mediterranean', 'mediterran', 'greek', 'griechisch', 'hummus', 'falafel',
        'tzatziki', 'feta', 'pita', 'couscous', 'tabouleh', 'shakshuka', 'olive',
    ],
};

/**
 * Detect cuisine type
 */
function detectCuisine(text: string): RecipeLabel[] {
    const labels: RecipeLabel[] = [];

    for (const [cuisine, keywords] of Object.entries(CUISINE_KEYWORDS)) {
        const matchCount = keywords.filter(k => text.includes(k)).length;
        // Need at least 2 keyword matches for a cuisine
        if (matchCount >= 2) {
            labels.push(cuisine as RecipeLabel);
        }
    }

    return labels;
}

// Special characteristics keywords
const HEALTHY_KEYWORDS = [
    'healthy', 'gesund', 'light', 'salad', 'salat', 'superfood',
    'quinoa', 'bowl', 'smoothie', 'low-cal', 'kalorienarm', 'fit',
];

const COMFORT_FOOD_KEYWORDS = [
    'comfort', 'herzhaft', 'soul food', 'stew', 'eintopf', 'auflauf',
    'gratin', 'mac and cheese', 'käsespätzle', 'schnitzel', 'braten',
    'casserole', 'mashed', 'creamy', 'cremig',
];

const SEAFOOD_KEYWORDS = [
    'seafood', 'meeresfrüchte', 'fish', 'fisch', 'shrimp', 'garnelen',
    'salmon', 'lachs', 'tuna', 'thunfisch', 'lobster', 'hummer',
    'muscheln', 'mussels', 'crab', 'krabbe',
];

const SOUP_KEYWORDS = [
    'soup', 'suppe', 'brühe', 'broth', 'chowder', 'bisque', 'gazpacho', 'minestrone',
];

const ONE_POT_KEYWORDS = [
    'one pot', 'one pan', 'sheet pan', 'casserole', 'slow cooker',
    'eintopf', 'auflauf', 'one-pot',
];

/**
 * Detect special characteristics
 */
function detectSpecialCharacteristics(text: string, recipe: RecipeInput): RecipeLabel[] {
    const labels: RecipeLabel[] = [];
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    const ingredientCount = recipe.ingredients.length;

    // Healthy
    if (HEALTHY_KEYWORDS.some(k => text.includes(k)) ||
        (ingredientCount <= 10 && totalTime <= 30)) {
        // Only add if no heavy ingredients detected
        const hasHeavyIngredients = ['cream', 'sahne', 'butter', 'bacon', 'speck']
            .some(k => text.includes(k));
        if (!hasHeavyIngredients) {
            labels.push('healthy');
        }
    }

    // Comfort food
    if (COMFORT_FOOD_KEYWORDS.some(k => text.includes(k))) {
        labels.push('comfort-food');
    }

    // Seafood
    if (SEAFOOD_KEYWORDS.some(k => text.includes(k))) {
        labels.push('seafood');
    }

    // Soup
    if (SOUP_KEYWORDS.some(k => text.includes(k))) {
        labels.push('soup');
    }

    // One-pot
    if (ONE_POT_KEYWORDS.some(k => text.includes(k))) {
        labels.push('one-pot');
    }

    // Meal prep friendly: Can be made ahead, stores well
    if (totalTime >= 30 && (recipe.defaultServings || 4) >= 4) {
        labels.push('meal-prep');
    }

    return labels;
}

export default labelRecipe;
