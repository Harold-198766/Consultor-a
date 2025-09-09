document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('#toggle-cortina');
  const cortina = document.querySelector('.cortina');

  if (toggleBtn && cortina) {
    toggleBtn.addEventListener('click', () => {
      cortina.classList.toggle('hidden');
    });
  }

  // Animación de entrada
  const fadeIn = (el) => {
    el.style.opacity = 0;
    el.style.transition = 'opacity 1s ease-in';
    requestAnimationFrame(() => {
      el.style.opacity = 1;
    });
  };

  document.querySelectorAll('.fade-in').forEach(fadeIn);
});
