import InfoPageLayout from '@/components/layout/InfoPageLayout';
import FAQContent from '@/components/pages/FAQContent';

export const metadata = {
  title: 'FAQ - Frequently Asked Questions About Avo Grocery App',
  description: 'Get answers to common questions about Avo, the AI-powered grocery shopping list app. Learn about features, pricing, family sharing, recipe integration, and more.',
  keywords: ['Avo FAQ', 'grocery app questions', 'shopping list app help', 'Avo features', 'family shopping app FAQ'],
  alternates: {
    canonical: 'https://avo.app/faq',
  },
  openGraph: {
    title: 'FAQ - Avo Grocery Shopping List App',
    description: 'Answers to your questions about Avo, the smart grocery shopping app for families.',
    url: 'https://avo.app/faq',
  },
};

export default function FAQPage() {
  return (
    <InfoPageLayout title="FAQ">
      <FAQContent />
    </InfoPageLayout>
  );
}
