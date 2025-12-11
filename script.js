// Dezgo.lv - Interactive JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for empty anchors
            if (href === '#' || href === '') {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.phone) {
                alert('Lūdzu, aizpildiet visus obligātos laukus!');
                return;
            }

            // Phone validation (Latvian format)
            const phoneRegex = /^(\+371)?[0-9]{8}$/;
            if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
                alert('Lūdzu, ievadiet derīgu Latvijas tālruņa numuru!');
                return;
            }

            // Email validation (if provided)
            if (formData.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    alert('Lūdzu, ievadiet derīgu e-pasta adresi!');
                    return;
                }
            }

            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            console.log('Form data:', formData);

            // Show success message
            alert('Paldies par pieteikumu! Mēs sazināsimies ar jums tuvākajā laikā.');

            // Reset form
            contactForm.reset();

            // You can replace this with actual form submission to a backend
            // Example with fetch API:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Paldies par pieteikumu! Mēs sazināsimies ar jums tuvākajā laikā.');
                contactForm.reset();
            })
            .catch(error => {
                alert('Notikusi kļūda. Lūdzu, mēģiniet vēlreiz vai zvaniet mums tieši.');
                console.error('Error:', error);
            });
            */
        });
    }

    // Header Scroll Effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow to header when scrolling
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for fade-in animations
    const animatedElements = document.querySelectorAll(
        '.service-card, .why-card, .problem-card, .testimonial-card, .process-step'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Phone Number Formatting
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            // Add +371 prefix if not present and user starts typing
            if (value.length > 0 && !e.target.value.startsWith('+371')) {
                if (value.startsWith('371')) {
                    value = value.substring(3);
                }
                e.target.value = '+371 ' + value;
            }
        });
    }

    // Back to Top Button (Optional Enhancement)
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
        `;

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
            button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });

        document.body.appendChild(button);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    };

    // Initialize back to top button
    createBackToTopButton();

    // Service Cards Click Tracking (for analytics)
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            console.log('Service clicked:', serviceName);
            // Here you can add Google Analytics or other tracking code
            // Example: gtag('event', 'service_click', { 'service_name': serviceName });
        });
    });

    // Form Field Focus Effects
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Console welcome message
    console.log('%c Dezgo.lv - Tarakānu Iznīcināšanas Eksperti ', 'background: #d32f2f; color: white; font-size: 16px; padding: 10px;');
    console.log('Website loaded successfully! ✓');
});

// Helper function to detect if user is on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Helper function for lazy loading images (if needed in the future)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Add custom cursor effect on service cards (optional enhancement)
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.service-card, .why-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        }
    });
});

document.addEventListener('mouseleave', function() {
    const cards = document.querySelectorAll('.service-card, .why-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});

// Performance monitoring (optional)
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    }
});
