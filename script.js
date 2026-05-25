/* ==========================================
   SCRIPTS ADICIONALES PARA WORDPRESS
   Copia esto usando un plugin de "Custom JS" (ej. Simple Custom CSS and JS)
   o añádelo en el footer de tu tema.
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- FILTRADO DEL GRID DE PORTAFOLIO (NUEVO) ---
    const filterButtons = document.querySelectorAll('.filter-btn-new');
    const projects = document.querySelectorAll('.masonry-item-new');

    if (filterButtons.length > 0 && projects.length > 0) {
        filterButtons.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remover clase activa
                filterButtons.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                const category = filter.getAttribute('data-filter');

                projects.forEach(masonryItem => {
                    const projCategory = masonryItem.getAttribute('data-category');

                    if (category === 'all' || projCategory === category) {
                        masonryItem.classList.remove('hide-masonry');
                        setTimeout(() => {
                            masonryItem.classList.remove('filtered-out-new');
                        }, 50);
                    } else {
                        masonryItem.classList.add('filtered-out-new');
                        setTimeout(() => {
                            if (masonryItem.classList.contains('filtered-out-new')) {
                                masonryItem.classList.add('hide-masonry');
                            }
                        }, 400); // match transition duration
                    }
                });
            });
        });
    }

    // --- CONTROLADOR DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('portfolio-form');
    const formResponse = document.getElementById('form-response');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga real de página

            // Simular envío de datos exitoso
            formResponse.style.color = '#FAF6F0';
            formResponse.textContent = '¡Gracias por tu mensaje! Tu propuesta ha sido enviada con éxito. Starmin se pondrá en contacto contigo pronto.';

            // Limpiar formulario
            contactForm.reset();

            // Desvanecer mensaje después de 5 segundos
            setTimeout(() => {
                formResponse.textContent = '';
            }, 5000);
        });
    }
    /////////////////////////
    // --- SCROLL SPY PARA NAVEGACIÓN DINÁMICA ---
    const navLinks = document.querySelectorAll('.navbar-wp-link');
    const sections = [];

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
            const section = document.querySelector(href);
            if (section) sections.push(section);
        }
    });

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // 150px de tolerancia desde la parte superior (compensa la barra fija)
                if (rect.top <= 150) {
                    current = section.getAttribute('id');
                }
            });

            // Actualizar la raya de selección (clase .active)
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (current && link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Forzar la evaluación inicial al cargar la página
        window.dispatchEvent(new Event('scroll'));
    }
});
