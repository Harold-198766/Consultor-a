const params = new URLSearchParams(window.location.search);
const archivo = params.get("archivo");

if (archivo) {
  // Detectar título, fecha y resumen desde index.json
  fetch("articulos/index.json")
    .then(res => res.json())
    .then(lista => {
      const entrada = lista.find(e => e.archivo === archivo.split("/").pop());
      if (!entrada) return;

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": entrada.title.replace(/(^"|"$)/g, ""),
        "description": "Artículo del blog de Barillas, Colindres & Asociados sobre derecho y sociedad en Guatemala.",
        "datePublished": entrada.date,
        "url": location.href,
        "author": {
          "@type": "Organization",
          "name": "Colindres Barillas & Asociados"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Barillas, Colindres & Asociados",
          "logo": {
            "@type": "ImageObject",
            "url": "https://consultoria-legal-guatemala.netlify.app/img/logo-colindres-aqua.png"
          }
        }
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd, null, 2);
      document.head.appendChild(script);
    });
}

