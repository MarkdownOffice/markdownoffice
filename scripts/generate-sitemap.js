import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.SITE_URL || 'https://markdownoffice.com';
const OUTPUT_DIR = path.join(__dirname, '../out');
const SITEMAP_PATH = path.join(OUTPUT_DIR, 'sitemap.xml');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file === 'index.html' || file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function generateSitemap() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.error('Output directory does not exist. Run `npm run build` first.');
    process.exit(1);
  }

  const htmlFiles = getAllHtmlFiles(OUTPUT_DIR);
  const urls = htmlFiles.map(file => {
    let relativePath = path.relative(OUTPUT_DIR, file);
    
    // Convert to URL path
    if (relativePath === 'index.html') {
      relativePath = '';
    } else if (relativePath.endsWith('/index.html')) {
      relativePath = relativePath.replace('/index.html', '');
    } else if (relativePath.endsWith('.html')) {
      relativePath = relativePath.replace('.html', '');
    }

    // Get file modification time
    const stats = fs.statSync(file);
    const lastmod = stats.mtime.toISOString();

    return {
      loc: `${SITE_URL}/${relativePath}`,
      lastmod,
      changefreq: 'weekly',
      priority: relativePath === '' ? '1.0' : '0.8'
    };
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, xml);
  console.log(`✅ Sitemap generated successfully at ${SITEMAP_PATH}`);
  console.log(`📄 Total URLs: ${urls.length}`);
}

generateSitemap();
