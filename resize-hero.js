const fs = require('fs');
const path = require('path');

const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

// 1. Reduce the top and bottom padding of the whole section
homeEjs = homeEjs.replace('padding: 100px 5% 80px;', 'padding: 60px 5% 50px;');

// 2. Make the sliding background images slightly smaller
homeEjs = homeEjs.replace('height: 160px; width: 260px;', 'height: 110px; width: 180px;');

// 3. Shrink the main Headline text
homeEjs = homeEjs.replace('font-size: 4rem;', 'font-size: 3rem;');

// 4. Adjust the background animation position to stay centered behind the smaller text
homeEjs = homeEjs.replace('top: 10%;', 'top: 15%;');

fs.writeFileSync(homeEjsPath, homeEjs);
console.log('SUCCESS: Hero section resized to a clean medium layout!');