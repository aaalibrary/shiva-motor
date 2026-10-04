const fs = require('fs');
const path = require('path');

const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

const oldLogo = `<a href="/" class="brand-logo">Shiva<span>Motors</span></a>`;

const newLogoWithMotto = `<div style="display: flex; flex-direction: column;">
            <a href="/" class="brand-logo" style="line-height: 1;">Shiva<span>Motors</span></a>
            <span style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">Selling Vehicles, Earning Trust</span>
        </div>`;

// Replace the plain logo with the new logo + motto layout
if (homeEjs.includes(oldLogo)) {
    homeEjs = homeEjs.replace(oldLogo, newLogoWithMotto);
    fs.writeFileSync(homeEjsPath, homeEjs);
    console.log('SUCCESS: Company motto added under the logo!');
} else {
    console.log('ERROR: Could not find the logo tag. Make sure you haven\'t manually changed it.');
}