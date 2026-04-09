import InfoPageLayout from '@/components/layout/InfoPageLayout';
import FAQContent from '@/components/pages/FAQContent';

export const metadata = {
  title: 'FAQ - Frequently Asked Questions About Shoply Grocery App',
  description: 'Get answers to common questions about Shoply, the AI-powered grocery shopping list app. Learn about features, pricing, family sharing, recipe integration, and more.',
  keywords: ['Shoply FAQ', 'grocery app questions', 'shopping list app help', 'Shoply features', 'family shopping app FAQ'],
  alternates: {
    canonical: 'https://shoply.app/faq',
  },
  openGraph: {
    title: 'FAQ - Shoply Grocery Shopping List App',
    description: 'Answers to your questions about Shoply, the smart grocery shopping app for families.',
    url: 'https://shoply.app/faq',
  },
};

export default function FAQPage() {
  return (
    <InfoPageLayout title="FAQ">
      <FAQContent />
    </InfoPageLayout>
  );
}
