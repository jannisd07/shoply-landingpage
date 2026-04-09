import { Metadata } from 'next';
import Link from 'next/link';

interface ListPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ListPageProps): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: 'Shopping List on Shoply',
    description: 'View this shopping list in the Shoply app. Collaborate in real-time with family and never forget an item again.',
    openGraph: {
      title: '🛒 Shopping List on Shoply',
      description: 'View this shopping list in the Shoply app. Collaborate in real-time with family and never forget an item again.',
      url: `https://shoplyai.app/list/${id}`,
      siteName: 'Shoply',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: '🛒 Shopping List on Shoply',
      description: 'View this shopping list in the Shoply app.',
    },
    other: {
      'apple-itunes-app': 'app-id=6743532834, app-argument=shoply://list/' + id,
    },
  };
}

export default async function ListPage({ params }: ListPageProps) {
  const { id } = await params;
  const deepLink = `shoply://list/${id}`;
  const appStoreUrl = 'https://apps.apple.com/app/shoply/id6743532834';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.dominik.shoply';

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <span className="text-5xl">🛒</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">
            View this List in Shoply
          </h1>
          <p className="text-gray-400 text-lg">
            Someone shared a shopping list with you! Open it in Shoply to view items and collaborate in real-time.
          </p>
        </div>

        {/* Open App Button */}
        <a
          href={deepLink}
          className="block w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
        >
          Open in Shoply
        </a>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-500 text-sm">Don&apos;t have the app?</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-3 bg-black border border-gray-700 hover:border-gray-500 rounded-xl transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-400">Download on the</div>
              <div className="text-sm font-semibold">App Store</div>
            </div>
          </a>
          
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-3 bg-black border border-gray-700 hover:border-gray-500 rounded-xl transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs text-gray-400">Get it on</div>
              <div className="text-sm font-semibold">Google Play</div>
            </div>
          </a>
        </div>

        {/* Features */}
        <div className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Why Shoply?</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-blue-400">✓</span>
              Real-time Sync
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-blue-400">✓</span>
              Family Sharing
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-blue-400">✓</span>
              Smart Categories
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-blue-400">✓</span>
              Voice Control
            </div>
          </div>
        </div>

        {/* Back to home */}
        <Link 
          href="/"
          className="inline-block text-gray-400 hover:text-white transition-colors text-sm"
        >
          ← Back to shoplyai.app
        </Link>
      </div>
    </main>
  );
}
