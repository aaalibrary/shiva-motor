const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'views', 'home.ejs');
let homeEjs = fs.readFileSync(homePath, 'utf8');

// The exact HTML block currently in your footer
const oldFooterInfo = `<h4 class="footer-heading">Hub Office</h4>
                <ul class="footer-links">
                    <li>📍 Main Bypass Road, Dehradun</li>
                    <li>📞 +91 94309 70080</li>
                    <li>✉️ support@shivamotors.in</li>
                </ul>`;

// The new HTML block with your updated details and slightly improved spacing for the long address
const newFooterInfo = `<h4 class="footer-heading">Hub Office</h4>
                <ul class="footer-links">
                    <li style="line-height: 1.5; margin-bottom: 12px;">📍 Infront of District Forest Department, District Civil Court Rd, NH139, Bishunpur, Garhwa, Jharkhand 822114</li>
                    <li style="margin-bottom: 10px;">📞 +91 9471753577, +91 9471119766</li>
                    <li>✉️ official@shivamotor.in</li>
                </ul>`;

// Replace the old block with the new one
if (homeEjs.includes('📍 Main Bypass Road, Dehradun')) {
    homeEjs = homeEjs.replace(oldFooterInfo, newFooterInfo);
    
    // Also update the description text on the left side of the footer to remove "Dehradun's"
    homeEjs = homeEjs.replace(
        "Dehradun's dedicated marketplace", 
        "A dedicated marketplace"
    );

    fs.writeFileSync(homePath, homeEjs);
    console.log('SUCCESS: Footer contact information updated to Garhwa, Jharkhand!');
} else {
    console.log('Could not find the old footer text. Make sure it hasn\'t been changed already.');
}