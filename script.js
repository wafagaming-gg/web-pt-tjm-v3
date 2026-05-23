/**
 * PT. Tri Jaya Muktiwari - Main Logic
 */

// --- 1. Inisialisasi EmailJS ---
const EMAILJS_PUBLIC_KEY = "vwGyR8V4Y8ECtQNpX"; 
emailjs.init(EMAILJS_PUBLIC_KEY);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 2. Navigasi Mobile (Hamburger Menu) ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 3. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 4. Penanganan Formulir Kontak ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Mengirim...';
            button.disabled = true;

            const formData = {
                from_name: document.getElementById('name').value,
                from_phone: document.getElementById('phone').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                service: 'Tri_jaya_Muktiwari'
            };

            emailjs.send('service_g63m20i', 'template_qf8mf6o', formData)
                .then(() => {
                    alert('✅ Pesan berhasil terkirim! Tim kami akan segera menghubungi Anda.');
                    contactForm.reset();
                })
                .catch((error) => {
                    alert('❌ Gagal mengirim pesan. Silakan hubungi kami via WhatsApp: 0812-3456-7891');
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                });
        });
    }

    // --- 5. Counter Animation (FIXED) ---
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; 
            const stepTime = 20;
            const increment = target / (duration / stepTime);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    // Logika penambahan tanda "+" untuk angka tertentu
                    const suffix = (target === 15 || target === 500 || target === 1000) ? "+" : "";
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    // --- 6. Intersection Observer ---
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(aboutSection);
    }

    // --- 7. Efek Scroll Navbar ---
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(30, 60, 114, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
                header.style.backdropFilter = 'none';
            }
        }
    });
});