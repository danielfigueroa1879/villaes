// JavaScript para el botón de scroll hacia arriba (solo móvil)
document.addEventListener('DOMContentLoaded', function() {
    // Crear el botón de scroll hacia arriba
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '&#8593;'; // Flecha hacia arriba
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Ir hacia arriba');
    scrollToTopBtn.setAttribute('title', 'Ir hacia arriba');
    
    // Añadir el botón al body
    document.body.appendChild(scrollToTopBtn);
    
    let scrollTimer = null;
    let hideTimer = null;
    let isVisible = false;
    
    // Función para mostrar el botón
    function showButton() {
        if (!isVisible && window.innerWidth <= 768) { // Solo en móvil
            scrollToTopBtn.classList.remove('hide');
            scrollToTopBtn.classList.add('show');
            isVisible = true;
            
            // Limpiar el timer anterior si existe
            if (hideTimer) {
                clearTimeout(hideTimer);
            }
        }
    }
    
    // Función para ocultar el botón
    function hideButton() {
        if (isVisible) {
            scrollToTopBtn.classList.remove('show');
            scrollToTopBtn.classList.add('hide');
            
            setTimeout(() => {
                scrollToTopBtn.style.display = 'none';
                scrollToTopBtn.classList.remove('hide');
                isVisible = false;
            }, 300);
        }
    }
    
    // Función para programar el ocultamiento automático
    function scheduleHide() {
        if (hideTimer) {
            clearTimeout(hideTimer);
        }
        
        hideTimer = setTimeout(() => {
            hideButton();
        }, 5000); // 5 segundos
    }
    
    // Evento de scroll
    window.addEventListener('scroll', function() {
        // Solo funcionar en dispositivos móviles
        if (window.innerWidth > 768) {
            if (isVisible) {
                hideButton();
            }
            return;
        }
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        // Mostrar el botón cuando el usuario haga scroll hacia abajo (más de 300px)
        if (scrollTop > 300) {
            showButton();
            scheduleHide();
        }
        
        // Si está cerca del final de la página, mostrar y programar ocultamiento
        if (scrollTop + windowHeight >= documentHeight - 100) {
            showButton();
            scheduleHide();
        }
        
        // Limpiar el timer de scroll anterior
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        // Programar ocultamiento después de parar de hacer scroll
        scrollTimer = setTimeout(() => {
            if (scrollTop > 300) {
                scheduleHide();
            } else {
                hideButton();
            }
        }, 150);
    });
    
    // Evento de clic en el botón
    scrollToTopBtn.addEventListener('click', function() {
        // Scroll suave hacia arriba
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Ocultar el botón inmediatamente después del clic
        hideButton();
    });
    
    // Ocultar en cambio de orientación o resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isVisible) {
            hideButton();
        }
    });
    
    // Prevenir que el botón interfiera con otros elementos
    scrollToTopBtn.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    });
});
