'use client';

import dynamic from 'next/dynamic';
import { Navigation, Footer } from '@/components/layout';
import { HeroSection } from '@/components/sections';

// Lazy load below-fold sections for faster initial paint
const ProblemSection = dynamic(() => import('@/components/sections/ProblemSection'), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const FeatureSection = dynamic(() => import('@/components/sections/FeatureSection'), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const ComparisonSection = dynamic(() => import('@/components/sections/ComparisonSection'), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

// Lightweight skeleton for loading states
function SectionSkeleton() {
  return (
    <div className="py-24 md:py-32 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-white/5 rounded-full w-32 mx-auto" />
          <div className="h-12 bg-white/5 rounded-lg w-64 mx-auto" />
          <div className="h-6 bg-white/5 rounded w-96 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white/[0.02] rounded-2xl border border-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Navigation - critical, load immediately */}
      <Navigation />

      {/* Main content */}
      <main id="main-content">
        {/* Hero loads first - above the fold */}
        <HeroSection />
        
        {/* Below-fold sections lazy loaded */}
        <ProblemSection />
        <FeatureSection />
        <ExperienceSection />
        <ComparisonSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
