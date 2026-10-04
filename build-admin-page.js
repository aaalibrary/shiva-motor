const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const adminPath = path.join(viewsDir, 'admin.ejs');
const indexTsPath = path.join(__dirname, 'src', 'index.ts');

// 1. CREATE THE ADMIN UI PAGE
const adminEjs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | Shiva Motors</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root { --brand-dark: #0f172a; --brand-accent: #ea580c; --surface: #ffffff; --bg-base: #f8fafc; --border-light: #e2e8f0; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: var(--bg-base); color: var(--brand-dark); }
        
        .navbar { background: var(--surface); border-bottom: 1px solid var(--border-light); padding: 16px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
        .brand-logo { font-size: 24px; font-weight: 800; color: var(--brand-dark); text-decoration: none; }
        .brand-logo span { color: var(--brand-accent); }
        
        .container { max-width: 900px; margin: 40px auto; padding: 0 5%; }
        
        .admin-header { margin-bottom: 30px; }
        .admin-header h1 { font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; }
        .admin-header p { color: #64748b; margin-top: 8px; font-size: 1rem; }
        
        .upload-card { background: var(--surface); padding: 32px; border-radius: 16px; border: 1px solid var(--border-light); box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .full-width { grid-column: 1 / -1; }
        
        .form-group { display: flex; flex-direction: column; }
        .form-group label { font-size: 0.9rem; font-weight: 700; color: var(--brand-dark); margin-bottom: 8px; }
        
        .form-control { padding: 12px 16px; border: 1px solid var(--border-light); border-radius: 8px; font-size: 1rem; outline: none; transition: all 0.2s; background: #f8fafc; }
        .form-control:focus { border-color: var(--brand-accent); background: white; box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1); }
        select.form-control { cursor: pointer; }
        textarea.form-control { resize: vertical; min-height: 100px; }
        
        .image-upload-zone { border: 2px dashed #cbd5e1; border-radius: 12px; padding: 40px 20px; text-align: center; background: #f8fafc; cursor: pointer; transition: all 0.2s; }
        .image-upload-zone:hover { border-color: var(--brand-accent); background: #fff7ed; }
        .image-upload-zone input[type="file"] { display: none; }
        .upload-icon { font-size: 2.5rem; margin-bottom: 12px; display: block; }
        .upload-text { font-weight: 600; color: var(--brand-dark); margin-bottom: 4px; }
        .upload-subtext { font-size: 0.85rem; color: #64748b; }
        
        .btn-submit { background: var(--brand-accent); color: white; border: none; padding: 16px; font-size: 1.1rem; font-weight: 700; border-radius: 8px; cursor: pointer; width: 100%; margin-top: 32px; transition: background 0.2s; }
        .btn-submit:hover { background: #c2410c; }
        
        @media (max-width: 768px) {
            .form-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <nav class="navbar">
        <a href="/" class="brand-logo">Shiva<span>Motors</span></a>
        <a href="/" style="color: var(--brand-dark); font-weight: 600; text-decoration: none;">&larr; Exit Admin</a>
    </nav>

    <div class="container">
        <div class="admin-header">
            <h1>Upload New Vehicle</h1>
            <p>Enter the technical details and upload images to list a vehicle on the marketplace.</p>
        </div>

        <div class="upload-card">
            <!-- Ensure enctype is set for file uploads -->
            <form action="/admin/upload" method="POST" enctype="multipart/form-data">
                
                <div class="form-grid">
                    <!-- Image Upload -->
                    <div class="form-group full-width">
                        <label>Vehicle Picture</label>
                        <label class="image-upload-zone" id="dropZone">
                            <input type="file" name="vehicleImage" accept="image/*" id="fileInput" required>
                            <span class="upload-icon">📸</span>
                            <div class="upload-text">Click to upload vehicle photo</div>
                            <div class="upload-subtext" id="fileName">Supports JPG, PNG (Max 5MB)</div>
                        </label>
                    </div>

                    <!-- Row 1: Vehicle & Model -->
                    <div class="form-group">
                        <label>Vehicle Type</label>
                        <select name="vehicleType" class="form-control" required>
                            <option value="">Select Category</option>
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>
                            <option value="Tractor">Tractor</option>
                            <option value="JCB">JCB</option>
                            <option value="Commercial">Commercial (Truck/Bus)</option>
                            <option value="Auto">Auto</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Model Name</label>
                        <input type="text" name="model" class="form-control" placeholder="e.g. Swift VXI, Tata Signa" required>
                    </div>

                    <!-- Row 2: Year & Price -->
                    <div class="form-group">
                        <label>Manufacturing Year</label>
                        <input type="number" name="year" class="form-control" placeholder="e.g. 2019" required>
                    </div>

                    <div class="form-group">
                        <label>Price (₹)</label>
                        <input type="number" name="price" class="form-control" placeholder="e.g. 450000" required>
                    </div>

                    <!-- Row 3: Condition & Running -->
                    <div class="form-group">
                        <label>Condition</label>
                        <select name="condition" class="form-control" required>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Running (Kilometers)</label>
                        <input type="number" name="running" class="form-control" placeholder="e.g. 45000" required>
                    </div>

                    <!-- Row 4: RTO & Engine -->
                    <div class="form-group">
                        <label>RTO Registered</label>
                        <input type="text" name="rto" class="form-control" placeholder="e.g. UK07 (Dehradun)" required>
                    </div>

                    <div class="form-group">
                        <label>Engine / Horsepower</label>
                        <input type="text" name="engineHp" class="form-control" placeholder="e.g. 1197cc / 88.5 HP" required>
                    </div>

                    <!-- Row 5: Parts Swapped -->
                    <div class="form-group full-width">
                        <label>Any Parts Swapped or Repaired</label>
                        <textarea name="partsRepaired" class="form-control" placeholder="Detail any major mechanical repairs, replaced parts, or aftermarket modifications..."></textarea>
                    </div>
                </div>

                <button type="submit" class="btn-submit">List Vehicle for Sale</button>
            </form>
        </div>
    </div>

    <script>
        // Simple script to show the selected file name in the upload zone
        document.getElementById('fileInput').addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : "Supports JPG, PNG (Max 5MB)";
            document.getElementById('fileName').textContent = fileName;
            document.getElementById('dropZone').style.borderColor = "var(--brand-accent)";
            document.getElementById('dropZone').style.background = "#fff7ed";
        });
    </script>
</body>
</html>
`;

fs.writeFileSync(adminPath, adminEjs);
console.log('SUCCESS: admin.ejs file created with all requested fields!');

// 2. UPDATE SERVER ROUTING (index.ts)
let indexTs = fs.readFileSync(indexTsPath, 'utf8');

const oldAdminRoute = /app\.get\('\/admin', \(req, res\) => \{[\s\S]*?\}\);/;
const newAdminRoute = `app.get('/admin', (req, res) => {
    // Serve the newly created Admin EJS page
    res.render('admin');
});

// Placeholder for handling the form submission
app.post('/admin/upload', (req, res) => {
    console.log("New Vehicle Upload Data:", req.body);
    // Redirect back to home for now until backend file storage (Multer/Firebase) is wired up
    res.redirect('/?success=true');
});`;

if (indexTs.match(oldAdminRoute)) {
    indexTs = indexTs.replace(oldAdminRoute, newAdminRoute);
    fs.writeFileSync(indexTsPath, indexTs);
    console.log('SUCCESS: index.ts routing updated to serve the Admin Dashboard!');
}