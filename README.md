# Computer Shop Website with Enquiry Page

**SYBCA AI College Journal Project (File 1)**

---

### Student Details
- **Student Name:** Hetvi Rajodiya
- **Roll No:** 504
- **Class:** SYBCA AI
- **Subject:** Web Development / AI Project Journal

---

### Shop Details
- **Shop Name:** TechZone Computer Shop
- **Contact Number:** 6359936845
- **Email Address:** hetvirajodiya@gmail.com
- **Store Location:** Surat, Gujarat, India

---

### Technologies Used
- **HTML5:** Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<form>`, `<footer>`)
- **CSS3:** Custom responsive styling, Flexbox, CSS Grid, CSS Variables, modern shadows and transitions (No frameworks used)
- **JavaScript (ES6):** DOM manipulation, form validation, dynamic product selection, browser `localStorage` management, statistics calculation
- **Local Assets:** 11 optimized local images in the `images/` folder

---

### Folder Structure
```text
Computer-Shop/
│
├── index.html          # Main homepage containing all sections
├── style.css           # Complete 17-section modular stylesheet
├── script.js           # Client-side validation, localStorage & interactivity
├── README.md           # Project documentation & journal guide
└── images/             # All local high-resolution assets
    ├── hero.jpg        # Hero banner background
    ├── laptop.jpg      # Laptop product & category
    ├── desktop.jpg     # Desktop computer workstation
    ├── monitor.jpg     # Frameless computer monitor
    ├── keyboard.jpg    # Ergonomic mechanical keyboard
    ├── mouse.jpg       # Optical precision mouse
    ├── printer.jpg     # All-in-one wireless printer
    ├── accessories.jpg # Computer accessories & peripherals
    ├── storage.jpg     # SSD & storage devices
    ├── repair.jpg      # Computer repair service & about image
    └── service.jpg     # Laptop service & maintenance
```

---

### Key Features Implemented

1. **Sticky Header & Mobile Navigation:**
   - TechZone logo with custom SVG computer icon.
   - Smooth navigation menu (Home, Products, Categories, Services, About, Enquiry, Contact).
   - Mobile hamburger menu that automatically closes when any link is clicked.

2. **Hero Section:**
   - Catchy heading: *"Upgrade Your Digital World"*
   - Subheading: *"Computers, Laptops & Accessories at Affordable Prices"*
   - Quick action buttons linking directly to Products and Enquiry sections.

3. **Welcome Section:**
   - Introductory overview of TechZone Computer Shop.
   - 3 Feature Cards: Quality Products, Affordable Prices, and Reliable Support.

4. **Product Catalog (8 Popular Products):**
   - Laptop (Starting from ₹35,000)
   - Desktop Computer (Starting from ₹30,000)
   - Monitor (Starting from ₹8,000)
   - Keyboard (Starting from ₹700)
   - Mouse (Starting from ₹400)
   - Printer (Starting from ₹6,000)
   - Computer Accessories (Starting from ₹500)
   - Storage Devices (Starting from ₹800)
   - Every product has an **"Enquire Now"** button.

5. **Automatic Product Selection (Enquiry Trigger):**
   - Clicking **"Enquire Now"** smoothly scrolls down to the enquiry form.
   - Automatically pre-selects the chosen product in the dropdown.
   - Focuses immediately on the Full Name input field without page reload.

6. **Services Section:**
   - 5 technical services: Computer Repair, Laptop Repair, Software Installation, Windows Installation, Hardware Upgrade.
   - Learn more action triggers pre-filled enquiry.

7. **Shop by Category:**
   - 6 category cards with interactive hover effects and instant enquiry shortcuts.

8. **Why Choose TechZone (About Section):**
   - 2-column layout with 10+ years experience badge, store highlights, and 4 verified benefit points.

9. **Interactive Product Enquiry Page (Core Feature):**
   - Fields: Full Name, Email, Mobile Number, Select Product, Quantity, Preferred Contact Method (Phone, Email, WhatsApp), and Message.
   - Real-time client-side validation for all fields (regex email check, 10-digit phone verification, minimum quantity, empty field detection).
   - Success alert banner upon submission.
   - "Clear Form" button to reset fields and error labels.

10. **Browser LocalStorage Persistence:**
    - Stores enquiries persistently: Customer Name, Email, Mobile, Product, Quantity, Contact Method, Message, Formatted Date & Time.
    - Data remains intact even after refreshing or reopening the browser.
    - No backend (PHP/Node/SQL) required!

11. **Recent Enquiries List & Deletion:**
    - Shows all past enquiries in clean cards with product tags and timestamps.
    - Individual **"Delete"** button with confirmation prompt to remove records from `localStorage`.
    - Friendly placeholder message when no enquiries exist.

12. **Live Statistics Dashboard:**
    - Automatically computes and displays:
      - **Total Enquiries**
      - **Laptop Enquiries**
      - **Other Enquiries**
    - Numbers update instantly when enquiries are submitted or deleted.

13. **Contact Us Section:**
    - Phone: 6359936845 | Email: hetvirajodiya@gmail.com | Location: Surat, Gujarat, India
    - Quick contact form with client-side validation.

14. **Clean Academic Footer:**
    - Copyright notice © 2026 TechZone Computer Shop.
    - Student credentials badge: *Hetvi Rajodiya (Roll No: 504) | SYBCA AI*.

---

### How to Run and Test
1. Navigate to: `C:\Users\DELL\Desktop\hetvi rajodiya\Computer-Shop\`
2. Double-click **`index.html`** to open it in Google Chrome, Microsoft Edge, or Mozilla Firefox.
3. Test the features:
   - Click **"Enquire Now"** on any product (e.g. Laptop) and verify it scrolls down, selects "Laptop", and focuses the name field.
   - Fill out the form and click **"Submit Enquiry"** to test validation and see the record appear under **Recent Enquiries** and update the counters.
   - Refresh the browser (F5) to verify that the enquiry data persists in `localStorage`.
   - Click the **"Delete"** button on an enquiry to test live removal and counter decrement.
   - Resize the browser window to test the mobile hamburger menu and responsive layout.
