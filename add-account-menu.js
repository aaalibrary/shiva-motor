const fs = require('fs');
const path = require('path');

const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

// 1. Add the CSS for the new Dropdown Menu
const dropdownCSS = `
        /* ACCOUNT DROPDOWN */
        .profile-trigger { width: 42px; height: 42px; border-radius: 50%; cursor: pointer; object-fit: cover; border: 2px solid transparent; transition: var(--transition-smooth); }
        .profile-trigger:hover { border-color: var(--brand-accent); box-shadow: 0 4px 12px rgba(234, 88, 12, 0.2); }
        
        .account-dropdown { position: absolute; top: 75px; right: 5%; width: 340px; background: var(--surface); border: 1px solid var(--border-light); border-radius: 16px; box-shadow: 0 15px 40px rgba(0,0,0,0.12); padding: 24px; opacity: 0; visibility: hidden; transform: translateY(-15px); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1001; }
        .account-dropdown.show { opacity: 1; visibility: visible; transform: translateY(0); }
        
        .dropdown-profile { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border-light); }
        .dropdown-profile img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
        .dropdown-profile-info h4 { font-size: 1.15rem; color: var(--brand-dark); margin-bottom: 4px; font-weight: 800; }
        .dropdown-profile-info p { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
        
        .selling-progress-container { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border-light); }
        .selling-header { display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 700; color: var(--brand-dark); margin-bottom: 12px; }
        .progress-bar-bg { width: 100%; height: 8px; background: #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 8px; }
        .progress-bar-fill { height: 100%; width: 60%; background: var(--brand-accent); border-radius: 10px; transition: width 1s ease-in-out; }
        .progress-status { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
        
        .dropdown-menu { list-style: none; }
        .dropdown-menu li a { display: flex; align-items: center; gap: 14px; padding: 12px 10px; color: var(--brand-dark); font-weight: 700; font-size: 0.95rem; transition: var(--transition-smooth); border-radius: 8px; }
        .dropdown-menu li a:hover { color: var(--brand-accent); background: #fff7ed; }
        .dropdown-icon { font-size: 1.25rem; }
        .logout-btn { color: #dc2626 !important; }
        .logout-btn:hover { background: #fef2f2 !important; color: #b91c1c !important; }
    </style>`;
homeEjs = homeEjs.replace('</style>', dropdownCSS);

// 2. Add the Profile Icon to the Navbar
const oldNavRight = `<div class="nav-right">
            <span class="location-tag">📍 Dehradun</span>
            <a href="/admin/login" class="btn-admin">Admin Portal</a>
        </div>`;
const newNavRight = `<div class="nav-right">
            <span class="location-tag">📍 Dehradun</span>
            <a href="/admin/login" class="btn-admin">Admin Portal</a>
            <img src="https://ui-avatars.com/api/?name=Amit+Raj&background=ea580c&color=fff&bold=true" alt="Profile" class="profile-trigger" id="profileBtn">
        </div>`;
homeEjs = homeEjs.replace(oldNavRight, newNavRight);

// 3. Inject the Dropdown HTML directly after the Navbar
const dropdownHTML = `
    <!-- ACCOUNT DROPDOWN -->
    <div class="account-dropdown" id="accountDropdown">
        <div class="dropdown-profile">
            <img src="https://ui-avatars.com/api/?name=Amit+Raj&background=ea580c&color=fff&bold=true" alt="User">
            <div class="dropdown-profile-info">
                <h4>Amit Raj</h4>
                <p>amitraj.join@gmail.com</p>
            </div>
        </div>

        <div class="selling-progress-container">
            <div class="selling-header">
                <span>My Selling Progress</span>
                <span style="color: var(--brand-accent);">Step 2/4</span>
            </div>
            <div class="progress-bar-bg">
                <div class="progress-bar-fill"></div>
            </div>
            <div class="progress-status">Current: Scheduling Physical Inspection</div>
        </div>

        <ul class="dropdown-menu">
            <li><a href="#"><span class="dropdown-icon">❤️</span> My Wishlist</a></li>
            <li><a href="#"><span class="dropdown-icon">❓</span> Help & Support</a></li>
            <li><a href="#" class="logout-btn"><span class="dropdown-icon">🚪</span> Logout</a></li>
        </ul>
    </div>`;
homeEjs = homeEjs.replace('</nav>', '</nav>\n' + dropdownHTML);

// 4. Add the Javascript to toggle the menu open and closed
const toggleScript = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const profileBtn = document.getElementById('profileBtn');
            const dropdown = document.getElementById('accountDropdown');

            // Toggle dropdown when clicking the profile icon
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });

            // Close dropdown when clicking anywhere else on the page
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target) && e.target !== profileBtn) {
                    dropdown.classList.remove('show');
                }
            });
        });
    </script>
</body>`;
homeEjs = homeEjs.replace('</body>', toggleScript);

fs.writeFileSync(homeEjsPath, homeEjs);
console.log('SUCCESS: Professional Account Dropdown integrated successfully!');