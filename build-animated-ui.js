const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');

const animatedHomeEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shiva Motors | The New Standard in Vehicles</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-dark: #0f172a; --brand-accent: #ea580c; --brand-accent-hover: #c2410c;
            --bg-base: #f8fafc; --surface: #ffffff; --text-main: #1e293b; --text-muted: #64748b;
            --border-light: #e2e8f0;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
            --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
            --shadow-hover: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
            --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: var(--bg-base); color: var(--text-main); }
        a { text-decoration: none; }

        /* NAVBAR */
        .navbar { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-light); padding: 16px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; }
        .brand-logo { font-size: 24px; font-weight: 800; color: var(--brand-dark); letter-spacing: -0.5px; }
        .brand-logo span { color: var(--brand-accent); }
        .nav-right { display: flex; align-items: center; gap: 24px; }
        .btn-primary { background: var(--brand-dark); color: var(--surface); padding: 12px 28px; border-radius: 100px; font-weight: 600; font-size: 0.95rem; transition: var(--transition-smooth); }
        .btn-primary:hover { background: var(--brand-accent); }

        /* HERO SECTION WITH ANIMATION */
        .hero { position: relative; background: var(--surface); padding: 100px 5% 80px; text-align: center; border-bottom: 1px solid var(--border-light); overflow: hidden; }
        
        /* Sliding Background Animation */
        .marquee-bg { position: absolute; top: 20%; left: 0; width: 100%; overflow: hidden; opacity: 0.07; z-index: 1; pointer-events: none; transform: rotate(-2deg) scale(1.2); }
        .marquee-track { display: flex; width: max-content; animation: slide 25s linear infinite; font-size: 8rem; gap: 80px; user-select: none; }
        @keyframes slide { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .hero-content { position: relative; z-index: 2; }
        .hero-badge { display: inline-block; padding: 8px 16px; background: #fff7ed; color: var(--brand-accent); border-radius: 100px; font-weight: 700; font-size: 0.85rem; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px; }
        .hero h1 { font-size: 4rem; font-weight: 800; color: var(--brand-dark); line-height: 1.1; margin-bottom: 24px; letter-spacing: -1.5px; }
        .hero p { font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px; line-height: 1.6; }
        .search-wrapper { max-width: 650px; margin: 0 auto; display: flex; box-shadow: var(--shadow-md); border-radius: 100px; overflow: hidden; border: 1px solid var(--border-light); background: var(--surface); }
        .search-wrapper input { flex: 1; padding: 20px 30px; border: none; outline: none; font-size: 1.1rem; font-weight: 500; }
        .search-wrapper button { background: var(--brand-accent); color: white; border: none; padding: 0 40px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: var(--transition-smooth); }
        .search-wrapper button:hover { background: var(--brand-accent-hover); }

        /* MAIN CONTAINER */
        .container { max-width: 1440px; margin: 0 auto; padding: 60px 5%; }
        
        /* CATEGORY CARDS (LONG LAYOUT) */
        .category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 60px; }
        .cat-card { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: var(--surface); border: 1px solid var(--border-light); border-radius: 20px; text-decoration: none; color: var(--brand-dark); transition: var(--transition-smooth); box-shadow: var(--shadow-sm); }
        .cat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: var(--brand-accent); }
        .cat-card.active { border-color: var(--brand-accent); background: #fff7ed; }
        .cat-icon-wrapper { font-size: 2.2rem; width: 60px; height: 60px; display: flex; justify-content: center; align-items: center; background: var(--bg-base); border-radius: 14px; }
        .cat-info h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 2px; }
        .cat-info p { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }

        /* INVENTORY GRID */
        .section-header { margin-bottom: 30px; }
        .section-title { font-size: 2rem; font-weight: 800; color: var(--brand-dark); letter-spacing: -0.5px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
        .card { background: var(--surface); border-radius: 20px; overflow: hidden; border: 1px solid var(--border-light); transition: var(--transition-smooth); display: flex; flex-direction: column; }
        .card:hover { box-shadow: var(--shadow-hover); transform: translateY(-8px); border-color: transparent; }
        .card-img-wrap { height: 220px; position: relative; overflow: hidden; background: var(--bg-base); }
        .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
        .card:hover .card-img-wrap img { transform: scale(1.08); }
        .condition-tag { position: absolute; top: 16px; left: 16px; background: rgba(255,255,255,0.95); backdrop-filter: blur(4px); color: var(--brand-dark); font-size: 0.75rem; font-weight: 700; padding: 6px 14px; border-radius: 100px; text-transform: uppercase; }
        .card-body { padding: 24px; display: flex; flex-direction: column; flex: 1; }
        .card-title { font-size: 1.4rem; font-weight: 700; color: var(--brand-dark); margin-bottom: 12px; }
        .spec-pill { background: var(--bg-base); padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); border: 1px solid var(--border-light); display: inline-block; margin-bottom: 24px; }
        .card-footer { margin-top: auto; padding-top: 20px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; }
        .price { font-size: 1.6rem; font-weight: 800; color: var(--brand-dark); }
        .btn-view { color: var(--brand-accent); font-weight: 700; font-size: 0.95rem; }

        /* COMING SOON SECTION */
        .roadmap-section { background: var(--brand-dark); color: var(--surface); padding: 80px 5%; border-radius: 40px 40px 0 0; margin-top: 40px; }
        .roadmap-header { text-align: center; margin-bottom: 50px; }
        .roadmap-title { font-size: 2.2rem; font-weight: 800; margin-bottom: 16px; }
        .roadmap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; max-width: 1440px; margin: 0 auto; }
        .roadmap-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 30px; border-radius: 20px; position: relative; transition: var(--transition-smooth); }
        .roadmap-card:hover { background: rgba(255,255,255,0.06); }
        .roadmap-icon { font-size: 2.5rem; margin-bottom: 20px; opacity: 0.8; }
        .roadmap-card h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
        .roadmap-card p { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }
        .status-badge { position: absolute; top: 20px; right: 20px; background: rgba(234, 88, 12, 0.2); color: #fdba74; border: 1px solid rgba(234, 88, 12, 0.3); padding: 4px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
    </style>
</head>
<body>

    <nav class="navbar">
        <a href="/" class="brand-logo">Shiva<span>Motors</span></a>
        <div class="nav-right">
            <span style="font-weight:600; color:var(--text-muted);">📍 Dehradun</span>
            <a href="/admin/login" class="btn-primary">Admin Access</a>
        </div>
    </nav>

    <header class="hero">
        <!-- BACKGROUND ANIMATION -->
        <div class="marquee-bg">
            <div class="marquee-track">
                <!-- Repeated twice for seamless looping -->
                🚗 🏍️ 🚌 🚜 🚚 🛺 🚗 🏍️ 🚌 🚜 🚚 🛺
            </div>
        </div>

        <div class="hero-content">
            <span class="hero-badge">100% Quality Inspected</span>
            <h1>The New Standard<br>in Vehicle Buying.</h1>
            <p>Premium pre-owned cars, bikes, and commercial vehicles. Rigorously inspected, beautifully presented, and ready for the road.</p>
            
            <form action="/" method="GET" class="search-wrapper">
                <input type="text" name="search" placeholder="Search brands, models, or types..." value="<%= typeof currentSearch !== 'undefined' ? currentSearch : '' %>">
                <button type="submit">Explore</button>
            </form>
        </div>
    </header>

    <main class="container">
        <!-- CATEGORY LONG CARDS -->
        <div class="category-grid">
            <a href="/?type=Car" class="cat-card <%= currentType === 'Car' ? 'active' : '' %>">
                <div class="cat-icon-wrapper" style="background: #e0f2fe;">🚗</div>
                <div class="cat-info">
                    <h3>Cars</h3>
                    <p>View Models</p>
                </div>
            </a>
            <a href="/?type=Bike" class="cat-card <%= currentType === 'Bike' ? 'active' : '' %>">
                <div class="cat-icon-wrapper" style="background: #fce7f3;">🏍️</div>
                <div class="cat-info">
                    <h3>Bikes</h3>
                    <p>View Models</p>
                </div>
            </a>
            <a href="/?type=Tractor" class="cat-card <%= currentType === 'Tractor' ? 'active' : '' %>">
                <div class="cat-icon-wrapper" style="background: #fef3c7;">🚜</div>
                <div class="cat-info">
                    <h3>Tractors / JCB</h3>
                    <p>Heavy Duty</p>
                </div>
            </a>
            <a href="/?type=Bus" class="cat-card <%= currentType === 'Bus' ? 'active' : '' %>">
                <div class="cat-icon-wrapper" style="background: #dcfce7;">🚌</div>
                <div class="cat-info">
                    <h3>Buses</h3>
                    <p>Commercial</p>
                </div>
            </a>
            <a href="/?type=Truck" class="cat-card <%= currentType === 'Truck' ? 'active' : '' %>">
                <div class="cat-icon-wrapper" style="background: #f3e8ff;">🚚</div>
                <div class="cat-info">
                    <h3>Trucks</h3>
                    <p>Cargo & Transport</p>
                </div>
            </a>
            <a href="/?type=Auto" class="cat-card <%= currentType === 'Auto' ? 'active' : '' %>">
                <div class="cat-icon-wrapper" style="background: #ffedd5;">🛺</div>
                <div class="cat-info">
                    <h3>Autos</h3>
                    <p>City Transit</p>
                </div>
            </a>
        </div>

        <div class="section-header">
            <h2 class="section-title"><%= currentType !== 'All' ? currentType + ' Inventory' : 'All Available Inventory' %></h2>
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
                            <span class="spec-pill"><%= vehicle.vehicleType %></span>
                            <div class="card-footer">
                                <span class="price">₹<%= vehicle.price.toLocaleString('en-IN') %></span>
                                <span class="btn-view">View Details &rarr;</span>
                            </div>
                        </div>
                    </a>
                <% }) %>
            <% } else { %>
                <div style="grid-column: 1 / -1; padding: 80px 20px; text-align: center; border: 2px dashed var(--border-light); border-radius: 20px;">
                    <h3 style="color: var(--brand-dark); font-size: 1.5rem; margin-bottom: 12px; font-weight: 800;">No Vehicles Found</h3>
                    <p style="color: var(--text-muted);">There are currently no vehicles matching your criteria.</p>
                </div>
            <% } %>
        </div>
    </main>

    <section class="roadmap-section">
        <div class="roadmap-header">
            <h2 class="roadmap-title">The Future of Shiva Motors</h2>
            <p style="color:#94a3b8;">Sneak peek at the premium services rolling out soon.</p>
        </div>
        <div class="roadmap-grid">
            <div class="roadmap-card">
                <span class="status-badge">In Development</span>
                <div class="roadmap-icon">💸</div>
                <h3>Instant Vehicle Selling</h3>
                <p>Sell your car directly to us. Guaranteed quote in 60 minutes and home pickup.</p>
            </div>
            <div class="roadmap-card">
                <span class="status-badge">Coming Q4</span>
                <div class="roadmap-icon">🏦</div>
                <h3>Integrated Financing</h3>
                <p>One-click loan approvals with our partner banks. Compare lowest EMI rates.</p>
            </div>
            <div class="roadmap-card">
                <span class="status-badge">Planning</span>
                <div class="roadmap-icon">🛡️</div>
                <h3>Digital Insurance</h3>
                <p>Renew or buy new insurance policies instantly with zero paperwork.</p>
            </div>
        </div>
    </section>

</body>
</html>
`;

fs.writeFileSync(path.join(viewsDir, 'home.ejs'), animatedHomeEjs);
console.log('SUCCESS: Animated background and category cards deployed!');