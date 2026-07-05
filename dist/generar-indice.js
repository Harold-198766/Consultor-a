const fs = require('fs');
const path = require('path');

// Función para leer el frontmatter de un archivo markdown
function extraerFrontmatter(contenido) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = contenido.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Limpiar comillas
      value = value.replace(/^["']|["']$/g, '');
      
      // Convertir arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // Si falla el parsing, mantener como string
        }
      }
      
      frontmatter[key] = value;
    }
  });
  
  return frontmatter;
}

// Función para generar slug desde el nombre del archivo
function generarSlug(nombreArchivo) {
  return nombreArchivo
    .replace('.md', '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Función principal
function generarIndice() {
  const carpetaArticulos = './articulos';
  const archivoIndice = './index.json';
  
  console.log('🚀 Generando índice automático...');
  
  // Leer archivos de la carpeta articulos
  const archivos = fs.readdirSync(carpetaArticulos)
    .filter(archivo => archivo.endsWith('.md'))
    .filter(archivo => archivo !== 'index.json'); // Excluir el índice
  
  console.log(`📁 Encontrados ${archivos.length} archivos markdown`);
  
  const articulos = [];
  
  archivos.forEach(archivo => {
    try {
      console.log(`📄 Procesando: ${archivo}`);
      
      const rutaCompleta = path.join(carpetaArticulos, archivo);
      const contenido = fs.readFileSync(rutaCompleta, 'utf-8');
      
      // Extraer frontmatter
      const frontmatter = extraerFrontmatter(contenido);
      
      // Generar slug automático si no existe
      const slug = frontmatter.slug || generarSlug(archivo);
      
      // Extraer descripción del contenido si no está en frontmatter
      let descripcion = frontmatter.description || frontmatter.descripcion;
      if (!descripcion) {
        // Buscar primer párrafo del contenido
        const contenidoSinFrontmatter = contenido.replace(/^---[\s\S]*?---/, '').trim();
        const primerParrafo = contenidoSinFrontmatter
          .split('\n')
          .find(linea => linea.trim() && !linea.startsWith('#'));
        descripcion = primerParrafo ? primerParrafo.substring(0, 200) + '...' : 'Sin descripción disponible';
      }
      
      // Crear entrada del artículo
      const articulo = {
        archivo: archivo,
        url: `articulo.html?archivo=${archivo}`, // URL de respaldo
        title: frontmatter.title || frontmatter.titulo || archivo.replace('.md', ''),
        date: frontmatter.date || frontmatter.fecha || new Date().toISOString().split('T')[0],
        description: descripcion,
        category: frontmatter.category || frontmatter.categoria || 'General',
        keywords: frontmatter.keywords || frontmatter.palabrasClave || [],
        slug: slug
      };
      
      articulos.push(articulo);
      console.log(`✅ ${articulo.title} → slug: ${slug}`);
      
    } catch (error) {
      console.error(`❌ Error procesando ${archivo}:`, error.message);
    }
  });
  
  // Ordenar por fecha (más recientes primero)
  articulos.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Escribir archivo índice
  fs.writeFileSync(archivoIndice, JSON.stringify(articulos, null, 2));
  
  console.log(`🎉 Índice generado exitosamente: ${articulos.length} artículos`);
  console.log(`📝 Archivo guardado en: ${archivoIndice}`);
  
  return articulos;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  generarIndice();
}

module.exports = { generarIndice };