// Custom Cursor Effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor expand on hover
const hoverElements = document.querySelectorAll('a, button, .package-card, .destination-card, .gallery-item');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('expand');
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expand');
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Destination Category Filter Functionality
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        
        const category = this.dataset.category;
        const cards = document.querySelectorAll('.destination-card');
        
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Package Filter Functionality
function filterPackages(filter) {
    const cards = document.querySelectorAll('.package-card');
    const grid = document.querySelector('.package-grid');
    grid.style.display = 'grid';
    cards.forEach(card => {
        if (card.dataset.category.includes(filter)) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            card.style.display = 'none';
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterPackages(this.dataset.filter);
    });
});

// First filter button active by default on load
window.addEventListener('DOMContentLoaded', () => {
    const firstFilterBtn = document.querySelector('.filter-btn');
    if (firstFilterBtn) {
        firstFilterBtn.classList.add('active');
        filterPackages(firstFilterBtn.dataset.filter);
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(2, 48, 71, 1)';
    } else {
        navbar.style.background = 'rgba(2, 48, 71, 0.95)';
    }
});

// Scroll Animation for Elements - Enhanced
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0) rotate(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.section-header').forEach(el => {
    observer.observe(el);
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Book Now Button Click Handler
document.querySelectorAll('.btn-book, .btn-ferry, .btn-activity, .btn-service').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        let cardName = '';
        let cardType = '';
        
        // Get card details based on button type
        if (this.classList.contains('btn-book')) {
            const packageCard = this.closest('.package-card');
            cardName = packageCard.querySelector('h3').textContent;
            const duration = packageCard.querySelector('.package-badge').textContent;
            cardType = 'Package';
            cardName = `${cardName} (${duration})`;
        } else if (this.classList.contains('btn-ferry')) {
            const ferryCard = this.closest('.ferry-card');
            cardName = ferryCard.querySelector('h3').textContent;
            cardType = 'Ferry';
        } else if (this.classList.contains('btn-activity')) {
            const activityCard = this.closest('.activity-card');
            cardName = activityCard.querySelector('h3').textContent;
            cardType = 'Activity';
        } else if (this.classList.contains('btn-service')) {
            const serviceCard = this.closest('.service-card');
            cardName = serviceCard.querySelector('h3').textContent;
            cardType = 'Service';
        }
        
        // Store selection in sessionStorage
        sessionStorage.setItem('selectedCard', cardName);
        sessionStorage.setItem('selectedType', cardType);
        
        // Scroll to contact form
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        
        // Auto-fill contact form after scroll
        setTimeout(() => {
            fillContactForm(cardName, cardType);
        }, 1000);
    });
});

// Destination Explore Button Click Handler
document.querySelectorAll('.btn-explore').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const destinationCard = this.closest('.destination-card');
        const destinationName = destinationCard.querySelector('h3').textContent;
        
        // Store selection
        sessionStorage.setItem('selectedCard', `${destinationName} Tour`);
        sessionStorage.setItem('selectedType', 'Destination');
        
        // Scroll to contact form
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            fillContactForm(`${destinationName} Tour`, 'Destination');
        }, 1000);
    });
});

// Function to fill contact form
function fillContactForm(cardName, cardType) {
    const contactForm = document.querySelector('.contact-form');
    const packageSelect = contactForm.querySelector('select');
    const messageTextarea = contactForm.querySelector('textarea[placeholder*="Special Requests"]');
    
    // Set package type if it matches
    if (cardType === 'Package') {
        const packageName = cardName.toLowerCase();
        if (packageName.includes('honeymoon')) {
            packageSelect.value = 'honeymoon';
        } else if (packageName.includes('family')) {
            packageSelect.value = 'family';
        } else if (packageName.includes('group')) {
            packageSelect.value = 'group';
        } else if (packageName.includes('ltc')) {
            packageSelect.value = 'ltc';
        } else if (packageName.includes('budget')) {
            packageSelect.value = 'budget';
        } else if (packageName.includes('corporate')) {
            packageSelect.value = 'corporate';
        }
    }
    
    // Auto-fill message with selected item
    const currentMessage = messageTextarea.value;
    const newMessage = `Interested in: ${cardName}\n\n${currentMessage}`;
    messageTextarea.value = newMessage;
    
    // Highlight the form
    contactForm.style.border = '3px solid var(--accent-color)';
    contactForm.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.3)';
    
    setTimeout(() => {
        contactForm.style.border = '';
        contactForm.style.boxShadow = 'var(--shadow)';
    }, 3000);
}

// Auto-fill form on page load if there's a stored selection
window.addEventListener('DOMContentLoaded', () => {
    const selectedCard = sessionStorage.getItem('selectedCard');
    const selectedType = sessionStorage.getItem('selectedType');
    
    if (selectedCard && selectedType) {
        setTimeout(() => {
            fillContactForm(selectedCard, selectedType);
            // Clear storage after use
            sessionStorage.removeItem('selectedCard');
            sessionStorage.removeItem('selectedType');
        }, 500);
    }
});

// Contact Form Submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        phone: this.querySelector('input[type="tel"]').value,
        package: this.querySelector('select').value,
        message: this.querySelector('textarea').value
    };
    
    // Show success message
    alert(`Thank you ${formData.name}!\n\nYour message has been sent successfully.\n\nOur team will contact you within 24 hours.\n\nEmail: ${formData.email}\nPhone: ${formData.phone}`);
    
    // Reset form
    this.reset();
});

// Quick Booking Form Submission
document.querySelector('.booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const packageType = this.querySelector('select').value;
    const duration = this.querySelectorAll('select')[1].value;
    const date = this.querySelector('input[type="date"]').value;
    const adults = this.querySelectorAll('select')[2].value;
    const budget = this.querySelectorAll('input[type="text"]')[1].value;
    const requests = this.querySelector('textarea').value;
    
    if (!name || !email || !phone || !packageType || !duration || !date || !adults) {
        alert('Please fill all required fields!');
        return;
    }
    
    alert(`Quick Booking Request Received!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPackage: ${packageType.toUpperCase()}\nDuration: ${duration.toUpperCase()}\nTravel Date: ${date}\nAdults: ${adults}\n\nOur team will contact you within 2 hours!`);
    
    // Reset form
    this.reset();
});

// Scroll to Top Functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter Form Submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you! ${email} has been added to our newsletter list.\n\nYou will receive special offers soon!`);
    this.reset();
});

// Gallery Image Click (Enhanced Lightbox Effect)
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const imgClone = this.cloneNode();
        imgClone.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            animation: zoomInLightbox 0.4s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 30px;
            right: 30px;
            font-size: 3rem;
            color: white;
            cursor: pointer;
            transition: transform 0.3s;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.transform = 'rotate(90deg) scale(1.2)';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.transform = 'rotate(0) scale(1)';
        });
        
        lightbox.appendChild(imgClone);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add floating animation to scroll indicator
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.style.animation = 'bounce 2s infinite';
    }
});

// Magnetic Button Effect
document.querySelectorAll('.btn-primary, .btn-book, .btn-submit').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});



// Price Animation on Scroll
const priceElements = document.querySelectorAll('.price-amount');
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 1s ease';
            
            // Animated counter
            const finalPrice = entry.target.textContent;
            const numericPrice = parseInt(finalPrice.replace(/[^0-9]/g, ''));
            let currentPrice = 0;
            const increment = numericPrice / 50;
            
            const counter = setInterval(() => {
                currentPrice += increment;
                if (currentPrice >= numericPrice) {
                    entry.target.textContent = finalPrice;
                    clearInterval(counter);
                } else {
                    entry.target.textContent = '₹' + Math.floor(currentPrice).toLocaleString('en-IN');
                }
            }, 30);
        }
    });
}, { threshold: 0.5 });

priceElements.forEach(el => priceObserver.observe(el));

// Add pulse animation and additional effects
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomInLightbox {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    a, button, .package-card, .destination-card, .gallery-item {
        cursor: none !important;
    }
`;
document.head.appendChild(style);

// Tilt Effect on Cards
document.querySelectorAll('.package-card, .destination-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

console.log('🏖️ RoamAndaman Website Loaded Successfully!');
console.log('📞 Contact: +91 98765 43210');
console.log('📧 Email: info@RoamAndaman.com');
console.log('✨ Advanced Animations & Effects Activated!');

// Particle Effect on Hero (Optional)
function createParticle() {
    const hero = document.querySelector('.hero');
    if (!hero || window.scrollY > 100) return;
    
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float 3s ease-in-out infinite;
    `;
    
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

setInterval(createParticle, 500);
