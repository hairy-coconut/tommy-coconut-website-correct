/**
 * Tommy Coconut Main Script
 * Handles general site functionality and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🥥 Tommy Coconut Main Script loaded');
    
    // Initialize all components
    initializeComponents();
    
    // Handle scroll effects
    handleScrollEffects();
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Setup interaction enhancements
    setupInteractionEnhancements();
});

/**
 * Initialize all site components
 */
function initializeComponents() {
    // Initialize scene timeline interactions
    initializeSceneTimeline();
    
    // Initialize trust indicators animation
    initializeTrustIndicators();
    
    // Initialize newsletter form
    initializeNewsletterForm();
}

/**
 * Handle scroll-based effects and animations
 */
function handleScrollEffects() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Smooth reveal animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.scenes-narrative, .iconic-assets, .story-awaits-section');
    sections.forEach(section => observer.observe(section));
}

/**
 * Initialize scene timeline interactions
 */
function initializeSceneTimeline() {
    const sceneItems = document.querySelectorAll('.scene-item');
    
    sceneItems.forEach((item, index) => {
        const icon = item.querySelector('.scene-icon');
        const content = item.querySelector('.scene-content');
        const thumbnail = item.querySelector('.scene-thumbnail');
        
        // Add click handler for scene interaction
        [icon, content].forEach(element => {
            if (element) {
                element.addEventListener('click', () => {
                    expandScene(item, index);
                });
                
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        expandScene(item, index);
                    }
                });
            }
        });
    });
}

/**
 * Expand scene for detailed view
 */
function expandScene(sceneItem, index) {
    // Remove active state from all scenes
    document.querySelectorAll('.scene-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active state to clicked scene
    sceneItem.classList.add('active');
    
    // Scroll scene into view
    sceneItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Optional: Add analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scene_interaction', {
            'scene_number': index + 1,
            'event_category': 'engagement'
        });
    }
}

/**
 * Initialize trust indicators with animation
 */
function initializeTrustIndicators() {
    const trustIndicators = document.querySelector('.trust-indicators');
    
    if (trustIndicators) {
        // Animate trust indicators on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.trust-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        });
        
        observer.observe(trustIndicators);
        
        // Set initial state
        const trustItems = trustIndicators.querySelectorAll('.trust-item');
        trustItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
}

/**
 * Initialize newsletter form
 */
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (!email || !isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Disable submit button during processing
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Subscribing...';
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                showMessage('Thank you for joining the Coconut Cartel! 🥥', 'success');
                this.reset();
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        'event_category': 'engagement'
                    });
                }
            }, 1500);
        });
    }
}

/**
 * Setup general interaction enhancements
 */
function setupInteractionEnhancements() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn, .hero-contact-btn, .urgent-contact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_click', {
                    'event_category': 'contact',
                    'phone_number': this.href.replace('tel:', '')
                });
            }
        });
    });
    
    // WhatsApp link tracking
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'contact'
                });
            }
        });
    });
}

/**
 * Form validation helpers
 */
function initializeFormHandlers() {
    // Generic form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Clear previous error
    clearFieldError.call(field);
    
    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address.');
        return false;
    }
    
    return true;
}

function clearFieldError() {
    const field = this;
    const errorElement = field.parentNode.querySelector('.form-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('error');
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

/**
 * Utility functions
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 500;
        max-width: 400px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    if (!document.querySelector('#message-animations')) {
        style.id = 'message-animations';
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(messageEl);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 5000);
    
    // Allow manual close on click
    messageEl.addEventListener('click', () => {
        messageEl.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    });
}

// Export functions for use by other scripts
window.TommyCoconut = {
    showMessage,
    isValidEmail,
    expandScene
};