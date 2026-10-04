import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Setup EJS View Engine
app.set('view engine', 'ejs');
// Go up one folder (..) from 'src' to find the 'views' folder
app.set('views', path.join(__dirname, '../views'));

// 2. Serve Static Files (Crucial for your local images to load)
// Go up one folder (..) from 'src' to find the 'public' folder
app.use('/public', express.static(path.join(__dirname, '../public')));

// 3. Parse URL-encoded bodies for form submissions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- MOCK INVENTORY DATABASE ---
const mockVehicles = [
    { id: 1, title: 'Maruti Suzuki Swift VXI', vehicleType: 'Car', condition: 'Excellent', price: 450000, imageUrl: '/public/images/car4.jpg' },
    { id: 2, title: 'Bajaj Pulsar 150', vehicleType: 'Bike', condition: 'Good', price: 45000, imageUrl: '/public/images/bike.jpg' },
    { id: 3, title: 'JCB 3DX Excavator', vehicleType: 'JCB', condition: 'Like New', price: 1500000, imageUrl: '/public/images/jcb.jpg' },
    { id: 4, title: 'Tata Signa Tipper', vehicleType: 'Commercial', condition: 'Good', price: 2500000, imageUrl: '/public/images/truck%20.jpg' },
    { id: 5, title: 'Tata Starbus', vehicleType: 'Commercial', condition: 'Fair', price: 850000, imageUrl: '/public/images/bus.jpg' },
    { id: 6, title: 'Bajaj RE Auto', vehicleType: 'Auto', condition: 'Excellent', price: 120000, imageUrl: '/public/images/auto.jpg' },
    { id: 7, title: 'Mahindra Thar', vehicleType: 'Car', condition: 'Excellent', price: 950000, imageUrl: '/public/images/car3.jpg' },
    { id: 8, title: 'Tata Tiago', vehicleType: 'Car', condition: 'Good', price: 380000, imageUrl: '/public/images/car.jpg' }
];

// --- APP ROUTES ---

// Homepage Route
app.get('/', (req, res) => {
    const currentType = req.query.type || 'All';
    const currentSearch = req.query.search || '';

    let filteredVehicles = mockVehicles;
    
    if (currentType !== 'All') {
        filteredVehicles = filteredVehicles.filter(v => v.vehicleType === currentType);
    }
    
    if (currentSearch) {
        filteredVehicles = filteredVehicles.filter(v => 
            v.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
            v.vehicleType.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }

    res.render('home', {
        vehicles: filteredVehicles,
        currentType: currentType,
        currentSearch: currentSearch
    });
});

// Secure Google Login Route
app.get('/login', (req, res) => {
    res.render('login');
});

// Legacy Admin Login Redirect
app.get('/admin/login', (req, res) => {
    res.redirect('/login');
});

// Admin Dashboard Placeholder
app.get('/admin', (req, res) => {
    // Serve the newly created Admin EJS page
    res.render('admin');
});

// Placeholder for handling the form submission
app.post('/admin/upload', (req, res) => {
    console.log("New Vehicle Upload Data:", req.body);
    // Redirect back to home for now until backend file storage (Multer/Firebase) is wired up
    res.redirect('/?success=true');
});

// Vehicle Detail Page Placeholder
app.get('/vehicle/:id', (req, res) => {
    const vehicleId = parseInt(req.params.id);
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    
    if (!vehicle) {
        return res.status(404).send('Vehicle not found');
    }
    
    res.render('details', { vehicle: vehicle });
});


// Wishlist Page Route
app.get('/wishlist', (req, res) => {
    res.send(`<div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 60px; text-align: center; background: #f8fafc; height: 100vh;">
        <h1 style="color: #0f172a; font-size: 2.5rem; margin-bottom: 10px;">My Wishlist ❤️️</h1>
        <p style="color: #64748b; margin-bottom: 30px;">Vehicles you save for later will appear here.</p>
        <a href="/" style="background: #ea580c; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Explore Inventory</a>
    </div>`);
});

// Help & Support Route
app.get('/help', (req, res) => {
    res.send(`<div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 60px; text-align: center; background: #f8fafc; height: 100vh;">
        <h1 style="color: #0f172a; font-size: 2.5rem; margin-bottom: 10px;">Help & Support ❓</h1>
        <p style="color: #64748b; margin-bottom: 30px;">Our Dehradun support team is ready to assist you.</p>
        <p style="font-weight: bold; color: #0f172a; margin-bottom: 30px;">Call us: +91 94309 70080 <br> Email: support@shivamotors.in</p>
        <a href="/" style="background: #ea580c; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">&larr; Back to Home</a>
    </div>`);
});


// Cookie & Privacy Policy Page
app.get('/cookies', (req, res) => {
    res.send(`<!DOCTYPE html>
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
</html>`);
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`✅ Shiva Motors server running smoothly on http://localhost:${PORT}`);
});