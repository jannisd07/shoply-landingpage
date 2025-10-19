# ShoplyAI Language System Testing Guide

## Changes Made

### Files Created:
1. **language-switcher.js** (141 lines) - Centralized language detection and UI updates
2. **floating-language-button-snippet.html** - Reusable HTML component for language button
3. **TESTING.md** - This testing documentation

### Files Modified:
1. **landing-page.html** - Removed inline language code, added language-switcher.js
2. **pricing.html** - Added floating button CSS + HTML, integrated language-switcher.js
3. **how-it-works.html** - Added floating button CSS + HTML, integrated language-switcher.js

## Architecture

### URL-Based Language Routing:
- Default (English): `/`, `/pricing`, `/how-it-works`
- German: `/de`, `/de/pricing`, `/de/how-it-works`
- Spanish: `/es`, `/es/pricing`, `/es/how-it-works`
- French: `/fr`, `/fr/pricing`, `/fr/how-it-works`
- Italian: `/it`, `/it/pricing`, `/it/how-it-works`

### Translation Flow:
1. **URL Parsing**: `getLanguageFromURL()` detects language from pathname
2. **Content Update**: `updateContent(lang)` from translations.js updates all text
3. **Navigation Update**: `updateNavigationLinks(lang)` adds language prefix to all links
4. **UI Update**: `updateActiveLanguage(lang)` highlights current language in dropdown

## Test Scenarios

### ✅ Test 1: Landing Page Language Routes
**Bug Report**: "wenn ich auf italienisch stelle wird zB die horizontalen cards auf englisch angezeigt"

**Test Steps**:
1. Open http://localhost:3000 → Should show English
2. Open http://localhost:3000/de → Should show German
3. Open http://localhost:3000/es → Should show Spanish
4. Open http://localhost:3000/fr → Should show French
5. Open http://localhost:3000/it → Should show Italian

**Verify**:
- [ ] Hero heading translates
- [ ] Navigation links translate
- [ ] Feature cards (6 horizontal cards) translate ← **CRITICAL BUG FIX**
- [ ] How it works section (3 steps) translates
- [ ] Stats section (4 stats) translates
- [ ] CTA section translates
- [ ] Footer translates
- [ ] Modal translates

**Console Output Expected**:
```
🌐 Language detected: it
📍 Current path: /it
📄 Updating content for language: it
```

---

### ✅ Test 2: Pricing Page Language Routes
**Bug Report**: "wechsle ich die seite zB zu preisen zeigt es es auf englisch an"

**Test Steps**:
1. Open http://localhost:3000/pricing → Should show English
2. Open http://localhost:3000/de/pricing → Should show German
3. Open http://localhost:3000/es/pricing → Should show Spanish
4. Open http://localhost:3000/fr/pricing → Should show French
5. Open http://localhost:3000/it/pricing → Should show Italian

**Verify**:
- [ ] Hero heading translates
- [ ] Navigation links translate
- [ ] Pricing cards translate (Free, Premium, Business plans)
- [ ] Features list translates
- [ ] CTA section translates
- [ ] Footer translates

---

### ✅ Test 3: How It Works Page Language Routes
**Bug Report**: "oder zeigt seite nicht gefunden"

**Test Steps**:
1. Open http://localhost:3000/how-it-works → Should show English
2. Open http://localhost:3000/de/how-it-works → Should show German
3. Open http://localhost:3000/es/how-it-works → Should show Spanish
4. Open http://localhost:3000/fr/how-it-works → Should show French
5. Open http://localhost:3000/it/how-it-works → Should show Italian

**Verify**:
- [ ] Hero heading translates
- [ ] Navigation links translate
- [ ] Video section translates
- [ ] Steps section translates
- [ ] Features section translates
- [ ] CTA section translates
- [ ] Footer translates
- [ ] NO 404 errors ← **CRITICAL BUG FIX**

---

### ✅ Test 4: Navigation Language Preservation
**Bug Report**: "wechsle ich die seite zB zu preisen zeigt es es auf englisch an"

**Test Steps**:
1. Open http://localhost:3000/it (Italian landing page)
2. Click "Pricing" link → Should navigate to /it/pricing (Italian)
3. Click "How It Works" → Should navigate to /it/how-it-works (Italian)
4. Click "Home" → Should navigate to /it (Italian)

**Verify**:
- [ ] All navigation maintains /it prefix
- [ ] Content stays in Italian after navigation
- [ ] Mobile menu links also preserve language

**Repeat for**:
- [ ] German (/de)
- [ ] Spanish (/es)
- [ ] French (/fr)

---

### ✅ Test 5: Floating Language Button
**Test Steps**:
1. Open any page (landing, pricing, how-it-works)
2. Look for floating button in bottom-left corner
3. Click button → Dropdown should open
4. Click language (e.g., "Deutsch") → Should navigate to /de version
5. Click button again → Dropdown should close

**Verify**:
- [ ] Button visible on all 3 pages
- [ ] Button shows current language (EN, DE, ES, FR, IT)
- [ ] Dropdown opens/closes smoothly
- [ ] Current language is highlighted in dropdown
- [ ] Clicking language navigates to correct route
- [ ] Button works on mobile (48px size, bottom-left)

---

### ✅ Test 6: Feature Cards Translation (Critical Bug)
**Test Steps**:
1. Open http://localhost:3000 (English)
2. Note the 6 feature cards (Smart Recommendations, Price Tracking, etc.)
3. Navigate to http://localhost:3000/it (Italian)
4. Check if feature cards are now in Italian

**Expected Behavior**:
```javascript
// translations.js should update these elements:
document.querySelectorAll('.feature-card h3')[0].textContent = translations[lang].features.feature1.title;
document.querySelectorAll('.feature-card p')[0].textContent = translations[lang].features.feature1.description;
// ... (repeated for all 6 cards)
```

**Verify**:
- [ ] Feature 1: "Smart Recommendations" → "Intelligente Empfehlungen" (DE)
- [ ] Feature 2: "Price Tracking" → "Preisverfolgung" (DE)
- [ ] Feature 3: "Shopping Lists" → "Einkaufslisten" (DE)
- [ ] Feature 4: "Recipe Suggestions" → "Rezeptvorschläge" (DE)
- [ ] Feature 5: "Store Navigation" → "Geschäftsnavigation" (DE)
- [ ] Feature 6: "Smart Savings" → "Intelligentes Sparen" (DE)

---

### ✅ Test 7: Console Debug Output
**Test Steps**:
1. Open browser DevTools (F12)
2. Navigate to http://localhost:3000/es
3. Check Console tab

**Expected Output**:
```
🌐 Language detected: es
📍 Current path: /es
📄 Updating content for language: es
```

**Verify**:
- [ ] Language detection works correctly
- [ ] Path parsing works correctly
- [ ] updateContent() is called
- [ ] No JavaScript errors

---

### ✅ Test 8: Mobile Responsiveness
**Test Steps**:
1. Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Select iPhone 12 Pro or similar
3. Test all language routes

**Verify**:
- [ ] Floating button is 48px on mobile (not 56px)
- [ ] Floating button is at bottom-left (20px offset)
- [ ] Mobile menu works
- [ ] Language dropdown works on mobile
- [ ] Content is readable and properly formatted

---

## Expected Files Structure

```
shoply-landingpage/
├── landing-page.html         # Main page (refactored)
├── pricing.html              # Pricing page (updated)
├── how-it-works.html         # How It Works page (updated)
├── translations.js           # All translation data (499 lines)
├── language-switcher.js      # Language logic (141 lines, NEW)
├── floating-language-button-snippet.html  # Reusable component (NEW)
├── server.js                 # Express server with language routes
├── TESTING.md                # This file (NEW)
└── ...
```

## Debugging Tips

### If translations don't work:
1. Check browser console for errors
2. Verify translations.js is loaded: `console.log(typeof translations)`
3. Verify language-switcher.js is loaded: `console.log(typeof getLanguageFromURL)`
4. Check if updateContent() is called: Add breakpoint in DevTools

### If navigation breaks language:
1. Check if updateNavigationLinks() is called on page load
2. Inspect href attributes of nav links
3. Verify language prefix is added correctly

### If feature cards stay in English:
1. Check if updateContent() function includes feature cards section
2. Verify selectors: `document.querySelectorAll('.feature-card h3')`
3. Check if translations.js has all 6 feature card translations

## Success Criteria

All of these must be ✅:
- [ ] All 5 languages work on all 3 pages (15 routes total)
- [ ] Feature cards translate correctly in all languages
- [ ] Navigation preserves language when switching pages
- [ ] No 404 errors on any language route
- [ ] Floating language button works on all pages
- [ ] Mobile experience is smooth
- [ ] No console errors

## Next Steps After Testing

1. If all tests pass → Commit and push to GitHub
2. If issues found → Debug using console logs and fix
3. After successful deploy → Test on live Heroku site
4. User acceptance testing → Get user feedback

---

**Last Updated**: After comprehensive refactoring to fix reported bugs
**Test Status**: Ready for systematic testing as requested by user
