const fs = require('fs');
const path = require('path');

const detailsPath = path.join(__dirname, 'views', 'details.ejs');
let detailsEjs = fs.readFileSync(detailsPath, 'utf8');

// Find and remove the entire disclaimer block
const disclaimerBlock = /<div class="disclaimer">[\s\S]*?<\/div>/;
detailsEjs = detailsEjs.replace(disclaimerBlock, '');

fs.writeFileSync(detailsPath, detailsEjs);
console.log('SUCCESS: Disclaimer removed from the details page!');