import type { Metadata, Viewport } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { EmailPopupProvider } from "@/contexts/EmailPopupContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrganizationJsonLd, SoftwareApplicationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import LanguageToggle from "@/components/ui/LanguageToggle";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://avo.app'),
  title: {
    default: "Avo - AI-Powered Grocery Shopping List App | Smart Family Shopping",
    template: "%s | Avo",
  },
  description: "Avo is the smartest AI-powered grocery shopping list app. Smart categorization, real-time family collaboration, 10,000+ recipes, and voice control. Free for iOS & Android. Never forget an item again.",
  keywords: [
    "grocery shopping list app",
    "AI shopping list",
    "family shopping app",
    "collaborative grocery list",
    "smart shopping list",
    "recipe meal planner",
    "grocery list organizer",
    "shared shopping list",
    "best grocery app",
    "shopping list with recipes",
    "voice shopping list",
    "Siri shopping list",
    "grocery store deals",
    "meal planning app",
    "food shopping app",
  ],
  authors: [{ name: "Avo", url: "https://avo.app" }],
  creator: "Avo",
  publisher: "Avo",
  category: "Shopping",
  applicationName: "Avo",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Avo - The Smartest Way to Shop for Groceries",
    description: "AI-powered shopping lists with real-time family collaboration, 10,000+ recipes, and smart categorization. Download free on iOS & Android.",
    url: "https://avo.app",
    siteName: "Avo",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Avo - AI-Powered Grocery Shopping List App",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avo - AI-Powered Grocery Shopping Made Easy",
    description: "Smart shopping lists, family collaboration, 10,000+ recipes. Free for iOS & Android.",
    images: ["/images/og-image.png"],
    creator: "@avoapp",
    site: "@avoapp",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=4", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png?v=4", type: "image/png", sizes: "64x64" },
    ],
    shortcut: "/favicon-32x32.png?v=4",
    apple: [
      { url: "/apple-touch-icon.png?v=4", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://avo.app",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fafaf7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${syne.variable} ${outfit.variable} antialiased bg-[#fafaf7] text-[#0b1a0f]`}>
        {/* Subtle noise texture overlay for depth */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Structured Data for SEO */}
        <OrganizationJsonLd />
        <SoftwareApplicationJsonLd />
        <WebsiteJsonLd />

        <LanguageProvider>
          <AuthProvider>
            <EmailPopupProvider>
              {/* Skip link for accessibility */}
              <a href="#main-content" className="skip-link">
                Skip to main content
              </a>
              {children}
              {/* Floating language toggle */}
              <LanguageToggle />
            </EmailPopupProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
