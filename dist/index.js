import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
console.log('SHIVA MOTORS SERVER BOOTING...');
const mongoURI = process.env.MONGO_URI || '';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB successfully connected!'))
    .catch((err) => console.error('CRASH [MongoDB Connection Error]:', err));
app.get('/', (req, res) => {
    const currentType = req.query.type || 'Car';
    res.render('home', { currentType, vehicles: [] });
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    console.log('Login attempt received:', req.body);
    res.status(200).json({ success: true, message: 'Login successful' });
});
app.get('/buy', (req, res) => {
    res.render('buy');
});
app.get('/sell', (req, res) => {
    res.render('sell');
});
// --- FAST2SMS OTP & DATABASE SCHEMA ---
const SellRequestSchema = new mongoose.Schema({
    category: String,
    condition: String,
    details: String,
    price: Number,
    phone: String,
    status: { type: String, default: 'Pending Approval' },
    createdAt: { type: Date, default: Date.now }
});
const SellRequest = mongoose.model('SellRequest', SellRequestSchema);
const otpStore = {};
app.post('/api/send-otp', async (req, res) => {
    let { phone } = req.body;
    if (!phone)
        return res.status(400).json({ error: "Phone number is required." });
    phone = phone.replace("+91", "").trim();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phone] = otp;
    const API_KEY = process.env.FAST2SMS_KEY || "";
    try {
        const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
                "authorization": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                route: "otp",
                variables_values: otp,
                numbers: phone
            })
        });
        const data = await response.json();
        if (data.return) {
            res.json({ success: true });
        }
        else {
            res.status(500).json({ error: "SMS Gateway blocked the message." });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Failed to connect to SMS API." });
    }
});
app.post('/api/sell-vehicle', async (req, res) => {
    let { phone, otp, category, condition, details, price } = req.body;
    phone = phone.replace("+91", "").trim();
    if (otpStore[phone] !== otp) {
        return res.status(400).json({ error: "Invalid or expired OTP code." });
    }
    try {
        const newReq = new SellRequest({ category, condition, details, price, phone });
        await newReq.save();
        delete otpStore[phone];
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Database Error: Failed to save." });
    }
});
app.get('/admin/requests', async (req, res) => {
    try {
        const requests = await SellRequest.find().sort({ createdAt: -1 });
        let html = `<div style="font-family: sans-serif; padding: 40px; background: #f8fafc; min-height: 100vh;">
            <h2 style="color: #0f172a; margin-bottom: 20px;">Admin Dashboard - Pending Vehicle Sales</h2>
            <table border="1" cellpadding="12" style="border-collapse: collapse; width: 100%; background: white; border-color: #cbd5e1;">
                <tr style="background: #e2e8f0; text-align: left; color: #0f172a;">
                    <th>Date</th><th>Category</th><th>Condition</th><th>Expected Price</th><th>Verified Phone</th><th>Status</th>
                </tr>`;
        requests.forEach(r => {
            html += `<tr>
                <td>${r.createdAt.toLocaleDateString()}</td>
                <td><b>${r.category}</b></td>
                <td>${r.condition}</td>
                <td>₹${Number(r.price).toLocaleString('en-IN')}</td>
                <td style="color: #16a34a; font-weight: bold;">+91 ${r.phone}</td>
                <td><span style="background: #fef08a; padding: 4px 8px; border-radius: 4px; font-size: 0.85rem;">${r.status}</span></td>
            </tr>`;
        });
        html += `</table><br><a href="/" style="color: #ea580c; font-weight: bold; text-decoration: none;">&larr; Back to Home</a></div>`;
        res.send(html);
    }
    catch (err) {
        res.status(500).send("Error loading admin dashboard");
    }
});
const PORT = process.env.PORT || 3000;
app.listen(Number(PORT), '0.0.0.0', () => {
    console.log('Server running on port ' + PORT);
});
//# sourceMappingURL=index.js.map