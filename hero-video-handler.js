/**
 * Tommy Coconut Hero Video Handler
 * Ensures proper video loading with fallback support
 */

document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    const heroVideoPlaceholder = document.querySelector('.hero-video-placeholder');
    const heroVideoContainer = document.querySelector('.hero-video-container');
    
    console.log('🎥 Tommy Coconut Hero Video Handler initialized');
    
    if (!heroVideo) {
        console.warn('No hero video element found');
        return;
    }
    
    // Function to handle video load success
    function handleVideoLoad() {
        console.log('✅ Hero video loaded successfully');
        if (heroVideoPlaceholder) {
            heroVideoPlaceholder.style.display = 'none';
        }
        heroVideo.style.opacity = '1';
        heroVideo.style.display = 'block';
        
        // Add loaded class for CSS transitions
        if (heroVideoContainer) {
            heroVideoContainer.classList.add('video-loaded');
        }
        
        // Ensure video plays
        heroVideo.play().catch(e => {
            console.warn('Video autoplay prevented:', e);
        });
    }
    
    // Function to handle video load failure  
    function handleVideoError(error) {
        console.warn('❌ Hero video failed to load:', error);
        if (heroVideo) {
            heroVideo.style.display = 'none';
            heroVideo.style.opacity = '0';
        }
        if (heroVideoPlaceholder) {
            heroVideoPlaceholder.style.display = 'block';
        }
    }
    
    // Set initial state - video visible by default
    heroVideo.style.opacity = '1';
    heroVideo.style.display = 'block';
    heroVideo.style.transition = 'opacity 0.5s ease';
    
    // Ensure video attributes are set correctly
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.autoplay = true;
    heroVideo.loop = true;
    heroVideo.controls = false;
    
    // Add event listeners
    heroVideo.addEventListener('loadeddata', handleVideoLoad);
    heroVideo.addEventListener('loadedmetadata', handleVideoLoad);
    heroVideo.addEventListener('canplay', handleVideoLoad);
    heroVideo.addEventListener('canplaythrough', handleVideoLoad);
    heroVideo.addEventListener('error', handleVideoError);
    heroVideo.addEventListener('abort', handleVideoError);
    heroVideo.addEventListener('stalled', () => {
        console.warn('Video stalled');
    });
    
    // Force video to load
    heroVideo.load();
    
    // Immediate play attempt
    setTimeout(() => {
        if (heroVideo.readyState >= 2) {
            handleVideoLoad();
        } else {
            console.log('Video not ready yet, waiting...');
        }
    }, 500);
    
    // Fallback timeout - if video doesn't load within 3 seconds, still try to show it
    const fallbackTimeout = setTimeout(() => {
        console.log('Video timeout reached, current state:', heroVideo.readyState);
        if (heroVideo.readyState >= 1) {
            // Video has some data, try to show it anyway
            handleVideoLoad();
        } else {
            console.warn('Hero video load timeout, using fallback image');
            handleVideoError('timeout');
        }
    }, 3000);
    
    // Clear timeout if video loads successfully
    heroVideo.addEventListener('loadeddata', () => {
        clearTimeout(fallbackTimeout);
    });
});

/**
 * Mobile Navigation Handler
 * Handles mobile menu toggle functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

/**
 * Reviews Carousel Handler
 * Handles the homepage reviews carousel functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.review-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance carousel every 8 seconds
    setInterval(nextSlide, 8000);
    
    // Initialize first slide
    showSlide(0);
});