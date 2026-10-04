const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const srcDir = path.join(__dirname, 'src');
const middlewareDir = path.join(srcDir, 'middleware');

if (!fs.existsSync(viewsDir)) fs.mkdirSync(viewsDir, { recursive: true });
if (!fs.existsSync(middlewareDir)) fs.mkdirSync(middlewareDir, { recursive: true });

// 1. HOME.EJS (Working buttons & search)
fs.writeFileSync(path.join(viewsDir, 'home.ejs'), `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shiva Motors | Buy & Sell Quality Vehicles</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root { --primary: #04142b; --secondary: #ef6c00; --bg: #f7f9fa; --white: #ffffff; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background: var(--bg); color: #1a1a1a; }
        nav { background: var(--white); padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .logo { font-size: 24px; font-weight: 700; color: var(--primary); text-decoration: none; }
        .logo span { color: var(--secondary); }
        .hero { background: var(--primary); color: var(--white); text-align: center; padding: 60px 20px; }
        .search-box { max-width: 600px; margin: 20px auto 0; display: flex; background: var(--white); border-radius: 8px; overflow: hidden; }
        .search-box input { flex: 1; padding: 15px; border: none; outline: none; font-size: 1rem; }
        .search-box button { background: var(--secondary); color: var(--white); border: none; padding: 0 30px; font-weight: bold; cursor: pointer; }
        .filters { display: flex; justify-content: center; gap: 15px; margin: 40px 0; flex-wrap: wrap; }
        .filter-btn { padding: 10px 25px; border-radius: 30px; text-decoration: none; font-weight: 600; background: var(--white); color: var(--primary); border: 2px solid var(--primary); transition: 0.3s; }
        .filter-btn:hover, .filter-btn.active { background: var(--primary); color: var(--white); }
        .container { padding: 20px 5%; max-width: 1400px; margin: 0 auto; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
        .card { background: var(--white); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.04); transition: 0.3s; }
        .card:hover { transform: translateY(-8px); box-shadow: 0 12px 30px rgba(0,0,0,0.12); }
        .card img { width: 100%; height: 200px; object-fit: cover; }
        .card-content { padding: 20px; }
        .price { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
        .btn-outline { border: 2px solid var(--primary); color: var(--primary); padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 600; }
        .card:hover .btn-outline { background: var(--primary); color: var(--white); }
    </style>
</head>
<body>
    <nav>
        <a href="/" class="logo">Shiva<span>Motors</span></a>
        <a href="/admin" style="background: var(--primary); color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">Admin Login</a>
    </nav>
    <header class="hero">
        <h1>Find Your Perfect Drive</h1>
        <p>Premium cars, bikes, tractors, and commercial vehicles.</p>
        <form action="/" method="GET" class="search-box">
            <input type="text" name="search" placeholder="Search by brand or model..." value="<%= typeof currentSearch !== 'undefined' ? currentSearch : '' %>">
            <button type="submit">Search</button>
        </form>
    </header>
    <main class="container">
        <div class="filters">
            <a href="/" class="filter-btn <%= currentType === 'All' ? 'active' : '' %>">All</a>
            <a href="/?type=Car" class="filter-btn <%= currentType === 'Car' ? 'active' : '' %>">Cars</a>
            <a href="/?type=Bike" class="filter-btn <%= currentType === 'Bike' ? 'active' : '' %>">Bikes</a>
            <a href="/?type=Tractor" class="filter-btn <%= currentType === 'Tractor' ? 'active' : '' %>">Tractors</a>
            <a href="/?type=Bus" class="filter-btn <%= currentType === 'Bus' ? 'active' : '' %>">Buses</a>
            <a href="/?type=Truck" class="filter-btn <%= currentType === 'Truck' ? 'active' : '' %>">Trucks</a>
        </div>
        <div class="grid">
            <% if (vehicles && vehicles.length > 0) { %>
                <% vehicles.forEach(function(vehicle) { %>
                    <article class="card">
                        <% if (vehicle.imageUrl) { %>
                            <img src="<%= vehicle.imageUrl %>" alt="<%= vehicle.title %>">
                        <% } else { %>
                            <div style="height:200px;background:#eee;display:flex;align-items:center;justify-content:center;">No Image</div>
                        <% } %>
                        <div class="card-content">
                            <h3><%= vehicle.title %></h3>
                            <p style="color:#666; margin: 10px 0;">Condition: <%= vehicle.condition %></p>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span class="price">₹<%= vehicle.price.toLocaleString('en-IN') %></span>
                                <a href="/vehicle/<%= vehicle.id %>" class="btn-outline">View Details</a>
                            </div>
                        </div>
                    </article>
                <% }) %>
            <% } else { %>
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: white; border-radius: 8px;">
                    <h2>No <%= currentType !== 'All' ? currentType + 's' : 'Vehicles' %> Found.</h2>
                </div>
            <% } %>
        </div>
    </main>
</body>
</html>
`);

// 2. INDEX.TS (Backend logic for search and filters)
fs.writeFileSync(path.join(srcDir, 'index.ts'), `
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { sequelize } from './database';
import { Vehicle } from './models/Vehicle';
import { upload } from './middleware/upload';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.JWT_SECRET || 'fallback_secret';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', async (req: Request, res: Response) => {
  const type = req.query.type as string;
  const search = req.query.search as string;
  let whereClause: any = {};
  if (type) whereClause.vehicleType = type;
  if (search) whereClause.title = { [Op.like]: \`%\${search}%\` };
  const vehicles = await Vehicle.findAll({ where: whereClause, order: [['createdAt', 'DESC']] });
  res.render('home', { vehicles, currentType: type || 'All', currentSearch: search || '' });
});

app.get('/vehicle/:id', async (req: Request, res: Response) => {
  const vehicle = await Vehicle.findByPk(req.params.id);
  if (!vehicle) return res.status(404).send('Vehicle not found');
  res.render('details', { vehicle });
});

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.admin_token;
  if (!token) { res.redirect('/admin/login'); return; }
  try { jwt.verify(token, SECRET); next(); } catch (err) { res.redirect('/admin/login'); }
};

app.get('/admin/login', (req, res) => res.render('login'));
app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@shivamotors.com' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '1d' });
    res.cookie('admin_token', token, { httpOnly: true }).redirect('/admin');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

app.get('/admin', requireAuth, (req, res) => res.render('admin'));
app.post('/admin/vehicle', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, vehicleType, price, condition } = req.body;
    const imageUrl = req.file ? \`/uploads/\${req.file.filename}\` : null;
    await Vehicle.create({ title, vehicleType, price, condition, imageUrl });
    res.redirect('/admin'); 
  } catch (err) {
    res.status(500).send('Error saving vehicle');
  }
});

app.get('/admin/logout', (req, res) => {
  res.clearCookie('admin_token').redirect('/');
});

const startServer = async () => {
  await sequelize.sync(); 
  app.listen(PORT, () => console.log(\`Server running on http://localhost:\${PORT}\`));
};
startServer();
`);

// 3. DETAILS.EJS (Working Vehicle Listing)
fs.writeFileSync(path.join(viewsDir, 'details.ejs'), `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= vehicle.title %> - Shiva Motors</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #f7f9fa; margin: 0; }
        nav { background: white; padding: 15px 5%; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .logo { font-size: 24px; font-weight: 700; color: #04142b; text-decoration: none; }
        .logo span { color: #ef6c00; }
        .container { max-width: 1000px; margin: 40px auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        img { width: 100%; border-radius: 8px; }
        .price { font-size: 2.5rem; color: #04142b; font-weight: 700; margin: 20px 0; }
        .specs { font-size: 1.1rem; color: #555; line-height: 2; margin-bottom: 30px; }
        .btn { background: #ef6c00; color: white; padding: 15px; text-align: center; display: block; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 1.1rem; }
        @media (max-width: 768px) { .container { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <nav><a href="/" class="logo">Shiva<span>Motors</span></a></nav>
    <div class="container">
        <div>
            <% if (vehicle.imageUrl) { %><img src="<%= vehicle.imageUrl %>"><% } else { %><div style="height:300px;background:#eee;display:flex;align-items:center;justify-content:center;">No Image</div><% } %>
        </div>
        <div>
            <h1 style="color: #04142b;"><%= vehicle.title %></h1>
            <div class="price">₹<%= vehicle.price.toLocaleString('en-IN') %></div>
            <div class="specs">
                <strong>Category:</strong> <%= vehicle.vehicleType %><br>
                <strong>Condition:</strong> <%= vehicle.condition %><br>
                <strong>Date Listed:</strong> <%= vehicle.createdAt.toLocaleDateString() %>
            </div>
            <a href="mailto:admin@shivamotors.com" class="btn">Contact Seller</a>
        </div>
    </div>
</body>
</html>
`);

// 4. ADMIN & LOGIN FILES
fs.writeFileSync(path.join(viewsDir, 'login.ejs'), `
<!DOCTYPE html>
<html lang="en">
<body style="font-family: 'Inter', sans-serif; background: #f7f9fa; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
    <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px; text-align: center;">
        <h2 style="color: #04142b; margin-bottom: 20px;">Admin Login</h2>
        <% if (typeof error !== 'undefined') { %><p style="color: red;"><%= error %></p><% } %>
        <form action="/admin/login" method="POST" style="display: flex; flex-direction: column; gap: 15px;">
            <input type="email" name="email" placeholder="Email (admin@shivamotors.com)" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
            <input type="password" name="password" placeholder="Password (admin123)" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
            <button type="submit" style="background: #ef6c00; color: white; padding: 12px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Login</button>
        </form>
    </div>
</body>
</html>
`);

fs.writeFileSync(path.join(viewsDir, 'admin.ejs'), `
<!DOCTYPE html>
<html lang="en">
<body style="font-family: 'Inter', sans-serif; background: #f7f9fa; margin: 0;">
    <nav style="background: #04142b; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center;">
        <h2 style="color: white; margin: 0;">ShivaMotors Admin</h2>
        <a href="/admin/logout" style="color: white; text-decoration: none;">Logout</a>
    </nav>
    <div style="max-width: 600px; margin: 40px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <h2 style="margin-bottom: 20px; color: #04142b;">Add New Inventory</h2>
        <form action="/admin/vehicle" method="POST" enctype="multipart/form-data" style="display: flex; flex-direction: column; gap: 15px;">
            <input type="text" name="title" placeholder="Listing Title (e.g. 2021 Mahindra Thar)" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
            <select name="vehicleType" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Tractor">Tractor</option>
                <option value="Bus">Bus</option>
                <option value="Truck">Truck</option>
            </select>
            <input type="number" name="price" placeholder="Price in ₹" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
            <select name="condition" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
                <option value="New">New</option>
                <option value="Used - Excellent">Used - Excellent</option>
                <option value="Used - Good">Used - Good</option>
            </select>
            <label style="font-weight: bold; color: #555;">Upload Primary Image:</label>
            <input type="file" name="image" accept="image/*" required style="padding: 10px; border: 1px dashed #ccc; border-radius: 6px;">
            <button type="submit" style="background: #28a745; color: white; padding: 15px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 1.1rem; margin-top: 10px;">+ Publish Listing</button>
        </form>
    </div>
</body>
</html>
`);

fs.writeFileSync(path.join(middlewareDir, 'upload.ts'), `
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
export const upload = multer({ storage });
`);

console.log('SUCCESS: All files written correctly!');