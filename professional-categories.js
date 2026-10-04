const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const homeEjsPath = path.join(viewsDir, 'home.ejs');

const updatedHomeEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shiva Motors | Premium Pre-Owned Vehicles</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-dark: #0f172a; 
            --brand-accent: #ea580c; 
            --brand-accent-hover: #c2410c;
            --bg-base: #f8fafc; 
            --surface: #ffffff; 
            --text-main: #1e293b; 
            --text-muted: #64748b;
            --border-light: #e2e8f0;
            --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: var(--bg-base); color: var(--text-main); -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }

        /* NAVBAR */
        .navbar { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 14px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; }
        .brand-logo { font-size: 24px; font-weight: 800; color: var(--brand-dark); letter-spacing: -0.5px; }
        .brand-logo span { color: var(--brand-accent); }
        .nav-right { display: flex; align-items: center; gap: 20px; }
        .location-tag { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
        .btn-admin { background: var(--brand-dark); color: var(--surface); padding: 9px 20px; border-radius: 8px; font-weight: 600; font-size: 0.88rem; transition: var(--transition-smooth); }
        .btn-admin:hover { background: var(--brand-accent); }

        /* HERO & SEARCH BAR UP TOP */
        .hero { background: var(--surface); padding: 50px 5% 30px; text-align: center; }
        .hero-badge { display: inline-block; padding: 5px 14px; background: #fff7ed; color: var(--brand-accent); border-radius: 100px; font-weight: 700; font-size: 0.78rem; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.8px; border: 1px solid #fed7aa; }
        .hero h1 { font-size: 2.8rem; font-weight: 800; color: var(--brand-dark); line-height: 1.2; margin-bottom: 14px; letter-spacing: -1px; }
        .hero p { font-size: 1.05rem; color: var(--text-muted); max-width: 580px; margin: 0 auto 30px; line-height: 1.5; }
        
        .search-wrapper { max-width: 680px; margin: 0 auto; display: flex; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-light); background: var(--surface); transition: var(--transition-smooth); }
        .search-wrapper:focus-within { border-color: var(--brand-accent); box-shadow: 0 4px 20px rgba(234, 88, 12, 0.12); }
        .search-wrapper input { flex: 1; padding: 18px 24px; border: none; outline: none; font-size: 1rem; font-weight: 500; }
        .search-wrapper button { background: var(--brand-accent); color: white; border: none; padding: 0 36px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: var(--transition-smooth); }
        .search-wrapper button:hover { background: var(--brand-accent-hover); }

        /* DEDICATED SLIDING VEHICLE PHOTO RAIL */
        .photo-slider-wrapper { background: var(--surface); padding: 24px 0 34px; overflow: hidden; border-bottom: 1px solid var(--border-light); position: relative; }
        .photo-track { display: flex; width: max-content; gap: 20px; animation: slidePhotos 35s linear infinite; }
        .photo-track:hover { animation-play-state: paused; }
        
        .slide-item { width: 280px; height: 180px; border-radius: 14px; overflow: hidden; position: relative; flex-shrink: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.07); border: 1px solid var(--border-light); }
        .slide-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .slide-item:hover img { transform: scale(1.06); }
        .slide-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); color: #fff; font-size: 0.82rem; font-weight: 700; }

        @keyframes slidePhotos { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* PROFESSIONAL IMAGE BACKGROUND CATEGORY SLIDER */
        .container { max-width: 1440px; margin: 0 auto; padding: 50px 5%; }
        .category-slider { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px; margin-bottom: 40px; scrollbar-width: thin; scrollbar-color: var(--border-light) transparent; }
        .category-slider::-webkit-scrollbar { height: 6px; }
        .category-slider::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 10px; }
        
        .cat-card { flex: 0 0 auto; width: 200px; height: 120px; display: flex; align-items: flex-end; padding: 16px; background-color: var(--surface); border-radius: 14px; position: relative; overflow: hidden; transition: var(--transition-smooth); border: 2px solid transparent; text-decoration: none; background-size: cover; background-position: center; }
        .cat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%); z-index: 1; transition: var(--transition-smooth); }
        .cat-card:hover { transform: translateY(-5px); border-color: var(--brand-accent); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
        .cat-card:hover::before { background: linear-gradient(to top, rgba(234, 88, 12, 0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%); }
        .cat-card.active { border-color: var(--brand-accent); }
        .cat-title { position: relative; z-index: 2; font-size: 1.1rem; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; }

        /* INVENTORY GRID */
        .section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px; }
        .section-title { font-size: 1.6rem; font-weight: 800; color: var(--brand-dark); }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 24px; }
        .card { background: var(--surface); border-radius: 14px; overflow: hidden; border: 1px solid var(--border-light); transition: var(--transition-smooth); display: flex; flex-direction: column; }
        .card:hover { box-shadow: 0 14px 28px rgba(0,0,0,0.08); transform: translateY(-4px); }
        .card-img-wrap { height: 190px; background: #e2e8f0; position: relative; }
        .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .condition-tag { position: absolute; top: 10px; left: 10px; background: var(--surface); color: var(--brand-dark); font-size: 0.72rem; font-weight: 700; padding: 5px 10px; border-radius: 6px; text-transform: uppercase; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .card-body { padding: 18px; display: flex; flex-direction: column; flex: 1; }
        .card-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 6px; color: var(--brand-dark); }
        .card-footer { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; }
        .price { font-size: 1.35rem; font-weight: 800; color: var(--brand-dark); }
        .btn-view { color: var(--brand-accent); font-weight: 700; font-size: 0.88rem; }

        /* FOOTER */
        .footer { background: #020617; color: #94a3b8; padding: 60px 5% 30px; margin-top: 60px; }
        .footer-grid { max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 36px; margin-bottom: 40px; }
        .footer-brand { font-size: 22px; font-weight: 800; color: var(--surface); margin-bottom: 14px; display: block; }
        .footer-brand span { color: var(--brand-accent); }
        .footer-heading { color: var(--surface); font-size: 1rem; font-weight: 700; margin-bottom: 16px; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 10px; font-size: 0.92rem; }
        .footer-links a:hover { color: var(--brand-accent); }
        
        .social-row { display: flex; gap: 14px; margin-top: 18px; }
        .social-icon { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; background: rgba(255,255,255,0.08); border-radius: 50%; color: var(--surface); transition: var(--transition-smooth); }
        .social-icon:hover { background: var(--brand-accent); transform: translateY(-3px); }
        .social-icon svg { width: 18px; height: 18px; fill: currentColor; }

        .footer-bottom { max-width: 1440px; margin: 0 auto; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; font-size: 0.82rem; }
    </style>
</head>
<body>

    <nav class="navbar">
        <div style="display: flex; flex-direction: column;">
            <a href="/" class="brand-logo" style="line-height: 1;">Shiva<span>Motors</span></a>
            <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Selling Vehicles, Earning Trust</span>
        </div>
        <div class="nav-right">
            <span class="location-tag">📍 Dehradun</span>
            <a href="/admin/login" class="btn-admin">Admin Portal</a>
        </div>
    </nav>

    <!-- HERO & HIGH-CONTRAST SEARCH BAR -->
    <header class="hero">
        <span class="hero-badge">Verified Second-Hand Hub</span>
        <h1>Reliable Vehicles for Indian Roads.</h1>
        <p>Pre-owned cars, bikes, tractors, and commercial haulers inspected for quality and honest pricing.</p>
        
        <form action="/" method="GET" class="search-wrapper">
            <input type="text" name="search" placeholder="Search models, brands, or vehicle types..." value="<%= typeof currentSearch !== 'undefined' ? currentSearch : '' %>">
            <button type="submit">Search</button>
        </form>
    </header>

    <!-- CLEAN SLIDING PHOTO RAIL WITH YOUR LOCAL IMAGES -->
    <section class="photo-slider-wrapper">
        <div class="photo-track">
            <!-- Set 1: Accurately matched images and captions based on folder contents -->
            <div class="slide-item">
                <img src="/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg" alt="Yellow Hatchback">
                <div class="slide-caption">City Commuters</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg" alt="Passenger Bus">
                <div class="slide-caption">Passenger Buses</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bharath-s-teB54jsTM6E-unsplash.jpg" alt="Transport Truck">
                <div class="slide-caption">Commercial Trucks</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg" alt="Motorcycle">
                <div class="slide-caption">Commuter Bikes</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gowtham-agm-lTVFAgAFQa4-unsplash.jpg" alt="JCB Excavator">
                <div class="slide-caption">Tractors & JCB</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/muhammed-akthar-kszV_-3Ka1k-unsplash.jpg" alt="Black SUV">
                <div class="slide-caption">SUVs & Off-Road</div>
            </div>

            <!-- Set 2: Duplicate for Seamless Continuous Loop -->
            <div class="slide-item">
                <img src="/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg" alt="Yellow Hatchback">
                <div class="slide-caption">City Commuters</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg" alt="Passenger Bus">
                <div class="slide-caption">Passenger Buses</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bharath-s-teB54jsTM6E-unsplash.jpg" alt="Transport Truck">
                <div class="slide-caption">Commercial Trucks</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg" alt="Motorcycle">
                <div class="slide-caption">Commuter Bikes</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gowtham-agm-lTVFAgAFQa4-unsplash.jpg" alt="JCB Excavator">
                <div class="slide-caption">Tractors & JCB</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/muhammed-akthar-kszV_-3Ka1k-unsplash.jpg" alt="Black SUV">
                <div class="slide-caption">SUVs & Off-Road</div>
            </div>
        </div>
    </section>

    <main class="container">
        <!-- PROFESSIONAL IMAGE BACKGROUND CATEGORY SLIDER -->
        <div class="category-slider">
            <a href="/?type=Car" class="cat-card <%= currentType === 'Car' ? 'active' : '' %>" style="background-image: url('/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg');">
                <span class="cat-title">Cars</span>
            </a>
            <a href="/?type=Bike" class="cat-card <%= currentType === 'Bike' ? 'active' : '' %>" style="background-image: url('/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg');">
                <span class="cat-title">Bikes</span>
            </a>
            <a href="/?type=Tractor" class="cat-card <%= currentType === 'Tractor' ? 'active' : '' %>" style="background-image: url('/public/images/gowtham-agm-lTVFAgAFQa4-unsplash.jpg');">
                <span class="cat-title">Tractors / JCB</span>
            </a>
            <a href="/?type=Truck" class="cat-card <%= currentType === 'Truck' ? 'active' : '' %>" style="background-image: url('/public/images/bharath-s-teB54jsTM6E-unsplash.jpg');">
                <span class="cat-title">Trucks</span>
            </a>
            <a href="/?type=Bus" class="cat-card <%= currentType === 'Bus' ? 'active' : '' %>" style="background-image: url('/public/images/vignesh-rajendran-97ZU4Umo3WU-unsplash.jpg');">
                <span class="cat-title">Buses</span>
            </a>
            <a href="/?type=Auto" class="cat-card <%= currentType === 'Auto' ? 'active' : '' %>" style="background-image: url('/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg');">
                <span class="cat-title">Autos</span>
            </a>
        </div>

        <div class="section-header">
            <h2 class="section-title"><%= currentType !== 'All' ? currentType + 's' : 'Available Inventory' %></h2>
            <a href="/" style="color: var(--brand-accent); font-weight: 600; font-size: 0.9rem;">View All</a>
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
                                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 600;">No Image</div>
                            <% } %>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title"><%= vehicle.title %></h3>
                            <span style="color: var(--text-muted); font-size: 0.88rem;"><%= vehicle.vehicleType %></span>
                            <div class="card-footer">
                                <span class="price">₹<%= vehicle.price.toLocaleString('en-IN') %></span>
                                <span class="btn-view">Details &rarr;</span>
                            </div>
                        </div>
                    </a>
                <% }) %>
            <% } else { %>
                <div style="grid-column: 1 / -1; padding: 50px 20px; text-align: center; border: 1px solid var(--border-light); border-radius: 14px;">
                    <h3 style="color: var(--brand-dark); font-size: 1.15rem; margin-bottom: 8px;">No Vehicles Found</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">Check back shortly or visit the admin portal to add new listings.</p>
                </div>
            <% } %>
        </div>
    </main>

    <!-- PROFESSIONAL FOOTER WITH REQUESTED SOCIALS -->
    <footer class="footer">
        <div class="footer-grid">
            <div>
                <a href="/" class="footer-brand">Shiva<span>Motors</span></a>
                <p style="line-height: 1.6; margin-bottom: 18px; font-size: 0.9rem;">Dehradun's dedicated marketplace for quality pre-owned commercial and family vehicles.</p>
                
                <div class="social-row">
                    <!-- Instagram -->
                    <a href="https://instagram.com" target="_blank" class="social-icon" aria-label="Instagram">
                        <svg viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
                    </a>
                    <!-- YouTube -->
                    <a href="https://youtube.com" target="_blank" class="social-icon" aria-label="YouTube">
                        <svg viewBox="0 0 24 24"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>
                    </a>
                    <!-- Facebook -->
                    <a href="https://facebook.com" target="_blank" class="social-icon" aria-label="Facebook">
                        <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                    </a>
                </div>
            </div>
            
            <div>
                <h4 class="footer-heading">Categories</h4>
                <ul class="footer-links">
                    <li><a href="/?type=Car">Second-Hand Cars</a></li>
                    <li><a href="/?type=Bike">Used Motorcycles</a></li>
                    <li><a href="/?type=Tractor">Farm Tractors</a></li>
                    <li><a href="/?type=Truck">Commercial Trucks</a></li>
                </ul>
            </div>

            <div>
                <h4 class="footer-heading">Hub Office</h4>
                <ul class="footer-links">
                    <li>📍 Main Bypass Road, Dehradun</li>
                    <li>📞 +91 94309 70080</li>
                    <li>✉️ support@shivamotors.in</li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            &copy; 2026 Shiva Motors. Built for drivers and businesses across India.
        </div>
    </footer>

</body>
</html>
`;

fs.writeFileSync(homeEjsPath, updatedHomeEjs);
console.log('SUCCESS: Category emojis replaced with professional image cards!');