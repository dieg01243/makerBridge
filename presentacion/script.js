document.addEventListener('DOMContentLoaded', () => {
  // 1. Detección de Slide Activo en el Menú de Navegación
  const sections = document.querySelectorAll('section.slide-card');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // 2. Efecto de sombra dinámica al hacer scroll en la barra superior
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
      header.style.background = 'rgba(15, 20, 28, 0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(15, 20, 28, 0.88)';
    }
  });

  // 3. Animación suave en hover sobre tarjetas
  const cards = document.querySelectorAll('.feature-card, .solution-card, .stat-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
});