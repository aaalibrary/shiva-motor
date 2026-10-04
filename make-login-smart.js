const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const homePath = path.join(viewsDir, 'home.ejs');
const loginPath = path.join(viewsDir, 'login.ejs');

// --- 1. UPDATE HOMEPAGE TO BE SMART ---
let homeEjs = fs.readFileSync(homePath, 'utf8');

// Add CSS for the new Wishlist Heart on the vehicle cards
const wishlistCSS = `
        .btn-wishlist-card { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: none; width: 34px; height: 34px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.15); z-index: 10; transition: var(--transition-smooth); display: flex; align-items: center; justify-content: center; }
        .btn-wishlist-card:hover { background: #fee2e2; transform: scale(1.1); }
    </style>`;
homeEjs = homeEjs.replace('</style>', wishlistCSS);

// Add the Heart Button HTML inside the image wrapper
const heartHTML = `<span class="condition-tag"><%= vehicle.condition %></span>
                            <button class="btn-wishlist-card" title="Save to Wishlist">🤍</button>`;
homeEjs = homeEjs.replace(/<span class="condition-tag"><%= vehicle\.condition %><\/span>/g, heartHTML);

// Upgrade the Firebase Script to track Auth State and Intercept Clicks
const smartAuthScript = `<script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
        import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

        // TODO: PASTE YOUR FIREBASE CONFIG HERE
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

        const profileBtn = document.getElementById('profileBtn');
        const dropdown = document.getElementById('accountDropdown');
        const navRight = document.querySelector('.nav-right');
        
        // Track login state globally
        window.isUserLoggedIn = false;
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.isUserLoggedIn = true;
                
                profileBtn.style.display = 'block';
                profileBtn.src = user.photoURL || \`https://ui-avatars.com/api/?name=\${user.displayName}&background=ea580c&color=fff\`;
                document.querySelector('.dropdown-profile-info h4').textContent = user.displayName;
                document.querySelector('.dropdown-profile-info p').textContent = user.email;

                if (document.getElementById('loginBtn')) {
                    document.getElementById('loginBtn').remove();
                }

                if (user.email === 'amitraj.join@gmail.com') {
                    if (!document.getElementById('dynamicAdminBtn')) {
                        const adminBtn = document.createElement('a');
                        adminBtn.href = '/admin';
                        adminBtn.id = 'dynamicAdminBtn';
                        adminBtn.className = 'btn-admin';
                        adminBtn.textContent = 'Admin Portal';
                        navRight.insertBefore(adminBtn, profileBtn);
                    }
                }
            } else {
                window.isUserLoggedIn = false;
                profileBtn.style.display = 'none';
                dropdown.classList.remove('show');
                
                if (!document.getElementById('loginBtn')) {
                    const loginBtn = document.createElement('a');
                    loginBtn.href = '/login';
                    loginBtn.id = 'loginBtn';
                    loginBtn.className = 'btn-admin';
                    loginBtn.textContent = 'Sign In';
                    navRight.appendChild(loginBtn);
                }
                
                if (document.getElementById('dynamicAdminBtn')) {
                    document.getElementById('dynamicAdminBtn').remove();
                }
            }
        });

        // 🧠 SMART LOGIN INTERCEPTOR 🧠
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                const clickedHeart = e.target.closest('.btn-wishlist-card');
                
                // If they are NOT logged in...
                if (!window.isUserLoggedIn) {
                    e.preventDefault(); // Stop them from proceeding
                    
                    // Save the vehicle URL they wanted to see
                    const targetUrl = card.getAttribute('href');
                    sessionStorage.setItem('loginRedirect', targetUrl);
                    
                    if (clickedHeart) {
                        alert("Please Sign In to save vehicles to your Wishlist!");
                    }
                    
                    // Route to login
                    window.location.href = '/login';
                } 
                // If they ARE logged in and clicked the heart...
                else if (clickedHeart) {
                    e.preventDefault(); // Don't navigate, just toggle the heart
                    clickedHeart.textContent = clickedHeart.textContent === '🤍' ? '❤️' : '🤍';
                    // In the future, we will save this to the database here!
                }
            });
        });

        document.querySelector('.logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = '/';
            });
        });
    </script>`;

homeEjs = homeEjs.replace(/<script type="module">[\s\S]*?<\/script>/, smartAuthScript);
fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Smart login interceptors added to Homepage!');

// --- 2. UPDATE LOGIN PAGE TO REMEMBER DESTINATION ---
let loginEjs = fs.readFileSync(loginPath, 'utf8');

// Replace the hardcoded redirect with a smart session memory redirect
loginEjs = loginEjs.replace(
    "window.location.href = '/'; // Redirect to home after login", 
    `// 🧠 SMART REDIRECT 🧠
                // Check if they were trying to view a specific vehicle before logging in
                const redirectUrl = sessionStorage.getItem('loginRedirect') || '/';
                sessionStorage.removeItem('loginRedirect'); // Clear the memory
                window.location.href = redirectUrl; // Send them to their destination`
);

fs.writeFileSync(loginPath, loginEjs);
console.log('SUCCESS: Login page upgraded with Smart Redirect memory!');