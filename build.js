const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(dist, relativePath);
  if (!fs.existsSync(source)) throw new Error(`Falta el archivo requerido: ${relativePath}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDir(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(dist, relativePath);
  if (!fs.existsSync(source)) return;
  fs.cpSync(source, target, { recursive: true, force: true });
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function inlineMarkdown(value) {
  let text = escapeHtml(value);
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
  return text;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const output = [];
  let paragraph = [];
  let listType = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push(`<p>${inlineMarkdown(paragraph.join(' ').trim())}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listType) return;
    output.push(`</${listType}>`);
    listType = null;
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(line)) {
      flushParagraph();
      closeList();
      output.push('<hr>');
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const desired = unordered ? 'ul' : 'ol';
      if (listType !== desired) {
        closeList();
        output.push(`<${desired}>`);
        listType = desired;
      }
      output.push(`<li>${inlineMarkdown((unordered || ordered)[1])}</li>`);
      continue;
    }

    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      closeList();
      output.push(`<blockquote><p>${inlineMarkdown(quote[1])}</p></blockquote>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return output.join('\n');
}

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (!match) return { attributes: {}, body: content };
  const attributes = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('-')) continue;
    const separator = line.indexOf(':');
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    attributes[key] = value;
  }
  return { attributes, body: content.slice(match[0].length) };
}

function articleTemplate({ title, description, date, author, html }) {
  const meta = [author, date].filter(Boolean).map(escapeHtml).join(' · ');
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(description || title)}">
  <meta name="robots" content="index, follow">
  <title>${escapeHtml(title)} | Biblioteca Jurídica</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    :root{--ink:#13263d;--gold:#b08d49;--ivory:#f4f0e8;--paper:#fffdf9;--text:#27313a;--muted:#66717d;}
    *{box-sizing:border-box} body{margin:0;background:linear-gradient(180deg,#fffdfa,#f4f0e8);color:var(--text);font-family:Inter,sans-serif;line-height:1.75}
    header{background:var(--ink);border-bottom:1px solid rgba(255,255,255,.12)} nav{max-width:980px;margin:auto;padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem}
    nav a{color:white;text-decoration:none}.brand{font-family:'Playfair Display',serif;font-weight:600}.back{color:#e1c481;font-size:.92rem}
    main{max-width:900px;margin:clamp(2rem,7vw,5rem) auto;padding:0 1.25rem 5rem}article{background:var(--paper);border-top:4px solid var(--gold);box-shadow:0 18px 50px rgba(15,23,42,.10);padding:clamp(1.5rem,5vw,4.5rem)}
    h1,h2,h3{color:var(--ink);font-family:'Playfair Display',serif;line-height:1.25}h1{font-size:clamp(2rem,5vw,3.4rem);margin:.3rem 0 1rem}h2{margin-top:2.2rem}h3{margin-top:1.7rem}
    .eyebrow{color:var(--gold);font-size:.78rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.meta{color:var(--muted);font-size:.92rem;border-bottom:1px solid #ded8cd;padding-bottom:1.3rem;margin-bottom:2rem}
    p,li{max-width:74ch}a{color:#795a24}blockquote{border-left:3px solid var(--gold);margin:1.5rem 0;padding:.4rem 0 .4rem 1.2rem;color:var(--muted)}hr{border:0;border-top:1px solid #ded8cd;margin:2rem 0}
    .notice{border-top:1px solid #ded8cd;color:var(--muted);font-size:.88rem;margin-top:3rem;padding-top:1.2rem}
    @media(max-width:640px){nav{align-items:flex-start;flex-direction:column}.back{padding-top:.2rem}}
  </style>
</head>
<body>
<header><nav><a class="brand" href="../index.html">Barillas, Colindres &amp; Asociados</a><a class="back" href="../index.html#blog">Volver a la Biblioteca</a></nav></header>
<main><article><p class="eyebrow">Biblioteca Jurídica</p><h1>${escapeHtml(title)}</h1>${meta ? `<p class="meta">${meta}</p>` : ''}${html}<p class="notice">Contenido de carácter general. No sustituye el análisis jurídico de un caso concreto.</p></article></main>
</body></html>`;
}

function generateArticles(entries) {
  const outputDir = path.join(dist, 'articulos');
  fs.mkdirSync(outputDir, { recursive: true });
  for (const entry of entries.filter(item => item.type === 'articulo')) {
    const sourceName = path.basename(entry.source || '');
    if (!sourceName.endsWith('.md')) throw new Error(`Fuente de artículo inválida: ${entry.source || '(vacía)'}`);
    const sourcePath = path.join(root, 'articulos', sourceName);
    if (!fs.existsSync(sourcePath)) throw new Error(`No existe la fuente del artículo: ${sourceName}`);
    const raw = fs.readFileSync(sourcePath, 'utf8').replace(/^\uFEFF/, '');
    const { attributes, body } = parseFrontmatter(raw);
    const title = entry.title || attributes.title || sourceName.replace(/\.md$/i, '');
    const html = markdownToHtml(body);
    const outputName = `${sourceName.replace(/\.md$/i, '')}.html`;
    fs.writeFileSync(path.join(outputDir, outputName), articleTemplate({
      title,
      description: entry.description,
      date: entry.date || attributes.date,
      author: entry.author || attributes.author,
      html
    }), 'utf8');
  }
}

function validatePublicFiles(entries) {
  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') throw new Error('Existe una entrada inválida en biblioteca/index.json.');
    if (!entry.title || !entry.type) throw new Error('Cada publicación debe incluir title y type.');
    if (entry.type === 'documento' && entry.file) {
      const normalized = path.posix.normalize(entry.file);
      if (!normalized.startsWith('biblioteca/documentos/')) {
        throw new Error(`Documento fuera de la carpeta pública autorizada: ${entry.file}`);
      }
      const local = path.join(root, ...normalized.split('/'));
      if (!fs.existsSync(local)) throw new Error(`No existe el documento público: ${entry.file}`);
    }
  }
}

function run() {
  cleanDir(dist);
  const indexPath = path.join(root, 'biblioteca/index.json');
  const entries = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  if (!Array.isArray(entries)) throw new Error('biblioteca/index.json debe contener un arreglo.');
  validatePublicFiles(entries);

  copyFile('index.html');
  copyFile('gracias.html');
  copyFile('sitemap.xml');
  copyFile('robots.txt');
  copyDir('images');
  copyDir('biblioteca');
  generateArticles(entries);

  console.log(`Construcción completada: ${entries.length} publicaciones registradas.`);
  console.log('Los documentos privados o heredados no se publicaron.');
}

try {
  run();
} catch (error) {
  console.error('Error de construcción:', error.message);
  process.exit(1);
}
