const fs = require("fs");
const path = require("path");

// Carpeta donde guardas los artículos .md
const articulosDir = path.join(__dirname, "../articulos");

// Archivo de salida
const output = path.join(__dirname, "../dist/index.json");

// Función auxiliar para generar el slug
function generarSlug(nombreArchivo) {
  return nombreArchivo
    .replace(/\.md$/, "")       // quitar extensión .md
    .toLowerCase()              // pasar a minúsculas
    .replace(/\s+/g, "-")       // espacios → guiones
    .replace(/[^\w\-]+/g, "");  // quitar caracteres raros
}

// Leer todos los archivos de la carpeta de artículos
const archivos = fs.readdirSync(articulosDir).filter(f => f.endsWith(".md"));

// Construir el índice
const index = archivos.map(file => {
  const slug = generarSlug(file);

  return {
    archivo: file,
    url: `articulo.html?slug=${slug}`,
    title: path.basename(file, ".md").replace(/-/g, " "), // opcional: título básico
    date: new Date().toISOString(),
    description: "",
    category: "General",
    keywords: [],
    slug: slug
  };
});

// Guardar el index.json en /dist
fs.writeFileSync(output, JSON.stringify(index, null, 2), "utf8");

console.log("✅ index.json generado con slugs incluidos");

