require('esbuild').build({
  entryPoints: ['scripts/main.js'],
  "build:html": "cp index.html dist/index.html"
  "build": "npm run build:css && npm run build:js && npm run build:html"
  bundle: true,
  minify: true,
  treeShaking: true,
  outfile: 'dist/main.min.js',
  target: ['es2020'],
}).catch(() => process.exit(1));
