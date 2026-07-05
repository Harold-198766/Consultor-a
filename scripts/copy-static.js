const fs = require('fs');
const path = require('path');

['images', 'documentos'].forEach(folder => {
  const src = path.join(__dirname, '..', folder);
  const dest = path.join(__dirname, '..', 'dist', folder);
  if (fs.existsSync(src)) {
    copyFolder(src, dest);
  }
});

function copyFolder(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}
console.log('Archivos estáticos copiados a dist.');
