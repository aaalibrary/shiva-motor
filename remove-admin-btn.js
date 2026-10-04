const fs = require('fs');
const path = require('path');

const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

// Search for the Admin Portal button and remove it from the code
homeEjs = homeEjs.replace(/<a href="\/admin\/login" class="btn-admin">Admin Portal<\/a>\s*/g, '');

fs.writeFileSync(homeEjsPath, homeEjs);
console.log('SUCCESS: Admin Portal button removed from the navigation bar!');