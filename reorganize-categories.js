const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
const indexTsPath = path.join(__dirname, 'src', 'index.ts');

// --- 1. UPDATE THE FRONTEND CATEGORY SLIDER & FOOTER ---
let homeEjs = fs.readFileSync(homePath, 'utf8');

const newCategorySlider = `<div class="category-slider">
            <a href="/?type=Car" class="cat-card <%= currentType === 'Car' ? 'active' : '' %>" style="background-image: url('/public/images/vignesh-rajendran-97ZU4Umo3WU-unsplash.jpg');">
                <span class="cat-title">Cars</span>
            </a>
            <a href="/?type=Bike" class="cat-card <%= currentType === 'Bike' ? 'active' : '' %>" style="background-image: url('/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg');">
                <span class="cat-title">Bikes</span>
            </a>
            <a href="/?type=Tractor" class="cat-card <%= currentType === 'Tractor' ? 'active' : '' %>" style="background-image: url('/public/images/tractor.jpg');">
                <span class="cat-title">Tractors</span>
            </a>
            <a href="/?type=JCB" class="cat-card <%= currentType === 'JCB' ? 'active' : '' %>" style="background-image: url('/public/images/jcb.jpg');">
                <span class="cat-title">JCB</span>
            </a>
            <a href="/?type=Commercial" class="cat-card <%= currentType === 'Commercial' ? 'active' : '' %>" style="background-image: url('/public/images/bharath-s-teB54jsTM6E-unsplash.jpg');">
                <span class="cat-title">Commercial</span>
            </a>
            <a href="/?type=Auto" class="cat-card <%= currentType === 'Auto' ? 'active' : '' %>" style="background-image: url('/public/images/auto.jpg');">
                <span class="cat-title">Autos</span>
            </a>
        </div>`;

// Replace the slider
homeEjs = homeEjs.replace(/<div class="category-slider">[\s\S]*?<\/div>/, newCategorySlider);

// Update Footer Links to match the new categories
const oldFooterCats = /<h4 class="footer-heading">Categories<\/h4>\s*<ul class="footer-links">[\s\S]*?<\/ul>/;
const newFooterCats = `<h4 class="footer-heading">Categories</h4>
                <ul class="footer-links">
                    <li><a href="/?type=Car">Second-Hand Cars</a></li>
                    <li><a href="/?type=Bike">Used Motorcycles</a></li>
                    <li><a href="/?type=Tractor">Farm Tractors</a></li>
                    <li><a href="/?type=JCB">JCB Equipment</a></li>
                    <li><a href="/?type=Commercial">Commercial Vehicles</a></li>
                    <li><a href="/?type=Auto">Commercial Autos</a></li>
                </ul>`;

homeEjs = homeEjs.replace(oldFooterCats, newFooterCats);
fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Frontend UI split JCB/Tractor and combined Commercial vehicles!');

// --- 2. UPDATE THE BACKEND DATABASE TYPES ---
let indexTs = fs.readFileSync(indexTsPath, 'utf8');

// Change the mock database items for Truck and Bus to 'Commercial' so they show up under the new button
indexTs = indexTs.replace(/vehicleType: 'Truck'/g, "vehicleType: 'Commercial'");
indexTs = indexTs.replace(/vehicleType: 'Bus'/g, "vehicleType: 'Commercial'");

fs.writeFileSync(indexTsPath, indexTs);
console.log('SUCCESS: Backend database successfully synced with new categories!');