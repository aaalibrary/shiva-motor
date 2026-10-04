const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homePath, 'utf8');

// Update the text on the inventory cards to clearly advertise the EMI Calculator
homeEjs = homeEjs.replace(/<span class="btn-view">Details &rarr;<\/span>/g, '<span class="btn-view">Calculate EMI &rarr;</span>');

fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Homepage buttons updated to advertise the EMI calculator!');