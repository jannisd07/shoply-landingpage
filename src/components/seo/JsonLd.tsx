export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Avo",
    "url": "https://avo.app",
    "logo": "https://avo.app/images/logo.png",
    "description": "AI-powered grocery shopping list app with family collaboration, recipes, and smart categorization.",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/avoapp",
      "https://instagram.com/avoapp",
      "https://linkedin.com/company/avoapp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@avo.app",
      "contactType": "customer service"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Avo",
    "operatingSystem": ["iOS", "Android"],
    "applicationCategory": "LifestyleApplication",
    "description": "The smartest grocery shopping list app. AI-powered categorization, real-time family collaboration, 10,000+ recipes, voice control with Siri, and store deals integration.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "15",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "AI-powered smart categorization",
      "Real-time family collaboration",
      "10,000+ recipe integration",
      "Voice control with Siri",
      "Store deals and flyer integration",
      "Allergy and dietary management",
      "Offline support",
      "Cross-platform sync"
    ],
    "screenshot": "https://avo.app/images/screenshots/screenshot-1.png",
    "author": {
      "@type": "Organization",
      "name": "Avo"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Avo",
    "url": "https://avo.app",
    "description": "AI-powered grocery shopping list app for smart family shopping",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://avo.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQPageJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
