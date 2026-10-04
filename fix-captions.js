const fs = require('fs');
const path = require('path');

const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

const correctedSliderBlock = `<div class="photo-track">
            <!-- Set 1: Corrected Captions based on your screenshot -->
            <div class="slide-item">
                <img src="/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg" alt="Commercial Truck">
                <div class="slide-caption">Commercial Trucks</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg" alt="Motorcycle">
                <div class="slide-caption">Commuter Bikes</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bharath-s-teB54jsTM6E-unsplash.jpg" alt="SUV">
                <div class="slide-caption">SUVs & Off-Road</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg" alt="White Hatchback">
                <div class="slide-caption">Family Cars</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/muhammed-akthar-kszV_-3Ka1k-unsplash.jpg" alt="Yellow Hatchback">
                <div class="slide-caption">City Commuters</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/vignesh-rajendran-97ZU4Umo3WU-unsplash.jpg" alt="Local Transit">
                <div class="slide-caption">Local Transit</div>
            </div>

            <!-- Set 2: Duplicate for Seamless Continuous Loop -->
            <div class="slide-item">
                <img src="/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg" alt="Commercial Truck">
                <div class="slide-caption">Commercial Trucks</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg" alt="Motorcycle">
                <div class="slide-caption">Commuter Bikes</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bharath-s-teB54jsTM6E-unsplash.jpg" alt="SUV">
                <div class="slide-caption">SUVs & Off-Road</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg" alt="White Hatchback">
                <div class="slide-caption">Family Cars</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/muhammed-akthar-kszV_-3Ka1k-unsplash.jpg" alt="Yellow Hatchback">
                <div class="slide-caption">City Commuters</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/vignesh-rajendran-97ZU4Umo3WU-unsplash.jpg" alt="Local Transit">
                <div class="slide-caption">Local Transit</div>
            </div>
        </div>`;

// Replace the old photo track with the newly aligned one
homeEjs = homeEjs.replace(/<div class="photo-track">[\s\S]*?<\/div>\s*<\/section>/, correctedSliderBlock + '\n    </section>');

fs.writeFileSync(homeEjsPath, homeEjs);
console.log('SUCCESS: Captions successfully realigned with the images!');