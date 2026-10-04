const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homePath, 'utf8');

// Update Instagram link
homeEjs = homeEjs.replace(
    'href="https://instagram.com"', 
    'href="https://www.instagram.com/shivamotors.pvt.ltd?utm_source=qr&stkn=NGJjaGhtdGw5cm12"'
);

// Update Facebook link
homeEjs = homeEjs.replace(
    'href="https://facebook.com"', 
    'href="https://www.facebook.com/share/1C5VzfoXMz/"'
);

fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Social media links connected to the footer!');