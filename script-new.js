// Enhanced Portfolio JavaScript with Tailwind CSS

// Language switching functionality
let currentLanguage = localStorage.getItem('language') || 'en';

// Function to switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    console.log('🌍 Language switched to:', lang);
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-es]');
    elements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Update language toggle buttons
    const toggleBtns = document.querySelectorAll('#languageToggle, #languageToggleMobile');
    toggleBtns.forEach(btn => {
        if (btn) {
            btn.innerHTML = `<i class="fas fa-globe mr-2"></i>${lang.toUpperCase() === 'EN' ? 'ES' : 'EN'}`;
        }
    });
    
    // Update CV download link based on language
    const cvDownloadLink = document.getElementById('cvDownloadLink');
    if (cvDownloadLink) {
        if (lang === 'es') {
            cvDownloadLink.href = 'CV_Enrique_De_Santiago_Espanol.html';
            console.log('🌍 CV link switched to Spanish:', cvDownloadLink.href);
            // Update button text to show Spanish CV
            const cvButtonText = cvDownloadLink.querySelector('span');
            if (cvButtonText) {
                cvButtonText.textContent = cvButtonText.getAttribute('data-es');
            }
        } else {
            cvDownloadLink.href = 'CV_Enrique_De_Santiago.html';
            console.log('🌍 CV link switched to English:', cvDownloadLink.href);
            // Update button text to show English CV
            const cvButtonText = cvDownloadLink.querySelector('span');
            if (cvButtonText) {
                cvButtonText.textContent = cvButtonText.getAttribute('data-en');
            }
        }
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/95');
            navbar.classList.remove('bg-black/80');
        } else {
            navbar.classList.remove('bg-black/95');
            navbar.classList.add('bg-black/80');
        }
    });
}

// Active navigation link highlighting
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animate progress bars on scroll
function initProgressBars() {
    const progressBars = document.querySelectorAll('.bg-gradient-to-r');
    
    const animateProgressBars = function() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    // Intersection Observer for progress bars
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.style.transform = 'translateX(0)';
        });
        
        // Close mobile menu when clicking close button
        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', function() {
                mobileMenu.style.transform = 'translateX(-100%)';
            });
        }
        
        // Close mobile menu when clicking on a link
        mobileMenuLinks?.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.style.transform = 'translateX(-100%)';
            });
        });
    }
}

// Project card hover effects
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for hero section
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('#home');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Profile image fallback
function initProfileImage() {
    const profileImage = document.getElementById('profileImage');
    const fallbackIcon = document.getElementById('fallbackIcon');
    
    if (profileImage) {
        profileImage.addEventListener('error', function() {
            this.style.display = 'none';
            if (fallbackIcon) {
                fallbackIcon.style.display = 'flex';
            }
        });
        
        profileImage.addEventListener('load', function() {
            if (fallbackIcon) {
                fallbackIcon.style.display = 'none';
            }
        });
    }
}

// Contact form functionality (if needed)
function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
}

// Loading animation
function initLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
}

// Debounce utility function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Optimize scroll events with debouncing
const optimizedScrollHandler = debounce(function() {
    // Scroll event logic here
}, 10);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    switchLanguage(currentLanguage);
    
    // Add click event to language toggle buttons
    const toggleBtns = document.querySelectorAll('#languageToggle, #languageToggleMobile');
    toggleBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                const newLang = currentLanguage === 'en' ? 'es' : 'en';
                switchLanguage(newLang);
            });
        }
    });
    
    // Initialize all functionality
    initSmoothScrolling();
    initNavbarScroll();
    initActiveNavLinks();
    initProgressBars();
    initScrollAnimations();
    initMobileMenu();
    initProjectCards();
    initTimelineAnimations();
    initTypingAnimation();
    initParallaxEffect();
    initProfileImage();
    initContactForm();
    initLoadingAnimation();
    
    // Add optimized scroll handler
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Console welcome message
    console.log(`
    🚀 Welcome to my portfolio!
    
    👨‍💻 Software Developer & Business Leader
    📧 Contact: ef.santiago@gmail.com
    🔗 GitHub: github.com/kikstaog
    
    Built with ❤️ using Tailwind CSS and modern web technologies
    `);
});

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .animate-on-scroll.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: white !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .btn-primary {
        background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
        transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
        background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(14, 165, 233, 0.3);
    }
    
    .btn-secondary {
        transition: all 0.3s ease;
    }
    
    .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(14, 165, 233, 0.2);
    }
    
    .project-card {
        transition: all 0.5s ease;
    }
    
    .project-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .timeline-item {
        transition: all 0.6s ease;
    }
    
    .contact-item {
        transition: all 0.3s ease;
    }
    
    .contact-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    
    /* Custom animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }
    
    @keyframes gradient {
        0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
        }
        50% {
            background-size: 200% 200%;
            background-position: right center;
        }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .hero-section h1 {
            font-size: 2.5rem;
        }
        
        .section-title {
            font-size: 2.5rem;
        }
        
        .project-card {
            margin-bottom: 2rem;
        }
    }
    
    @media (max-width: 640px) {
        .hero-section h1 {
            font-size: 2rem;
        }
        
        .section-title {
            font-size: 2rem;
        }
        
        .btn-primary,
        .btn-secondary {
            width: 100%;
            margin-bottom: 1rem;
        }
    }
`;
document.head.appendChild(style); 