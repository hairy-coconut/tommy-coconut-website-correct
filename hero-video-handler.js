/**
 * Tommy Coconut Hero Video Handler
 * Prevents layout corruption by ensuring stable video loading with proper fallbacks
 */

document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    const heroVideoPlaceholder = document.querySelector('.hero-video-placeholder');
    const heroVideoContainer = document.querySelector('.hero-video-container');
    const heroSection = document.querySelector('.hero');
    
    console.log('🎥 Tommy Coconut Hero Video Handler initialized');
    
    // CRITICAL: Stabilize hero section layout immediately
    stabilizeHeroLayout();
    
    if (!heroVideo) {
        console.warn('No hero video element found - using fallback');
        ensureFallbackDisplay();
        return;
    }
    
    // Set up video for stable loading
    setupVideoAttributes();
    
    // Initialize video loading with timeout protection
    initializeVideoLoading();
    
    /**
     * Prevent layout corruption by setting stable dimensions immediately
     */
    function stabilizeHeroLayout() {
        if (heroSection) {
            heroSection.style.minHeight = '100vh';
            heroSection.style.position = 'relative';
            heroSection.style.overflow = 'hidden';
            heroSection.style.display = 'flex';
            heroSection.style.alignItems = 'center';
            heroSection.style.justifyContent = 'center';
            heroSection.style.textAlign = 'center';
        }
        
        if (heroVideoContainer) {
            heroVideoContainer.style.position = 'absolute';
            heroVideoContainer.style.top = '0';
            heroVideoContainer.style.left = '0';
            heroVideoContainer.style.width = '100%';
            heroVideoContainer.style.height = '100%';
            heroVideoContainer.style.zIndex = '0';
            heroVideoContainer.style.overflow = 'hidden';
        }
        
        if (heroVideoPlaceholder) {
            heroVideoPlaceholder.style.position = 'absolute';
            heroVideoPlaceholder.style.top = '0';
            heroVideoPlaceholder.style.left = '0';
            heroVideoPlaceholder.style.width = '100%';
            heroVideoPlaceholder.style.height = '100%';
            heroVideoPlaceholder.style.zIndex = '0';
            heroVideoPlaceholder.style.opacity = '1';
            heroVideoPlaceholder.style.display = 'block';
            heroVideoPlaceholder.style.background = 'url("/images/properties/villa-hero.jpg") center/cover no-repeat';
        }
    }
    
    /**
     * Configure video attributes for optimal loading
     */
    function setupVideoAttributes() {
        // Critical attributes to prevent layout shifts
        heroVideo.style.position = 'absolute';
        heroVideo.style.top = '0';
        heroVideo.style.left = '0';
        heroVideo.style.width = '100%';
        heroVideo.style.height = '100%';
        heroVideo.style.objectFit = 'cover';
        heroVideo.style.zIndex = '1';
        heroVideo.style.opacity = '0';
        heroVideo.style.transition = 'opacity 0.5s ease';
        
        // Video playback attributes
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        heroVideo.autoplay = true;
        heroVideo.loop = true;
        heroVideo.controls = false;
        heroVideo.preload = 'metadata';
        
        // Prevent right-click context menu
        heroVideo.oncontextmenu = () => false;
    }
    
    /**
     * Initialize video loading with comprehensive error handling
     */
    function initializeVideoLoading() {
        let videoLoadAttempted = false;
        let videoLoadTimeout;
        
        // Function to handle successful video loading
        function handleVideoSuccess() {
            console.log('✅ Hero video loaded successfully');
            clearTimeout(videoLoadTimeout);
            
            // Smoothly transition from placeholder to video
            heroVideo.style.opacity = '1';
            
            if (heroVideoPlaceholder) {
                setTimeout(() => {
                    heroVideoPlaceholder.style.opacity = '0';
                }, 300);
            }
            
            if (heroVideoContainer) {
                heroVideoContainer.classList.add('video-loaded');
            }
            
            // Start playback
            heroVideo.play().catch(error => {
                console.warn('Video autoplay prevented:', error);
                // Autoplay failed, but video is loaded - that's fine
            });
        }
        
        // Function to handle video loading failure
        function handleVideoError(error) {
            console.warn('❌ Hero video failed to load:', error);
            clearTimeout(videoLoadTimeout);
            ensureFallbackDisplay();
        }
        
        // Set up comprehensive event listeners
        const successEvents = ['loadeddata', 'loadedmetadata', 'canplay'];
        const errorEvents = ['error', 'abort', 'emptied'];
        
        successEvents.forEach(event => {
            heroVideo.addEventListener(event, () => {
                if (!videoLoadAttempted && heroVideo.readyState >= 2) {
                    videoLoadAttempted = true;
                    handleVideoSuccess();
                }
            });
        });
        
        errorEvents.forEach(event => {
            heroVideo.addEventListener(event, handleVideoError);
        });
        
        // Stalled event handling
        heroVideo.addEventListener('stalled', () => {
            console.warn('Video loading stalled');
        });
        
        // Start loading the video
        try {
            heroVideo.load();
        } catch (error) {
            console.warn('Video load() failed:', error);
            handleVideoError(error);
            return;
        }
        
        // Critical timeout to prevent indefinite waiting
        videoLoadTimeout = setTimeout(() => {
            if (!videoLoadAttempted) {
                if (heroVideo.readyState >= 1) {
                    console.log('Video has some data, attempting to show');
                    videoLoadAttempted = true;
                    handleVideoSuccess();
                } else {
                    console.warn('Video load timeout - falling back to image');
                    handleVideoError('timeout');
                }
            }
        }, 2000);
        
        // Immediate attempt if video is already ready
        if (heroVideo.readyState >= 2) {
            setTimeout(() => {
                if (!videoLoadAttempted) {
                    videoLoadAttempted = true;
                    handleVideoSuccess();
                }
            }, 100);
        }
    }
    
    /**
     * Ensure fallback image is properly displayed
     */
    function ensureFallbackDisplay() {
        if (heroVideo) {
            heroVideo.style.display = 'none';
            heroVideo.style.opacity = '0';
        }
        
        if (heroVideoPlaceholder) {
            heroVideoPlaceholder.style.display = 'block';
            heroVideoPlaceholder.style.opacity = '1';
        }
        
        if (heroVideoContainer) {
            heroVideoContainer.classList.remove('video-loaded');
            heroVideoContainer.classList.add('video-error');
        }
    }
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