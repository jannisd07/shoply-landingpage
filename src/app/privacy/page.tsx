import InfoPageLayout from '@/components/layout/InfoPageLayout';
import PrivacyContent from '@/components/pages/PrivacyContent';

export const metadata = {
  title: 'Privacy Policy - How Avo Protects Your Data',
  description: 'Read Avo\'s privacy policy. Learn how we collect, use, and protect your shopping list data. Your privacy matters - we never sell your personal information.',
  keywords: ['Avo privacy', 'grocery app privacy policy', 'shopping list data protection', 'Avo data security'],
  alternates: {
    canonical: 'https://avo.app/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Avo Grocery App',
    description: 'How Avo protects your data and respects your privacy.',
    url: 'https://avo.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy">
      <PrivacyContent />
    </InfoPageLayout>
  );
}
