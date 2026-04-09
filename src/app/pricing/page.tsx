import InfoPageLayout from '@/components/layout/InfoPageLayout';
import PricingContent from '@/components/pages/PricingContent';

export const metadata = {
  title: 'Pricing Plans - Free & Premium Grocery List App',
  description: 'Shoply pricing: Free forever with unlimited lists, AI categorization, and family sharing. Premium unlocks 10,000+ recipes, unlimited collaborators, and store deals. Download free on iOS & Android.',
  keywords: ['Shoply pricing', 'grocery app cost', 'free shopping list app', 'premium grocery app', 'family shopping app price'],
  alternates: {
    canonical: 'https://shoply.app/pricing',
  },
  openGraph: {
    title: 'Shoply Pricing - Free Grocery Shopping List App',
    description: 'Free forever with premium options. AI-powered grocery lists for families.',
    url: 'https://shoply.app/pricing',
  },
};

export default function PricingPage() {
  return (
    <InfoPageLayout title="Pricing">
      <PricingContent />
    </InfoPageLayout>
  );
}
