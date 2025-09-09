const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Crear carpeta dist si no existe
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

esbuild.build({
  entryPoints: ['scripts/main.js'], // ruta de tu main.js
  bundle: true,
  minify: true,
  treeShaking: true,
  outfile: path.join(distDir, 'main.min.js'),
  target: ['es2020'],
}).catch(() => process.exit(1));

// Opcional: copiar index.html a dist
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));
