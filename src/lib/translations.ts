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
      badge: 'AI-powered grocery lists',
      headline1: 'Grocery shopping,',
      headline2: 'finally fresh.',
      subheadline: 'Avo turns your family\'s shopping into a calm, collaborative ritual —',
      subheadline2: 'AI-sorted lists, 10,000+ recipes, and a list everyone shares in real time.',
      ctaPrimary: 'Start shopping smarter',
      ctaSecondary: 'Get notified at launch',
      stats: {
        users: 'Active families',
        recipes: 'Recipes inside',
        rating: 'App Store rating',
      },
      scrollToExplore: 'Scroll to explore',
      chips: {
        chip1Label: 'Mom added',
        chip1Value: 'Avocados · 2',
        chip2Label: 'Recipe saved',
        chip2Value: 'Guacamole toast',
        chip3Label: 'Aisle 3',
        chip3Value: '12 items · sorted',
      },
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
      badge: 'How Avo Works',
      headline: 'Smarter Grocery Shopping',
      subheadline: "See how Avo's AI-powered features make family shopping effortless.",
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
          stat: { value: '50,000+', label: 'families using Avo' },
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
      copyright: 'Avo. All rights reserved.',
      builtWith: 'Built with',
      inGermany: 'in Germany',
    },

    // Email Popup
    emailPopup: {
      title: 'Coming Soon!',
      description: 'Avo is launching soon. Enter your email to be notified when we go live.',
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
      badge: 'Why Choose Avo',
      headline: 'Traditional Apps vs. Avo',
      subheadline: 'See why families are switching to the smartest grocery list app.',
      oldWay: 'Old Way',
      feature: 'Feature',
      shoply: 'Avo',
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
      subtitle: 'Find answers to common questions about Avo, the AI-powered grocery shopping list app designed for families.',
      items: [
        { question: 'When will the Avo grocery app be available?', answer: 'Avo is currently in development. Sign up for our newsletter to be notified when we launch on iOS and Android!' },
        { question: 'Is Avo free to download and use?', answer: 'Yes! Avo will have a generous free tier that includes unlimited shopping lists, AI-powered categorization, and list sharing with up to 3 family members. Premium features will be available for a monthly subscription.' },
        { question: 'What platforms does Avo support?', answer: 'Avo will be available on iPhone (iOS) and Android devices at launch. A web version for desktop browsers is planned for the future.' },
        { question: 'How does the AI grocery categorization work?', answer: 'Our AI automatically recognizes grocery items you add and sorts them into store categories like Produce, Dairy, Meat, Frozen, etc. It learns your shopping preferences over time to provide smarter product suggestions.' },
        { question: 'Can I share shopping lists with my family?', answer: 'Absolutely! Avo is built for family collaboration. Share grocery lists with family members and see real-time updates as items are added, edited, or checked off. Perfect for couples, families, and roommates.' },
        { question: 'How does recipe-to-shopping-list work?', answer: 'Browse our library of 10,000+ recipes, find one you like, and tap once to instantly add all ingredients to your shopping list. You can also filter recipes by dietary restrictions and allergies.' },
        { question: 'Is my shopping data private and secure?', answer: 'Yes. We take your privacy seriously. All data is encrypted in transit and at rest. We never sell your personal information to third parties. See our Privacy Policy for full details.' },
        { question: 'Does Avo work offline at the grocery store?', answer: 'Yes! Avo works fully offline so you can access your shopping lists even without internet connection at the store. Your lists sync automatically when you reconnect.' },
      ],
    },

    // About Page
    about: {
      title: 'About Avo',
      mission: {
        title: 'Our Mission',
        text: 'We believe grocery shopping should be simple, collaborative, and even enjoyable. Avo was born from the frustration of forgotten items, miscommunicated lists, and the daily chaos of feeding a family.',
      },
      building: {
        title: 'What We\'re Building',
        text: 'Avo is an AI-powered shopping list app that learns your preferences, keeps your family in sync, and makes meal planning a breeze. We\'re combining cutting-edge technology with thoughtful design to reimagine how you shop.',
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
        { title: '2. How We Use Your Information', items: ['To provide and improve Avo\'s features', 'To personalize your experience with AI recommendations', 'To enable list sharing and collaboration', 'To send important updates about the service'] },
        { title: '3. Data Sharing', content: 'We do not sell your personal information. We may share data only with:', items: ['Service providers who help us operate Avo', 'Other users you explicitly choose to share lists with', 'Legal authorities when required by law'] },
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
        { title: '1. Acceptance of Terms', content: 'By accessing or using Avo, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.' },
        { title: '2. Description of Service', content: 'Avo is a collaborative shopping list application with AI-powered features, recipe integration, and family sharing capabilities.' },
        { title: '3. User Accounts', items: ['You must provide accurate information when creating an account', 'You are responsible for maintaining the security of your account', 'You must be at least 13 years old to use Avo'] },
        { title: '4. Acceptable Use', content: 'You agree not to:', items: ['Use the service for any illegal purpose', 'Attempt to gain unauthorized access to the service', 'Interfere with or disrupt the service', 'Share content that violates others\' rights'] },
        { title: '5. Intellectual Property', content: 'The Avo service, including all content, features, and functionality, is owned by Avo and protected by copyright and other laws.' },
        { title: '6. Limitation of Liability', content: 'Avo is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.' },
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
      headline1: 'Einkaufen,',
      headline2: 'endlich einfach.',
      subheadline: 'Avo organisiert deine Einkäufe, teilt Listen mit der Familie —',
      subheadline2: 'KI-sortiert, mit 10.000+ Rezepten, für alle in Echtzeit.',
      ctaPrimary: 'Kostenlos vormerken',
      ctaSecondary: 'Zum Start informieren',
      stats: {
        users: 'Aktive Familien',
        recipes: 'Rezepte',
        rating: 'App Store-Wertung',
      },
      scrollToExplore: 'Scrollen zum Entdecken',
      chips: {
        chip1Label: 'Mama hat hinzugefügt',
        chip1Value: 'Avocados · 2',
        chip2Label: 'Rezept gespeichert',
        chip2Value: 'Guacamole Toast',
        chip3Label: 'Gang 3',
        chip3Value: '12 Artikel · sortiert',
      },
    },

    // Problem Section - SEO-optimized German
    problem: {
      badge: 'Hand aufs Herz.',
      headline: 'Kennst du das?',
      cards: [
        {
          title: 'Milch. Schon wieder.',
          subtitle: 'Immer fehlt genau das eine.',
        },
        {
          title: '10 Minuten suchen.',
          subtitle: 'Weil kein Plan, kein Überblick.',
        },
        {
          title: 'Papa kauft. Mama auch.',
          subtitle: 'Doppelt eingekauft, doppelt vergeudet.',
        },
        {
          title: '15 Zutaten. 5 vergessen.',
          subtitle: 'Das Rezept klappt trotzdem nicht.',
        },
        {
          title: 'Wegwerfen statt essen.',
          subtitle: 'Zu viel, zu doppelt, zu spät.',
        },
      ],
    },

    // Feature Section - SEO-optimized German
    features: {
      badge: 'Was Avo kann',
      headline: 'Deine Familie. Immer in sync.',
      subheadline: 'Alles, was du beim Einkaufen wirklich brauchst.',
      plusMore: 'Und noch mehr...',
      mainFeatures: [
        {
          title: 'KI sortiert. Du kaufst.',
          description: 'Avo erkennt jeden Artikel und sortiert ihn automatisch — nach Gang, Kategorie, Supermarkt. Keine Zettelwirtschaft mehr, keine Sucherei.',
          benefits: ['Automatisch sortiert', 'Lernt deine Gewohnheiten', 'Immer der kürzeste Weg'],
        },
        {
          title: 'Alle auf einer Liste.',
          description: 'Teile die Liste mit deiner Familie — in Echtzeit. Was Papa hinzufügt, sieht Mama sofort. Kein doppelter Kauf mehr.',
          benefits: ['Echtzeit für alle', 'Sofort geteilt', 'Live-Updates'],
        },
        {
          title: 'Rezept? Direkt eingekauft.',
          description: 'Über 10.000 Rezepte. Ein Tipp — alle Zutaten landen auf der Liste. Kochen war noch nie so entspannt.',
          benefits: ['10.000+ Rezepte', 'Allergie- & Diätfilter', 'Schritt-für-Schritt kochen'],
        },
      ],
      additionalFeatures: [
        {
          title: 'Einfach sagen.',
          description: 'Freihändig hinzufügen mit Siri',
          fullDescription: '"Hey Siri, Milch auf die Liste" — fertig. Kein Tippen, kein Suchen. Einfach sagen, während du kochst oder fährst.',
          benefits: ['Siri-Integration', 'Freihändig', 'Natürliche Sprache'],
        },
        {
          title: 'Deals kommen zu dir.',
          description: 'Angebote von Lidl, REWE, Aldi & mehr',
          fullDescription: 'Kein Prospekte blättern mehr. Avo zeigt dir live, wenn Artikel auf deiner Liste gerade im Angebot sind — bei deinem Supermarkt.',
          benefits: ['Live-Angebote', 'Preisvergleich', 'Benachrichtigung bei Deals'],
        },
        {
          title: 'Allergien? Kein Stress.',
          description: 'Automatische Alternativen für deine Familie',
          fullDescription: 'Einmal Unverträglichkeiten eintragen — Avo warnt automatisch und schlägt Alternativen vor. Für alle in der Familie.',
          benefits: ['Allergen-Warnungen', 'Sichere Alternativen', 'Familienprofile'],
        },
      ],
    },

    // Experience Section - SEO-optimized German
    experience: {
      badge: 'So einfach geht\'s',
      headline: 'So einfach war Einkaufen nie.',
      subheadline: 'Kein Tippen, kein Vergessen, kein Stress.',
      blocks: [
        {
          title: 'KI, die für dich denkt.',
          description: 'Avo kategorisiert jeden Artikel automatisch und lernt, wie du einkaufst. Kein Sortieren, kein Suchen — nur einkaufen.',
          stat: { value: '95%', label: 'Genauigkeit bei der Kategorisierung' },
          features: ['Automatisch nach Gang sortiert', 'Lernt deine Gewohnheiten', 'Smarte Vorschläge'],
        },
        {
          title: 'Familie? Alle dabei.',
          description: 'Deine Liste, für alle. Mama, Papa, Kinder — alle sehen in Echtzeit, was auf der Liste steht. Kein doppelter Kauf, kein "Hast du...?"',
          stat: { value: '50.000+', label: 'Familien nutzen Avo' },
          features: ['Echtzeit für alle Geräte', 'Sofort teilen', 'Live-Updates'],
        },
        {
          title: 'Rezept → Liste. Fertig.',
          description: 'Über 10.000 Rezepte. Gefällt dir eins? Ein Tipp — alle Zutaten sind auf der Liste. Kochst du heute Abend, kaufst du heute Nachmittag richtig ein.',
          stat: { value: '10.000+', label: 'Rezepte enthalten' },
          features: ['Allergie- & Diätfilter', 'Schritt-für-Schritt kochen', 'Lieblinge speichern'],
        },
      ],
    },

    // CTA Section - SEO-optimized German
    cta: {
      badge: 'Kostenlos · Kein Stress',
      headline: 'Nie wieder',
      headline2: 'vergessen.',
      subheadline: 'Schon',
      subheadlineHighlight: '50.000+',
      subheadline2: 'Familien kaufen smarter ein — mit Avo.',
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
      copyright: 'Avo. Alle Rechte vorbehalten.',
      builtWith: 'Entwickelt mit',
      inGermany: 'in Deutschland',
    },

    // Email Popup - SEO-optimized German
    emailPopup: {
      title: 'Bald verfügbar!',
      description: 'Avo startet bald. Gib deine E-Mail ein, um benachrichtigt zu werden, wenn wir live gehen.',
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
      badge: 'Ehrlich gesagt',
      headline: 'Alle anderen. Und Avo.',
      subheadline: 'Kein Vergleich.',
      oldWay: 'Früher',
      feature: 'Funktion',
      shoply: 'Avo',
      items: [
        { feature: 'Synchronisation', oldWay: 'Kein Sync', newWay: 'Echtzeit für alle' },
        { feature: 'Kategorisierung', oldWay: 'Alles von Hand', newWay: 'KI macht\'s automatisch' },
        { feature: 'Zutaten', oldWay: 'Tippen, tippen, tippen', newWay: 'Ein Tipp reicht' },
        { feature: 'Teilen', oldWay: 'Nur allein', newWay: 'Familie immer dabei' },
        { feature: 'Sprachsteuerung', oldWay: 'Nicht möglich', newWay: 'Einfach sagen' },
        { feature: 'Angebote', oldWay: 'Prospekte wälzen', newWay: 'Deals kommen zu dir' },
        { feature: 'Allergien', oldWay: 'Etiketten lesen', newWay: 'Avo warnt dich' },
        { feature: 'Offline', oldWay: 'Papierzettel', newWay: 'Auch ohne WLAN' },
      ],
      ctaText: 'Zeit für einen Wechsel.',
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
      subtitle: 'Finde Antworten auf häufige Fragen zu Avo, der KI-gestützten Einkaufslisten-App für Familien.',
      items: [
        { question: 'Wann wird die Avo-App verfügbar sein?', answer: 'Avo befindet sich derzeit in der Entwicklung. Melde dich für unseren Newsletter an, um benachrichtigt zu werden, wenn wir auf iOS und Android starten!' },
        { question: 'Ist Avo kostenlos?', answer: 'Ja! Avo wird eine großzügige kostenlose Version haben, die unbegrenzte Einkaufslisten, KI-gestützte Kategorisierung und Listen-Teilen mit bis zu 3 Familienmitgliedern umfasst. Premium-Funktionen sind gegen ein monatliches Abonnement verfügbar.' },
        { question: 'Welche Plattformen unterstützt Avo?', answer: 'Avo wird zum Start auf iPhone (iOS) und Android-Geräten verfügbar sein. Eine Web-Version für Desktop-Browser ist für die Zukunft geplant.' },
        { question: 'Wie funktioniert die KI-Kategorisierung?', answer: 'Unsere KI erkennt automatisch Lebensmittel, die du hinzufügst, und sortiert sie in Laden-Kategorien wie Obst & Gemüse, Milchprodukte, Fleisch, Tiefkühl usw. Sie lernt deine Einkaufsvorlieben und macht smartere Produktvorschläge.' },
        { question: 'Kann ich Einkaufslisten mit meiner Familie teilen?', answer: 'Absolut! Avo ist für Familien-Zusammenarbeit gebaut. Teile Einkaufslisten mit Familienmitgliedern und sieh Echtzeit-Updates, wenn Artikel hinzugefügt, bearbeitet oder abgehakt werden. Perfekt für Paare, Familien und WGs.' },
        { question: 'Wie funktioniert Rezept-zu-Einkaufsliste?', answer: 'Durchstöbere unsere Bibliothek mit über 10.000 Rezepten, finde eines, das dir gefällt, und tippe einmal, um alle Zutaten sofort zu deiner Einkaufsliste hinzuzufügen. Du kannst Rezepte auch nach Diät und Allergien filtern.' },
        { question: 'Sind meine Einkaufsdaten privat und sicher?', answer: 'Ja. Wir nehmen deine Privatsphäre ernst. Alle Daten sind während der Übertragung und im Ruhezustand verschlüsselt. Wir verkaufen niemals deine persönlichen Daten an Dritte. Siehe unsere Datenschutzerklärung für Details.' },
        { question: 'Funktioniert Avo offline im Laden?', answer: 'Ja! Avo funktioniert vollständig offline, sodass du auch ohne Internetverbindung im Laden auf deine Einkaufslisten zugreifen kannst. Deine Listen synchronisieren sich automatisch, wenn du wieder online bist.' },
      ],
    },

    // About Page - German
    about: {
      title: 'Über Avo',
      mission: {
        title: 'Unsere Mission',
        text: 'Wir glauben, dass Einkaufen einfach, gemeinschaftlich und sogar angenehm sein sollte. Avo wurde aus der Frustration über vergessene Artikel, falsch kommunizierte Listen und dem täglichen Chaos beim Versorgen einer Familie geboren.',
      },
      building: {
        title: 'Was wir entwickeln',
        text: 'Avo ist eine KI-gestützte Einkaufslisten-App, die deine Vorlieben lernt, deine Familie synchron hält und die Mahlzeitenplanung zum Kinderspiel macht. Wir kombinieren modernste Technologie mit durchdachtem Design, um das Einkaufen neu zu definieren.',
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
        { title: '2. Wie wir deine Daten nutzen', items: ['Um Avos Funktionen bereitzustellen und zu verbessern', 'Um dein Erlebnis mit KI-Empfehlungen zu personalisieren', 'Um Listen-Teilen und Zusammenarbeit zu ermöglichen', 'Um wichtige Updates zum Service zu senden'] },
        { title: '3. Datenweitergabe', content: 'Wir verkaufen deine persönlichen Daten nicht. Wir teilen Daten nur mit:', items: ['Dienstleistern, die uns beim Betrieb von Avo helfen', 'Anderen Nutzern, mit denen du Listen teilen möchtest', 'Behörden, wenn gesetzlich vorgeschrieben'] },
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
        { title: '1. Annahme der Bedingungen', content: 'Durch Zugriff oder Nutzung von Avo erklärst du dich mit diesen Nutzungsbedingungen einverstanden. Wenn du diesen Bedingungen nicht zustimmst, nutze den Service bitte nicht.' },
        { title: '2. Beschreibung des Services', content: 'Avo ist eine kollaborative Einkaufslisten-Anwendung mit KI-gestützten Funktionen, Rezept-Integration und Familien-Sharing-Möglichkeiten.' },
        { title: '3. Benutzerkonten', items: ['Du musst bei der Kontoerstellung genaue Angaben machen', 'Du bist für die Sicherheit deines Kontos verantwortlich', 'Du musst mindestens 13 Jahre alt sein, um Avo zu nutzen'] },
        { title: '4. Akzeptable Nutzung', content: 'Du stimmst zu, Folgendes nicht zu tun:', items: ['Den Service für illegale Zwecke nutzen', 'Versuchen, unbefugten Zugang zum Service zu erlangen', 'Den Service stören oder beeinträchtigen', 'Inhalte teilen, die Rechte anderer verletzen'] },
        { title: '5. Geistiges Eigentum', content: 'Der Avo-Service, einschließlich aller Inhalte, Funktionen und Features, ist Eigentum von Avo und durch Urheber- und andere Gesetze geschützt.' },
        { title: '6. Haftungsbeschränkung', content: 'Avo wird "wie besehen" ohne jegliche Garantien bereitgestellt. Wir haften nicht für Schäden, die aus der Nutzung des Services entstehen.' },
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
