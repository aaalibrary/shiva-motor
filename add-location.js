const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homePath, 'utf8');

// 1. Upgrade the static location span into an interactive button
homeEjs = homeEjs.replace(
    '<span class="location-tag">📍 Dehradun</span>',
    '<span class="location-tag" id="userLocationBtn" style="cursor: pointer; padding: 6px 10px; border-radius: 8px; transition: all 0.3s; border: 1px solid transparent;" title="Click to detect your exact location">📍 Dehradun (Click to Update)</span>'
);

// 2. Inject the Geolocation and Reverse-Geocoding script
const geoScript = `
    <!-- 🔥 LIVE LOCATION TRACKER 🔥 -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const locBtn = document.getElementById('userLocationBtn');
            
            // Check memory to see if we already found their location in this session
            const savedLocation = sessionStorage.getItem('userLocation');
            if (savedLocation) {
                updateLocationUI(savedLocation);
            }

            locBtn.addEventListener('click', () => {
                locBtn.innerHTML = '📍 Requesting...';
                
                if (navigator.geolocation) {
                    // Request permission and get exact GPS coordinates
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        
                        try {
                            // Convert GPS coordinates to a real city name using free OpenStreetMap API
                            const response = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lon}\`);
                            const data = await response.json();
                            
                            // Find the most accurate local area name (Suburb, City, or District)
                            const localArea = data.address.suburb || data.address.city || data.address.town || data.address.county || data.address.state_district || "Location Found";
                            
                            updateLocationUI(localArea);
                            sessionStorage.setItem('userLocation', localArea); // Remember it
                            
                        } catch (error) {
                            console.error("Reverse geocoding failed:", error);
                            updateLocationUI("Live Location Active");
                        }
                    }, (error) => {
                        console.error("Location error:", error);
                        if (error.code === error.PERMISSION_DENIED) {
                            locBtn.innerHTML = '📍 Permission Denied';
                            locBtn.style.color = '#dc2626'; // Red text
                        } else {
                            locBtn.innerHTML = '📍 Detection Failed';
                        }
                    }, {
                        enableHighAccuracy: true // Force GPS accuracy
                    });
                } else {
                    locBtn.innerHTML = '📍 GPS Not Supported';
                }
            });

            function updateLocationUI(locationName) {
                locBtn.innerHTML = \`📍 \${locationName}\`;
                locBtn.style.background = '#fff7ed'; // Soft orange background
                locBtn.style.borderColor = '#fed7aa'; // Orange border
                locBtn.style.color = 'var(--brand-accent)';
            }
        });
    </script>`;

// Safely append the script right before the closing body tag
if (!homeEjs.includes('LIVE LOCATION TRACKER')) {
    homeEjs = homeEjs.replace('</body>', geoScript + '\n</body>');
    fs.writeFileSync(homePath, homeEjs);
    console.log('✅ SUCCESS: Live Location Tracker added to the navigation bar!');
} else {
    console.log('Location tracker is already installed.');
}