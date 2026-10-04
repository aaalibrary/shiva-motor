const fs = require('fs');
const path = require('path');

const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

const accurateSliderBlock = `<div class="photo-track">
            <!-- Set 1: Accurately matched images and captions based on folder contents -->
            <div class="slide-item">
                <img src="/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg" alt="Yellow Hatchback">
                <div class="slide-caption">City Commuters</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg" alt="Passenger Bus">
                <div class="slide-caption">Passenger Buses</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bharath-s-teB54jsTM6E-unsplash.jpg" alt="Transport Truck">
                <div class="slide-caption">Commercial Trucks</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg" alt="Motorcycle">
                <div class="slide-caption">Commuter Bikes</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gowtham-agm-lTVFAgAFQa4-unsplash.jpg" alt="JCB Excavator">
                <div class="slide-caption">Tractors & JCB</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/muhammed-akthar-kszV_-3Ka1k-unsplash.jpg" alt="Black SUV">
                <div class="slide-caption">SUVs & Off-Road</div>
            </div>

            <!-- Set 2: Duplicate for Seamless Continuous Loop -->
            <div class="slide-item">
                <img src="/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg" alt="Yellow Hatchback">
                <div class="slide-caption">City Commuters</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg" alt="Passenger Bus">
                <div class="slide-caption">Passenger Buses</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bharath-s-teB54jsTM6E-unsplash.jpg" alt="Transport Truck">
                <div class="slide-caption">Commercial Trucks</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg" alt="Motorcycle">
                <div class="slide-caption">Commuter Bikes</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/gowtham-agm-lTVFAgAFQa4-unsplash.jpg" alt="JCB Excavator">
                <div class="slide-caption">Tractors & JCB</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/muhammed-akthar-kszV_-3Ka1k-unsplash.jpg" alt="Black SUV">
                <div class="slide-caption">SUVs & Off-Road</div>
            </div>
        </div>`;

// Safely replace the old photo track with the newly aligned one
homeEjs = homeEjs.replace(/<div class="photo-track">[\s\S]*?<\/div>\s*<\/section>/, accurateSliderBlock + '\n    </section>');

fs.writeFileSync(homeEjsPath, homeEjs);
console.log('SUCCESS: Images and captions have been perfectly matched!');