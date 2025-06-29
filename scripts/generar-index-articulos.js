const fs = require('fs');
const path = require('path');

// Carpeta donde están los artículos
const articulosDir = path.join(__dirname, '../articulos');

// Lee todos los archivos .md de la carpeta
const archivos = fs.readdirSync(articulosDir).filter(archivo => archivo.endsWith('.md'));

const index = archivos.map(archivo => {
  const filePath = path.join(articulosDir, archivo);
  const contenido = fs.readFileSync(filePath, 'utf8');

  // Extrae el frontmatter
  const frontmatterMatch = contenido.match(/^---\s*([\s\S]*?)\s*---/);
  let title = archivo.replace(/\.md$/, '');
  let date = '';
  if (frontmatterMatch) {
    const lines = frontmatterMatch[1].split('\n');
    lines.forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length > 0) {
        const value = rest.join(':').trim().replace(/^['"]|['"]$/g, "");
        if (key.trim() === 'title') title = value;
        if (key.trim() === 'date') date = value.split('T')[0];
      }
    });
  }

  return {
    archivo,
    url: `articulo.html?archivo=articulos/${archivo}`,
    title,
    date
  };
});

// Ordena por fecha descendente
index.sort((a, b) => new Date(b.date) - new Date(a.date));

// Escribe el archivo index.json
fs.writeFileSync(path.join(articulosDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8');

console.log('✅ index.json generado correctamente con', index.length, 'artículos.');