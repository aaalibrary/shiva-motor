const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');

const premiumHomeEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shiva Motors | Premium Vehicle Marketplace</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #04142b; /* Deep Navy */
            --secondary: #ef6c00; /* Action Orange */
            --bg-light: #f4f6f8;
            --text-dark: #1a1a1a;
            --text-muted: #666;
            --white: #ffffff;
            --border: #e2e8f0;
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: var(--bg-light); color: var(--text-dark); }
        a { text-decoration: none; }

        /* TOP NAVIGATION */
        .top-nav { background: var(--white); padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
        .logo { font-size: 26px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 10px; }
        .logo span { color: var(--secondary); }
        
        .search-container { flex: 1; max-width: 500px; margin: 0 20px; position: relative; }
        .search-container input { width: 100%; padding: 12px 20px; border-radius: 30px; border: 1px solid var(--border); background: var(--bg-light); font-size: 1rem; outline: none; }
        
        .nav-actions { display: flex; align-items: center; gap: 20px; }
        .location-badge { font-size: 0.9rem; font-weight: 500; color: var(--text-muted); display: flex; align-items: center; gap: 5px; }
        .btn-login { background: var(--primary); color: var(--white); padding: 10px 24px; border-radius: 20px; font-weight: 600; font-size: 0.95rem; }

        /* SECONDARY NAVIGATION (Horizontal Scroll) */
        .sub-nav { background: var(--white); padding: 15px 5%; display: flex; gap: 30px; overflow-x: auto; white-space: nowrap; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
        .sub-nav a { color: var(--text-dark); font-weight: 500; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .sub-nav a:hover, .sub-nav a.active { color: var(--secondary); }

        /* HERO SECTION */
        .hero { background: linear-gradient(135deg, var(--primary) 0%, #1a365d 100%); padding: 60px 5%; color: var(--white); display: flex; align-items: center; justify-content: space-between; border-radius: 0 0 30px 30px; }
        .hero-content { max-width: 500px; }
        .hero h1 { font-size: 3rem; line-height: 1.2; margin-bottom: 20px; }
        .hero p { font-size: 1.1rem; opacity: 0.9; margin-bottom: 30px; }
        .btn-hero { background: var(--white); color: var(--primary); padding: 14px 30px; border-radius: 30px; font-weight: 700; font-size: 1rem; display: inline-block; }

        /* SECTION CONTAINERS */
        .section { padding: 50px 5%; max-width: 1400px; margin: 0 auto; }
        .section-header { margin-bottom: 30px; }
        .section-title { font-size: 1.8rem; font-weight: 700; color: var(--primary); }
        
        /* HORIZONTAL SCROLL GRIDS (Like Services/Categories) */
        .scroll-grid { display: flex; gap: 20px; overflow-x: auto; padding-bottom: 20px; scrollbar-width: none; }
        .scroll-grid::-webkit-scrollbar { display: none; }
        
        .service-card { min-width: 260px; background: var(--white); border-radius: 16px; padding: 25px; text-align: center; border: 1px solid var(--border); transition: 0.3s; cursor: pointer; }
        .service-card:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.08); transform: translateY(-5px); border-color: var(--secondary); }
        .service-icon { width: 60px; height: 60px; background: var(--bg-light); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .service-title { font-weight: 600; font-size: 1.1rem; margin-bottom: 8px; }

        /* INVENTORY GRID (Live Database) */
        .inventory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; }
        .vehicle-card { background: var(--white); border-radius: 16px; overflow: hidden; border: 1px solid var(--border); transition: 0.3s; position: relative; }
        .vehicle-card:hover { box-shadow: 0 12px 30px rgba(0,0,0,0.1); transform: translateY(-5px); }
        .img-box { height: 200px; background: #e9ecef; position: relative; }
        .img-box img { width: 100%; height: 100%; object-fit: cover; }
        .badge { position: absolute; top: 15px; left: 15px; background: var(--white); color: var(--text-dark); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        
        .vehicle-info { padding: 20px; }
        .vehicle-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; color: var(--primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .vehicle-meta { display: flex; gap: 15px; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--border); }
        .vehicle-price-row { display: flex; justify-content: space-between; align-items: center; }
        .price { font-size: 1.5rem; font-weight: 800; color: var(--primary); }
        
        /* FOOTER */
        footer { background: var(--primary); color: var(--white); padding: 60px 5% 30px; margin-top: 60px; }
        
        @media (max-width: 768px) {
            .search-container { display: none; }
            .hero { flex-direction: column; text-align: center; border-radius: 0; }
            .hero h1 { font-size: 2.2rem; }
        }
    </style>
</head>
<body>

    <!-- Top Navigation -->
    <nav class="top-nav">
        <a href="/" class="logo">Shiva<span>Motors</span></a>
        
        <form action="/" method="GET" class="search-container">
            <input type="text" name="search" placeholder="Search by brand, model, or type..." value="<%= typeof currentSearch !== 'undefined' ? currentSearch : '' %>">
        </form>

        <div class="nav-actions">
            <div class="location-badge">📍 Dehradun, India</div>
            <a href="/admin/login" class="btn-login">Admin Panel</a>
        </div>
    </nav>

    <!-- Secondary Categories Navigation -->
    <div class="sub-nav">
        <a href="/" class="<%= currentType === 'All' ? 'active' : '' %>">🏠 Home</a>
        <a href="/?type=Car" class="<%= currentType === 'Car' ? 'active' : '' %>">🚗 Buy Used Car</a>
        <a href="/?type=Bike" class="<%= currentType === 'Bike' ? 'active' : '' %>">🏍️ Bikes</a>
        <a href="/?type=Tractor" class="<%= currentType === 'Tractor' ? 'active' : '' %>">🚜 Tractors</a>
        <a href="/?type=Commercial">🚚 Commercial</a>
        <a href="#">💰 Loans</a>
        <a href="#">🛡️ Insurance</a>
        <a href="#">📋 Car Check</a>
    </div>

    <!-- Hero Banner -->
    <header class="hero">
        <div class="hero-content">
            <h1>Buy and sell vehicles with trust.</h1>
            <p>Explore premium used cars, tractors, and bikes. 100% verified inventory with easy financing options available directly from Shiva Motors.</p>
            <a href="#inventory" class="btn-hero">Explore Inventory</a>
        </div>
        <!-- Right side graphic placeholder -->
        <div style="flex: 1; display: flex; justify-content: center; max-width: 500px; display: none; @media(min-width: 768px){display: block;}">
           <!-- You can add a transparent PNG of a car here later -->
        </div>
    </header>

    <!-- Services Section -->
    <section class="section">
        <div class="section-header">
            <h2 class="section-title">Comprehensive Vehicle Services</h2>
        </div>
        <div class="scroll-grid">
            <div class="service-card" onclick="alert('Feature coming soon!')">
                <div class="service-icon">💸</div>
                <h3 class="service-title">Sell Your Vehicle</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Get the best price in 1 hour</p>
            </div>
            <div class="service-card" onclick="alert('Feature coming soon!')">
                <div class="service-icon">📊</div>
                <h3 class="service-title">Check Valuation</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Instant online price check</p>
            </div>
            <div class="service-card" onclick="alert('Feature coming soon!')">
                <div class="service-icon">🏦</div>
                <h3 class="service-title">Get a Loan</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Low interest vehicle financing</p>
            </div>
            <div class="service-card" onclick="alert('Feature coming soon!')">
                <div class="service-icon">🔍</div>
                <h3 class="service-title">Vehicle History</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Check RTO & Challan details</p>
            </div>
        </div>
    </section>

    <!-- Live Database Inventory Section -->
    <section class="section" id="inventory">
        <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
                <h2 class="section-title">Explore Used Vehicles</h2>
                <p style="color: var(--text-muted); margin-top: 5px;">Top quality vehicles up for grabs</p>
            </div>
        </div>
        
        <div class="inventory-grid">
            <% if (vehicles && vehicles.length > 0) { %>
                <% vehicles.forEach(function(vehicle) { %>
                    <article class="vehicle-card">
                        <div class="img-box">
                            <span class="badge"><%= vehicle.condition %></span>
                            <% if (vehicle.imageUrl) { %>
                                <img src="<%= vehicle.imageUrl %>" alt="<%= vehicle.title %>">
                            <% } else { %>
                                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #999; font-weight: 600;">No Image</div>
                            <% } %>
                        </div>
                        <div class="vehicle-info">
                            <h3 class="vehicle-title"><%= vehicle.title %></h3>
                            <div class="vehicle-meta">
                                <span>Type: <%= vehicle.vehicleType %></span>
                            </div>
                            <div class="vehicle-price-row">
                                <span class="price">₹<%= vehicle.price.toLocaleString('en-IN') %></span>
                                <a href="/vehicle/<%= vehicle.id %>" style="color: var(--secondary); font-weight: 600;">View Details &rarr;</a>
                            </div>
                        </div>
                    </article>
                <% }) %>
            <% } else { %>
                <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; border: 1px dashed var(--border); border-radius: 16px;">
                    <h3 style="color: var(--primary); font-size: 1.5rem; margin-bottom: 10px;">Inventory is Empty</h3>
                    <p style="color: var(--text-muted);">Log in to the Admin Panel to add your first vehicle listing.</p>
                </div>
            <% } %>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 40px; margin-bottom: 40px;">
            <div>
                <h2 class="logo" style="color: white; margin-bottom: 15px;">Shiva<span style="color: var(--secondary);">Motors</span></h2>
                <p style="opacity: 0.8; max-width: 300px;">Better drives, better lives. Your trusted marketplace for premium used vehicles in Dehradun.</p>
            </div>
            <div>
                <h4 style="margin-bottom: 15px; color: var(--secondary);">Discover</h4>
                <ul style="list-style: none; opacity: 0.8; line-height: 2;">
                    <li><a href="#" style="color: white;">Buy a used car</a></li>
                    <li><a href="#" style="color: white;">Sell your vehicle</a></li>
                    <li><a href="#" style="color: white;">Car Valuation</a></li>
                </ul>
            </div>
            <div>
                <h4 style="margin-bottom: 15px; color: var(--secondary);">Support</h4>
                <ul style="list-style: none; opacity: 0.8; line-height: 2;">
                    <li><a href="#" style="color: white;">FAQs</a></li>
                    <li><a href="#" style="color: white;">Contact Us</a></li>
                    <li><a href="#" style="color: white;">Terms & Conditions</a></li>
                </ul>
            </div>
        </div>
        <div style="text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; opacity: 0.7; font-size: 0.9rem;">
            &copy; 2026 Shiva Motors Private Limited. All rights reserved.
        </div>
    </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(viewsDir, 'home.ejs'), premiumHomeEjs);
console.log('SUCCESS: Premium UI injected into home.ejs!');