const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
const indexTsPath = path.join(__dirname, 'src', 'index.ts');

// --- 1. UPDATE FRONTEND (home.ejs) ---
let homeEjs = fs.readFileSync(homePath, 'utf8');

// A. Replace the Photo Track Rail
const newPhotoTrack = `<div class="photo-track">
            <!-- Set 1: Exact Simplified Filenames -->
            <div class="slide-item">
                <img src="/public/images/car.jpg" alt="Yellow Hatchback">
                <div class="slide-caption">City Commuters</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bus.jpg" alt="Passenger Bus">
                <div class="slide-caption">Passenger Buses</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/truck%20.jpg" alt="Transport Truck">
                <div class="slide-caption">Commercial Trucks</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bike.jpg" alt="Motorcycle">
                <div class="slide-caption">Commuter Bikes</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/jcb.jpg" alt="JCB Excavator">
                <div class="slide-caption">JCB Equipment</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/car3.jpg" alt="Black SUV">
                <div class="slide-caption">SUVs & Off-Road</div>
            </div>

            <!-- Set 2: Duplicate for Seamless Continuous Loop -->
            <div class="slide-item">
                <img src="/public/images/car.jpg" alt="Yellow Hatchback">
                <div class="slide-caption">City Commuters</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bus.jpg" alt="Passenger Bus">
                <div class="slide-caption">Passenger Buses</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/truck%20.jpg" alt="Transport Truck">
                <div class="slide-caption">Commercial Trucks</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/bike.jpg" alt="Motorcycle">
                <div class="slide-caption">Commuter Bikes</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/jcb.jpg" alt="JCB Excavator">
                <div class="slide-caption">JCB Equipment</div>
            </div>
            <div class="slide-item">
                <img src="/public/images/car3.jpg" alt="Black SUV">
                <div class="slide-caption">SUVs & Off-Road</div>
            </div>
        </div>`;

homeEjs = homeEjs.replace(/<div class="photo-track">[\s\S]*?<\/div>\s*<\/section>/, newPhotoTrack + '\n    </section>');

// B. Replace the Category Slider Backgrounds
const newCategorySlider = `<div class="category-slider">
            <a href="/?type=Car" class="cat-card <%= currentType === 'Car' ? 'active' : '' %>" style="background-image: url('/public/images/car4.jpg');">
                <span class="cat-title">Cars</span>
            </a>
            <a href="/?type=Bike" class="cat-card <%= currentType === 'Bike' ? 'active' : '' %>" style="background-image: url('/public/images/bike.jpg');">
                <span class="cat-title">Bikes</span>
            </a>
            <a href="/?type=Tractor" class="cat-card <%= currentType === 'Tractor' ? 'active' : '' %>" style="background-image: url('/public/images/jcb.jpg');">
                <span class="cat-title">Tractors</span>
            </a>
            <a href="/?type=JCB" class="cat-card <%= currentType === 'JCB' ? 'active' : '' %>" style="background-image: url('/public/images/jcb.jpg');">
                <span class="cat-title">JCB</span>
            </a>
            <a href="/?type=Commercial" class="cat-card <%= currentType === 'Commercial' ? 'active' : '' %>" style="background-image: url('/public/images/truck%20.jpg');">
                <span class="cat-title">Commercial</span>
            </a>
            <a href="/?type=Auto" class="cat-card <%= currentType === 'Auto' ? 'active' : '' %>" style="background-image: url('/public/images/auto.jpg');">
                <span class="cat-title">Autos</span>
            </a>
        </div>`;

homeEjs = homeEjs.replace(/<div class="category-slider">[\s\S]*?<\/div>/, newCategorySlider);
fs.writeFileSync(homePath, homeEjs);
console.log('SUCCESS: Frontend EJS updated with new exact filenames!');


// --- 2. UPDATE BACKEND (index.ts) ---
let indexTs = fs.readFileSync(indexTsPath, 'utf8');

const newMockVehicles = `const mockVehicles = [
    { id: 1, title: 'Maruti Suzuki Swift VXI', vehicleType: 'Car', condition: 'Excellent', price: 450000, imageUrl: '/public/images/car4.jpg' },
    { id: 2, title: 'Bajaj Pulsar 150', vehicleType: 'Bike', condition: 'Good', price: 45000, imageUrl: '/public/images/bike.jpg' },
    { id: 3, title: 'JCB 3DX Excavator', vehicleType: 'JCB', condition: 'Like New', price: 1500000, imageUrl: '/public/images/jcb.jpg' },
    { id: 4, title: 'Tata Signa Tipper', vehicleType: 'Commercial', condition: 'Good', price: 2500000, imageUrl: '/public/images/truck%20.jpg' },
    { id: 5, title: 'Tata Starbus', vehicleType: 'Commercial', condition: 'Fair', price: 850000, imageUrl: '/public/images/bus.jpg' },
    { id: 6, title: 'Bajaj RE Auto', vehicleType: 'Auto', condition: 'Excellent', price: 120000, imageUrl: '/public/images/auto.jpg' },
    { id: 7, title: 'Mahindra Thar', vehicleType: 'Car', condition: 'Excellent', price: 950000, imageUrl: '/public/images/car3.jpg' },
    { id: 8, title: 'Tata Tiago', vehicleType: 'Car', condition: 'Good', price: 380000, imageUrl: '/public/images/car.jpg' }
];`;

indexTs = indexTs.replace(/const mockVehicles = \[[\s\S]*?\];/, newMockVehicles);
fs.writeFileSync(indexTsPath, indexTs);
console.log('SUCCESS: Backend Database synced with new image names!');