// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d4ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor-trailer');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interactive cursor effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-link, .tech-tag, .btn');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'linear-gradient(135deg, #ff6b9d, #ffd93d)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'linear-gradient(135deg, #00d4ff, #c471ed)';
        });
    });

    // Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinksUpdate = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksUpdate.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttle(updateActiveNav, 100));

    // Navbar Transparency Effect
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(0, 212, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    }
    
    window.addEventListener('scroll', throttle(updateNavbar, 100));
    updateNavbar();

    // Skills Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const width = bar.getAttribute('data-width');
                if (width && !bar.classList.contains('animated')) {
                    bar.style.width = width + '%';
                    bar.classList.add('animated');
                }
            }
        });
    }
    
    window.addEventListener('scroll', throttle(animateSkills, 200));
    animateSkills();

    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = 'Jezua Palma';
        const textContent = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Project Cards Hover Effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });

    // Social Links Animation
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = (index * 0.1) + 's';
        
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Floating Tech Icons Animation
    const floatingTech = document.querySelectorAll('.floating-tech');
    
    floatingTech.forEach((tech, index) => {
        tech.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(15deg)';
            this.style.zIndex = '10';
        });
        
        tech.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.zIndex = '1';
        });
    });

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formInputs = document.querySelectorAll('.form-control');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending Message...';
            
            // Add loading animation
            submitBtn.classList.add('loading');
            
            // Re-enable after timeout (fallback)
            setTimeout(() => {
                if (submitBtn.disabled) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
                    submitBtn.classList.remove('loading');
                }
            }, 10000);
        });
    }

    // Form Validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid', 'is-valid');
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && value === '') {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
        } else if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
            } else {
                field.classList.add('is-valid');
                field.classList.remove('is-invalid');
            }
        } else if (value !== '') {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
        }
    }

    // Download CV Button Effect
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Preparing Download...';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.innerHTML = '<i class="fas fa-download me-2"></i>Download CV';
            }, 2000);
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transitionDelay = (index * 0.1) + 's';
            }
        });
    }
    
    // Set initial state
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', throttle(animateTimeline, 100));
    animateTimeline();

    // Parallax Effect for Hero Section
    const heroSection = document.getElementById('home');
    
    function parallaxEffect() {
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }
    
    window.addEventListener('scroll', throttle(parallaxEffect, 16));

    // Auto-dismiss Alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert && alert.parentNode && typeof bootstrap !== 'undefined') {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger specific animations
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                if (entry.target.classList.contains('glass-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const observeElements = document.querySelectorAll('.project-card, .glass-card, .timeline-content, .contact-item');
    observeElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(el);
    });

    // Tech Tags Hover Effect
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(0, 212, 255, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Floating Card Animation
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        let mouseX = 0, mouseY = 0;
        
        floatingCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - rect.width / 2) / 20;
            mouseY = (e.clientY - rect.top - rect.height / 2) / 20;
            
            this.style.transform = `translateY(-20px) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
        });
        
        floatingCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Loading Overlay (if needed)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate elements on load
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 500);
        }
    });

    // Throttle Function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Debounce Function
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Performance Optimization
    if ('IntersectionObserver' in window) {
        // Use Intersection Observer for better performance
        const lazyElements = document.querySelectorAll('[data-aos]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        });
        
        lazyElements.forEach(el => lazyObserver.observe(el));
    }

    // Initialize all animations
    updateActiveNav();
    animateSkills();
    animateTimeline();

    console.log('Portfolio initialized successfully!');
});


// Error Handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// Unhandled Promise Rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = '-V3Ncdd2qb4U_y9_n';
const EMAILJS_SERVICE_ID = 'service_fkfzevk';
const EMAILJS_TEMPLATE_ID = 'template_dibwp17';

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Contact Form - Send email via EmailJS
function sendEmail(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate fields
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return false;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    if (typeof emailjs === 'undefined') {
        const mailto = `mailto:jezuapalma@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
        window.location.href = mailto;
        showNotification('Email app opened. Send the message from there to finish.', 'success');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
        return false;
    }
    
    // Send email via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'jezuapalma@gmail.com'
    })
    .then(function(response) {
        console.log('Email sent successfully:', response);
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    })
    .catch(function(error) {
        console.error('Email error:', error);
        showNotification('Failed to send message. Please try again or email me directly.', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    });
    
    return false;
}

// Show notification toast
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
        ${message}
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #ff6b6b)'};
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Load GitHub Projects
function loadGitHubProjects() {
    const container = document.getElementById('github-projects');
    if (!container) return;
    
    fetch('https://api.github.com/users/jezua-palma/repos?sort=updated&per_page=6')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                throw new Error('GitHub API returned an unexpected response.');
            }

            const repos = data.map(repo => ({
                name: repo.name,
                description: repo.description || 'No description available',
                html_url: repo.html_url,
                language: repo.language || 'Unknown',
                stars: repo.stargazers_count,
                forks: repo.forks_count
            }));
            if (repos.length === 0) {
                container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No projects found</p></div>';
                return;
            }
            
            const languageIcons = {
                'JavaScript': 'fab fa-js-square',
                'TypeScript': 'fab fa-js-square',
                'Python': 'fab fa-python',
                'HTML': 'fab fa-html5',
                'CSS': 'fab fa-css3-alt',
                'PHP': 'fab fa-php',
                'Java': 'fab fa-java',
                'React': 'fab fa-react',
                'Unknown': 'fas fa-code'
            };
            
            const languageColors = {
                'JavaScript': '#f7df1e',
                'TypeScript': '#3178c6',
                'Python': '#3572A5',
                'HTML': '#e34c26',
                'CSS': '#563d7c',
                'PHP': '#777BB4',
                'Java': '#b07219',
                'Unknown': '#00d4ff'
            };
            
            let html = '';
            repos.forEach((repo, index) => {
                const icon = languageIcons[repo.language] || 'fas fa-code';
                const color = languageColors[repo.language] || '#00d4ff';
                const name = escapeHTML(repo.name);
                const description = escapeHTML(repo.description);
                const language = escapeHTML(repo.language);
                const url = escapeAttribute(repo.html_url);
                
                html += `
                    <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                        <div class="project-card glass-card h-100">
                            <div class="project-image">
                                <div class="project-overlay">
                                    <div class="project-icon">
                                        <i class="${icon}" style="color: ${color}"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="project-content">
                                <h5 class="gradient-text mb-3">${name}</h5>
                                <p class="text-light mb-3">${description}</p>
                                <div class="project-tech mb-3">
                                    <span class="tech-tag">${language}</span>
                                </div>
                                <div class="project-stats mb-3">
                                    <div class="row text-center">
                                        <div class="col-6">
                                            <small class="text-muted">Stars</small>
                                            <div class="fw-bold text-warning">${repo.stars}</div>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">Forks</small>
                                            <div class="fw-bold text-primary">${repo.forks}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="project-links">
                                    <a href="${url}" target="_blank" rel="noreferrer" class="btn btn-outline-primary btn-sm">
                                        <i class="fab fa-github me-1"></i>View on GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = html;
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        })
        .catch(error => {
            console.error('Error loading GitHub projects:', error);
            container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">Failed to load projects. Please try again later.</p></div>';
        });
}

document.addEventListener('DOMContentLoaded', loadGitHubProjects);

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeAttribute(value) {
    return escapeHTML(value).replace(/`/g, '&#096;');
}
