const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const filesToUpdate = ['home.ejs', 'login.ejs', 'details.ejs'];

// The new HTML for a circular logo side-by-side with the text
const circularLogoHTML = `<a href="/" class="brand-logo" style="display: flex; align-items: center; gap: 12px; line-height: 1.1; text-decoration: none;">
                <img src="/public/images/logo.png" alt="SM Logo" style="height: 46px; width: 46px; border-radius: 50%; object-fit: cover; border: 2px solid var(--brand-accent); background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div>Shiva<span>Motors</span></div>
            </a>`;

filesToUpdate.forEach(file => {
    const filePath = path.join(viewsDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find the existing brand-logo block and replace it with the new circular layout
        content = content.replace(/<a href="\/" class="brand-logo"[\s\S]*?<\/a>/, circularLogoHTML);
        
        fs.writeFileSync(filePath, content);
        console.log(`SUCCESS: Circular logo added to ${file}`);
    }
});