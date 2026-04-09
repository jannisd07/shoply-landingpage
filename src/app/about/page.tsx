import InfoPageLayout from '@/components/layout/InfoPageLayout';
import AboutContent from '@/components/pages/AboutContent';

export const metadata = {
  title: 'About Shoply - Our Mission to Transform Grocery Shopping',
  description: 'Learn about Shoply, the AI-powered grocery shopping list app. Our mission is to make family shopping simple, collaborative, and enjoyable. Meet the team reimagining how families shop.',
  keywords: ['About Shoply', 'grocery app company', 'shopping list startup', 'Shoply team', 'AI grocery app'],
  alternates: {
    canonical: 'https://shoply.app/about',
  },
  openGraph: {
    title: 'About Shoply - Smart Grocery Shopping for Families',
    description: 'Our mission is to make grocery shopping simple, collaborative, and enjoyable.',
    url: 'https://shoply.app/about',
  },
};

export default function AboutPage() {
  return (
    <InfoPageLayout title="About">
      <AboutContent />
    </InfoPageLayout>
  );
}
