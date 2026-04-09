import InfoPageLayout from '@/components/layout/InfoPageLayout';
import PrivacyContent from '@/components/pages/PrivacyContent';

export const metadata = {
  title: 'Privacy Policy - How Shoply Protects Your Data',
  description: 'Read Shoply\'s privacy policy. Learn how we collect, use, and protect your shopping list data. Your privacy matters - we never sell your personal information.',
  keywords: ['Shoply privacy', 'grocery app privacy policy', 'shopping list data protection', 'Shoply data security'],
  alternates: {
    canonical: 'https://shoply.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Shoply Grocery App',
    description: 'How Shoply protects your data and respects your privacy.',
    url: 'https://shoply.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy">
      <PrivacyContent />
    </InfoPageLayout>
  );
}
