const fs = require('fs');
const path = require('path');

const articulosDir = path.join(__dirname, '../dist/articulos');
const outputFile = path.join(articulosDir, 'index.json');

const archivos = fs.readdirSync(articulosDir).filter(f => f.endsWith('.md'));

const entries = archivos.map(filename => {
  const filepath = path.join(articulosDir, filename);
  const content = fs.readFileSync(filepath, 'utf-8');

  // Extraer metadatos YAML al inicio
  const match = content.match(/---([\s\S]*?)---/);
  let meta = {};
  if (match) {
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (!key) return;
      meta[key.trim()] = rest.join(':').trim();
    });
  }

  return {
    archivo: filename,
    url: `articulo.html?archivo=${filename}`,
    title: meta.title || filename.replace(/-/g, ' ').replace('.md', ''),
    date: meta.date || new Date().toISOString(),
    description: meta.description || '',
    category: meta.category || 'General',
    keywords: meta.keywords ? meta.keywords.split(',').map(k => k.trim()) : []
  };
});

fs.writeFileSync(outputFile, JSON.stringify(entries, null, 2), 'utf-8');
console.log(`Se generó ${outputFile} con ${entries.length} artículos.`);


