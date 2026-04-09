import InfoPageLayout from '@/components/layout/InfoPageLayout';
import TermsContent from '@/components/pages/TermsContent';

export const metadata = {
  title: 'Terms of Service - Avo User Agreement',
  description: 'Read Avo\'s terms of service. Understand the rules and guidelines for using the Avo grocery shopping list app on iOS and Android.',
  keywords: ['Avo terms', 'grocery app terms of service', 'Avo user agreement', 'shopping list app terms'],
  alternates: {
    canonical: 'https://avo.app/terms',
  },
  openGraph: {
    title: 'Terms of Service - Avo Grocery App',
    description: 'Terms and conditions for using the Avo app.',
    url: 'https://avo.app/terms',
  },
};

export default function TermsPage() {
  return (
    <InfoPageLayout title="Terms">
      <TermsContent />
    </InfoPageLayout>
  );
}
