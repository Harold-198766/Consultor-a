const fs = require('fs');
const path = require('path');
require('esbuild').build({
  entryPoints: ['scripts/main.js'],
  bundle: true,
  minify: true,
  treeShaking: true,
  outfile: 'dist/main.min.js',
  target: ['es2020'],
}).catch(() => process.exit(1));

// ✅ NUEVA TAREA: Copiar index.html de la raíz a dist/
const sourceFile = path.join(__dirname, 'index.html');
const destFile = path.join(__dirname, 'dist/index.html');

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destFile);
  console.log('✅ index.html copiado a dist/');
} else {
  console.warn('⚠️  No se encontró index.html en la raíz del proyecto');
}
