import InfoPageLayout from '@/components/layout/InfoPageLayout';
import TermsContent from '@/components/pages/TermsContent';

export const metadata = {
  title: 'Terms of Service - Shoply User Agreement',
  description: 'Read Shoply\'s terms of service. Understand the rules and guidelines for using the Shoply grocery shopping list app on iOS and Android.',
  keywords: ['Shoply terms', 'grocery app terms of service', 'Shoply user agreement', 'shopping list app terms'],
  alternates: {
    canonical: 'https://shoply.app/terms',
  },
  openGraph: {
    title: 'Terms of Service - Shoply Grocery App',
    description: 'Terms and conditions for using the Shoply app.',
    url: 'https://shoply.app/terms',
  },
};

export default function TermsPage() {
  return (
    <InfoPageLayout title="Terms">
      <TermsContent />
    </InfoPageLayout>
  );
}
