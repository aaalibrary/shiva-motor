const fs = require('fs');
const path = require('path');

const homeEjsPath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homeEjsPath, 'utf8');

const correctedCategoryBlock = `<div class="category-slider">
            <a href="/?type=Car" class="cat-card <%= currentType === 'Car' ? 'active' : '' %>" style="background-image: url('/public/images/vignesh-rajendran-97ZU4Umo3WU-unsplash.jpg');">
                <span class="cat-title">Cars</span>
            </a>
            <a href="/?type=Bike" class="cat-card <%= currentType === 'Bike' ? 'active' : '' %>" style="background-image: url('/public/images/gijs-coolen--5rcxih1e44-unsplash.jpg');">
                <span class="cat-title">Bikes</span>
            </a>
            <a href="/?type=Tractor" class="cat-card <%= currentType === 'Tractor' ? 'active' : '' %>" style="background-image: url('/public/images/gowtham-agm-lTVFAgAFQa4-unsplash.jpg');">
                <span class="cat-title">Tractors / JCB</span>
            </a>
            <a href="/?type=Truck" class="cat-card <%= currentType === 'Truck' ? 'active' : '' %>" style="background-image: url('/public/images/bharath-s-teB54jsTM6E-unsplash.jpg');">
                <span class="cat-title">Trucks</span>
            </a>
            <a href="/?type=Bus" class="cat-card <%= currentType === 'Bus' ? 'active' : '' %>" style="background-image: url('/public/images/amal-cr-HnQ_0B6Rxa0-unsplash.jpg');">
                <span class="cat-title">Buses</span>
            </a>
            <a href="/?type=Auto" class="cat-card <%= currentType === 'Auto' ? 'active' : '' %>" style="background-image: url('/public/images/adithya-kiran-n-_UFIW_Z8zgY-unsplash.jpg');">
                <span class="cat-title">Autos</span>
            </a>
        </div>`;

// Safely swap out the old scrambled category slider with the corrected one
homeEjs = homeEjs.replace(/<div class="category-slider">[\s\S]*?<\/div>/, correctedCategoryBlock);

fs.writeFileSync(homeEjsPath, homeEjs);
console.log('SUCCESS: Category cards now display the correct images!');