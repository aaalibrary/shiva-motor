const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const viewsDir = path.join(__dirname, 'views');
const filesToUpdate = ['home.ejs', 'login.ejs', 'details.ejs'];

// 1. Rename the complex WhatsApp file to 'logo.jpeg'
const oldImagePath = path.join(imagesDir, 'WhatsApp Image 2026-10-04 at 10.37.10 PM.jpeg');
const newImagePath = path.join(imagesDir, 'logo.jpeg');

if (fs.existsSync(oldImagePath)) {
    fs.renameSync(oldImagePath, newImagePath);
    console.log('✅ SUCCESS: Image renamed to logo.jpeg!');
} else if (fs.existsSync(newImagePath)) {
    console.log('✅ Image is already named logo.jpeg.');
} else {
    console.log('⚠️ Could not find the WhatsApp image. Make sure the name matches exactly.');
}

// 2. Update the HTML to use the new circular logo with the correct .jpeg extension
const circularLogoHTML = `<a href="/" class="brand-logo" style="display: flex; align-items: center; gap: 12px; line-height: 1.1; text-decoration: none;">
                <img src="/public/images/logo.jpeg" alt="SM Logo" style="height: 46px; width: 46px; border-radius: 50%; object-fit: cover; border: 2px solid var(--brand-accent); background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div>Shiva<span>Motors</span></div>
            </a>`;

filesToUpdate.forEach(file => {
    const filePath = path.join(viewsDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find the existing brand-logo block and replace it with the new layout
        content = content.replace(/<a href="\/" class="brand-logo"[\s\S]*?<\/a>/, circularLogoHTML);
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ SUCCESS: Circular logo applied to ${file}`);
    }
});