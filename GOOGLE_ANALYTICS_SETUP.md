# Google Analytics Setup Guide for ShoplyAI

This guide will walk you through setting up Google Analytics 4 (GA4) for your ShoplyAI landing page to track visitor behavior, page views, and user interactions.

## Prerequisites

- A Google account
- Access to the ShoplyAI website files

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Start measuring** (or **Admin** if you already have an account)
3. Click **Create Account** and enter an account name (e.g., "ShoplyAI")
4. Configure data sharing settings according to your preferences
5. Click **Next**

## Step 2: Create a Property

1. Enter a **Property name** (e.g., "ShoplyAI Landing Page")
2. Select your **Reporting time zone** and **Currency**
3. Click **Next**
4. Fill in business information:
   - Industry category: Select the most relevant (e.g., "Shopping")
   - Business size: Select your business size
5. Select your objectives (e.g., "Generate leads", "Examine user behavior")
6. Click **Create**
7. Accept the **Terms of Service Agreement**

## Step 3: Set Up Data Stream

1. Select **Web** as your platform
2. Enter your website details:
   - **Website URL**: Your production URL (e.g., `https://shoplyai.com`)
   - **Stream name**: "ShoplyAI Main Site" (or any descriptive name)
3. (Optional) Enable **Enhanced measurement** to automatically track:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Video engagement
   - File downloads
4. Click **Create stream**

## Step 4: Get Your Measurement ID

After creating the data stream, you'll see a **Measurement ID** that looks like this:

```
G-XXXXXXXXXX
```

**Copy this ID** - you'll need it in the next step.

You can always find your Measurement ID by:
1. Going to **Admin** (bottom left)
2. Under **Property**, click **Data Streams**
3. Click on your web stream
4. Your Measurement ID is displayed at the top

## Step 5: Add Measurement ID to Your Website

### For Landing Page (landing-page.html)

1. Open `landing-page.html`
2. Find the Google Analytics code in the `<head>` section (lines 5-11)
3. Replace both instances of `GA_MEASUREMENT_ID` with your actual Measurement ID:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

### For Other Pages

Repeat the same process for:
- `pricing.html`
- `how-it-works.html`

All pages should have the same Google Analytics code in their `<head>` section.

## Step 6: Test Your Setup

### Method 1: Using Google Analytics Realtime Reports

1. After updating your files, visit your website
2. Go to Google Analytics
3. Click **Reports** → **Realtime**
4. You should see yourself as an active user
5. Navigate through different pages to confirm tracking works

### Method 2: Using Browser Developer Tools

1. Open your website in a browser
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to the **Network** tab
4. Filter by "collect" or "analytics"
5. Refresh the page
6. You should see requests being sent to Google Analytics

## Step 7: Configure Enhanced Tracking (Optional)

### Track Custom Events

You can track specific user interactions like button clicks. Here's an example for tracking the "Get Started" button clicks:

```javascript
// Add this to your button's click event
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': 'get_started_button'
        });
    });
});
```

### Track Email Submissions

Track when users submit their email:

```javascript
// Add this to your email form submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Track event
    gtag('event', 'generate_lead', {
        'event_category': 'engagement',
        'event_label': 'email_signup'
    });
    
    // ... rest of your form handling code
});
```

## Step 8: Set Up Goals and Conversions

1. In Google Analytics, go to **Admin**
2. Under **Property**, click **Events**
3. Click **Create event** to define custom events as conversions
4. Mark important events (like `generate_lead`) as **Conversions**

## Important Notes

### Development vs Production

- **For development**: Create a separate GA4 property for testing
- **For production**: Use your main GA4 property
- Consider using different Measurement IDs for different environments

### Privacy Compliance

- Add a **Privacy Policy** to your website explaining data collection
- Implement a **Cookie Consent** banner if required by GDPR/CCPA
- Consider using Google's [Consent Mode](https://support.google.com/analytics/answer/9976101)

### Data Retention

- By default, GA4 retains user-level data for 2 months
- You can change this in **Admin** → **Data Settings** → **Data Retention**
- Options: 2 months or 14 months

## Useful Resources

- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [Event Tracking Documentation](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Realtime Reports](https://support.google.com/analytics/answer/9271392)

## Troubleshooting

### Not Seeing Data?

1. **Check Measurement ID**: Ensure it's correct and matches your GA4 property
2. **Check Browser Console**: Look for any JavaScript errors
3. **Wait a few minutes**: Data can take up to 24 hours to appear in reports (but should show in Realtime immediately)
4. **Ad Blockers**: Disable ad blockers or use Incognito mode for testing
5. **Script Loading**: Ensure the GA script loads before any tracking calls

### Testing Locally?

- GA4 works with `localhost` and local development
- You'll see your local visits in Realtime reports
- Consider filtering out internal traffic in production (see next section)

### Filter Out Internal Traffic

1. Go to **Admin** → **Data Streams**
2. Click your web stream
3. Click **Configure tag settings** → **Show more** → **Define internal traffic**
4. Add your IP address or IP range to exclude your own visits

## Next Steps

After setup, you can:
- Create custom reports and dashboards
- Set up **Google Search Console** integration
- Configure **Google Ads** linking (if running ads)
- Set up **BigQuery** export for advanced analysis
- Create **Audiences** for remarketing

## Support

For questions or issues:
- Check the [Google Analytics Community](https://support.google.com/analytics/community)
- Review the [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)

---

**Note**: Remember to replace `GA_MEASUREMENT_ID` with your actual Measurement ID in all HTML files before deploying to production!
