// ============================================
// ADVANCED MODERN PORTFOLIO - INTERACTIVE FEATURES
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #ff006e;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    cursorTrail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #ff006e, #00f5ff);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.15s ease;
        box-shadow: 0 0 20px rgba(255, 0, 110, 0.6);
    `;
    document.body.appendChild(cursorTrail);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#00f5ff';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#ff006e';
        });
    });

    // ============================================
    // 3D CARD TILT EFFECT
    // ============================================
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // TYPING ANIMATION
    // ============================================
    const typedTextElement = document.getElementById('typedText');
    const titles = [
        'AI Engineer',
        'Data Scientist',
        'Full-Stack Developer',
        'Problem Solver',
        'Tech Innovator'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.setProperty('--skill-width', width + '%');
                    progressBar.classList.add('animate');
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => observer.observe(card));

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => observer.observe(item));

    // ============================================
    // ENHANCED PARTICLE SYSTEM
    // ============================================
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = this.getRandomColor();
            this.element = this.createElement();
        }

        getRandomColor() {
            const colors = [
                'rgba(255, 0, 110, 0.6)',
                'rgba(0, 245, 255, 0.6)',
                'rgba(0, 255, 159, 0.6)',
                'rgba(123, 44, 191, 0.6)'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        createElement() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${this.size}px;
                height: ${this.size}px;
                background: ${this.color};
                border-radius: 50%;
                left: ${this.x}px;
                top: ${this.y}px;
                box-shadow: 0 0 10px ${this.color};
            `;
            particleContainer.appendChild(particle);
            return particle;
        }

        update(mouseX, mouseY) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.speedX -= (dx / distance) * force * 0.5;
                this.speedY -= (dy / distance) * force * 0.5;
            }

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
            if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;

            this.speedX *= 0.99;
            this.speedY *= 0.99;

            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }
    }

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        particles.forEach(particle => particle.update(mouseX, mouseY));
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff006e, #00f5ff);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 0 30px rgba(255, 0, 110, 0.6);
    `;
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollToTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 0 50px rgba(0, 245, 255, 0.8)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 0 30px rgba(255, 0, 110, 0.6)';
    });

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c👋 Hello, curious developer!', 'color: #ff006e; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check out the source!', 'color: #00f5ff; font-size: 14px;');
    console.log('%cBuilt with ❤️ by Sanket Saraf', 'color: #00ff9f; font-size: 12px;');

});
