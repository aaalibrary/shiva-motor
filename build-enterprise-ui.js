const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');

const enterpriseHomeEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shiva Motors | The New Standard in Vehicles</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-dark: #0f172a;      /* Slate 900 */
            --brand-accent: #ea580c;    /* Premium Orange */
            --brand-accent-hover: #c2410c;
            --bg-base: #f8fafc;         /* Slate 50 */
            --surface: #ffffff;
            --text-main: #1e293b;       /* Slate 800 */
            --text-muted: #64748b;      /* Slate 500 */
            --border-light: #e2e8f0;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
            --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
            --shadow-hover: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
            --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: var(--bg-base); color: var(--text-main); -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; }

        /* GLASSMORPHISM NAVBAR */
        .navbar { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-light); padding: 16px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; }
        .brand-logo { font-size: 24px; font-weight: 800; color: var(--brand-dark); letter-spacing: -0.5px; }
        .brand-logo span { color: var(--brand-accent); }
        
        .nav-center { display: flex; gap: 8px; background: var(--bg-base); padding: 4px; border-radius: 100px; border: 1px solid var(--border-light); }
        .nav-center a { padding: 8px 20px; border-radius: 100px; color: var(--text-muted); font-weight: 600; font-size: 0.9rem; transition: var(--transition-smooth); }
        .nav-center a.active, .nav-center a:hover { background: var(--surface); color: var(--brand-dark); box-shadow: var(--shadow-sm); }
        
        .nav-right { display: flex; align-items: center; gap: 24px; }
        .location { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
        .btn-primary { background: var(--brand-dark); color: var(--surface); padding: 12px 28px; border-radius: 100px; font-weight: 600; font-size: 0.95rem; transition: var(--transition-smooth); border: 2px solid var(--brand-dark); }
        .btn-primary:hover { background: transparent; color: var(--brand-dark); }

        /* HERO SECTION */
        .hero { background: var(--surface); padding: 80px 5% 60px; text-align: center; border-bottom: 1px solid var(--border-light); }
        .hero-badge { display: inline-block; padding: 8px 16px; background: #fff7ed; color: var(--brand-accent); border-radius: 100px; font-weight: 700; font-size: 0.85rem; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px; }
        .hero h1 { font-size: 4rem; font-weight: 800; color: var(--brand-dark); line-height: 1.1; margin-bottom: 24px; letter-spacing: -1.5px; }
        .hero p { font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px; line-height: 1.6; }
        
        .search-wrapper { max-width: 650px; margin: 0 auto; display: flex; box-shadow: var(--shadow-md); border-radius: 100px; overflow: hidden; border: 1px solid var(--border-light); background: var(--surface); }
        .search-wrapper input { flex: 1; padding: 20px 30px; border: none; outline: none; font-size: 1.1rem; font-weight: 500; }
        .search-wrapper button { background: var(--brand-accent); color: white; border: none; padding: 0 40px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: var(--transition-smooth); }
        .search-wrapper button:hover { background: var(--brand-accent-hover); }

        /* SECTION LAYOUT */
        .container { max-width: 1440px; margin: 0 auto; padding: 80px 5%; }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .section-title { font-size: 2.2rem; font-weight: 800; color: var(--brand-dark); letter-spacing: -0.5px; }
        .section-subtitle { color: var(--text-muted); font-size: 1.1rem; margin-top: 8px; }

        /* INVENTORY GRID */
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
        .card { background: var(--surface); border-radius: 20px; overflow: hidden; border: 1px solid var(--border-light); transition: var(--transition-smooth); display: flex; flex-direction: column; }
        .card:hover { box-shadow: var(--shadow-hover); transform: translateY(-8px); border-color: transparent; }
        
        .card-img-wrap { height: 220px; position: relative; overflow: hidden; background: var(--bg-base); }
        .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
        .card:hover .card-img-wrap img { transform: scale(1.08); }
        .condition-tag { position: absolute; top: 16px; left: 16px; background: rgba(255,255,255,0.95); backdrop-filter: blur(4px); color: var(--brand-dark); font-size: 0.75rem; font-weight: 700; padding: 6px 14px; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .card-body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
        .card-title { font-size: 1.4rem; font-weight: 700; color: var(--brand-dark); margin-bottom: 12px; }
        .card-specs { display: flex; gap: 12px; margin-bottom: 24px; }
        .spec-pill { background: var(--bg-base); padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); border: 1px solid var(--border-light); }
        
        .card-footer { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; }
        .price { font-size: 1.6rem; font-weight: 800; color: var(--brand-dark); }
        .btn-view { color: var(--brand-accent); font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 4px; }
        .btn-view:hover { color: var(--brand-accent-hover); }

        /* COMING SOON SECTION (DOWNSIDE) */
        .roadmap-section { background: var(--brand-dark); color: var(--surface); padding: 100px 5%; border-radius: 40px 40px 0 0; margin-top: 60px; }
        .roadmap-header { text-align: center; margin-bottom: 60px; }
        .roadmap-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; }
        .roadmap-subtitle { color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto; }
        
        .roadmap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; max-width: 1440px; margin: 0 auto; }
        .roadmap-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 30px; border-radius: 20px; position: relative; overflow: hidden; transition: var(--transition-smooth); }
        .roadmap-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.2); }
        .roadmap-icon { font-size: 2.5rem; margin-bottom: 20px; opacity: 0.8; }
        .roadmap-card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 10px; }
        .roadmap-card p { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }
        .status-badge { position: absolute; top: 20px; right: 20px; background: rgba(234, 88, 12, 0.2); color: #fdba74; border: 1px solid rgba(234, 88, 12, 0.3); padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }

        /* FOOTER */
        footer { background: #020617; color: #94a3b8; padding: 40px 5%; text-align: center; font-size: 0.9rem; }

        @media (max-width: 768px) {
            .hero h1 { font-size: 2.8rem; }
            .nav-center { display: none; }
            .location { display: none; }
            .search-wrapper { flex-direction: column; border-radius: 20px; }
            .search-wrapper button { padding: 15px; }
        }
    </style>
</head>
<body>

    <!-- Transparent / Blur Navbar -->
    <nav class="navbar">
        <a href="/" class="brand-logo">Shiva<span>Motors</span></a>
        
        <!-- Center Pill Navigation -->
        <div class="nav-center">
            <a href="/" class="<%= currentType === 'All' ? 'active' : '' %>">All</a>
            <a href="/?type=Car" class="<%= currentType === 'Car' ? 'active' : '' %>">Cars</a>
            <a href="/?type=Bike" class="<%= currentType === 'Bike' ? 'active' : '' %>">Bikes</a>
            <a href="/?type=Tractor" class="<%= currentType === 'Tractor' ? 'active' : '' %>">Tractors</a>
            <a href="/?type=Commercial" class="<%= currentType === 'Truck' || currentType === 'Bus' ? 'active' : '' %>">Commercial</a>
        </div>

        <div class="nav-right">
            <div class="location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Dehradun
            </div>
            <a href="/admin/login" class="btn-primary">Admin Access</a>
        </div>
    </nav>

    <!-- Clean, High-Contrast Hero -->
    <header class="hero">
        <span class="hero-badge">100% Quality Inspected</span>
        <h1>The New Standard<br>in Vehicle Buying.</h1>
        <p>Premium pre-owned cars, bikes, and commercial vehicles. Rigorously inspected, beautifully presented, and ready for the road.</p>
        
        <form action="/" method="GET" class="search-wrapper">
            <input type="text" name="search" placeholder="Search brands, models, or types..." value="<%= typeof currentSearch !== 'undefined' ? currentSearch : '' %>">
            <button type="submit">Explore Inventory</button>
        </form>
    </header>

    <!-- Live Active Inventory -->
    <main class="container">
        <div class="section-header">
            <div>
                <h2 class="section-title">Available Inventory</h2>
                <p class="section-subtitle">Browse our currently active and verified listings.</p>
            </div>
        </div>
        
        <div class="grid">
            <% if (vehicles && vehicles.length > 0) { %>
                <% vehicles.forEach(function(vehicle) { %>
                    <a href="/vehicle/<%= vehicle.id %>" class="card">
                        <div class="card-img-wrap">
                            <span class="condition-tag"><%= vehicle.condition %></span>
                            <% if (vehicle.imageUrl) { %>
                                <img src="<%= vehicle.imageUrl %>" alt="<%= vehicle.title %>">
                            <% } else { %>
                                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 600;">Image Pending</div>
                            <% } %>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title"><%= vehicle.title %></h3>
                            <div class="card-specs">
                                <span class="spec-pill"><%= vehicle.vehicleType %></span>
                            </div>
                            <div class="card-footer">
                                <span class="price">₹<%= vehicle.price.toLocaleString('en-IN') %></span>
                                <span class="btn-view">View Details &rarr;</span>
                            </div>
                        </div>
                    </a>
                <% }) %>
            <% } else { %>
                <div style="grid-column: 1 / -1; padding: 80px 20px; text-align: center; border: 2px dashed var(--border-light); border-radius: 20px; background: var(--surface);">
                    <h3 style="color: var(--brand-dark); font-size: 1.5rem; margin-bottom: 12px; font-weight: 800;">No Vehicles Found</h3>
                    <p style="color: var(--text-muted);">There are currently no vehicles matching your criteria. Check back soon or access the Admin panel to add inventory.</p>
                </div>
            <% } %>
        </div>
    </main>

    <!-- FUTURE ROADMAP / COMING SOON SECTION -->
    <section class="roadmap-section">
        <div class="roadmap-header">
            <h2 class="roadmap-title">The Future of Shiva Motors</h2>
            <p class="roadmap-subtitle">We are actively building a complete automotive ecosystem. Here is a sneak peek at the premium services rolling out in our upcoming updates.</p>
        </div>
        
        <div class="roadmap-grid">
            <div class="roadmap-card">
                <span class="status-badge">In Development</span>
                <div class="roadmap-icon">💸</div>
                <h3>Instant Vehicle Selling</h3>
                <p>Sell your car directly to us from your driveway. Get a guaranteed quote in 60 minutes and home pickup.</p>
            </div>
            
            <div class="roadmap-card">
                <span class="status-badge">Coming Q4</span>
                <div class="roadmap-icon">🏦</div>
                <h3>Integrated Financing</h3>
                <p>One-click loan approvals with our partner banks. Compare lowest EMI rates without leaving the platform.</p>
            </div>
            
            <div class="roadmap-card">
                <span class="status-badge">Planning</span>
                <div class="roadmap-icon">🛡️</div>
                <h3>Digital Insurance</h3>
                <p>Renew or buy new insurance policies instantly. Choose from top providers with zero paperwork.</p>
            </div>
            
            <div class="roadmap-card">
                <span class="status-badge">Planning</span>
                <div class="roadmap-icon">📋</div>
                <h3>RTO & Challan Services</h3>
                <p>Check vehicle history, pending traffic challans, and manage RC transfers entirely online.</p>
            </div>
        </div>
    </section>

    <!-- Minimalist Footer -->
    <footer>
        <p>&copy; 2026 Shiva Motors. Designed & Developed for the modern driver.</p>
    </footer>

</body>
</html>
`;

fs.writeFileSync(path.join(viewsDir, 'home.ejs'), enterpriseHomeEjs);
console.log('SUCCESS: Enterprise Design deployed to home.ejs!');