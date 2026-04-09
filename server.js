const http = require('http');
const path = require('path');

const dir = path.join(__dirname);

process.env.NODE_ENV = 'production';
process.chdir(__dirname);

const PROXY_PORT = 3001;
const PUBLIC_PORT = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

const SUPABASE_URL = 'https://rtwzzerhgieyxsijemsd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0d3p6ZXJoZ2lleXhzaWplbXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDAyOTgsImV4cCI6MjA3NjA3NjI5OH0.modgHtr0QcRd6TTm0-R4eqwynb_jvGYpz-pBmvO6OmA';
const APP_STORE_URL = 'https://apps.apple.com/app/shoply/id6743532834';

const sharedStyles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
    background: #f7f6f1;
    color: #0b1a0f;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.banner {
    position: fixed; top: 0; left: 0; right: 0;
    background: rgba(247,246,241,0.92);
    border-bottom: 1px solid rgba(11,26,15,0.08);
    padding: 10px 16px;
    display: flex; align-items: center; gap: 12px;
    z-index: 100;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}
.banner-icon {
    width: 36px; height: 36px; border-radius: 10px;
    overflow: hidden; flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(62,142,90,0.25);
}
.banner-icon img { width: 100%; height: 100%; object-fit: cover; display: block; }
.banner-text { flex: 1; min-width: 0; }
.banner-title { font-size: 14px; font-weight: 700; color: #0b1a0f; letter-spacing: -0.2px; }
.banner-sub { font-size: 11px; color: #7a8a7f; }
.banner-btn {
    background: #0b1a0f; color: #fff; border: none;
    padding: 8px 18px; border-radius: 100px;
    font-size: 12px; font-weight: 700;
    text-decoration: none; white-space: nowrap;
    letter-spacing: 0.02em;
    transition: background 0.2s;
}
.banner-btn:hover { background: #1c2e21; }
.card {
    background: #fff;
    border-radius: 24px;
    max-width: 420px; width: 100%;
    overflow: hidden;
    margin-top: 68px;
    box-shadow: 0 1px 2px rgba(11,26,15,0.04), 0 24px 60px -20px rgba(11,26,15,0.14);
    border: 1px solid rgba(11,26,15,0.06);
}
.hero-placeholder {
    width: 100%; height: 160px;
    background: linear-gradient(135deg, #e7f4ec 0%, #f0f7f1 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 56px;
}
.hero { width: 100%; height: 220px; object-fit: cover; display: none; }
.content { padding: 24px 24px 20px; }
.item-name {
    font-size: 22px; font-weight: 800; letter-spacing: -0.5px;
    margin-bottom: 6px; line-height: 1.2; color: #0b1a0f;
}
.meta {
    display: flex; gap: 12px; color: #7a8a7f;
    font-size: 13px; margin-bottom: 14px; flex-wrap: wrap;
}
.description {
    color: #4a5a4f; font-size: 14px; line-height: 1.65;
    margin-bottom: 20px;
    display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3;
    -webkit-box-orient: vertical; overflow: hidden;
}
.open-btn {
    display: block; width: 100%;
    background: #0b1a0f; color: #fff;
    text-decoration: none; padding: 14px;
    border-radius: 100px; font-size: 15px; font-weight: 700;
    text-align: center; letter-spacing: -0.2px;
    transition: background 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 16px -6px rgba(11,26,15,0.35);
}
.open-btn:hover { background: #1c2e21; box-shadow: 0 8px 24px -8px rgba(62,142,90,0.45); }
.footer {
    text-align: center; padding: 14px 24px 18px;
    color: #7a8a7f; font-size: 12px;
    border-top: 1px solid rgba(11,26,15,0.06);
    background: #fafaf7;
}
.footer a { color: #3e8e5a; text-decoration: none; font-weight: 600; }
.footer a:hover { text-decoration: underline; }
.loading { display: none; text-align: center; padding: 10px 0 0; color: #7a8a7f; font-size: 13px; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.loading p { animation: pulse 1.5s infinite; }
.tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 100px;
    background: #e7f4ec; border: 1px solid rgba(62,142,90,0.2);
    color: #2d6f45; font-size: 11px; font-weight: 600;
    margin-bottom: 14px;
}
.tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #3e8e5a; }
`;

const sharedScript = `
const SUPABASE_URL = '${SUPABASE_URL}';
const SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';
function tryOpenApp(deepLink) {
    var isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isMobile) {
        document.getElementById('loading').style.display = 'block';
        window.location.href = deepLink;
        setTimeout(function() { document.getElementById('loading').style.display = 'none'; }, 2500);
    }
}
document.getElementById('openAppBtn').addEventListener('click', function() {
    document.getElementById('loading').style.display = 'block';
});
`;

// Recipe share page HTML
const recipePageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Recipe - Avo</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="Check out this recipe on Avo">
    <meta property="og:description" content="Discover delicious recipes and create smart shopping lists with Avo">
    <meta property="og:image" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Check out this recipe on Avo">
    <meta name="twitter:description" content="Discover delicious recipes and create smart shopping lists with Avo">
    <meta name="apple-itunes-app" content="app-id=6743532834">
    <style>${sharedStyles}</style>
</head>
<body>
    <div class="banner" id="appBanner">
        <div class="banner-icon"><img src="/images/avo-logo.png" alt="Avo"></div>
        <div class="banner-text">
            <div class="banner-title">Avo</div>
            <div class="banner-sub">In der App öffnen</div>
        </div>
        <a href="#" class="banner-btn" id="bannerOpenBtn">Öffnen</a>
    </div>
    <div class="card">
        <img class="hero" id="heroImg" alt="Recipe">
        <div class="hero-placeholder" id="heroPlaceholder">🍳</div>
        <div class="content">
            <div class="tag"><span class="tag-dot"></span>Rezept</div>
            <p class="item-name" id="recipeName">Rezept laden…</p>
            <div class="meta" id="meta" style="display:none">
                <span id="metaTime"></span>
                <span id="metaRating"></span>
                <span id="metaServings"></span>
            </div>
            <p class="description" id="recipeDescription">
                Öffne dieses Rezept in Avo, um Zutaten und Anleitung zu sehen – und direkt zur Einkaufsliste hinzuzufügen.
            </p>
            <a href="#" class="open-btn" id="openAppBtn">In Avo öffnen</a>
            <div class="loading" id="loading"><p>App wird geöffnet…</p></div>
        </div>
        <div class="footer">
            Noch kein Avo? <a href="${APP_STORE_URL}">Im App Store laden</a>
        </div>
    </div>
    <script>
        ${sharedScript}
        var pathParts = window.location.pathname.split('/');
        var recipeId = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
        var deepLink = 'shoply://recipe/' + recipeId;
        document.getElementById('openAppBtn').href = deepLink;
        document.getElementById('bannerOpenBtn').href = deepLink;
        var metaTag = document.querySelector('meta[name="apple-itunes-app"]');
        if (metaTag) metaTag.content = 'app-id=6743532834, app-argument=' + deepLink;
        async function fetchRecipeDetails() {
            try {
                var res = await fetch(
                    SUPABASE_URL + '/rest/v1/recipes?id=eq.' + recipeId + '&select=name,description,image_url,total_time_minutes,average_rating,rating_count,default_servings',
                    { headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY } }
                );
                if (!res.ok) return;
                var data = await res.json();
                if (!data || data.length === 0) return;
                var r = data[0];
                document.getElementById('recipeName').textContent = r.name;
                if (r.description) document.getElementById('recipeDescription').textContent = r.description;
                if (r.image_url) {
                    var img = document.getElementById('heroImg');
                    img.src = r.image_url; img.style.display = 'block';
                    document.getElementById('heroPlaceholder').style.display = 'none';
                }
                var metaEl = document.getElementById('meta');
                if (r.total_time_minutes || r.average_rating || r.default_servings) {
                    metaEl.style.display = 'flex';
                    if (r.total_time_minutes) document.getElementById('metaTime').textContent = '\u23F1 ' + r.total_time_minutes + ' min';
                    if (r.average_rating) document.getElementById('metaRating').textContent = '\u2B50 ' + r.average_rating.toFixed(1);
                    if (r.default_servings) document.getElementById('metaServings').textContent = '\uD83C\uDF7D ' + r.default_servings + ' Portionen';
                }
                document.title = r.name + ' \u2013 Avo';
                document.querySelector('meta[property="og:title"]').content = '\uD83C\uDF73 ' + r.name;
                document.querySelector('meta[property="og:description"]').content = r.description || 'Schau dir dieses Rezept auf Avo an';
                if (r.image_url) {
                    document.querySelector('meta[property="og:image"]').content = r.image_url;
                    var twitterImg = document.querySelector('meta[name="twitter:image"]');
                    if (twitterImg) twitterImg.content = r.image_url;
                }
            } catch (e) { console.log('Could not fetch recipe details:', e); }
        }
        fetchRecipeDetails();
        tryOpenApp(deepLink);
    </script>
</body>
</html>`;

// List share page HTML
const listPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Einkaufsliste - Avo</title>
    <meta property="og:type" content="website">
    <meta property="og:url" content="">
    <meta property="og:title" content="Einkaufsliste auf Avo">
    <meta property="og:description" content="Gemeinsam einkaufen mit Avo \u2014 Einkaufslisten in Echtzeit teilen">
    <meta property="og:image" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Einkaufsliste auf Avo">
    <meta name="twitter:description" content="Gemeinsam einkaufen mit Avo \u2014 Einkaufslisten in Echtzeit teilen">
    <meta name="apple-itunes-app" content="app-id=6743532834">
    <style>${sharedStyles}</style>
</head>
<body>
    <div class="banner" id="appBanner">
        <div class="banner-icon"><img src="/images/avo-logo.png" alt="Avo"></div>
        <div class="banner-text">
            <div class="banner-title">Avo</div>
            <div class="banner-sub">In der App öffnen</div>
        </div>
        <a href="#" class="banner-btn" id="bannerOpenBtn">Öffnen</a>
    </div>
    <div class="card">
        <div class="hero-placeholder">🛒</div>
        <div class="content">
            <div class="tag"><span class="tag-dot"></span>Einkaufsliste</div>
            <p class="item-name" id="listName">Einkaufsliste</p>
            <p class="description">
                Öffne diese Einkaufsliste in Avo, um Artikel zu sehen, gemeinsam einzukaufen und Artikel abzuhaken.
            </p>
            <a href="#" class="open-btn" id="openAppBtn">In Avo öffnen</a>
            <div class="loading" id="loading"><p>App wird geöffnet…</p></div>
        </div>
        <div class="footer">
            Noch kein Avo? <a href="${APP_STORE_URL}">Im App Store laden</a>
        </div>
    </div>
    <script>
        ${sharedScript}
        var pathParts = window.location.pathname.split('/');
        var listId = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
        var deepLink = 'shoply://list/' + listId;
        document.getElementById('openAppBtn').href = deepLink;
        document.getElementById('bannerOpenBtn').href = deepLink;
        var metaTag = document.querySelector('meta[name="apple-itunes-app"]');
        if (metaTag) metaTag.content = 'app-id=6743532834, app-argument=' + deepLink;
        async function fetchListDetails() {
            try {
                var res = await fetch(
                    SUPABASE_URL + '/rest/v1/shopping_lists?id=eq.' + listId + '&select=name',
                    { headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY } }
                );
                if (!res.ok) return;
                var data = await res.json();
                if (!data || data.length === 0) return;
                var list = data[0];
                document.getElementById('listName').textContent = list.name;
                document.title = list.name + ' \u2013 Avo';
                document.querySelector('meta[property="og:title"]').content = '\uD83D\uDED2 ' + list.name;
            } catch (e) { console.log('Could not fetch list details:', e); }
        }
        fetchListDetails();
        tryOpenApp(deepLink);
    </script>
</body>
</html>`;

// ---- Start Next.js on internal port ----
let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10);
const nextConfig = require('./.next/required-server-files.json').config;

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);

require('next');
const { startServer } = require('next/dist/server/lib/start-server');

if (
  Number.isNaN(keepAliveTimeout) ||
  !Number.isFinite(keepAliveTimeout) ||
  keepAliveTimeout < 0
) {
  keepAliveTimeout = undefined;
}

// Start Next.js on the internal proxy port
startServer({
  dir,
  isDev: false,
  config: nextConfig,
  hostname,
  port: PROXY_PORT,
  allowRetry: false,
  keepAliveTimeout,
}).then(() => {
  console.log(`Next.js started on internal port ${PROXY_PORT}`);

  // Apple App Site Association
  const aasf = JSON.stringify({
    applinks: {
      apps: [],
      details: [{
        appIDs: ["CTBGYBDPP4.com.dominik.shoply"],
        components: [
          { "/": "/recipe/*", comment: "Matches any recipe deep link" },
          { "/": "/list/*", comment: "Matches any list deep link" },
          { "/": "/invite/*", comment: "Matches any invite deep link" },
          { "/": "/author/*", comment: "Matches any author deep link" }
        ]
      }]
    },
    webcredentials: { apps: ["CTBGYBDPP4.com.dominik.shoply"] }
  });

  // Android Asset Links
  const assetLinks = JSON.stringify([{
    relation: ["delegate_permission/common.handle_all_urls"],
    target: { namespace: "android_app", package_name: "com.dominik.shoply", sha256_cert_fingerprints: [] }
  }]);

  // Create proxy server on the public port
  const proxy = http.createServer((req, res) => {
    // Serve Apple App Site Association
    if (req.url === '/.well-known/apple-app-site-association') {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400' });
      res.end(aasf);
      return;
    }

    // Serve Android Asset Links
    if (req.url === '/.well-known/assetlinks.json') {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400' });
      res.end(assetLinks);
      return;
    }

    // Handle /recipe/{id} directly
    if (/^\/recipe\/[^/?]+/.test(req.url)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
      res.end(recipePageHtml);
      return;
    }

    // Handle /list/{id} directly
    if (/^\/list\/[^/?]+/.test(req.url)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600' });
      res.end(listPageHtml);
      return;
    }

    // Proxy everything else to Next.js
    const options = {
      hostname: '127.0.0.1',
      port: PROXY_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      console.error('Proxy error:', err);
      res.writeHead(502);
      res.end('Bad Gateway');
    });

    req.pipe(proxyReq, { end: true });
  });

  proxy.listen(PUBLIC_PORT, hostname, () => {
    console.log(`Proxy server listening on ${hostname}:${PUBLIC_PORT}`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
