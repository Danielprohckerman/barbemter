// Navegación suave
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto parallax suave en el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Configuración del observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a las tarjetas cuando aparecen en pantalla
    document.querySelectorAll('.service-card, .team-member, .contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Efecto de typing en el título principal
    const title = document.querySelector('.hero-content h1');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Contador animado para precios
    const animateNumbers = () => {
        const prices = document.querySelectorAll('.price');
        prices.forEach(price => {
            const finalNumber = parseInt(price.textContent.replace('$', ''));
            let currentNumber = 0;
            const increment = finalNumber / 50;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    price.textContent = `$${finalNumber}`;
                    clearInterval(counter);
                } else {
                    price.textContent = `$${Math.floor(currentNumber)}`;
                }
            }, 30);
        });
    };

    // Activar contador cuando la sección de servicios sea visible
    const servicesSection = document.querySelector('#servicios');
    if (servicesSection) {
        const servicesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    servicesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        servicesObserver.observe(servicesSection);
    }

    // Efecto hover mejorado para las tarjetas de servicio
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.2)';
        });
    });

    // Navegación activa según la sección visible
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const highlightNavigation = () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);

    // Efecto de carga inicial
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });

    // Inicializar opacity del body
    document.body.style.opacity = '0';
});

// Funciones adicionales para interactividad

// Función para mostrar modal de reserva (placeholder)
function showBookingModal() {
    alert('‼️reserva en desarrollo. Llama al +52 967 345 4719 para reservar tu cita.‼️ :)');
}

// Agregar evento al botón CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            showBookingModal();
        });
    }
});

// Función para validar formularios (para futuras implementaciones)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('Email inválido');
    }
    
    if (!formData.phone || formData.phone.length < 10) {
        errors.push('Teléfono inválido');
    }
    
    return errors;
}

// Función para manejar el envío de formularios
function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    const errors = validateForm(data);
    
    if (errors.length > 0) {
        alert('Errores en el formulario:\n' + errors.join('\n'));
        return;
    }
    
    // Aquí iría la lógica para enviar el formulario
    alert('Formulario enviado correctamente. Te contactaremos pronto.');
}
