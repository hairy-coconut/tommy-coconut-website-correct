/**
 * Tommy Coconut Performance Optimization Script
 * Handles performance enhancements and layout stability
 */

// Critical performance optimizations - Run immediately, don't wait for DOM
(function() {
    console.log('🚀 Tommy Coconut Performance Script loading');
    
    // Immediate layout stabilization - run as early as possible
    function immediateStabilization() {
        // Add critical CSS if not already loaded
        if (!document.querySelector('link[href*="safe-mode.css"]')) {
            const criticalCSS = document.createElement('link');
            criticalCSS.rel = 'stylesheet';
            criticalCSS.href = 'safe-mode.css';
            criticalCSS.media = 'all';
            document.head.appendChild(criticalCSS);
        }
        
        // Set viewport meta if missing
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewport);
        }
    }
    
    // Run immediate stabilization
    immediateStabilization();
    
    // Wait for DOM to be ready for the rest
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeOptimizations);
    } else {
        // DOM already ready
        initializeOptimizations();
    }
    
    function initializeOptimizations() {
        console.log('🚀 Tommy Coconut Performance Script initialized');
        
        // Prevent layout shift during loading
        preventLayoutShift();
        
        // Optimize image loading
        optimizeImageLoading();
        
        // Handle critical resource loading
        handleCriticalResources();
    }
})();

/**
 * Prevent layout shifts by pre-setting dimensions and states
 */
function preventLayoutShift() {
    // Ensure hero section maintains stable dimensions
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.minHeight = '100vh';
        heroSection.style.position = 'relative';
        
        // Ensure video container is stable
        const videoContainer = document.querySelector('.hero-video-container');
        if (videoContainer) {
            videoContainer.style.position = 'absolute';
            videoContainer.style.top = '0';
            videoContainer.style.left = '0';
            videoContainer.style.width = '100%';
            videoContainer.style.height = '100%';
        }
    }
    
    // Stabilize navigation height
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.height = '80px'; // Fixed height to prevent shift
    }
    
    // Pre-set dimensions for image containers
    const imageContainers = document.querySelectorAll('.property-card-image, .asset-image img, .experience-card img');
    imageContainers.forEach(img => {
        if (!img.style.height) {
            img.style.height = '250px';
            img.style.objectFit = 'cover';
        }
    });
}

/**
 * Optimize image loading to prevent layout jumps
 */
function optimizeImageLoading() {
    // Add loading states to images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.classList.add('loading');
            
            img.addEventListener('load', function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.classList.add('error');
                console.warn('Image failed to load:', this.src);
            });
        }
    });
}

/**
 * Handle critical resources to prevent layout disruption
 */
function handleCriticalResources() {
    // Ensure fonts are loaded before showing content
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // Stabilize external widget loading (Lodgify)
    const lodgifySearchBar = document.getElementById('lodgify-search-bar');
    if (lodgifySearchBar) {
        // Pre-set minimum height to prevent layout shift
        lodgifySearchBar.style.minHeight = '80px';
        lodgifySearchBar.style.transition = 'height 0.3s ease';
    }
    
    // Handle WhatsApp float button stability
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.position = 'fixed';
        whatsappFloat.style.bottom = '20px';
        whatsappFloat.style.right = '20px';
        whatsappFloat.style.zIndex = '1000';
    }
}

/**
 * Monitor for unexpected layout shifts
 */
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.hadRecentInput) continue; // Ignore shifts caused by user interaction
            
            if (entry.value > 0.1) { // Significant layout shift detected
                console.warn('Layout shift detected:', entry.value, entry.sources);
            }
        }
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
}