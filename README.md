# 🧵 TAIRO - Tailoring Service Platform

## 📋 Project Overview

**Tairo** is a complete multi-page website connecting customers in Kattankudy, Sri Lanka with verified local tailors. The platform features a liquid glass UI design with purple theming and WhatsApp integration for seamless ordering.

### ✨ Key Features

- **16 Complete Service Categories** with unique styling for Bulk Orders and Custom Design
- **Multi-Page Architecture** - 6 separate HTML files (NOT single-page)
- **Liquid Glass UI** - Modern glassmorphism design system
- **WhatsApp Integration** - Direct ordering via WhatsApp with auto-formatted messages
- **Dynamic Forms** - Category-specific fields and measurements
- **Responsive Design** - Mobile-first approach with full responsiveness
- **Pure Vanilla Stack** - HTML5, CSS3, JavaScript (no frameworks)

---

## 📁 File Structure

```
tairo/
│
├── index.html              # Homepage with hero, popular categories, features
├── services.html           # All 16 service categories with dynamic forms
├── tailor.html            # Tailor registration page
├── payment.html           # Payment portal with bank details
├── contact.html           # Contact page with map and social links
├── about.html             # About page with mission and vision
│
├── css/
│   └── style.css          # Complete design system (842 lines)
│
├── js/
│   └── script.js          # All functionality and category data
│
└── images/
    ├── logo.png           # Tairo logo
    ├── hero.jpg           # Hero section image
    └── 1.jpg - 16.jpg     # Category images (3:2 ratio)
```

---

## 🎨 Design System

### Color Palette
- **Background:** Pure White (#ffffff)
- **Primary Purple:** 
  - Light: #a78bfa
  - Medium: #8b5cf6
  - Dark: #7c3aed
- **Glass Effect:** rgba(255, 255, 255, 0.7) with 12px blur

### UI Components
- **Liquid Glass Cards** - Blur effect with subtle shadows
- **Purple Gradient Buttons** - Hover glow effects
- **Special Cards:**
  - Bulk Orders: Purple border (3px solid)
  - Custom Design: Multi-color gradient border (green→blue→purple)

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** 800-900 weight
- **Body:** 400-600 weight

---

## 📦 Complete Category List

### Main Categories (16 Total)

1. **Shirts (Men)** 👔 - 10 subcategories
2. **Pants / Trousers (Men)** 👖 - 8 subcategories
3. **Jubba / Thobe (Men)** 🕌 - 8 subcategories
4. **Abaya (Women)** 🧕 - 9 subcategories
5. **Frock (Women/Kids)** 👗 - 9 subcategories
6. **Saree Blouse (Women)** 👚 - 9 subcategories
7. **Salwar / Shalwar (Women)** 👘 - 9 subcategories
8. **Skirts (Women)** 👗 - 9 subcategories
9. **Tops (Women)** 👚 - 13 subcategories
10. **School Uniforms** 🎓 - 8 subcategories
11. **Kids Wear** 👶 - 8 subcategories
12. **Bags & Accessories** 👜 - 7 subcategories
13. **Alterations & Repairs** ✂️ - 8 subcategories
14. **Wedding / Special Wear** 💒 - 7 subcategories
15. **Bulk Orders** 📦 - 6 subcategories (SPECIAL STYLING)
16. **Custom Design** 🎨 - 4 subcategories (UNIQUE STYLING)

---

## 🚀 Setup Instructions

### Option 1: Direct Upload to Hosting

1. **Extract the ZIP file**
2. **Upload all files** to your web hosting (cPanel, Netlify, Vercel, etc.)
3. **Ensure file structure is maintained**
4. **Test on your domain**

### Option 2: Local Development

1. **Extract the ZIP file**
2. **Open with Live Server:**
   - VS Code: Right-click index.html → "Open with Live Server"
   - Or use any local server (XAMPP, MAMP, etc.)
3. **Test all pages and functionality**

### Option 3: Deploy to Netlify (Recommended)

1. **Go to:** [netlify.com](https://netlify.com)
2. **Drag & drop** the tairo folder
3. **Your site is live!** (with custom domain support)

---

## 🔧 Customization Guide

### Change WhatsApp Number

**File:** `js/script.js` (Line 8)

```javascript
const WHATSAPP_NUMBER = '94784414956'; // Change this number
```

### Change Bank Details

**File:** `payment.html` (Lines 30-60)

Update the bank details in the HTML:
- Bank Name
- Account Number
- Account Name
- Branch

### Update Images

Replace placeholder images in `/images/` folder:
- **logo.png** - Your actual logo (200x200px recommended)
- **hero.jpg** - Cultural image from Kattankudy (3:2 ratio)
- **1.jpg - 16.jpg** - Category images (3:2 ratio, 600x400px minimum)

**Important:** Maintain 3:2 aspect ratio for all images!

### Change Colors

**File:** `css/style.css` (Lines 9-18)

```css
:root {
    --white: #ffffff;
    --purple-light: #a78bfa;    /* Change these */
    --purple-medium: #8b5cf6;   /* Change these */
    --purple-dark: #7c3aed;     /* Change these */
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(139, 92, 246, 0.2);
}
```

### Add New Subcategory

**File:** `js/script.js`

Find the relevant category in `categoriesData` object and add to the `subcategories` array:

```javascript
shirts: {
    name: 'Shirts (Men)',
    subcategories: [
        'Full Sleeve Shirt',
        'Your New Subcategory Here' // Add here
    ],
    // ... rest of the data
}
```

---

## 📱 WhatsApp Integration

### How It Works

1. **User browses services** → Clicks category
2. **Selects subcategory** → Chooses to enquire or order
3. **Fills order form** → Dynamic form with category-specific fields
4. **Clicks submit** → WhatsApp opens with pre-formatted message
5. **User sends** → Message delivered to Tairo WhatsApp

### Message Formats

#### Enquiry Message
```
Hello Tairo Team,

I would like to enquire about:

Category: [Category Name]
Subcategory: [Subcategory Name]

Thank you!
```

#### Order Message
```
🧵 NEW ORDER - TAIRO

👤 CUSTOMER DETAILS
Name: [Name]
WhatsApp: [Number]

📦 ORDER INFORMATION
Category: [Category]
Subcategory: [Subcategory]
Order Type: [New/Alteration/Repeat]
Quantity: [X]
Delivery Date: [Date]

🎯 CATEGORY DETAILS
[Category-specific fields]

📏 MEASUREMENTS
[All measurements with units]

🧶 FABRIC & NOTES
Fabric: [Customer Provided/From Shop]
Notes: [Additional notes]

---
Sent via Tairo Platform
```

---

## 🎯 User Flow Examples

### Flow 1: Browse & Enquire
```
index.html → services.html → Click "Shirts" → 
Select "Full Sleeve Shirt" → Click "Enquire" → 
WhatsApp opens with pre-filled enquiry
```

### Flow 2: Place Order
```
services.html → Click "Abaya" → Select "Wedding Abaya" → 
Click "Place Order" → Fill dynamic form → 
Submit → WhatsApp with complete order details
```

### Flow 3: Join as Tailor
```
index.html → Click "Join as Tailor" → tailor.html → 
Fill registration form → Click "Verify on WhatsApp" → 
WhatsApp with registration details
```

### Flow 4: Make Payment
```
payment.html → View bank details → Copy details → 
Make transfer → Fill payment proof form → 
Submit on WhatsApp with screenshot
```

---

## ✅ Features Checklist

### Design ✓
- [x] Pure white background throughout
- [x] Purple gradient theme
- [x] Liquid glass UI components
- [x] Bulk Orders card with purple border
- [x] Custom Design card with gradient border
- [x] All images 3:2 ratio
- [x] Hover effects and animations
- [x] Fully responsive design

### Functionality ✓
- [x] Fixed navbar with mobile menu
- [x] Smooth scroll navigation
- [x] Dynamic form rendering
- [x] WhatsApp enquiry integration
- [x] WhatsApp order integration
- [x] WhatsApp tailor registration
- [x] WhatsApp payment proof
- [x] Copy-to-clipboard buttons
- [x] All 16 categories implemented
- [x] Category-specific fields
- [x] Measurement fields
- [x] Modal system for subcategories

### Content ✓
- [x] All 16 categories with complete data
- [x] Hero section with Kattankudy reference
- [x] Logo and branding
- [x] Google Maps integration
- [x] Social media links
- [x] Contact information
- [x] Footer on all pages

---

## 🛠️ Technical Details

### Browser Compatibility
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓
- Mobile browsers ✓

### Performance
- No external frameworks (fast load times)
- Optimized CSS (842 lines, well-organized)
- Efficient JavaScript (no heavy libraries)
- Image optimization recommended

### Accessibility
- Semantic HTML5
- Alt tags on images
- Keyboard navigation support
- Screen reader friendly

---

## 📞 Support & Contact

**WhatsApp:** +94 78 441 4956  
**Email:** craksagency@gmail.com  
**Location:** Kattankudy, Eastern Province, Sri Lanka

---

## 🔄 Future Enhancements (Optional)

Potential features for future versions:
- Backend integration (Node.js/Firebase)
- Online payment gateway
- User accounts and order history
- Tailor dashboard
- Review and rating system
- Real-time order tracking
- Admin panel for managing orders

---

## 📝 Notes for Deployment

1. **Replace Placeholder Images** - Use real, high-quality images (3:2 ratio)
2. **Update Contact Information** - Verify all phone numbers and addresses
3. **Test WhatsApp Links** - Ensure they work on both mobile and desktop
4. **Google Maps** - Update the map embed URL if location changes
5. **Social Media Links** - Add actual social media profile links
6. **SEO Optimization** - Add meta tags, descriptions, and keywords
7. **Analytics** - Consider adding Google Analytics
8. **SSL Certificate** - Ensure HTTPS for security

---

## 🎨 Design Philosophy

Tairo's design follows these principles:

1. **Simplicity** - Clean, uncluttered interface
2. **Cultural Relevance** - Designed for Kattankudy market
3. **Accessibility** - Easy for all users, including non-tech-savvy
4. **Trust** - Professional appearance builds credibility
5. **Efficiency** - Quick ordering process via WhatsApp

---

## 📄 License

This project is created for CRAKS Media Agency and Tairo platform.  
© 2026 Tairo. All rights reserved.

---

## 🙏 Credits

**Developed by:** CRAKS Media Agency  
**Platform:** Tairo - Empowering Women Tailors in Kattankudy  
**Technology Stack:** HTML5, CSS3, Vanilla JavaScript  
**Design System:** Liquid Glass UI with Purple Theme

---

**Thank you for using Tairo! 🧵✨**

For any questions or support, please contact us via WhatsApp or email.
