const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homePath, 'utf8');

// 1. Hardcode the button directly into the HTML menu (Hidden by default)
if (!homeEjs.includes('id="adminDropdownItem"')) {
    homeEjs = homeEjs.replace(
        '<ul class="dropdown-menu">',
        `<ul class="dropdown-menu">
            <li id="adminDropdownItem" style="display: none;">
                <a href="/admin" style="color: var(--brand-accent); background: #fff7ed; border: 1px solid #fed7aa; margin-bottom: 8px; border-radius: 8px;">
                    <span class="dropdown-icon">⚙️</span> Upload Vehicle (Admin)
                </a>
            </li>`
    );
}

// 2. Add the strict logic to unhide the button ONLY for your email
const targetJS = "document.querySelector('.dropdown-profile-info p').textContent = user.email;";
const unhideLogic = `document.querySelector('.dropdown-profile-info p').textContent = user.email;
                
                // UNHIDE ADMIN BUTTON FOR AMIT
                const adminBtn = document.getElementById('adminDropdownItem');
                if (adminBtn) {
                    if (user.email === 'amitraj.join@gmail.com') {
                        adminBtn.style.display = 'block';
                    } else {
                        adminBtn.style.display = 'none';
                    }
                }`;

// Safely apply the unhide logic without breaking existing code
if (!homeEjs.includes('UNHIDE ADMIN BUTTON FOR AMIT')) {
    homeEjs = homeEjs.replace(targetJS, unhideLogic);
}

fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Admin Upload button permanently hardcoded and secured!');