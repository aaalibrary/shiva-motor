const fs = require('fs');
const path = require('path');

const detailsPath = path.join(__dirname, 'views', 'details.ejs');

const updatedDetailsEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= vehicle.title %> | Shiva Motors</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --brand-dark: #0f172a; --brand-accent: #ea580c; --surface: #ffffff; --bg-base: #f1f5f9; --border-light: #cbd5e1; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: var(--bg-base); color: var(--brand-dark); }
        
        .navbar { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 16px 5%; display: flex; justify-content: space-between; align-items: center; }
        .brand-logo { font-size: 24px; font-weight: 800; color: var(--brand-dark); text-decoration: none; }
        .brand-logo span { color: var(--brand-accent); }
        
        .container { max-width: 1200px; margin: 40px auto; padding: 0 5%; display: grid; grid-template-columns: 1fr 400px; gap: 40px; }
        
        /* Left: Vehicle Details */
        .vehicle-img { width: 100%; height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 24px; border: 1px solid var(--border-light); }
        .vehicle-title { font-size: 2rem; font-weight: 800; margin-bottom: 8px; }
        .vehicle-price { font-size: 1.8rem; font-weight: 800; color: var(--brand-accent); margin-bottom: 16px; }
        .tag { display: inline-block; padding: 6px 12px; background: #e2e8f0; border-radius: 6px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; margin-right: 8px; }
        
        /* Right: Exact Match EMI Calculator */
        .emi-wrapper { background: #f8fafc; padding: 20px; border-left: 4px solid #0284c7; }
        .emi-header { color: #0284c7; font-size: 1.4rem; font-weight: 600; margin-bottom: 20px; }
        .emi-card-inner { background: white; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .emi-card-inner h3 { color: #0f766e; font-size: 1.3rem; font-weight: 500; margin-bottom: 24px; }
        
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: #334155; margin-bottom: 8px; }
        
        .input-wrapper { display: flex; border: 1px solid #94a3b8; border-radius: 4px; overflow: hidden; background: white; }
        .input-wrapper span { background: #f1f5f9; padding: 10px 16px; color: #0f172a; font-weight: 600; border-right: 1px solid #94a3b8; }
        .input-wrapper span.suffix { border-right: none; border-left: 1px solid #94a3b8; }
        .input-wrapper input { flex: 1; border: none; padding: 10px 12px; font-size: 1rem; outline: none; }
        
        .simple-input { width: 100%; border: 1px solid #94a3b8; border-radius: 4px; padding: 10px 12px; font-size: 1rem; outline: none; }
        
        .btn-calc-container { display: flex; justify-content: flex-end; margin-bottom: 24px; }
        .btn-calc { background: #26a69a; color: white; border: none; padding: 10px 20px; font-size: 0.95rem; font-weight: 600; border-radius: 2px; cursor: pointer; letter-spacing: 0.5px; transition: background 0.2s; }
        .btn-calc:hover { background: #208d82; }
        
        .result-wrapper { background: #f1f5f9; border: 1px solid #cbd5e1; }
        .result-wrapper input { background: transparent; }
        
        .disclaimer { margin-top: 24px; font-size: 0.9rem; color: #334155; line-height: 1.6; }
        .disclaimer h4 { font-size: 1rem; color: #0f172a; margin-bottom: 8px; font-weight: 700; }
        
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
        </div>

        <!-- Matched EMI Calculator -->
        <div class="emi-wrapper">
            <h2 class="emi-header">EMI Calculator</h2>
            
            <div class="emi-card-inner">
                <h3>EMI Calculator</h3>
                
                <div class="form-group">
                    <label>Loan Amount</label>
                    <div class="input-wrapper">
                        <span>₹</span>
                        <!-- Pre-filling with vehicle price, but user can edit -->
                        <input type="number" id="loanAmt" value="<%= vehicle.price %>">
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Interest Rate</label>
                    <div class="input-wrapper">
                        <input type="number" id="intRate" value="15">
                        <span class="suffix">%</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>Years to Pay</label>
                    <input type="number" id="tenureYrs" value="5" class="simple-input">
                </div>
                
                <div class="btn-calc-container">
                    <button class="btn-calc" id="calcBtn">CALCULATE</button>
                </div>
                
                <div class="form-group">
                    <label>Monthly Payment</label>
                    <div class="input-wrapper result-wrapper">
                        <input type="text" id="monthlyPmt" readonly>
                    </div>
                </div>
                
                <div class="disclaimer">
                    <h4>Disclaimer:</h4>
                    <p>Please note that these calculators are for illustrations only and do not represent actual returns.</p>
                    <p style="margin-top: 8px;">Stock Market does not have a fixed rate of return and it is not possible to predict the rate of return.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Click-Based Calculation Script -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const btn = document.getElementById('calcBtn');
            
            btn.addEventListener('click', () => {
                const P = parseFloat(document.getElementById('loanAmt').value);
                const annualRate = parseFloat(document.getElementById('intRate').value);
                const years = parseFloat(document.getElementById('tenureYrs').value);
                
                if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || years <= 0) {
                    document.getElementById('monthlyPmt').value = "0.00";
                    return;
                }
                
                // Formula variables
                const r = (annualRate / 12) / 100;
                const n = years * 12;
                
                let emi = 0;
                if (r === 0) {
                    emi = P / n;
                } else {
                    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
                }
                
                // Format output with commas and 2 decimals exactly like screenshot
                const formatter = new Intl.NumberFormat('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                
                document.getElementById('monthlyPmt').value = formatter.format(emi);
            });
        });
    </script>
</body>
</html>
`;

fs.writeFileSync(detailsPath, updatedDetailsEjs);
console.log('SUCCESS: Details page updated with the exact manual EMI calculator design!');