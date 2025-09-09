const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Carpeta donde están los artículos
const articlesDir = path.join(__dirname, "../articulos");

// Archivo de salida
const outputFile = path.join(__dirname, "../index.json");

// Lee todos los archivos .md en la carpeta de artículos
const files = fs.readdirSync(articlesDir).filter(file => file.endsWith(".md"));

const entries = files.map(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(content);

  // Extrae metadata y genera la URL
  return {
    archivo: file,
    url: `articulo.html?archivo=articulos/${file}`,
    title: parsed.data.title || file.replace(/-/g, " ").replace(".md", ""),
    date: parsed.data.date || new Date().toISOString().split("T")[0],
    description: parsed.data.description || "",
    category: parsed.data.category || "",
    keywords: parsed.data.keywords || []
  };
});

// Guarda el JSON en el archivo de salida
fs.writeFileSync(outputFile, JSON.stringify(entries, null, 2), "utf-8");

console.log(`Se generó ${outputFile} con ${entries.length} artículos.`);

