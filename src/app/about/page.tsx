import InfoPageLayout from '@/components/layout/InfoPageLayout';
import AboutContent from '@/components/pages/AboutContent';

export const metadata = {
  title: 'About Avo - Our Mission to Transform Grocery Shopping',
  description: 'Learn about Avo, the AI-powered grocery shopping list app. Our mission is to make family shopping simple, collaborative, and enjoyable. Meet the team reimagining how families shop.',
  keywords: ['About Avo', 'grocery app company', 'shopping list startup', 'Avo team', 'AI grocery app'],
  alternates: {
    canonical: 'https://avo.app/about',
  },
  openGraph: {
    title: 'About Avo - Smart Grocery Shopping for Families',
    description: 'Our mission is to make grocery shopping simple, collaborative, and enjoyable.',
    url: 'https://avo.app/about',
  },
};

export default function AboutPage() {
  return (
    <InfoPageLayout title="About">
      <AboutContent />
    </InfoPageLayout>
  );
}
