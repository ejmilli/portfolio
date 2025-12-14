// ===== SMOOTH SCROLLING & ACTIVE NAV =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== ROBOT ANIMATION ENHANCEMENTS =====
const robot = document.querySelector('.robot');
const robotContainer = document.querySelector('.robot-container');

// Add interactive hover effect
if (robotContainer) {
    robotContainer.addEventListener('mouseenter', () => {
        robot.style.animation = 'float 1s ease-in-out infinite';
    });
    
    robotContainer.addEventListener('mouseleave', () => {
        robot.style.animation = 'float 3s ease-in-out infinite';
    });
}

// ===== DYNAMIC FLOATING PARTICLES =====
function createParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${i % 2 === 0 ? '#3B82F6' : '#4ADE80'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
const cards = document.querySelectorAll('.about-card, .project-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(74, 222, 128, 0.4), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.display = 'block';
    cursorGlow.style.left = e.clientX - 10 + 'px';
    cursorGlow.style.top = e.clientY - 10 + 'px';
});

// ===== ROBOT EYES FOLLOW CURSOR =====
const pupils = document.querySelectorAll('.pupil');
const eyeLeft = document.querySelector('.eye-left');
const eyeRight = document.querySelector('.eye-right');

if (robot && pupils.length > 0) {
    document.addEventListener('mousemove', (e) => {
        const robotRect = robot.getBoundingClientRect();
        const robotCenterX = robotRect.left + robotRect.width / 2;
        const robotCenterY = robotRect.top + robotRect.height / 2;
        
        pupils.forEach((pupil, index) => {
            const eye = index === 0 ? eyeLeft : eyeRight;
            if (!eye) return;
            
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            const deltaX = e.clientX - eyeCenterX;
            const deltaY = e.clientY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            
            const distance = Math.min(3, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 50);
            const pupilX = Math.cos(angle) * distance;
            const pupilY = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    });
}

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < text.length) {
            subtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 500);
}

// ===== TECH TAGS ANIMATION ON HOVER =====
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.background = `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary')}, ${getComputedStyle(document.documentElement).getPropertyValue('--accent-primary')})`;
        this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.background = getComputedStyle(document.documentElement).getPropertyValue('--secondary-bg');
        this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-main');
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hello there!', 'color: #4ADE80; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to my portfolio! Built with passion by Eliza John 🚀', 'color: #3B82F6; font-size: 14px;');
console.log('%cInterested in the code? Check out the repo or reach out!', 'color: #F0F0F0; font-size: 12px;');

// ===== PERFORMANCE: REDUCE MOTION FOR ACCESSIBILITY =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}