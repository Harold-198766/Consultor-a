document.addEventListener('DOMContentLoaded', () => {
  // --- Cortina toggle ---
  const toggleBtn = document.querySelector('#toggle-cortina');
  const cortina = document.querySelector('.cortina');

  if (toggleBtn && cortina) {
    toggleBtn.addEventListener('click', () => {
      cortina.classList.toggle('hidden');
    });
  }

  // --- Animación fade-in ---
  const fadeIn = (el) => {
    el.style.opacity = 0;
    el.style.transition = 'opacity 1s ease-in';
    requestAnimationFrame(() => {
      el.style.opacity = 1;
    });
  };
  document.querySelectorAll('.fade-in').forEach(fadeIn);

  // --- Cargar artículos ---
  const contenedorBlog = document.getElementById('blog-list');
  fetch('articulos/index.json')
    .then(res => res.json())
    .then(data => {
        contenedorBlog.innerHTML = '';
        data.forEach(articulo => {
            contenedorBlog.innerHTML += `
                <div class="articulo">
                    <h2>${articulo.title}</h2>
                    <p>${articulo.description || ''}</p>
                    <a href="${articulo.url}">Leer más</a>
                    <small>Fecha: ${articulo.date}</small>
                </div>
            `;
        });
        console.log("Artículos cargados:", data.length);
    })
    .catch(err => console.error("Error al cargar artículos:", err));
});
