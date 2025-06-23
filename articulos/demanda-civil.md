<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Artículo del blog - Colindres Barillas & Asociados" />
  <title>Título del artículo | Colindres Barillas & Asociados</title>
  <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
  <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
  <link rel="icon" href="../favicon.ico" type="image/x-icon">
  <style>
    body {
      font-family: 'Georgia', serif;
      margin: 0;
      background: url('../fondo-pergamino.png') no-repeat center top fixed;
      background-size: cover;
      background-color: #fdf6e3;
      color: #000;
    }
    header {
      background-color: rgba(0, 0, 0, 0.85);
      color: #fff;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      justify-content: space-between;
    }
    header img {
      height: 100px;
      filter: brightness(0) invert(1);
    }
    nav a {
      color: #fff;
      margin: 0 10px;
      text-decoration: none;
      font-weight: bold;
    }
    .section {
      background-color: rgba(255, 255, 255, 0.92);
      padding: 40px 20px;
      max-width: 900px;
      margin: 40px auto;
      border-radius: 10px;
    }
    .section h1 {
      color: #900;
      font-size: 2em;
    }
    .section p {
      line-height: 1.6;
    }
    .volver {
      margin-top: 20px;
      display: inline-block;
      color: #003366;
      text-decoration: underline;
      font-weight: bold;
    }
    footer {
      background-color: rgba(0, 0, 0, 0.85);
      color: #fff;
      text-align: center;
      padding: 20px;
    }
  </style>
</head>
<body>
  <header>
    <img src="../logo-colindres.png" alt="Logo del bufete">
    <nav>
      <a href="../index.html#inicio">Inicio</a>
      <a href="../index.html#nosotros">Nosotros</a>
      <a href="../index.html#servicios">Servicios</a>
      <a href="../index.html#equipo">Equipo</a>
      <a href="../index.html#blog">Blog</a>
      <a href="../index.html#contacto">Contacto</a>
    </nav>
  </header>

  <section class="section">
    <h1>Título del artículo</h1>
    <p class="date">Publicado el [fecha]</p>
    <p>
      Aquí va el contenido del artículo completo. Puede usar párrafos, listas, subtítulos, etc.
    </p>
    <a href="../index.html#blog" class="volver">← Volver al blog</a>
  </section>

  <footer>
    <p>&copy; 2025 Colindres Barillas & Asociados. Todos los derechos reservados.</p>
  </footer>

  <!-- Calendly Widget -->
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      var checkCalendly = setInterval(function () {
        if (window.Calendly) {
          Calendly.initBadgeWidget({
            url: 'https://calendly.com/colindresbarillas/asesoria-juridica',
            text: 'Reserva una consulta',
            color: '#0056b3',
            textColor: '#ffffff',
            branding: false
          });
          clearInterval(checkCalendly);
        }
      }, 100);
    });
  </script>

  <!-- Tawk.to Widget -->
  <script type="text/javascript">
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/665f07e4981b6c56477603d0/1hv64h0he';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  </script>
</body>
</html>