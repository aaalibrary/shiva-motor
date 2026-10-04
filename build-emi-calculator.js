const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const detailsPath = path.join(viewsDir, 'details.ejs');
const indexTsPath = path.join(__dirname, 'src', 'index.ts');

// 1. CREATE THE VEHICLE DETAILS PAGE WITH EMI CALCULATOR
const detailsEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= vehicle.title %> | Shiva Motors</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --brand-dark: #0f172a; --brand-accent: #ea580c; --surface: #ffffff; --bg-base: #f8fafc; --border-light: #e2e8f0; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: var(--bg-base); color: var(--brand-dark); }
        
        /* Simple Navbar */
        .navbar { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 16px 5%; display: flex; justify-content: space-between; align-items: center; }
        .brand-logo { font-size: 24px; font-weight: 800; color: var(--brand-dark); text-decoration: none; }
        .brand-logo span { color: var(--brand-accent); }
        
        .container { max-width: 1200px; margin: 40px auto; padding: 0 5%; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; }
        
        /* Left: Vehicle Details */
        .vehicle-img { width: 100%; height: 400px; object-fit: cover; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); margin-bottom: 24px; }
        .vehicle-title { font-size: 2.2rem; font-weight: 800; margin-bottom: 8px; }
        .vehicle-price { font-size: 1.8rem; font-weight: 800; color: var(--brand-accent); margin-bottom: 16px; }
        .tag { display: inline-block; padding: 6px 12px; background: #e2e8f0; border-radius: 6px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; margin-right: 8px; }
        
        /* Right: EMI Calculator Card */
        .emi-card { background: var(--surface); padding: 32px; border-radius: 16px; border: 1px solid var(--border-light); box-shadow: 0 15px 35px rgba(0,0,0,0.04); position: sticky; top: 40px; }
        .emi-card h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 24px; border-bottom: 2px solid var(--border-light); padding-bottom: 12px; }
        
        .form-group { margin-bottom: 20px; }
        .form-group label { display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 600; color: #64748b; margin-bottom: 8px; }
        .form-group input[type="range"] { width: 100%; cursor: pointer; accent-color: var(--brand-accent); }
        .val-display { font-weight: 800; color: var(--brand-dark); }
        
        .emi-result-box { background: #fff7ed; border: 1px solid #fed7aa; padding: 24px; border-radius: 12px; text-align: center; margin-top: 24px; }
        .emi-result-box p { font-size: 0.9rem; color: var(--brand-accent); font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
        .emi-amount { font-size: 2.5rem; font-weight: 800; color: var(--brand-dark); }
        .emi-amount span { font-size: 1rem; color: #64748b; font-weight: 600; }
        
        .btn-contact { display: block; width: 100%; background: var(--brand-dark); color: white; text-align: center; padding: 16px; border-radius: 8px; font-weight: 700; font-size: 1.1rem; text-decoration: none; margin-top: 20px; transition: all 0.3s; }
        .btn-contact:hover { background: var(--brand-accent); }
        
        @media (max-width: 900px) {
            .container { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <nav class="navbar">
        <a href="/" class="brand-logo">Shiva<span>Motors</span></a>
        <a href="/" style="color: var(--brand-dark); font-weight: 600; text-decoration: none;">&larr; Back to Inventory</a>
    </nav>

    <div class="container">
        <!-- Vehicle Info -->
        <div>
            <img src="<%= vehicle.imageUrl %>" alt="<%= vehicle.title %>" class="vehicle-img">
            <h1 class="vehicle-title"><%= vehicle.title %></h1>
            <div class="vehicle-price">₹<%= vehicle.price.toLocaleString('en-IN') %></div>
            <div>
                <span class="tag"><%= vehicle.condition %></span>
                <span class="tag"><%= vehicle.vehicleType %></span>
            </div>
            <p style="margin-top: 24px; color: #64748b; line-height: 1.6;">
                This <%= vehicle.condition.toLowerCase() %> condition <%= vehicle.vehicleType.toLowerCase() %> has been rigorously inspected by the Shiva Motors team in Dehradun. It is road-ready and competitively priced.
            </p>
        </div>

        <!-- Smart EMI Calculator -->
        <div>
            <div class="emi-card">
                <h3>Finance Calculator</h3>
                
                <!-- Hidden inputs to hold base price -->
                <input type="hidden" id="carPrice" value="<%= vehicle.price %>">
                
                <div class="form-group">
                    <label>Down Payment <span class="val-display" id="dpDisplay">₹0</span></label>
                    <input type="range" id="downPayment" min="0" max="<%= vehicle.price %>" step="10000" value="<%= vehicle.price * 0.2 %>">
                </div>
                
                <div class="form-group">
                    <label>Interest Rate (p.a.) <span class="val-display" id="rateDisplay">9.5%</span></label>
                    <input type="range" id="interestRate" min="7" max="15" step="0.1" value="9.5">
                </div>
                
                <div class="form-group">
                    <label>Loan Tenure <span class="val-display" id="tenureDisplay">3 Years</span></label>
                    <input type="range" id="tenure" min="1" max="7" step="1" value="3">
                </div>
                
                <div class="emi-result-box">
                    <p>Estimated Monthly EMI</p>
                    <div class="emi-amount" id="emiResult">₹0<span> /mo</span></div>
                </div>
                
                <a href="#" class="btn-contact">Contact Seller</a>
            </div>
        </div>
    </div>

    <!-- Accurate Banking EMI Formula Script -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const price = parseFloat(document.getElementById('carPrice').value);
            const dpInput = document.getElementById('downPayment');
            const rateInput = document.getElementById('interestRate');
            const tenureInput = document.getElementById('tenure');
            
            const dpDisplay = document.getElementById('dpDisplay');
            const rateDisplay = document.getElementById('rateDisplay');
            const tenureDisplay = document.getElementById('tenureDisplay');
            const emiResult = document.getElementById('emiResult');

            function calculateEMI() {
                const downPayment = parseFloat(dpInput.value);
                const interestRate = parseFloat(rateInput.value);
                const tenureYears = parseFloat(tenureInput.value);
                
                // Update Displays
                dpDisplay.innerText = "₹" + downPayment.toLocaleString('en-IN');
                rateDisplay.innerText = interestRate + "%";
                tenureDisplay.innerText = tenureYears + (tenureYears === 1 ? " Year" : " Years");

                // Standard Amortization Formula Math
                const principal = price - downPayment;
                if (principal <= 0) {
                    emiResult.innerHTML = "₹0<span> /mo</span>";
                    return;
                }
                
                // r = monthly interest rate (annual rate / 12 / 100)
                const r = (interestRate / 12) / 100;
                // n = tenure in months
                const n = tenureYears * 12;
                
                // EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                
                emiResult.innerHTML = "₹" + Math.round(emi).toLocaleString('en-IN') + "<span> /mo</span>";
            }

            // Listeners
            dpInput.addEventListener('input', calculateEMI);
            rateInput.addEventListener('input', calculateEMI);
            tenureInput.addEventListener('input', calculateEMI);

            // Initial calculation on page load
            calculateEMI();
        });
    </script>
</body>
</html>
`;

fs.writeFileSync(detailsPath, detailsEjs);
console.log('SUCCESS: details.ejs created with interactive EMI Calculator!');

// 2. UPDATE SERVER (INDEX.TS) TO ROUTE TO THE NEW PAGE
let indexTs = fs.readFileSync(indexTsPath, 'utf8');

// Find the old placeholder route and replace it
const oldRoute = /app\.get\('\/vehicle\/:id', \(req, res\) => \{[\s\S]*?\}\);/;
const newRoute = `app.get('/vehicle/:id', (req, res) => {
    const vehicleId = parseInt(req.params.id);
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    
    if (!vehicle) {
        return res.status(404).send('Vehicle not found');
    }
    
    res.render('details', { vehicle: vehicle });
});`;

indexTs = indexTs.replace(oldRoute, newRoute);
fs.writeFileSync(indexTsPath, indexTs);
console.log('SUCCESS: Server routing updated to load the new Details page!');