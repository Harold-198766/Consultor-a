const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articulosDir = path.join(__dirname, '../dist/articulos');
const outputFile = path.join(articulosDir, 'index.json');

const archivos = fs.readdirSync(articulosDir).filter(f => f.endsWith('.md'));

const entries = archivos.map(filename => {
  const filepath = path.join(articulosDir, filename);
  const content = fs.readFileSync(filepath, 'utf-8');
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

fs.writeFileSync(outputFile, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`✅ Se generó ${outputFile} con ${entries.length} artículos.`);


