const fs = require('fs');
const path = require('path');

['index.html', 'articulo.html'].forEach(file => {
  fs.copyFileSync(path.join(__dirname, '..', file), path.join(__dirname, '..', 'dist', file));
});
console.log('HTML copiado a dist.');
