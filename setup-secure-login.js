const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const loginPath = path.join(viewsDir, 'login.ejs');
const homePath = path.join(viewsDir, 'home.ejs');

// 1. Create the new Secure Login Page
const loginEjs = `
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
    </div>

    <script type="module">
        // IMPORT FIREBASE (Ensure this matches your Firebase version)
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
        import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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
        const provider = new GoogleAuthProvider();

        document.getElementById('googleLoginBtn').addEventListener('click', async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                window.location.href = '/'; // Redirect to home after login
            } catch (error) {
                console.error("Login failed:", error);
                alert("Login failed. Please try again.");
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync(loginPath, loginEjs);
console.log('SUCCESS: Created secure login.ejs page.');

// 2. Add Dynamic Auth Logic to Home Page
let homeEjs = fs.readFileSync(homePath, 'utf8');

const dynamicAuthScript = `
    <!-- FIREBASE AUTHENTICATION LOGIC -->
    <script type="module">
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

        // UI Elements
        const profileBtn = document.getElementById('profileBtn');
        const dropdown = document.getElementById('accountDropdown');
        const navRight = document.querySelector('.nav-right');
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in: Update Profile UI
                profileBtn.src = user.photoURL || \`https://ui-avatars.com/api/?name=\${user.displayName}&background=ea580c&color=fff\`;
                document.querySelector('.dropdown-profile-info h4').textContent = user.displayName;
                document.querySelector('.dropdown-profile-info p').textContent = user.email;

                // SECURE ADMIN CHECK
                if (user.email === 'amitraj.join@gmail.com') {
                    // Inject Admin Portal button dynamically
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
                // User is logged out: Replace profile circle with Login button
                profileBtn.style.display = 'none';
                dropdown.style.display = 'none';
                
                if (!document.getElementById('loginBtn')) {
                    const loginBtn = document.createElement('a');
                    loginBtn.href = '/login';
                    loginBtn.id = 'loginBtn';
                    loginBtn.className = 'btn-admin';
                    loginBtn.textContent = 'Sign In';
                    navRight.appendChild(loginBtn);
                }
            }
        });

        // Handle Logout
        document.querySelector('.logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.reload();
            });
        });
    </script>
</body>`;

homeEjs = homeEjs.replace('</body>', dynamicAuthScript);
fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Dynamic Auth logic injected into Home page.');