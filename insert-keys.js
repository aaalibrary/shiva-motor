const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
const loginPath = path.join(__dirname, 'views', 'login.ejs');

const realConfig = `const firebaseConfig = {
            apiKey: "AIzaSyBFgXHdimiKDSOZ8FtUvgBGzqLOmeVcY6o",
            authDomain: "shiva-motors-33ef4.firebaseapp.com",
            projectId: "shiva-motors-33ef4",
            storageBucket: "shiva-motors-33ef4.firebasestorage.app",
            messagingSenderId: "1001689773951",
            appId: "1:1001689773951:web:1f0ddad6f3bb6bf6894c4a"
        };`;

const placeholderConfigRegex = /const firebaseConfig = \{[\s\S]*?appId: "YOUR_APP_ID"\n\s*\};/;

// 1. Update home.ejs
if (fs.existsSync(homePath)) {
    let homeEjs = fs.readFileSync(homePath, 'utf8');
    homeEjs = homeEjs.replace(placeholderConfigRegex, realConfig);
    fs.writeFileSync(homePath, homeEjs);
    console.log('SUCCESS: Real keys injected into home.ejs!');
}

// 2. Update login.ejs
if (fs.existsSync(loginPath)) {
    let loginEjs = fs.readFileSync(loginPath, 'utf8');
    loginEjs = loginEjs.replace(placeholderConfigRegex, realConfig);
    fs.writeFileSync(loginPath, loginEjs);
    console.log('SUCCESS: Real keys injected into login.ejs!');
}