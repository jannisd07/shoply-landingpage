import { Metadata } from 'next';
import SavedRecipesContent from './SavedRecipesContent';

export const metadata: Metadata = {
    title: 'Saved Recipes',
    description: 'Your collection of saved recipes. Access your favorite recipes anytime.',
    robots: { index: false }, // Private page
};

export default function SavedRecipesPage() {
    return <SavedRecipesContent />;
}
