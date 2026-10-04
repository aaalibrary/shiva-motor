const fs = require('fs');
const path = require('path');

const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

// Replace the image block with your exact local file names
const newImagesBlock = `<div class="marquee-track">
                <!-- Group 1: Local Downloaded Images -->
                <img src="/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/bharath-s-teB54jsTM6E-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/muhammed-akthar-kszV_-3Ka1k-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/vignesh-rajendran-97ZU4Umo3WU-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                
                <!-- Group 2 (Repeated for seamless loop) -->
                <img src="/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/bharath-s-teB54jsTM6E-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/muhammed-akthar-kszV_-3Ka1k-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
                <img src="/public/images/vignesh-rajendran-97ZU4Umo3WU-unsplash.jpg" alt="Indian Vehicle" class="bg-vehicle">
            </div>`;

// Safely swap out the old images using regex
homeEjs = homeEjs.replace(/<div class="marquee-track">[\s\S]*?<\/div>/, newImagesBlock);

fs.writeFileSync(homeEjsPath, homeEjs);
console.log('SUCCESS: Background updated to use your local offline images!');