const fs = require('fs');
const path = require('path');

// 1. Update the Frontend Layouts (home.ejs)
const homePath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homePath, 'utf8');

// Replace the old yellow car with your new Auto image
homeEjs = homeEjs.replace(/\/public\/images\/adithya-kiran-n-_UFIW_Z8zgY-unsplash\.jpg/g, '/public/images/auto.jpg');
homeEjs = homeEjs.replace(/Yellow Hatchback/g, 'Auto');
homeEjs = homeEjs.replace(/City Commuters/g, 'Autos');

// Replace the old JCB excavator with your new Tractor image
homeEjs = homeEjs.replace(/\/public\/images\/gowtham-agm-lTVFAgAFQa4-unsplash\.jpg/g, '/public/images/tractor.jpg');
homeEjs = homeEjs.replace(/JCB Excavator/g, 'Tractor');

fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Homepage successfully linked to auto.jpg and tractor.jpg!');

// 2. Update the Backend Mock Database (src/index.ts)
const indexTsPath = path.join(__dirname, 'src', 'index.ts');
let indexTs = fs.readFileSync(indexTsPath, 'utf8');

indexTs = indexTs.replace(/\/public\/images\/adithya-kiran-n-_UFIW_Z8zgY-unsplash\.jpg/g, '/public/images/auto.jpg');
indexTs = indexTs.replace(/\/public\/images\/gowtham-agm-lTVFAgAFQa4-unsplash\.jpg/g, '/public/images/tractor.jpg');

fs.writeFileSync(indexTsPath, indexTs);
console.log('SUCCESS: Server database successfully linked to auto.jpg and tractor.jpg!');