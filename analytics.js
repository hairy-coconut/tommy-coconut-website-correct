/**
 * Tommy Coconut Analytics & Tracking Script
 * Handles analytics events and user interaction tracking
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Tommy Coconut Analytics Script loaded');
    
    // Initialize tracking
    initializeAnalytics();
    
    // Setup event tracking
    setupEventTracking();
    
    // Track page view
    trackPageView();
});

/**
 * Initialize analytics configuration
 */
function initializeAnalytics() {
    // Configure Google Analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-PVETEG7EB4', {
            page_title: document.title,
            page_location: window.location.href,
            content_group1: 'Tommy Coconut Website',
            send_page_view: false // We'll send manually after setup
        });
        
        console.log('✅ Google Analytics configured');
    }
    
    // Set up custom tracking dimensions
    setupCustomDimensions();
}

/**
 * Setup custom tracking dimensions
 */
function setupCustomDimensions() {
    // Track user device type
    const deviceType = getDeviceType();
    
    // Track page category
    const pageCategory = getPageCategory();
    
    // Track user's preferred contact method (will be set when they interact)
    let preferredContactMethod = 'unknown';
    
    // Store in sessionStorage for consistent tracking
    sessionStorage.setItem('deviceType', deviceType);
    sessionStorage.setItem('pageCategory', pageCategory);
    
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-PVETEG7EB4', {
            'custom_map.device_type': deviceType,
            'custom_map.page_category': pageCategory
        });
    }
}

/**
 * Track page view with custom parameters
 */
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            device_type: getDeviceType(),
            page_category: getPageCategory(),
            timestamp: new Date().toISOString()
        });
        
        console.log('📄 Page view tracked');
    }
}

/**
 * Setup event tracking for user interactions
 */
function setupEventTracking() {
    // Track hero CTA clicks
    trackHeroCTAClicks();
    
    // Track contact interactions
    trackContactInteractions();
    
    // Track navigation usage
    trackNavigationUsage();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track form interactions
    trackFormInteractions();
    
    // Track external link clicks
    trackExternalLinks();
}

/**
 * Track hero section CTA interactions
 */
function trackHeroCTAClicks() {
    const heroCTAs = document.querySelectorAll('.hero .btn-primary, .hero-contact-btn');
    
    heroCTAs.forEach(cta => {
        cta.addEventListener('click', function() {
            const ctaText = this.textContent.trim();
            const ctaType = this.classList.contains('btn-primary') ? 'primary' : 'contact';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'hero_cta_click', {
                    event_category: 'engagement',
                    event_label: ctaText,
                    cta_type: ctaType,
                    cta_position: 'hero'
                });
            }
            
            console.log(`🎯 Hero CTA clicked: ${ctaText}`);
        });
    });
}

/**
 * Track contact method preferences
 */
function trackContactInteractions() {
    // Track phone calls
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.href.replace('tel:', '');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call_initiated', {
                    event_category: 'contact',
                    event_label: phoneNumber,
                    contact_method: 'phone'
                });
            }
            
            sessionStorage.setItem('preferredContactMethod', 'phone');
            console.log('📞 Phone call initiated');
        });
    });
    
    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    event_category: 'contact',
                    event_label: 'WhatsApp initiated',
                    contact_method: 'whatsapp'
                });
            }
            
            sessionStorage.setItem('preferredContactMethod', 'whatsapp');
            console.log('💬 WhatsApp click tracked');
        });
    });
    
    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    event_category: 'contact',
                    event_label: 'Email initiated',
                    contact_method: 'email'
                });
            }
            
            sessionStorage.setItem('preferredContactMethod', 'email');
            console.log('📧 Email click tracked');
        });
    });
}

/**
 * Track navigation usage patterns
 */
function trackNavigationUsage() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            const linkHref = this.getAttribute('href');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation_click', {
                    event_category: 'navigation',
                    event_label: linkText,
                    link_url: linkHref
                });
            }
            
            console.log(`🧭 Navigation: ${linkText}`);
        });
    });
    
    // Track mobile menu usage
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'mobile_menu_toggle', {
                    event_category: 'navigation',
                    event_label: 'Mobile menu opened'
                });
            }
        });
    }
}

/**
 * Track scroll depth to understand content engagement
 */
function trackScrollDepth() {
    let scrollDepthMarkers = [25, 50, 75, 100];
    let firedMarkers = [];
    
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        scrollDepthMarkers.forEach(marker => {
            if (scrollPercent >= marker && !firedMarkers.includes(marker)) {
                firedMarkers.push(marker);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', {
                        event_category: 'engagement',
                        event_label: `${marker}%`,
                        value: marker
                    });
                }
                
                console.log(`📜 Scroll depth: ${marker}%`);
            }
        });
    }, 500));
}

/**
 * Track form interactions and conversions
 */
function trackFormInteractions() {
    // Track Lodgify search interactions
    const lodgifySearchBar = document.getElementById('lodgify-search-bar');
    if (lodgifySearchBar) {
        // Observer to watch for Lodgify widget loading and interaction
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const searchButton = lodgifySearchBar.querySelector('button');
                    if (searchButton && !searchButton.hasAttribute('data-tracked')) {
                        searchButton.setAttribute('data-tracked', 'true');
                        searchButton.addEventListener('click', function() {
                            if (typeof gtag !== 'undefined') {
                                gtag('event', 'property_search', {
                                    event_category: 'conversion',
                                    event_label: 'Lodgify search initiated'
                                });
                            }
                            console.log('🔍 Property search initiated');
                        });
                    }
                }
            });
        });
        
        observer.observe(lodgifySearchBar, { childList: true, subtree: true });
    }
    
    // Track newsletter signup
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    event_category: 'conversion',
                    event_label: 'Newsletter subscription'
                });
            }
            console.log('📬 Newsletter signup tracked');
        });
    }
}

/**
 * Track external link clicks
 */
function trackExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkUrl = this.href;
            const linkText = this.textContent.trim();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'external_link_click', {
                    event_category: 'outbound',
                    event_label: linkText,
                    link_url: linkUrl
                });
            }
            
            console.log(`🔗 External link: ${linkUrl}`);
        });
    });
}

/**
 * Utility functions
 */
function getDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
        return 'tablet';
    } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
        return 'mobile';
    } else {
        return 'desktop';
    }
}

function getPageCategory() {
    const path = window.location.pathname.toLowerCase();
    
    if (path === '/' || path === '/index.html') return 'home';
    if (path.includes('rental')) return 'rentals';
    if (path.includes('experience')) return 'experiences';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    if (path.includes('faq')) return 'faq';
    if (path.includes('ownership')) return 'ownership';
    if (path.includes('cartel')) return 'cartel';
    
    return 'other';
}

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Track page exit and engagement time
 */
window.addEventListener('beforeunload', function() {
    const sessionDuration = Date.now() - performance.timing.navigationStart;
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_exit', {
            event_category: 'engagement',
            event_label: 'Session duration',
            value: Math.round(sessionDuration / 1000), // Convert to seconds
            device_type: getDeviceType(),
            preferred_contact: sessionStorage.getItem('preferredContactMethod') || 'none'
        });
    }
});

// Export analytics functions for external use
window.TommyCoconutAnalytics = {
    trackCustomEvent: function(eventName, parameters) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        console.log(`📊 Custom event: ${eventName}`, parameters);
    },
    
    setUserProperty: function(propertyName, value) {
        if (typeof gtag !== 'undefined') {
            gtag('config', 'G-PVETEG7EB4', {
                [propertyName]: value
            });
        }
    }
};