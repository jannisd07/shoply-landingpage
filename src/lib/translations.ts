// Complete translations for EN and DE with SEO-optimized German copy

export type Locale = 'en' | 'de';

export const translations = {
  en: {
    // Navigation
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      about: 'About',
      getNotified: 'Get Notified',
    },

    // Hero Section
    hero: {
      badge: 'AI-Powered Shopping Lists',
      headline1: 'Smart Grocery',
      headline2: 'Shopping List',
      subheadline: 'AI-powered shopping lists with family collaboration.',
      subheadline2: '10,000+ recipes. Never forget an item again.',
      ctaPrimary: 'Start Your Journey',
      ctaSecondary: 'Get Notified',
      stats: {
        users: 'Active Users',
        recipes: 'Recipes',
        rating: 'App Rating',
      },
      scrollToExplore: 'Scroll to explore',
    },

    // Problem Section
    problem: {
      badge: 'The Problem',
      headline: 'Sound Familiar?',
      cards: [
        {
          title: 'Forgot milk... again?',
          subtitle: 'Paper lists get lost, torn, and forgotten',
        },
        {
          title: 'Chaos in Every Aisle',
          subtitle: 'Wasting time searching for randomly placed items',
        },
        {
          title: 'Shopping Solo, Together',
          subtitle: 'Family members buying duplicates or missing items',
        },
        {
          title: 'Lost in Translation',
          subtitle: 'Recipes need 15 ingredients, you forget 5',
        },
        {
          title: 'Buy It Twice, Waste It Once',
          subtitle: 'Duplicates, expired food, and unnecessary purchases',
        },
      ],
    },

    // Feature Section
    features: {
      badge: 'Features',
      headline: 'Everything Your Family Needs',
      subheadline: 'Powerful shopping list features designed to save time and keep your family organized.',
      plusMore: 'Plus more...',
      mainFeatures: [
        {
          title: 'AI-Powered Smart Categorization',
          description: 'Our intelligent grocery list organizer automatically sorts items into categories like produce, dairy, and meat. It learns your shopping habits to provide personalized suggestions.',
          benefits: ['Auto-categorize grocery items', 'Learn shopping preferences', 'Smart product suggestions'],
        },
        {
          title: 'Real-Time Family Collaboration',
          description: 'Share shopping lists with family members and shop together in real-time. Perfect for families, roommates, and couples who want to stay organized.',
          benefits: ['Instant sync across devices', 'Shared family lists', 'Live activity updates'],
        },
        {
          title: 'Recipe & Meal Planning Integration',
          description: 'Browse over 10,000 recipes and add all ingredients to your shopping list with one tap. Plan meals for the week and automatically generate grocery lists.',
          benefits: ['One-tap ingredient adding', 'Dietary & allergy filters', 'Step-by-step cooking guides'],
        },
      ],
      additionalFeatures: [
        {
          title: 'Voice Control & Siri',
          description: 'Add items hands-free with Siri shortcuts',
          fullDescription: 'Simply say "Hey Siri, add milk to my shopping list" and it\'s done. Our deep Siri integration works with all Apple devices, making hands-free shopping list management a breeze while cooking or driving.',
          benefits: ['Siri Shortcuts integration', 'Works while hands are busy', 'Natural language support'],
        },
        {
          title: 'Store Deals & Flyers',
          description: 'Live deals from Lidl, REWE, Aldi & more',
          fullDescription: 'Never miss a deal again. We aggregate weekly flyers and special offers from your favorite stores, automatically highlighting when items on your list are on sale nearby.',
          benefits: ['Weekly flyer integration', 'Price comparison', 'Sale notifications'],
        },
        {
          title: 'Allergy Management',
          description: 'Automatic substitutions for dietary needs',
          fullDescription: 'Set your family\'s dietary restrictions once and we\'ll handle the rest. Recipes automatically suggest safe alternatives, and shopping lists flag potential allergens.',
          benefits: ['Allergen warnings', 'Safe substitutions', 'Family profile support'],
        },
      ],
    },

    // Experience Section
    experience: {
      badge: 'How Shoply Works',
      headline: 'Smarter Grocery Shopping',
      subheadline: "See how Shoply's AI-powered features make family shopping effortless.",
      blocks: [
        {
          title: 'AI That Learns How You Shop',
          description: 'Our smart AI automatically categorizes grocery items and learns your shopping preferences. Get personalized product suggestions and optimized store routes.',
          stat: { value: '95%', label: 'categorization accuracy' },
          features: ['Auto-categorize by aisle', 'Personalized suggestions', 'Learns your preferences'],
        },
        {
          title: 'Share Shopping Lists with Family',
          description: 'Collaborate in real-time with family members. Share grocery lists instantly and see live updates as items are added, edited, or checked off. Perfect for busy families.',
          stat: { value: '50,000+', label: 'families using Shoply' },
          features: ['Real-time sync across devices', 'Instant list sharing', 'Family activity feed'],
        },
        {
          title: 'Recipe to Grocery List in One Tap',
          description: 'Browse 10,000+ recipes with dietary filters. Found something you want to cook? Tap once to add all ingredients directly to your shopping list. Meal planning made easy.',
          stat: { value: '10,000+', label: 'recipes to explore' },
          features: ['Allergy & diet filters', 'Step-by-step cooking guides', 'Save favorite recipes'],
        },
      ],
    },

    // CTA Section
    cta: {
      badge: 'Free to Download',
      headline: 'Download the Best',
      headline2: 'Grocery Shopping App',
      subheadline: 'Join',
      subheadlineHighlight: '50,000+',
      subheadline2: 'families using the smartest grocery list app',
      rating: '4.8/5.0',
      users: '50K+ Users',
      appStore: {
        label: 'Download on the',
        store: 'App Store',
      },
      googlePlay: {
        label: 'Get it on',
        store: 'Google Play',
      },
    },

    // Footer
    footer: {
      description: 'The #1 AI-powered grocery shopping list app. Smart categorization, family collaboration, 10,000+ recipes. Free for iOS & Android.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      links: {
        features: 'Features',
        howItWorks: 'How It Works',
        pricing: 'Pricing',
        faq: 'FAQ',
        about: 'About Us',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
      copyright: 'Shoply. All rights reserved.',
      builtWith: 'Built with',
      inGermany: 'in Germany',
    },

    // Email Popup
    emailPopup: {
      title: 'Coming Soon!',
      description: 'Shoply is launching soon. Enter your email to be notified when we go live.',
      placeholder: 'Enter your email',
      button: 'Notify Me',
      submitting: 'Submitting...',
      subscribed: 'Subscribed!',
      success: "Thanks! We'll notify you when we launch.",
      error: 'Something went wrong. Please try again.',
      connectionError: 'Connection error. Please try again.',
      privacy: 'We respect your privacy. No spam, ever.',
    },

    // Language
    language: {
      toggle: 'Language',
      en: 'English',
      de: 'Deutsch',
    },

    // Comparison Section
    comparison: {
      badge: 'Why Choose ShoplyAI',
      headline: 'Traditional Apps vs. ShoplyAI',
      subheadline: 'See why families are switching to the smartest grocery list app.',
      oldWay: 'Old Way',
      feature: 'Feature',
      shoply: 'ShoplyAI',
      items: [
        { feature: 'List Synchronization', oldWay: 'No sync', newWay: 'Real-time family sync' },
        { feature: 'Item Categorization', oldWay: 'Manual sorting', newWay: 'AI auto-categorization' },
        { feature: 'Recipe Ingredients', oldWay: 'Type each item', newWay: 'One-tap add all' },
        { feature: 'Shared Shopping Lists', oldWay: 'Solo only', newWay: 'Family collaboration' },
        { feature: 'Voice Commands', oldWay: 'Not available', newWay: 'Siri & voice control' },
        { feature: 'Grocery Store Deals', oldWay: 'Check flyers', newWay: 'Live deal alerts' },
        { feature: 'Food Allergy Alerts', oldWay: 'Read labels', newWay: 'Smart substitutions' },
        { feature: 'Offline Shopping', oldWay: 'Paper backup', newWay: 'Full offline mode' },
      ],
      ctaText: 'Ready to upgrade your shopping?',
      ctaButton: 'Get Started Free',
    },

    // Pricing Page
    pricing: {
      title: 'Pricing',
      free: {
        name: 'Free',
        period: 'forever',
        description: 'Perfect for getting started with smart shopping.',
        features: [
          'Unlimited shopping lists',
          'AI-powered categorization',
          'Share with up to 3 people',
          'Basic recipe integration',
        ],
      },
      premium: {
        badge: 'Coming Soon',
        name: 'Premium',
        period: '/ month',
        description: 'For families and power users who want the full experience.',
        features: [
          'Everything in Free',
          'Unlimited collaborators',
          '10,000+ premium recipes',
          'Store deals & price tracking',
          'Advanced allergy management',
        ],
      },
      note: 'Pricing details will be announced at launch. Sign up to be notified!',
    },

    // FAQ Page
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about Shoply, the AI-powered grocery shopping list app designed for families.',
      items: [
        { question: 'When will the Shoply grocery app be available?', answer: 'Shoply is currently in development. Sign up for our newsletter to be notified when we launch on iOS and Android!' },
        { question: 'Is Shoply free to download and use?', answer: 'Yes! Shoply will have a generous free tier that includes unlimited shopping lists, AI-powered categorization, and list sharing with up to 3 family members. Premium features will be available for a monthly subscription.' },
        { question: 'What platforms does Shoply support?', answer: 'Shoply will be available on iPhone (iOS) and Android devices at launch. A web version for desktop browsers is planned for the future.' },
        { question: 'How does the AI grocery categorization work?', answer: 'Our AI automatically recognizes grocery items you add and sorts them into store categories like Produce, Dairy, Meat, Frozen, etc. It learns your shopping preferences over time to provide smarter product suggestions.' },
        { question: 'Can I share shopping lists with my family?', answer: 'Absolutely! Shoply is built for family collaboration. Share grocery lists with family members and see real-time updates as items are added, edited, or checked off. Perfect for couples, families, and roommates.' },
        { question: 'How does recipe-to-shopping-list work?', answer: 'Browse our library of 10,000+ recipes, find one you like, and tap once to instantly add all ingredients to your shopping list. You can also filter recipes by dietary restrictions and allergies.' },
        { question: 'Is my shopping data private and secure?', answer: 'Yes. We take your privacy seriously. All data is encrypted in transit and at rest. We never sell your personal information to third parties. See our Privacy Policy for full details.' },
        { question: 'Does Shoply work offline at the grocery store?', answer: 'Yes! Shoply works fully offline so you can access your shopping lists even without internet connection at the store. Your lists sync automatically when you reconnect.' },
      ],
    },

    // About Page
    about: {
      title: 'About Shoply',
      mission: {
        title: 'Our Mission',
        text: 'We believe grocery shopping should be simple, collaborative, and even enjoyable. Shoply was born from the frustration of forgotten items, miscommunicated lists, and the daily chaos of feeding a family.',
      },
      building: {
        title: 'What We\'re Building',
        text: 'Shoply is an AI-powered shopping list app that learns your preferences, keeps your family in sync, and makes meal planning a breeze. We\'re combining cutting-edge technology with thoughtful design to reimagine how you shop.',
      },
      values: {
        title: 'Our Values',
        items: [
          { title: 'Simplicity First', text: 'Powerful features shouldn\'t mean complicated interfaces.' },
          { title: 'Family Focused', text: 'Built for real families with real needs.' },
          { title: 'Privacy Matters', text: 'Your data is yours. We never sell it.' },
        ],
      },
      contact: {
        title: 'Get in Touch',
        text: 'Have questions or feedback? We\'d love to hear from you at',
      },
    },

    // Privacy Page
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: November 2024',
      sections: [
        { title: '1. Information We Collect', content: 'We collect information you provide directly:', items: ['Email address (for account and notifications)', 'Shopping list data and preferences', 'Recipe favorites and cooking history', 'Device information for app functionality'] },
        { title: '2. How We Use Your Information', items: ['To provide and improve Shoply\'s features', 'To personalize your experience with AI recommendations', 'To enable list sharing and collaboration', 'To send important updates about the service'] },
        { title: '3. Data Sharing', content: 'We do not sell your personal information. We may share data only with:', items: ['Service providers who help us operate Shoply', 'Other users you explicitly choose to share lists with', 'Legal authorities when required by law'] },
        { title: '4. Data Security', content: 'We implement industry-standard security measures to protect your data, including encryption in transit and at rest.' },
        { title: '5. Your Rights', content: 'You have the right to:', items: ['Access your personal data', 'Request data deletion', 'Export your data', 'Opt out of marketing communications'] },
        { title: '6. Contact Us', content: 'For privacy-related questions, contact us at' },
      ],
    },

    // Terms Page
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: November 2024',
      sections: [
        { title: '1. Acceptance of Terms', content: 'By accessing or using Shoply, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.' },
        { title: '2. Description of Service', content: 'Shoply is a collaborative shopping list application with AI-powered features, recipe integration, and family sharing capabilities.' },
        { title: '3. User Accounts', items: ['You must provide accurate information when creating an account', 'You are responsible for maintaining the security of your account', 'You must be at least 13 years old to use Shoply'] },
        { title: '4. Acceptable Use', content: 'You agree not to:', items: ['Use the service for any illegal purpose', 'Attempt to gain unauthorized access to the service', 'Interfere with or disrupt the service', 'Share content that violates others\' rights'] },
        { title: '5. Intellectual Property', content: 'The Shoply service, including all content, features, and functionality, is owned by Shoply and protected by copyright and other laws.' },
        { title: '6. Limitation of Liability', content: 'Shoply is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.' },
        { title: '7. Changes to Terms', content: 'We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.' },
        { title: '8. Contact', content: 'Questions about these terms? Contact us at' },
      ],
    },
  },

  de: {
    // Navigation - SEO-optimized German
    nav: {
      features: 'Funktionen',
      howItWorks: 'So funktioniert\'s',
      pricing: 'Preise',
      about: 'Über uns',
      getNotified: 'Benachrichtigen',
    },

    // Hero Section - SEO-optimized German
    hero: {
      badge: 'KI-gestützte Einkaufslisten',
      headline1: 'Intelligente',
      headline2: 'Einkaufsliste',
      subheadline: 'KI-gestützte Einkaufslisten mit Familien-Zusammenarbeit.',
      subheadline2: 'Über 10.000 Rezepte. Nie wieder etwas vergessen.',
      ctaPrimary: 'Jetzt starten',
      ctaSecondary: 'Benachrichtigen',
      stats: {
        users: 'Aktive Nutzer',
        recipes: 'Rezepte',
        rating: 'App-Bewertung',
      },
      scrollToExplore: 'Scrollen zum Entdecken',
    },

    // Problem Section - SEO-optimized German
    problem: {
      badge: 'Das Problem',
      headline: 'Kommt dir bekannt vor?',
      cards: [
        {
          title: 'Milch vergessen... schon wieder?',
          subtitle: 'Papier-Listen gehen verloren, reißen oder werden vergessen',
        },
        {
          title: 'Chaos in jedem Gang',
          subtitle: 'Zeitverschwendung beim Suchen nach zufällig platzierten Artikeln',
        },
        {
          title: 'Alleine einkaufen, gemeinsam vergessen',
          subtitle: 'Familienmitglieder kaufen doppelt oder vergessen Artikel',
        },
        {
          title: 'Vom Rezept zum Regal',
          subtitle: 'Das Rezept braucht 15 Zutaten, du vergisst 5 davon',
        },
        {
          title: 'Doppelt kaufen, einmal wegwerfen',
          subtitle: 'Doppelte Käufe, abgelaufene Lebensmittel und unnötige Ausgaben',
        },
      ],
    },

    // Feature Section - SEO-optimized German
    features: {
      badge: 'Funktionen',
      headline: 'Alles was deine Familie braucht',
      subheadline: 'Leistungsstarke Einkaufslisten-Funktionen, die Zeit sparen und deine Familie organisiert halten.',
      plusMore: 'Und noch mehr...',
      mainFeatures: [
        {
          title: 'KI-gestützte smarte Kategorisierung',
          description: 'Unser intelligenter Einkaufslisten-Organizer sortiert Artikel automatisch in Kategorien wie Obst & Gemüse, Milchprodukte und Fleisch. Er lernt deine Einkaufsgewohnheiten für personalisierte Vorschläge.',
          benefits: ['Automatische Kategorisierung', 'Lernt Einkaufsvorlieben', 'Intelligente Produktvorschläge'],
        },
        {
          title: 'Echtzeit-Zusammenarbeit mit der Familie',
          description: 'Teile Einkaufslisten mit Familienmitgliedern und kauft gemeinsam in Echtzeit ein. Perfekt für Familien, WGs und Paare, die organisiert bleiben wollen.',
          benefits: ['Sofortige Synchronisation', 'Geteilte Familienlisten', 'Live-Aktivitätsupdates'],
        },
        {
          title: 'Rezepte & Essensplanung',
          description: 'Durchstöbere über 10.000 Rezepte und füge alle Zutaten mit einem Tippen zu deiner Einkaufsliste hinzu. Plane Mahlzeiten für die Woche und erstelle automatisch Einkaufslisten.',
          benefits: ['Ein-Tippen-Zutaten-Hinzufügen', 'Diät- & Allergiefilter', 'Schritt-für-Schritt Kochanleitungen'],
        },
      ],
      additionalFeatures: [
        {
          title: 'Sprachsteuerung & Siri',
          description: 'Artikel freihändig mit Siri hinzufügen',
          fullDescription: 'Sag einfach "Hey Siri, füge Milch zu meiner Einkaufsliste hinzu" und fertig. Unsere tiefe Siri-Integration funktioniert mit allen Apple-Geräten – perfekt beim Kochen oder Autofahren.',
          benefits: ['Siri Kurzbefehle Integration', 'Funktioniert freihändig', 'Natürliche Sprachunterstützung'],
        },
        {
          title: 'Angebote & Prospekte',
          description: 'Live-Angebote von Lidl, REWE, Aldi & mehr',
          fullDescription: 'Verpasse nie wieder ein Angebot. Wir sammeln wöchentliche Prospekte und Sonderangebote deiner Lieblingsgeschäfte und zeigen dir automatisch, wenn Artikel auf deiner Liste reduziert sind.',
          benefits: ['Wöchentliche Prospekt-Integration', 'Preisvergleich', 'Angebots-Benachrichtigungen'],
        },
        {
          title: 'Allergie-Management',
          description: 'Automatische Alternativen für Ernährungsbedürfnisse',
          fullDescription: 'Lege die Ernährungseinschränkungen deiner Familie einmal fest und wir kümmern uns um den Rest. Rezepte schlagen automatisch sichere Alternativen vor und Einkaufslisten warnen vor potenziellen Allergenen.',
          benefits: ['Allergen-Warnungen', 'Sichere Alternativen', 'Familienprofil-Unterstützung'],
        },
      ],
    },

    // Experience Section - SEO-optimized German
    experience: {
      badge: 'So funktioniert Shoply',
      headline: 'Intelligenter Lebensmitteleinkauf',
      subheadline: 'Entdecke, wie Shoplys KI-gestützte Funktionen den Familieneinkauf mühelos machen.',
      blocks: [
        {
          title: 'KI, die deine Einkaufsgewohnheiten lernt',
          description: 'Unsere smarte KI kategorisiert Lebensmittel automatisch und lernt deine Einkaufsvorlieben. Erhalte personalisierte Produktvorschläge und optimierte Ladenwege.',
          stat: { value: '95%', label: 'Kategorisierungsgenauigkeit' },
          features: ['Auto-Kategorisierung nach Gang', 'Personalisierte Vorschläge', 'Lernt deine Vorlieben'],
        },
        {
          title: 'Einkaufslisten mit der Familie teilen',
          description: 'Arbeite in Echtzeit mit Familienmitgliedern zusammen. Teile Einkaufslisten sofort und sieh Live-Updates, wenn Artikel hinzugefügt, bearbeitet oder abgehakt werden.',
          stat: { value: '50.000+', label: 'Familien nutzen Shoply' },
          features: ['Echtzeit-Sync auf allen Geräten', 'Sofortiges Listen-Teilen', 'Familien-Aktivitätsfeed'],
        },
        {
          title: 'Vom Rezept zur Einkaufsliste in einem Tippen',
          description: 'Durchstöbere über 10.000 Rezepte mit Diätfiltern. Gefunden, was du kochen willst? Tippe einmal, um alle Zutaten direkt zu deiner Einkaufsliste hinzuzufügen.',
          stat: { value: '10.000+', label: 'Rezepte zum Entdecken' },
          features: ['Allergie- & Diätfilter', 'Schritt-für-Schritt Anleitungen', 'Lieblingsrezepte speichern'],
        },
      ],
    },

    // CTA Section - SEO-optimized German
    cta: {
      badge: 'Kostenlos herunterladen',
      headline: 'Lade die beste',
      headline2: 'Einkaufslisten-App herunter',
      subheadline: 'Schließe dich',
      subheadlineHighlight: '50.000+',
      subheadline2: 'Familien an, die die smarteste Einkaufslisten-App nutzen',
      rating: '4,8/5,0',
      users: '50K+ Nutzer',
      appStore: {
        label: 'Laden im',
        store: 'App Store',
      },
      googlePlay: {
        label: 'Jetzt bei',
        store: 'Google Play',
      },
    },

    // Footer - SEO-optimized German
    footer: {
      description: 'Die Nr. 1 KI-gestützte Einkaufslisten-App. Intelligente Kategorisierung, Familien-Zusammenarbeit, über 10.000 Rezepte. Kostenlos für iOS & Android.',
      product: 'Produkt',
      company: 'Unternehmen',
      legal: 'Rechtliches',
      links: {
        features: 'Funktionen',
        howItWorks: 'So funktioniert\'s',
        pricing: 'Preise',
        faq: 'FAQ',
        about: 'Über uns',
        privacy: 'Datenschutz',
        terms: 'Nutzungsbedingungen',
      },
      copyright: 'Shoply. Alle Rechte vorbehalten.',
      builtWith: 'Entwickelt mit',
      inGermany: 'in Deutschland',
    },

    // Email Popup - SEO-optimized German
    emailPopup: {
      title: 'Bald verfügbar!',
      description: 'Shoply startet bald. Gib deine E-Mail ein, um benachrichtigt zu werden, wenn wir live gehen.',
      placeholder: 'Deine E-Mail-Adresse',
      button: 'Benachrichtigen',
      submitting: 'Wird gesendet...',
      subscribed: 'Angemeldet!',
      success: 'Danke! Wir benachrichtigen dich, wenn wir starten.',
      error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
      connectionError: 'Verbindungsfehler. Bitte versuche es erneut.',
      privacy: 'Wir respektieren deine Privatsphäre. Kein Spam, niemals.',
    },

    // Language
    language: {
      toggle: 'Sprache',
      en: 'English',
      de: 'Deutsch',
    },

    // Comparison Section - SEO-optimized German
    comparison: {
      badge: 'Warum ShoplyAI wählen',
      headline: 'Herkömmliche Apps vs. ShoplyAI',
      subheadline: 'Erfahre, warum Familien zur intelligentesten Einkaufslisten-App wechseln.',
      oldWay: 'Früher',
      feature: 'Funktion',
      shoply: 'ShoplyAI',
      items: [
        { feature: 'Listen-Synchronisation', oldWay: 'Keine Sync', newWay: 'Echtzeit-Familien-Sync' },
        { feature: 'Artikel-Kategorisierung', oldWay: 'Manuelles Sortieren', newWay: 'KI-Auto-Kategorisierung' },
        { feature: 'Rezept-Zutaten', oldWay: 'Jeden Artikel tippen', newWay: 'Ein-Tipp alle hinzufügen' },
        { feature: 'Geteilte Einkaufslisten', oldWay: 'Nur alleine', newWay: 'Familien-Zusammenarbeit' },
        { feature: 'Sprachsteuerung', oldWay: 'Nicht verfügbar', newWay: 'Siri & Sprachsteuerung' },
        { feature: 'Supermarkt-Angebote', oldWay: 'Prospekte prüfen', newWay: 'Live-Angebots-Alerts' },
        { feature: 'Allergie-Warnungen', oldWay: 'Etiketten lesen', newWay: 'Smarte Ersatzvorschläge' },
        { feature: 'Offline-Einkaufen', oldWay: 'Papier-Backup', newWay: 'Voller Offline-Modus' },
      ],
      ctaText: 'Bereit für besseres Einkaufen?',
      ctaButton: 'Kostenlos starten',
    },

    // Pricing Page - SEO-optimized German
    pricing: {
      title: 'Preise',
      free: {
        name: 'Kostenlos',
        period: 'für immer',
        description: 'Perfekt für den Einstieg in smartes Einkaufen.',
        features: [
          'Unbegrenzte Einkaufslisten',
          'KI-gestützte Kategorisierung',
          'Mit bis zu 3 Personen teilen',
          'Basis-Rezeptintegration',
        ],
      },
      premium: {
        badge: 'Demnächst',
        name: 'Premium',
        period: '/ Monat',
        description: 'Für Familien und Power-User, die das volle Erlebnis wollen.',
        features: [
          'Alles aus Kostenlos',
          'Unbegrenzte Mitglieder',
          '10.000+ Premium-Rezepte',
          'Angebote & Preisverfolgung',
          'Erweitertes Allergie-Management',
        ],
      },
      note: 'Preisdetails werden zum Launch bekannt gegeben. Melde dich an, um benachrichtigt zu werden!',
    },

    // FAQ Page - German
    faq: {
      title: 'Häufig gestellte Fragen',
      subtitle: 'Finde Antworten auf häufige Fragen zu Shoply, der KI-gestützten Einkaufslisten-App für Familien.',
      items: [
        { question: 'Wann wird die Shoply-App verfügbar sein?', answer: 'Shoply befindet sich derzeit in der Entwicklung. Melde dich für unseren Newsletter an, um benachrichtigt zu werden, wenn wir auf iOS und Android starten!' },
        { question: 'Ist Shoply kostenlos?', answer: 'Ja! Shoply wird eine großzügige kostenlose Version haben, die unbegrenzte Einkaufslisten, KI-gestützte Kategorisierung und Listen-Teilen mit bis zu 3 Familienmitgliedern umfasst. Premium-Funktionen sind gegen ein monatliches Abonnement verfügbar.' },
        { question: 'Welche Plattformen unterstützt Shoply?', answer: 'Shoply wird zum Start auf iPhone (iOS) und Android-Geräten verfügbar sein. Eine Web-Version für Desktop-Browser ist für die Zukunft geplant.' },
        { question: 'Wie funktioniert die KI-Kategorisierung?', answer: 'Unsere KI erkennt automatisch Lebensmittel, die du hinzufügst, und sortiert sie in Laden-Kategorien wie Obst & Gemüse, Milchprodukte, Fleisch, Tiefkühl usw. Sie lernt deine Einkaufsvorlieben und macht smartere Produktvorschläge.' },
        { question: 'Kann ich Einkaufslisten mit meiner Familie teilen?', answer: 'Absolut! Shoply ist für Familien-Zusammenarbeit gebaut. Teile Einkaufslisten mit Familienmitgliedern und sieh Echtzeit-Updates, wenn Artikel hinzugefügt, bearbeitet oder abgehakt werden. Perfekt für Paare, Familien und WGs.' },
        { question: 'Wie funktioniert Rezept-zu-Einkaufsliste?', answer: 'Durchstöbere unsere Bibliothek mit über 10.000 Rezepten, finde eines, das dir gefällt, und tippe einmal, um alle Zutaten sofort zu deiner Einkaufsliste hinzuzufügen. Du kannst Rezepte auch nach Diät und Allergien filtern.' },
        { question: 'Sind meine Einkaufsdaten privat und sicher?', answer: 'Ja. Wir nehmen deine Privatsphäre ernst. Alle Daten sind während der Übertragung und im Ruhezustand verschlüsselt. Wir verkaufen niemals deine persönlichen Daten an Dritte. Siehe unsere Datenschutzerklärung für Details.' },
        { question: 'Funktioniert Shoply offline im Laden?', answer: 'Ja! Shoply funktioniert vollständig offline, sodass du auch ohne Internetverbindung im Laden auf deine Einkaufslisten zugreifen kannst. Deine Listen synchronisieren sich automatisch, wenn du wieder online bist.' },
      ],
    },

    // About Page - German
    about: {
      title: 'Über Shoply',
      mission: {
        title: 'Unsere Mission',
        text: 'Wir glauben, dass Einkaufen einfach, gemeinschaftlich und sogar angenehm sein sollte. Shoply wurde aus der Frustration über vergessene Artikel, falsch kommunizierte Listen und dem täglichen Chaos beim Versorgen einer Familie geboren.',
      },
      building: {
        title: 'Was wir entwickeln',
        text: 'Shoply ist eine KI-gestützte Einkaufslisten-App, die deine Vorlieben lernt, deine Familie synchron hält und die Mahlzeitenplanung zum Kinderspiel macht. Wir kombinieren modernste Technologie mit durchdachtem Design, um das Einkaufen neu zu definieren.',
      },
      values: {
        title: 'Unsere Werte',
        items: [
          { title: 'Einfachheit zuerst', text: 'Leistungsstarke Funktionen sollten keine komplizierten Oberflächen bedeuten.' },
          { title: 'Familien-fokussiert', text: 'Entwickelt für echte Familien mit echten Bedürfnissen.' },
          { title: 'Privatsphäre zählt', text: 'Deine Daten gehören dir. Wir verkaufen sie niemals.' },
        ],
      },
      contact: {
        title: 'Kontakt',
        text: 'Hast du Fragen oder Feedback? Wir freuen uns von dir zu hören unter',
      },
    },

    // Privacy Page - German
    privacy: {
      title: 'Datenschutzerklärung',
      lastUpdated: 'Zuletzt aktualisiert: November 2024',
      sections: [
        { title: '1. Welche Daten wir erheben', content: 'Wir erheben Informationen, die du direkt bereitstellst:', items: ['E-Mail-Adresse (für Konto und Benachrichtigungen)', 'Einkaufslisten-Daten und Präferenzen', 'Rezept-Favoriten und Kochverlauf', 'Geräteinformationen für App-Funktionalität'] },
        { title: '2. Wie wir deine Daten nutzen', items: ['Um Shoplys Funktionen bereitzustellen und zu verbessern', 'Um dein Erlebnis mit KI-Empfehlungen zu personalisieren', 'Um Listen-Teilen und Zusammenarbeit zu ermöglichen', 'Um wichtige Updates zum Service zu senden'] },
        { title: '3. Datenweitergabe', content: 'Wir verkaufen deine persönlichen Daten nicht. Wir teilen Daten nur mit:', items: ['Dienstleistern, die uns beim Betrieb von Shoply helfen', 'Anderen Nutzern, mit denen du Listen teilen möchtest', 'Behörden, wenn gesetzlich vorgeschrieben'] },
        { title: '4. Datensicherheit', content: 'Wir implementieren branchenübliche Sicherheitsmaßnahmen zum Schutz deiner Daten, einschließlich Verschlüsselung während der Übertragung und im Ruhezustand.' },
        { title: '5. Deine Rechte', content: 'Du hast das Recht:', items: ['Auf Zugriff deiner persönlichen Daten', 'Auf Löschung deiner Daten', 'Auf Export deiner Daten', 'Auf Abmeldung von Marketing-Kommunikation'] },
        { title: '6. Kontakt', content: 'Bei Fragen zum Datenschutz kontaktiere uns unter' },
      ],
    },

    // Terms Page - German
    terms: {
      title: 'Nutzungsbedingungen',
      lastUpdated: 'Zuletzt aktualisiert: November 2024',
      sections: [
        { title: '1. Annahme der Bedingungen', content: 'Durch Zugriff oder Nutzung von Shoply erklärst du dich mit diesen Nutzungsbedingungen einverstanden. Wenn du diesen Bedingungen nicht zustimmst, nutze den Service bitte nicht.' },
        { title: '2. Beschreibung des Services', content: 'Shoply ist eine kollaborative Einkaufslisten-Anwendung mit KI-gestützten Funktionen, Rezept-Integration und Familien-Sharing-Möglichkeiten.' },
        { title: '3. Benutzerkonten', items: ['Du musst bei der Kontoerstellung genaue Angaben machen', 'Du bist für die Sicherheit deines Kontos verantwortlich', 'Du musst mindestens 13 Jahre alt sein, um Shoply zu nutzen'] },
        { title: '4. Akzeptable Nutzung', content: 'Du stimmst zu, Folgendes nicht zu tun:', items: ['Den Service für illegale Zwecke nutzen', 'Versuchen, unbefugten Zugang zum Service zu erlangen', 'Den Service stören oder beeinträchtigen', 'Inhalte teilen, die Rechte anderer verletzen'] },
        { title: '5. Geistiges Eigentum', content: 'Der Shoply-Service, einschließlich aller Inhalte, Funktionen und Features, ist Eigentum von Shoply und durch Urheber- und andere Gesetze geschützt.' },
        { title: '6. Haftungsbeschränkung', content: 'Shoply wird "wie besehen" ohne jegliche Garantien bereitgestellt. Wir haften nicht für Schäden, die aus der Nutzung des Services entstehen.' },
        { title: '7. Änderungen der Bedingungen', content: 'Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Die weitere Nutzung des Services nach Änderungen gilt als Zustimmung zu den neuen Bedingungen.' },
        { title: '8. Kontakt', content: 'Fragen zu diesen Bedingungen? Kontaktiere uns unter' },
      ],
    },
  },
};

// Define the translation interface based on the structure
export interface TranslationKeys {
  nav: {
    features: string;
    howItWorks: string;
    pricing: string;
    about: string;
    getNotified: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subheadline: string;
    subheadline2: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      users: string;
      recipes: string;
      rating: string;
    };
    scrollToExplore: string;
  };
  problem: {
    badge: string;
    headline: string;
    cards: Array<{
      title: string;
      subtitle: string;
    }>;
  };
  features: {
    badge: string;
    headline: string;
    subheadline: string;
    plusMore: string;
    mainFeatures: Array<{
      title: string;
      description: string;
      benefits: string[];
    }>;
    additionalFeatures: Array<{
      title: string;
      description: string;
      fullDescription: string;
      benefits: string[];
    }>;
  };
  experience: {
    badge: string;
    headline: string;
    subheadline: string;
    blocks: Array<{
      title: string;
      description: string;
      stat: { value: string; label: string };
      features: string[];
    }>;
  };
  cta: {
    badge: string;
    headline: string;
    headline2: string;
    subheadline: string;
    subheadlineHighlight: string;
    subheadline2: string;
    rating: string;
    users: string;
    appStore: { label: string; store: string };
    googlePlay: { label: string; store: string };
  };
  footer: {
    description: string;
    product: string;
    company: string;
    legal: string;
    links: {
      features: string;
      howItWorks: string;
      pricing: string;
      faq: string;
      about: string;
      privacy: string;
      terms: string;
    };
    copyright: string;
    builtWith: string;
    inGermany: string;
  };
  emailPopup: {
    title: string;
    description: string;
    placeholder: string;
    button: string;
    submitting: string;
    subscribed: string;
    success: string;
    error: string;
    connectionError: string;
    privacy: string;
  };
  language: {
    toggle: string;
    en: string;
    de: string;
  };
  comparison: {
    badge: string;
    headline: string;
    subheadline: string;
    oldWay: string;
    feature: string;
    shoply: string;
    items: Array<{
      feature: string;
      oldWay: string;
      newWay: string;
    }>;
    ctaText: string;
    ctaButton: string;
  };
  pricing: {
    title: string;
    free: {
      name: string;
      period: string;
      description: string;
      features: string[];
    };
    premium: {
      badge: string;
      name: string;
      period: string;
      description: string;
      features: string[];
    };
    note: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  about: {
    title: string;
    mission: { title: string; text: string };
    building: { title: string; text: string };
    values: {
      title: string;
      items: Array<{ title: string; text: string }>;
    };
    contact: { title: string; text: string };
  };
  privacy: {
    title: string;
    lastUpdated: string;
    sections: Array<{ title: string; content?: string; items?: string[] }>;
  };
  terms: {
    title: string;
    lastUpdated: string;
    sections: Array<{ title: string; content?: string; items?: string[] }>;
  };
}
