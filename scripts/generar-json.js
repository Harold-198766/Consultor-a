
// scripts/generar-json.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Carpeta donde Netlify CMS guarda los artículos en Markdown
const postsDir = path.join(__dirname, "..", "content", "articulos");

// Ruta de salida del JSON que usará tu sitio
const salida = path.join(__dirname, "..", "public", "articulos", "index.json");

function generarJSON() {
  if (!fs.existsSync(postsDir)) {
    console.error("⚠️ No existe la carpeta de artículos:", postsDir);
    return;
  }

  const archivos = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));

  const entradas = archivos.map(nombre => {
    const filePath = path.join(postsDir, nombre);
    const contenido = fs.readFileSync(filePath, "utf8");
    const { data } = matter(contenido);

    return {
      archivo: nombre,
      url: `/articulo.html?archivo=articulos/${nombre}`,
      title: data.title || "Sin título",
      date: data.date || null,
      description: data.description || "",
      category: data.category || "",
      keywords: data.keywords || []
    };
  });

  // Ordenar por fecha descendente
  entradas.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  fs.mkdirSync(path.dirname(salida), { recursive: true });
  fs.writeFileSync(salida, JSON.stringify(entradas, null, 2));

  console.log(`✅ Generado index.json con ${entradas.length} artículos`);
}

generarJSON();
// scripts/generar-json.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Carpeta donde Netlify CMS guarda los artículos en Markdown
const postsDir = path.join(__dirname, "..", "content", "articulos");

// Ruta de salida del JSON que usará tu sitio
const salida = path.join(__dirname, "..", "public", "articulos", "index.json");

function generarJSON() {
  if (!fs.existsSync(postsDir)) {
    console.error("⚠️ No existe la carpeta de artículos:", postsDir);
    return;
  }

  const archivos = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));

  const entradas = archivos.map(nombre => {
    const filePath = path.join(postsDir, nombre);
    const contenido = fs.readFileSync(filePath, "utf8");
    const { data } = matter(contenido);

    return {
      archivo: nombre,
      url: `/articulo.html?archivo=articulos/${nombre}`,
      title: data.title || "Sin título",
      date: data.date || null,
      description: data.description || "",
      category: data.category || "",
      keywords: data.keywords || []
    };
  });

  // Ordenar por fecha descendente
  entradas.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  fs.mkdirSync(path.dirname(salida), { recursive: true });
  fs.writeFileSync(salida, JSON.stringify(entradas, null, 2));

  console.log(`✅ Generado index.json con ${entradas.length} artículos`);
}

generarJSON();
a47feb8af80db0d3b0dd29b2fe7ff5c82fb1bc72
