const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homePath, 'utf8');

// 1. Change where the Admin button gets injected (Move it to the dropdown list)
const oldAdminInjection = /if \(user\.email === 'amitraj\.join@gmail\.com'\) \{[\s\S]*?\}\s*\}/;
const newAdminInjection = `if (user.email === 'amitraj.join@gmail.com') {
                    // Inject "Upload Vehicle" directly into the dropdown menu
                    if (!document.getElementById('adminDropdownItem')) {
                        const dropdownMenu = document.querySelector('.dropdown-menu');
                        const adminItem = document.createElement('li');
                        adminItem.id = 'adminDropdownItem';
                        adminItem.innerHTML = '<a href="/admin" style="color: var(--brand-accent); background: #fff7ed; border: 1px solid #fed7aa; margin-bottom: 8px;"><span class="dropdown-icon">⚙️</span> Upload Vehicle (Admin)</a>';
                        dropdownMenu.insertBefore(adminItem, dropdownMenu.firstChild);
                    }
                }`;

homeEjs = homeEjs.replace(oldAdminInjection, newAdminInjection);

// 2. Change the logout cleanup logic so it removes the correct item
const oldAdminRemoval = /if \(document\.getElementById\('dynamicAdminBtn'\)\) \{[\s\S]*?\}/;
const newAdminRemoval = `if (document.getElementById('adminDropdownItem')) {
                    document.getElementById('adminDropdownItem').remove();
                }`;

homeEjs = homeEjs.replace(oldAdminRemoval, newAdminRemoval);

fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Admin Upload button moved into the Profile Dropdown!');