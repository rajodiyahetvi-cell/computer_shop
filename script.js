/**
 * ====================================================================
 * PROJECT TITLE: COMPUTER SHOP WEBSITE WITH ENQUIRY PAGE
 * STUDENT: Hetvi Rajodiya | Roll No: 504 | Class: SYBCA AI
 * SHOP NAME: TechZone Computer Shop
 * TECHNOLOGIES: Pure HTML5, CSS3, JavaScript (No external libraries)
 * ====================================================================
 */

// Key used for saving enquiries into the browser's localStorage
const STORAGE_KEY = 'techzone_computer_enquiries';

// DOM Elements
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all features
  initMobileMenu();
  initSmoothScroll();
  initEnquiryButtons();
  initEnquiryForm();
  initContactForm();
  initScrollAnimations();

  // Load and render existing enquiries & statistics from localStorage
  renderEnquiries();
  updateStatistics();
});

/* ==================================================
   1. MOBILE NAVIGATION MENU
   ================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

    // Automatically close mobile menu when any navigation link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
        }
      });
    });
  }
}

/* ==================================================
   2. SMOOTH SCROLLING & ACTIVE NAV LINK
   ================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Highlight active link based on scroll position
  window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (navLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  });
}

/* ==================================================
   3 & 4. PRODUCT ENQUIRY BUTTONS & AUTO-SELECTION
   ================================================== */
function initEnquiryButtons() {
  const enquireButtons = document.querySelectorAll('.enquire-btn');

  enquireButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const productName = this.getAttribute('data-product');
      selectProductForEnquiry(productName);
    });
  });
}

/**
 * Automatically scrolls to enquiry form, selects the product,
 * and sets focus on the customer name field.
 */
function selectProductForEnquiry(productName) {
  const enquirySection = document.getElementById('enquiry');
  const productSelect = document.getElementById('productSelect');
  const fullNameInput = document.getElementById('fullName');

  if (enquirySection && productSelect) {
    // 1. Scroll to the enquiry form
    enquirySection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // 2. Automatically select that product in dropdown
    if (productName) {
      productSelect.value = productName;
    }

    // 3. Focus on customer name field after smooth scroll begins
    setTimeout(function () {
      if (fullNameInput) {
        fullNameInput.focus();
      }
    }, 450);
  }
}

// Global category click helper
window.selectProductFromCategory = function (productName) {
  selectProductForEnquiry(productName);
};

// Global service click helper
window.handleServiceEnquiry = function (serviceName) {
  selectProductForEnquiry(serviceName);
  const messageInput = document.getElementById('message');
  if (messageInput) {
    messageInput.value = `Enquiring regarding ${serviceName} technical service.`;
  }
};

/* ==================================================
   5 - 9. ENQUIRY FORM VALIDATION & SUBMISSION
   ================================================== */
function initEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  const clearBtn = document.getElementById('clearEnquiryBtn');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    // Prevent default form submission / page reload
    e.preventDefault();

    // Clear prior error indicators
    clearErrors();

    // Extract form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const product = document.getElementById('productSelect').value;
    const quantity = document.getElementById('quantity').value.trim();
    const contactMethodEl = document.querySelector('input[name="contactMethod"]:checked');
    const contactMethod = contactMethodEl ? contactMethodEl.value : '';
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Rule 1: Full Name cannot be empty
    if (fullName === '') {
      showError('nameError', 'fullName', 'Please enter your full name.');
      isValid = false;
    } else if (fullName.length < 3) {
      showError('nameError', 'fullName', 'Name must be at least 3 characters long.');
      isValid = false;
    }

    // Rule 2: Email must be valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      showError('emailError', 'email', 'Please enter your email address.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('emailError', 'email', 'Please enter a valid email address (e.g. name@domain.com).');
      isValid = false;
    }

    // Rule 3: Mobile number must be valid (10-digit number)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (mobile === '') {
      showError('mobileError', 'mobile', 'Please enter your 10-digit mobile number.');
      isValid = false;
    } else if (!mobileRegex.test(mobile)) {
      showError('mobileError', 'mobile', 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).');
      isValid = false;
    }

    // Rule 4: Product must be selected
    if (product === '' || product === 'Select Product') {
      showError('productError', 'productSelect', 'Please select a product from the list.');
      isValid = false;
    }

    // Rule 5: Quantity must be 1 or greater
    const qtyNumber = parseInt(quantity, 10);
    if (quantity === '' || isNaN(qtyNumber) || qtyNumber < 1) {
      showError('quantityError', 'quantity', 'Quantity must be at least 1 or greater.');
      isValid = false;
    }

    // Rule 6: Preferred Contact Method must be selected
    if (!contactMethod) {
      const contactErrorEl = document.getElementById('contactMethodError');
      if (contactErrorEl) {
        contactErrorEl.textContent = 'Please choose your preferred contact method.';
      }
      isValid = false;
    }

    // Rule 7: Message cannot be empty
    if (message === '') {
      showError('messageError', 'message', 'Please enter your enquiry message or requirements.');
      isValid = false;
    }

    // If all validation rules pass
    if (isValid) {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const formattedTime = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      // Construct Enquiry Object
      const newEnquiry = {
        id: 'ENQ-' + Date.now(),
        fullName: fullName,
        email: email,
        mobile: mobile,
        product: product,
        quantity: qtyNumber,
        contactMethod: contactMethod,
        message: message,
        dateTime: `${formattedDate} at ${formattedTime}`,
        createdAt: now.getTime()
      };

      // 10. Save to localStorage
      saveEnquiryToStorage(newEnquiry);

      // Display Success Message
      const successAlert = document.getElementById('enquirySuccessAlert');
      if (successAlert) {
        successAlert.classList.remove('hidden');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(function () {
          successAlert.classList.add('hidden');
        }, 6000);
      }

      // Clear the form fields
      resetEnquiryForm();

      // Refresh recent enquiries list & recalculate statistics
      renderEnquiries();
      updateStatistics();
    }
  });

  // 16. Clear Form Button Handler
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      resetEnquiryForm();
      clearErrors();
    });
  }
}

/**
 * Resets the enquiry form fields
 */
function resetEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.reset();
    document.getElementById('quantity').value = '1';
  }
}

/**
 * Helper to display input field error messages
 */
function showError(errorElementId, inputId, message) {
  const errorEl = document.getElementById(errorElementId);
  const inputEl = document.getElementById(inputId);
  if (errorEl) {
    errorEl.textContent = message;
  }
  if (inputEl) {
    inputEl.classList.add('input-error');
  }
}

/**
 * Helper to clear all error messages
 */
function clearErrors() {
  const errors = document.querySelectorAll('.error-msg');
  errors.forEach(function (el) {
    el.textContent = '';
  });

  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(function (input) {
    input.classList.remove('input-error');
  });
}

/* ==================================================
   10. LOCALSTORAGE MANAGEMENT
   ================================================== */
function getEnquiriesFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading enquiries from localStorage:', e);
    return [];
  }
}

function saveEnquiryToStorage(enquiry) {
  const enquiries = getEnquiriesFromStorage();
  // Prepend so latest enquiry is displayed at the top
  enquiries.unshift(enquiry);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

/* ==================================================
   11 & 12. RECENT ENQUIRIES DISPLAY & DELETE
   ================================================== */
function renderEnquiries() {
  const container = document.getElementById('enquiriesListContainer');
  if (!container) return;

  const enquiries = getEnquiriesFromStorage();

  // If no enquiries are available
  if (enquiries.length === 0) {
    container.innerHTML = `
      <div class="no-enquiries-notice">
        <p>No enquiries available.</p>
        <small style="display:block; margin-top:0.3rem;">Submit an enquiry above to see it recorded here.</small>
      </div>
    `;
    return;
  }

  // Render recent enquiries cards
  let html = '';
  enquiries.forEach(function (item) {
    html += `
      <article class="enquiry-entry-card" data-id="${item.id}">
        <div class="entry-main-info">
          <div class="entry-top-row">
            <h4 class="entry-name">${escapeHtml(item.fullName)}</h4>
            <span class="entry-product-badge">${escapeHtml(item.product)}</span>
            <span class="entry-qty-badge">Qty: ${item.quantity}</span>
          </div>

          <div class="entry-meta-row">
            <span><strong>Contact via:</strong> ${escapeHtml(item.contactMethod)}</span>
            <span><strong>Mobile:</strong> ${escapeHtml(item.mobile)}</span>
            <span><strong>Email:</strong> ${escapeHtml(item.email)}</span>
            <span><strong>Date:</strong> ${escapeHtml(item.dateTime)}</span>
          </div>

          <div class="entry-message">
            <strong>Requirements:</strong> "${escapeHtml(item.message)}"
          </div>
        </div>

        <button type="button" class="btn-delete-enquiry" onclick="deleteEnquiry('${item.id}')" title="Delete enquiry">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </button>
      </article>
    `;
  });

  container.innerHTML = html;
}

// 12. Delete Enquiry Handler
window.deleteEnquiry = function (id) {
  if (confirm('Are you sure you want to delete this enquiry?')) {
    let enquiries = getEnquiriesFromStorage();
    enquiries = enquiries.filter(function (item) {
      return item.id !== id;
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Error saving updated list to localStorage:', e);
    }

    // Refresh UI display and numbers
    renderEnquiries();
    updateStatistics();
  }
};

/* ==================================================
   13. ENQUIRY STATISTICS CALCULATION
   ================================================== */
function updateStatistics() {
  const enquiries = getEnquiriesFromStorage();

  const totalCount = enquiries.length;
  let laptopCount = 0;
  let otherCount = 0;

  enquiries.forEach(function (item) {
    if (item.product && item.product.toLowerCase().includes('laptop')) {
      laptopCount++;
    } else {
      otherCount++;
    }
  });

  const totalEl = document.getElementById('totalEnquiriesCount');
  const laptopEl = document.getElementById('laptopEnquiriesCount');
  const otherEl = document.getElementById('otherEnquiriesCount');

  if (totalEl) totalEl.textContent = totalCount;
  if (laptopEl) laptopEl.textContent = laptopCount;
  if (otherEl) otherEl.textContent = otherCount;
}

/* ==================================================
   14. CONTACT US FORM VALIDATION
   ================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const msgInput = document.getElementById('contactMessage');

    const nameError = document.getElementById('contactNameError');
    const emailError = document.getElementById('contactEmailError');
    const msgError = document.getElementById('contactMessageError');

    // Reset error text
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (msgError) msgError.textContent = '';
    [nameInput, emailInput, msgInput].forEach(el => el && el.classList.remove('input-error'));

    let isValid = true;

    if (!nameInput.value.trim()) {
      if (nameError) nameError.textContent = 'Please enter your name.';
      nameInput.classList.add('input-error');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      if (emailError) emailError.textContent = 'Please enter your email.';
      emailInput.classList.add('input-error');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      if (emailError) emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('input-error');
      isValid = false;
    }

    if (!msgInput.value.trim()) {
      if (msgError) msgError.textContent = 'Please enter your message.';
      msgInput.classList.add('input-error');
      isValid = false;
    }

    if (isValid) {
      const successAlert = document.getElementById('contactSuccessAlert');
      if (successAlert) {
        successAlert.classList.remove('hidden');
        setTimeout(function () {
          successAlert.classList.add('hidden');
        }, 5000);
      }
      form.reset();
    }
  });
}

/* ==================================================
   17. SCROLL REVEAL ANIMATIONS
   ================================================== */
function initScrollAnimations() {
  const cards = document.querySelectorAll('.product-card, .service-card, .feature-box, .category-card');
  cards.forEach(card => card.classList.add('reveal-on-scroll'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));
  } else {
    // Fallback if IntersectionObserver is not supported
    cards.forEach(card => card.classList.add('revealed'));
  }
}

/**
 * XSS prevention helper for safe HTML rendering
 */
function escapeHtml(string) {
  if (string === null || string === undefined) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
