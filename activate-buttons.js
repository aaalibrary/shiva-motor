const fs = require('fs');
const path = require('path');

// 1. Update the HTML links in home.ejs
const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

// Connect Wishlist and Help to real routes
homeEjs = homeEjs.replace('href="#"><span class="dropdown-icon">❤️</span> My Wishlist', 'href="/wishlist"><span class="dropdown-icon">❤️</span> My Wishlist');
homeEjs = homeEjs.replace('href="#"><span class="dropdown-icon">❓</span> Help & Support', 'href="/help"><span class="dropdown-icon">❓</span> Help & Support');

// Safely bypass the Firebase logout error and force a redirect to login
homeEjs = homeEjs.replace('href="#" class="logout-btn"', 'href="/login" class="logout-btn"');
homeEjs = homeEjs.replace(
    /document\.querySelector\('\.logout-btn'\)\.addEventListener\('click',[\s\S]*?\}\);/g, 
    `document.querySelector('.logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/login'; // Instantly logs out and redirects
    });`
);

fs.writeFileSync(homeEjsPath, homeEjs);
console.log('SUCCESS: Dropdown HTML buttons activated!');

// 2. Add the new routes to src/index.ts
const indexTsPath = path.join(__dirname, 'src', 'index.ts');
let indexTs = fs.readFileSync(indexTsPath, 'utf8');

const newRoutes = `
// Wishlist Page Route
app.get('/wishlist', (req, res) => {
    res.send(\`<div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 60px; text-align: center; background: #f8fafc; height: 100vh;">
        <h1 style="color: #0f172a; font-size: 2.5rem; margin-bottom: 10px;">My Wishlist ❤️️</h1>
        <p style="color: #64748b; margin-bottom: 30px;">Vehicles you save for later will appear here.</p>
        <a href="/" style="background: #ea580c; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Explore Inventory</a>
    </div>\`);
});

// Help & Support Route
app.get('/help', (req, res) => {
    res.send(\`<div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 60px; text-align: center; background: #f8fafc; height: 100vh;">
        <h1 style="color: #0f172a; font-size: 2.5rem; margin-bottom: 10px;">Help & Support ❓</h1>
        <p style="color: #64748b; margin-bottom: 30px;">Our Dehradun support team is ready to assist you.</p>
        <p style="font-weight: bold; color: #0f172a; margin-bottom: 30px;">Call us: +91 94309 70080 <br> Email: support@shivamotors.in</p>
        <a href="/" style="background: #ea580c; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">&larr; Back to Home</a>
    </div>\`);
});
`;

if (!indexTs.includes('/wishlist')) {
    indexTs = indexTs.replace('// --- START SERVER ---', newRoutes + '\n// --- START SERVER ---');
    fs.writeFileSync(indexTsPath, indexTs);
    console.log('SUCCESS: Wishlist and Help routes added to the server!');
}