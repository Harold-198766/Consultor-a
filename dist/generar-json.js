const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articulosDir = path.join(__dirname, '../articulos');
const outputFile = path.join(articulosDir, 'index.json');

const archivos = fs.readdirSync(articulosDir).filter(f => f.endsWith('.md'));

const index = archivos.map(filename => {
  const filepath = path.join(articulosDir, filename);
  const content = fs.readFileSync(filepath, 'utf8');
  const { data } = matter(content);

  return {
    archivo: filename,
    url: `articulo.html?archivo=${filename}`,
    title: data.title || filename.replace(/-/g, ' ').replace('.md', ''),
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    category: data.category || 'General',
    keywords: Array.isArray(data.keywords) ? data.keywords : []
  };
});

// Ordenar por fecha descendente
index.sort((a, b) => new Date(b.date) - new Date(a.date));

// Guardar el archivo index.json
fs.writeFileSync(outputFile, JSON.stringify(index, null, 2), 'utf8');
console.log(`✅ index.json generado correctamente con ${index.length} artículos.`);
