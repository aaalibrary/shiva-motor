const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const srcDir = path.join(__dirname, 'src');

// 1. UPDATE LOGIN.EJS (Frontend Firebase SMS Logic)
fs.writeFileSync(path.join(viewsDir, 'login.ejs'), `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login - Shiva Motors</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #f7f9fa; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 400px; text-align: center; }
        .input-group { margin-bottom: 15px; text-align: left; }
        input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; box-sizing: border-box; }
        .btn { width: 100%; background: #ef6c00; color: white; padding: 12px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 1rem; margin-top: 10px; transition: 0.3s; }
        .btn:hover { background: #d86200; }
        #otp-section, #recaptcha-container { margin-top: 15px; }
    </style>
</head>
<body>
    <div class="card">
        <h2 style="color: #04142b; margin-bottom: 25px;">Admin Login</h2>
        <p id="message" style="color: #666; font-size: 0.9rem; margin-bottom: 15px;"></p>

        <div id="phone-section">
            <div class="input-group">
                <input type="tel" id="phone" placeholder="10-digit Mobile Number" maxlength="10">
            </div>
            <div id="recaptcha-container"></div>
            <button class="btn" id="send-otp-btn">Send Real SMS</button>
        </div>

        <div id="otp-section" style="display: none;">
            <div class="input-group">
                <input type="number" id="otp" placeholder="Enter 6-digit OTP" maxlength="6">
            </div>
            <button class="btn" id="verify-otp-btn">Verify & Login</button>
        </div>
    </div>

    <!-- Firebase Modular SDK -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
        import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyBFgXHdimiKDSOZ8FtUvgBGzqLOmeVcY6o",
            authDomain: "shiva-motors-33ef4.firebaseapp.com",
            projectId: "shiva-motors-33ef4",
            storageBucket: "shiva-motors-33ef4.firebasestorage.app",
            messagingSenderId: "1001689773951",
            appId: "1:1001689773951:web:1f0ddad6f3bb6bf6894c4a",
            measurementId: "G-EM1SP5FD8M"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        let confirmationResult;

        // Initialize invisible reCAPTCHA
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'send-otp-btn', {
            'size': 'invisible',
            'callback': (response) => { }
        });

        document.getElementById('send-otp-btn').addEventListener('click', () => {
            const phone = document.getElementById('phone').value;
            if(phone.length < 10) return alert('Enter a valid 10-digit number');
            
            const phoneNumber = '+91' + phone; 
            const appVerifier = window.recaptchaVerifier;
            
            document.getElementById('message').innerText = "Sending SMS...";

            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((result) => {
                    confirmationResult = result;
                    document.getElementById('phone-section').style.display = 'none';
                    document.getElementById('otp-section').style.display = 'block';
                    document.getElementById('message').innerText = "SMS sent! Enter the 6-digit code.";
                    document.getElementById('message').style.color = "#666";
                }).catch((error) => {
                    console.error(error);
                    document.getElementById('message').innerText = "Error sending SMS. Check console.";
                    document.getElementById('message').style.color = "red";
                });
        });

        document.getElementById('verify-otp-btn').addEventListener('click', () => {
            const code = document.getElementById('otp').value;
            confirmationResult.confirm(code).then((result) => {
                const user = result.user;
                fetch('/admin/firebase-success', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: user.phoneNumber })
                }).then(res => res.json()).then(data => {
                    if(data.success) window.location.href = data.redirect;
                });
            }).catch((error) => {
                document.getElementById('message').innerText = "Invalid OTP. Try again.";
                document.getElementById('message').style.color = "red";
            });
        });
    </script>
</body>
</html>
`);

// 2. UPDATE INDEX.TS (Add endpoint to accept Firebase success)
let indexTs = fs.readFileSync(path.join(srcDir, 'index.ts'), 'utf8');

if (!indexTs.includes('/admin/firebase-success')) {
    const routeCode = `
app.post('/admin/firebase-success', (req, res) => {
  const { phone } = req.body;
  // Firebase verified them, so we issue our secure JWT cookie
  const token = jwt.sign({ role: 'admin', phone }, SECRET, { expiresIn: '1d' });
  res.cookie('admin_token', token, { httpOnly: true });
  res.json({ success: true, redirect: '/admin' });
});
`;
    indexTs = indexTs.replace('app.get(\'/admin/login\'', routeCode + '\napp.get(\'/admin/login\'');
    fs.writeFileSync(path.join(srcDir, 'index.ts'), indexTs);
}

console.log('SUCCESS: Firebase Auth integrated into login page!');