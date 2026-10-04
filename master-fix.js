const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const homePath = path.join(viewsDir, 'home.ejs');
const loginPath = path.join(viewsDir, 'login.ejs');

// ==========================================
// 1. PERFECTLY STABLE HOME.EJS
// ==========================================
const stableHomeEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shiva Motors | Premium Pre-Owned Vehicles</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --brand-dark: #0f172a; --brand-accent: #ea580c; --brand-accent-hover: #c2410c; --bg-base: #f8fafc; --surface: #ffffff; --text-main: #1e293b; --text-muted: #64748b; --border-light: #e2e8f0; --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: var(--bg-base); color: var(--text-main); -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }

        /* NAVBAR */
        .navbar { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 14px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 1000; }
        .brand-logo { font-size: 24px; font-weight: 800; color: var(--brand-dark); letter-spacing: -0.5px; }
        .brand-logo span { color: var(--brand-accent); }
        .nav-right { display: flex; align-items: center; gap: 20px; position: relative; }
        .location-tag { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
        
        .btn-admin { background: var(--brand-dark); color: var(--surface); padding: 9px 20px; border-radius: 8px; font-weight: 600; font-size: 0.88rem; transition: var(--transition-smooth); cursor: pointer; display: none; /* Hidden until Firebase loads */ }
        .btn-admin:hover { background: var(--brand-accent); }

        /* ACCOUNT DROPDOWN */
        .profile-trigger { width: 42px; height: 42px; border-radius: 50%; cursor: pointer; object-fit: cover; border: 2px solid transparent; transition: var(--transition-smooth); display: none; /* Hidden until Firebase loads */ }
        .profile-trigger:hover { border-color: var(--brand-accent); box-shadow: 0 4px 12px rgba(234, 88, 12, 0.2); }
        
        .account-dropdown { position: absolute; top: 60px; right: 0; width: 340px; background: var(--surface); border: 1px solid var(--border-light); border-radius: 16px; box-shadow: 0 15px 40px rgba(0,0,0,0.12); padding: 24px; opacity: 0; visibility: hidden; transform: translateY(-15px); transition: all 0.2s ease; z-index: 1001; }
        .account-dropdown.show { opacity: 1; visibility: visible; transform: translateY(0); }
        
        .dropdown-profile { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border-light); }
        .dropdown-profile img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
        .dropdown-profile-info h4 { font-size: 1.15rem; color: var(--brand-dark); margin-bottom: 4px; font-weight: 800; }
        .dropdown-profile-info p { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
        
        .dropdown-menu { list-style: none; }
        .dropdown-menu li a { display: flex; align-items: center; gap: 14px; padding: 12px 10px; color: var(--brand-dark); font-weight: 700; font-size: 0.95rem; transition: var(--transition-smooth); border-radius: 8px; }
        .dropdown-menu li a:hover { color: var(--brand-accent); background: #fff7ed; }
        .dropdown-icon { font-size: 1.25rem; }
        .logout-btn { color: #dc2626 !important; cursor: pointer; }
        .logout-btn:hover { background: #fef2f2 !important; color: #b91c1c !important; }

        /* HERO & SEARCH */
        .hero { background: var(--surface); padding: 50px 5% 30px; text-align: center; }
        .hero-badge { display: inline-block; padding: 5px 14px; background: #fff7ed; color: var(--brand-accent); border-radius: 100px; font-weight: 700; font-size: 0.78rem; margin-bottom: 16px; text-transform: uppercase; border: 1px solid #fed7aa; }
        .hero h1 { font-size: 2.8rem; font-weight: 800; color: var(--brand-dark); line-height: 1.2; margin-bottom: 14px; letter-spacing: -1px; }
        .hero p { font-size: 1.05rem; color: var(--text-muted); max-width: 580px; margin: 0 auto 30px; line-height: 1.5; }
        
        .search-wrapper { max-width: 680px; margin: 0 auto; display: flex; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-light); background: var(--surface); }
        .search-wrapper input { flex: 1; padding: 18px 24px; border: none; outline: none; font-size: 1rem; font-weight: 500; }
        .search-wrapper button { background: var(--brand-accent); color: white; border: none; padding: 0 36px; font-size: 1rem; font-weight: 700; cursor: pointer; }

        /* PHOTO RAIL */
        .photo-slider-wrapper { background: var(--surface); padding: 24px 0 34px; overflow: hidden; border-bottom: 1px solid var(--border-light); position: relative; }
        .photo-track { display: flex; width: max-content; gap: 20px; animation: slidePhotos 35s linear infinite; }
        .photo-track:hover { animation-play-state: paused; }
        .slide-item { width: 280px; height: 180px; border-radius: 14px; overflow: hidden; position: relative; flex-shrink: 0; border: 1px solid var(--border-light); }
        .slide-item img { width: 100%; height: 100%; object-fit: cover; }
        .slide-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px 12px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); color: #fff; font-size: 0.82rem; font-weight: 700; }
        @keyframes slidePhotos { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* CATEGORIES */
        .container { max-width: 1440px; margin: 0 auto; padding: 50px 5%; }
        .category-slider { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px; margin-bottom: 40px; scrollbar-width: thin; scrollbar-color: var(--border-light) transparent; }
        .cat-card { flex: 0 0 auto; width: 200px; height: 120px; display: flex; align-items: flex-end; padding: 16px; background-color: var(--surface); border-radius: 14px; position: relative; overflow: hidden; transition: var(--transition-smooth); border: 2px solid transparent; text-decoration: none; background-size: cover; background-position: center; }
        .cat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%); z-index: 1; transition: var(--transition-smooth); }
        .cat-card:hover { transform: translateY(-5px); border-color: var(--brand-accent); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
        .cat-card:hover::before { background: linear-gradient(to top, rgba(234, 88, 12, 0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%); }
        .cat-title { position: relative; z-index: 2; font-size: 1.1rem; font-weight: 800; color: #ffffff; letter-spacing: 0.5px; }

        /* GRID */
        .section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 24px; }
        .section-title { font-size: 1.6rem; font-weight: 800; color: var(--brand-dark); }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 24px; }
        .card { background: var(--surface); border-radius: 14px; overflow: hidden; border: 1px solid var(--border-light); transition: var(--transition-smooth); display: flex; flex-direction: column; position: relative; }
        .card:hover { box-shadow: 0 14px 28px rgba(0,0,0,0.08); transform: translateY(-4px); }
        .card-img-wrap { height: 190px; background: #e2e8f0; position: relative; }
        .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .condition-tag { position: absolute; top: 10px; left: 10px; background: var(--surface); color: var(--brand-dark); font-size: 0.72rem; font-weight: 700; padding: 5px 10px; border-radius: 6px; text-transform: uppercase; z-index: 5; }
        .btn-wishlist-card { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: none; width: 34px; height: 34px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; }
        .card-body { padding: 18px; display: flex; flex-direction: column; flex: 1; }
        .card-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 6px; color: var(--brand-dark); }
        .card-footer { margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; }
        .price { font-size: 1.35rem; font-weight: 800; color: var(--brand-dark); }
        .btn-view { color: var(--brand-accent); font-weight: 700; font-size: 0.88rem; }
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
            <!-- Statically defined buttons. JS will show/hide them safely -->
            <a href="/login" id="loginBtn" class="btn-admin">Sign In</a>
            <img src="" alt="Profile" class="profile-trigger" id="profileBtn">
            
            <div class="account-dropdown" id="accountDropdown">
                <div class="dropdown-profile">
                    <img src="" alt="User" id="dropdownAvatar">
                    <div class="dropdown-profile-info">
                        <h4 id="userName">User</h4>
                        <p id="userEmail">Loading...</p>
                    </div>
                </div>

                <ul class="dropdown-menu">
                    <!-- Admin Button: Hardcoded but hidden by default -->
                    <li id="adminDropdownItem" style="display: none;">
                        <a href="/admin" style="color: var(--brand-accent); background: #fff7ed; border: 1px solid #fed7aa; margin-bottom: 8px;">
                            <span class="dropdown-icon">⚙️</span> Upload Vehicle (Admin)
                        </a>
                    </li>
                    <li><a href="/wishlist"><span class="dropdown-icon">❤️</span> My Wishlist</a></li>
                    <li><a href="/help"><span class="dropdown-icon">❓</span> Help & Support</a></li>
                    <li><a href="#" id="logoutBtn" class="logout-btn"><span class="dropdown-icon">🚪</span> Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="hero">
        <span class="hero-badge">Verified Second-Hand Hub</span>
        <h1>Reliable Vehicles for Indian Roads.</h1>
        <p>Pre-owned cars, bikes, tractors, and commercial haulers inspected for quality and honest pricing.</p>
        
        <form action="/" method="GET" class="search-wrapper">
            <input type="text" name="search" placeholder="Search models, brands, or vehicle types..." value="<%= typeof currentSearch !== 'undefined' ? currentSearch : '' %>">
            <button type="submit">Search</button>
        </form>
    </header>

    <section class="photo-slider-wrapper">
        <div class="photo-track">
            <!-- Set 1 -->
            <div class="slide-item"><img src="/public/images/car.jpg" alt="Car"><div class="slide-caption">City Commuters</div></div>
            <div class="slide-item"><img src="/public/images/bus.jpg" alt="Bus"><div class="slide-caption">Passenger Buses</div></div>
            <div class="slide-item"><img src="/public/images/truck%20.jpg" alt="Truck"><div class="slide-caption">Commercial Trucks</div></div>
            <div class="slide-item"><img src="/public/images/bike.jpg" alt="Bike"><div class="slide-caption">Commuter Bikes</div></div>
            <div class="slide-item"><img src="/public/images/jcb.jpg" alt="JCB"><div class="slide-caption">JCB Equipment</div></div>
            <div class="slide-item"><img src="/public/images/car3.jpg" alt="SUV"><div class="slide-caption">SUVs & Off-Road</div></div>
            <!-- Set 2 -->
            <div class="slide-item"><img src="/public/images/car.jpg" alt="Car"><div class="slide-caption">City Commuters</div></div>
            <div class="slide-item"><img src="/public/images/bus.jpg" alt="Bus"><div class="slide-caption">Passenger Buses</div></div>
            <div class="slide-item"><img src="/public/images/truck%20.jpg" alt="Truck"><div class="slide-caption">Commercial Trucks</div></div>
            <div class="slide-item"><img src="/public/images/bike.jpg" alt="Bike"><div class="slide-caption">Commuter Bikes</div></div>
            <div class="slide-item"><img src="/public/images/jcb.jpg" alt="JCB"><div class="slide-caption">JCB Equipment</div></div>
            <div class="slide-item"><img src="/public/images/car3.jpg" alt="SUV"><div class="slide-caption">SUVs & Off-Road</div></div>
        </div>
    </section>

    <main class="container">
        <div class="category-slider">
            <a href="/?type=Car" class="cat-card <%= currentType === 'Car' ? 'active' : '' %>" style="background-image: url('/public/images/car4.jpg');"><span class="cat-title">Cars</span></a>
            <a href="/?type=Bike" class="cat-card <%= currentType === 'Bike' ? 'active' : '' %>" style="background-image: url('/public/images/bike.jpg');"><span class="cat-title">Bikes</span></a>
            <a href="/?type=Tractor" class="cat-card <%= currentType === 'Tractor' ? 'active' : '' %>" style="background-image: url('/public/images/jcb.jpg');"><span class="cat-title">Tractors</span></a>
            <a href="/?type=JCB" class="cat-card <%= currentType === 'JCB' ? 'active' : '' %>" style="background-image: url('/public/images/jcb.jpg');"><span class="cat-title">JCB</span></a>
            <a href="/?type=Commercial" class="cat-card <%= currentType === 'Commercial' ? 'active' : '' %>" style="background-image: url('/public/images/truck%20.jpg');"><span class="cat-title">Commercial</span></a>
            <a href="/?type=Auto" class="cat-card <%= currentType === 'Auto' ? 'active' : '' %>" style="background-image: url('/public/images/auto.jpg');"><span class="cat-title">Autos</span></a>
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
                            <button class="btn-wishlist-card" title="Save to Wishlist">🤍</button>
                            <img src="<%= vehicle.imageUrl %>" alt="<%= vehicle.title %>">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title"><%= vehicle.title %></h3>
                            <span style="color: var(--text-muted); font-size: 0.88rem;"><%= vehicle.vehicleType %></span>
                            <div class="card-footer">
                                <span class="price">₹<%= vehicle.price.toLocaleString('en-IN') %></span>
                                <span class="btn-view">Calculate EMI &rarr;</span>
                            </div>
                        </div>
                    </a>
                <% }) %>
            <% } %>
        </div>
    </main>

    <!-- STABLE FIREBASE SCRIPT -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
        import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

        // *** IMPORTANT: PASTE YOUR FIREBASE KEYS HERE AFTER RUNNING THIS SCRIPT ***
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "shiva-motors-33ef4.firebaseapp.com",
            projectId: "shiva-motors-33ef4",
            storageBucket: "shiva-motors-33ef4.appspot.com",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        // UI Elements
        const profileBtn = document.getElementById('profileBtn');
        const loginBtn = document.getElementById('loginBtn');
        const dropdown = document.getElementById('accountDropdown');
        const adminDropdownItem = document.getElementById('adminDropdownItem');
        
        window.isUserLoggedIn = false;

        // Toggle Dropdown
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== profileBtn) {
                dropdown.classList.remove('show');
            }
        });

        // Smart Auth Listener
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.isUserLoggedIn = true;
                
                // Show Profile, Hide Login
                profileBtn.style.display = 'block';
                loginBtn.style.display = 'none';
                
                // Populate User Data
                const avatar = user.photoURL || \`https://ui-avatars.com/api/?name=\${user.displayName}&background=ea580c&color=fff\`;
                profileBtn.src = avatar;
                document.getElementById('dropdownAvatar').src = avatar;
                document.getElementById('userName').textContent = user.displayName || 'User';
                document.getElementById('userEmail').textContent = user.email;

                // SECURE ADMIN REVEAL
                if (user.email === 'amitraj.join@gmail.com') {
                    adminDropdownItem.style.display = 'block';
                } else {
                    adminDropdownItem.style.display = 'none';
                }
            } else {
                window.isUserLoggedIn = false;
                
                // Hide Profile, Show Login
                profileBtn.style.display = 'none';
                loginBtn.style.display = 'block';
                dropdown.classList.remove('show');
                adminDropdownItem.style.display = 'none';
            }
        });

        // Secure Logout
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                sessionStorage.clear(); // Clear all temp memory
                window.location.reload();
            }).catch((error) => {
                console.error("Logout Error", error);
            });
        });

        // Smart Interceptor for Cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                const clickedHeart = e.target.closest('.btn-wishlist-card');
                
                if (!window.isUserLoggedIn) {
                    e.preventDefault();
                    sessionStorage.setItem('loginRedirect', card.getAttribute('href'));
                    if (clickedHeart) alert("Please Sign In to save vehicles to your Wishlist!");
                    window.location.href = '/login';
                } else if (clickedHeart) {
                    e.preventDefault();
                    clickedHeart.textContent = clickedHeart.textContent === '🤍' ? '❤️' : '🤍';
                }
            });
        });
    </script>
</body>
</html>
`;

// ==========================================
// 2. PERFECTLY STABLE LOGIN.EJS
// ==========================================
const stableLoginEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Shiva Motors</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --brand-dark: #0f172a; --brand-accent: #ea580c; --surface: #ffffff; --bg-base: #f8fafc; --border-light: #e2e8f0; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: var(--bg-base); display: flex; justify-content: center; align-items: center; height: 100vh; }
        .login-card { background: var(--surface); padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); width: 100%; max-width: 400px; text-align: center; border: 1px solid var(--border-light); }
        .brand-logo { font-size: 28px; font-weight: 800; color: var(--brand-dark); text-decoration: none; display: block; margin-bottom: 8px; }
        .brand-logo span { color: var(--brand-accent); }
        .subtitle { color: #64748b; font-size: 0.95rem; margin-bottom: 32px; }
        .btn-google { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; padding: 14px; background: white; border: 1px solid var(--border-light); border-radius: 10px; font-size: 1rem; font-weight: 600; color: var(--brand-dark); cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
        .btn-google:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .btn-google img { width: 24px; height: 24px; }
    </style>
</head>
<body>
    <div class="login-card">
        <a href="/" class="brand-logo">Shiva<span>Motors</span></a>
        <p class="subtitle">Secure access to your account</p>
        
        <button id="googleLoginBtn" class="btn-google">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google">
            Continue with Google
        </button>
        <p style="margin-top: 20px; font-size: 0.85rem;"><a href="/" style="color: var(--brand-accent);">Return to Homepage</a></p>
    </div>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
        import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

        // *** IMPORTANT: PASTE YOUR FIREBASE KEYS HERE AS WELL ***
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "shiva-motors-33ef4.firebaseapp.com",
            projectId: "shiva-motors-33ef4",
            storageBucket: "shiva-motors-33ef4.appspot.com",
            messagingSenderId: "YOUR_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();

        document.getElementById('googleLoginBtn').addEventListener('click', async () => {
            try {
                await signInWithPopup(auth, provider);
                const redirectUrl = sessionStorage.getItem('loginRedirect') || '/';
                sessionStorage.removeItem('loginRedirect');
                window.location.href = redirectUrl;
            } catch (error) {
                console.error("Login failed:", error);
                alert("Login failed. Please try again.");
            }
        });
    </script>
</body>
</html>
`;

// Write the perfectly clean files
fs.writeFileSync(homePath, stableHomeEjs);
fs.writeFileSync(loginPath, stableLoginEjs);
console.log('✅ SUCCESS: Homepage and Login pages have been fully stabilized and rebuilt!');