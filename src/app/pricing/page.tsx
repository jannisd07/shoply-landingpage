import InfoPageLayout from '@/components/layout/InfoPageLayout';
import PricingContent from '@/components/pages/PricingContent';

export const metadata = {
  title: 'Pricing Plans - Free & Premium Grocery List App',
  description: 'Avo pricing: Free forever with unlimited lists, AI categorization, and family sharing. Premium unlocks 10,000+ recipes, unlimited collaborators, and store deals. Download free on iOS & Android.',
  keywords: ['Avo pricing', 'grocery app cost', 'free shopping list app', 'premium grocery app', 'family shopping app price'],
  alternates: {
    canonical: 'https://avo.app/pricing',
  },
  openGraph: {
    title: 'Avo Pricing - Free Grocery Shopping List App',
    description: 'Free forever with premium options. AI-powered grocery lists for families.',
    url: 'https://avo.app/pricing',
  },
};

export default function PricingPage() {
  return (
    <InfoPageLayout title="Pricing">
      <PricingContent />
    </InfoPageLayout>
  );
}
