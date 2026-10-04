const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
const indexTsPath = path.join(__dirname, 'src', 'index.ts');

let homeEjs = fs.readFileSync(homePath, 'utf8');

// 1. Cookie Banner CSS
const cookieBannerStyles = `
        /* Cookie Banner & Floating Modal */
        .cookie-banner {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(120%);
            width: 90%;
            max-width: 720px;
            background: #0f172a;
            color: #f8fafc;
            padding: 20px 24px;
            border-radius: 14px;
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            z-index: 9999;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .cookie-banner.visible {
            transform: translateX(-50%) translateY(0);
        }
        .cookie-content {
            font-size: 0.88rem;
            line-height: 1.5;
            color: #cbd5e1;
        }
        .cookie-content strong {
            color: #ffffff;
            font-size: 0.95rem;
            display: block;
            margin-bottom: 4px;
        }
        .cookie-content a {
            color: #ea580c;
            text-decoration: underline;
        }
        .cookie-actions {
            display: flex;
            gap: 10px;
            flex-shrink: 0;
        }
        .btn-cookie-decline {
            background: rgba(255, 255, 255, 0.08);
            color: #e2e8f0;
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.85rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-cookie-decline:hover {
            background: rgba(255, 255, 255, 0.18);
        }
        .btn-cookie-accept {
            background: #ea580c;
            color: #ffffff;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.85rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-cookie-accept:hover {
            background: #c2410c;
        }
        @media (max-width: 640px) {
            .cookie-banner {
                flex-direction: column;
                align-items: stretch;
                bottom: 12px;
                padding: 18px;
            }
            .cookie-actions {
                justify-content: flex-end;
            }
        }
    </style>`;

homeEjs = homeEjs.replace('</style>', cookieBannerStyles);

// 2. Cookie Banner HTML Markup
const cookieBannerMarkup = `
    <!-- Cookie & Privacy Agreement Popup -->
    <div id="cookieBanner" class="cookie-banner" role="dialog" aria-live="polite">
        <div class="cookie-content">
            <strong>Cookie & Privacy Consent</strong>
            We use cookies and local storage to remember your search preferences, tailor vehicle suggestions, and detect your nearest inventory hub. Review our <a href="/cookies" target="_blank">Cookie Policy</a>.
        </div>
        <div class="cookie-actions">
            <button id="cookieDeclineBtn" class="btn-cookie-decline">Decline</button>
            <button id="cookieAcceptBtn" class="btn-cookie-accept">Accept All</button>
        </div>
    </div>
</body>`;

homeEjs = homeEjs.replace('</body>', cookieBannerMarkup);

// 3. Automated Geolocation & Cookie Logic
const combinedLogicScript = `
    <script>
        (function() {
            const locBtn = document.getElementById('userLocationBtn');
            const cookieBanner = document.getElementById('cookieBanner');
            const acceptBtn = document.getElementById('cookieAcceptBtn');
            const declineBtn = document.getElementById('cookieDeclineBtn');

            function applyLocationUI(label) {
                if (!locBtn) return;
                locBtn.innerHTML = '📍 ' + label;
                locBtn.style.background = '#fff7ed';
                locBtn.style.borderColor = '#fed7aa';
                locBtn.style.color = 'var(--brand-accent)';
            }

            function requestLiveLocation() {
                if (!navigator.geolocation) {
                    if (locBtn) locBtn.innerHTML = '📍 GPS Unavailable';
                    return;
                }

                if (locBtn) locBtn.innerHTML = '📍 Detecting...';

                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        try {
                            const res = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lon}\`);
                            const data = await res.json();
                            const place = data.address.suburb || data.address.city || data.address.town || data.address.county || data.address.state_district || 'Location Active';
                            localStorage.setItem('userLocation', place);
                            applyLocationUI(place);
                        } catch (err) {
                            applyLocationUI('GPS Connected');
                        }
                    },
                    (err) => {
                        if (locBtn) {
                            if (err.code === err.PERMISSION_DENIED) {
                                locBtn.innerHTML = '📍 Location Denied';
                            } else {
                                locBtn.innerHTML = '📍 Dehradun';
                            }
                        }
                    },
                    { enableHighAccuracy: true, timeout: 8000 }
                );
            }

            document.addEventListener('DOMContentLoaded', () => {
                // Check stored location
                const cachedLocation = localStorage.getItem('userLocation');
                if (cachedLocation) {
                    applyLocationUI(cachedLocation);
                } else {
                    // Automatically trigger browser location permission on load
                    requestLiveLocation();
                }

                // Check cookie consent
                const consent = localStorage.getItem('shivaCookieConsent');
                if (!consent) {
                    setTimeout(() => {
                        cookieBanner.classList.add('visible');
                    }, 600);
                }

                // Banner Button Listeners
                acceptBtn.addEventListener('click', () => {
                    localStorage.setItem('shivaCookieConsent', 'accepted');
                    cookieBanner.classList.remove('visible');
                    if (!localStorage.getItem('userLocation')) {
                        requestLiveLocation();
                    }
                });

                declineBtn.addEventListener('click', () => {
                    localStorage.setItem('shivaCookieConsent', 'declined');
                    cookieBanner.classList.remove('visible');
                });

                // Manual location retry on click
                if (locBtn) {
                    locBtn.addEventListener('click', () => {
                        requestLiveLocation();
                    });
                }
            });
        })();
    </script>
</body>`;

homeEjs = homeEjs.replace('</body>', combinedLogicScript);
fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Auto-location and Cookie Consent banner injected into home.ejs!');

// 4. Register Cookie Policy route in src/index.ts
let indexTs = fs.readFileSync(indexTsPath, 'utf8');

const cookieRoute = `
// Cookie & Privacy Policy Page
app.get('/cookies', (req, res) => {
    res.send(\`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookie Policy | Shiva Motors</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 40px 6%; line-height: 1.7; }
        .wrapper { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 48px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.03); }
        h1 { font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; color: #0f172a; }
        .meta { color: #64748b; font-size: 0.9rem; margin-bottom: 30px; }
        h2 { font-size: 1.3rem; margin-top: 28px; margin-bottom: 12px; color: #ea580c; font-weight: 700; }
        p { color: #334155; margin-bottom: 16px; }
        ul { margin-bottom: 20px; padding-left: 20px; color: #334155; }
        li { margin-bottom: 8px; }
        .btn-home { display: inline-block; margin-top: 24px; padding: 12px 24px; background: #0f172a; color: white; text-decoration: none; border-radius: 8px; font-weight: 700; }
        .btn-home:hover { background: #ea580c; }
    </style>
</head>
<body>
    <div class="wrapper">
        <h1>Cookie & Privacy Agreement</h1>
        <div class="meta">Effective Date: October 2026 | Shiva Motors Hub</div>

        <h2>1. Why We Use Cookies</h2>
        <p>Shiva Motors uses essential browser storage to guarantee secure authentication, save session status, and store your selected vehicle preferences.</p>

        <h2>2. Geolocation Services</h2>
        <p>With your explicit browser permission, we process latitude and longitude coordinates through an open reverse-geocoding service to identify your nearest hub or service point. We do not sell or track continuous telemetry outside of your browser session.</p>

        <h2>3. Managing Your Preferences</h2>
        <p>You may accept or decline analytical and preference cookies at any point. Declining non-essential cookies will not impair your ability to browse inventory, calculate EMIs, or review vehicle specifications.</p>

        <a href="/" class="btn-home">&larr; Return to Marketplace</a>
    </div>
</body>
</html>\`);
});
`;

if (!indexTs.includes('/cookies')) {
    indexTs = indexTs.replace('// --- START SERVER ---', cookieRoute + '\n// --- START SERVER ---');
    fs.writeFileSync(indexTsPath, indexTs);
    console.log('SUCCESS: /cookies policy route registered in src/index.ts!');
}