const fs = require('fs');
const path = require('path');

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

copyFolder(path.join(__dirname, '..', 'articulos'), path.join(__dirname, '..', 'dist', 'articulos'));
console.log('Artículos copiados a dist.');
