import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join, relative, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const origin = 'https://marcosverdejobosch.github.io';
const routes = ['/', '/projects/', '/projects/linear-regulator/', '/about/', '/404.html'];
const documents = new Map();
let links = 0;
let fragments = 0;

const attributes = (html, name) => [...html.matchAll(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'g'))].map(match => match[1] ?? match[2] ?? match[3]);
const fileFor = async pathname => {
  const candidate = resolve(dist, `.${decodeURIComponent(pathname)}`);
  const rel = relative(dist, candidate);
  assert(!rel.startsWith(`..${sep}`) && rel !== '..', `Path outside build: ${pathname}`);
  const info = await stat(candidate);
  return info.isDirectory() ? join(candidate, 'index.html') : candidate;
};

for (const route of routes) {
  const file = await fileFor(route);
  const html = await readFile(file, 'utf8');
  documents.set(route, html);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `Expected one h1: ${route}`);
  assert.match(html, /<html[^>]*\blang="en"/, `Wrong document language: ${route}`);
  assert.match(html, /name="description" content="[^"]+"/, `Missing description: ${route}`);
  assert.match(html, /rel="canonical"/, `Missing canonical URL: ${route}`);
  assert.match(html, /property="og:image:alt" content="[^"]+"/, `Missing social image description: ${route}`);
  assert.equal((html.match(/<main(?:\s|>)/g) ?? []).length, 1, `Expected one main landmark: ${route}`);
  const ids = attributes(html, 'id');
  assert.equal(new Set(ids).size, ids.length, `Duplicate element IDs: ${route}`);
  assert(!html.includes('IoT Sensor Node'), `Draft exposed: ${route}`);
  assert(!html.includes('unpkg.com') && !html.includes('fonts.googleapis.com'), `Runtime CDN dependency: ${route}`);
  assert.equal((html.match(/\bdata-theme-toggle(?:\s|>)/g) ?? []).length, 1, `Expected one theme control: ${route}`);
  const themeBootstrap = html.indexOf("const storageKey = 'mvb-theme'");
  assert(themeBootstrap > 0 && themeBootstrap < html.indexOf('<body'), `Theme must resolve before the body is rendered: ${route}`);

  const linkTags = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]);
  const fontPreloads = linkTags.filter(tag => attributes(tag, 'as')[0] === 'font');
  assert.equal(fontPreloads.length, 1, `Expected only the primary font preload: ${route}`);
  const font = fontPreloads[0];
  assert.equal(attributes(font, 'type')[0], 'font/woff2', `Preload must use WOFF2: ${route}`);
  assert.equal(attributes(font, 'crossorigin')[0], 'anonymous', `Font preload CORS mismatch: ${route}`);
  const fontName = new URL(attributes(font, 'href')[0], origin).pathname.split('/').at(-1);
  const stylesheets = linkTags.filter(tag => attributes(tag, 'rel')[0] === 'stylesheet');
  const css = (await Promise.all(stylesheets.map(async tag => readFile(await fileFor(new URL(attributes(tag, 'href')[0], origin).pathname), 'utf8')))).join('\n');
  assert(css.includes(fontName), `Preloaded font must match the stylesheet: ${route}`);

  const mainNavigation = html.match(/<nav\b[^>]*aria-label="Main navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  if (mainNavigation) {
    const currentPages = [...mainNavigation.matchAll(/<a\b[^>]*>/g)].map(match => match[0]).filter(tag => attributes(tag, 'aria-current')[0] === 'page');
    for (const tag of currentPages) assert.equal(attributes(tag, 'href')[0], route, `Current-page link points to another page: ${route}`);
    assert.equal(currentPages.length, ['/about/', '/projects/'].includes(route) ? 1 : 0, `Incorrect current-page state: ${route}`);
  }

  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    assert(attributes(image[0], 'alt').length === 1, `Missing image alternative: ${route}`);
    assert(attributes(image[0], 'width').length === 1 && attributes(image[0], 'height').length === 1, `Missing image dimensions: ${route}`);
  }

  const candidates = attributes(html, 'srcset').flatMap(value => value.split(',').map(candidate => candidate.trim().split(/\s+/)[0]));
  const references = [...attributes(html, 'href'), ...attributes(html, 'src'), ...attributes(html, 'data-src'), ...candidates];
  for (const value of references) {
    if (/^(mailto:|tel:|data:|javascript:)/i.test(value)) continue;
    const url = new URL(value.replaceAll('&amp;', '&'), `${origin}${route}`);
    if (url.origin !== origin) continue;
    const target = await fileFor(url.pathname);
    links += 1;
    if (url.hash && target.endsWith('.html')) {
      const targetHtml = await readFile(target, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      assert(attributes(targetHtml, 'id').includes(id), `Broken fragment ${value} on ${route}`);
      fragments += 1;
    }
  }
}

const home = documents.get('/');
assert(!home.includes('data-model-viewer') && !home.includes('/models/'), 'Home page must not load the 3D model');
const report = documents.get('/projects/linear-regulator/');
assert.match(report, /data-load-model/, 'Missing explicit viewer activation');
assert(!/<model-viewer[\s>]/.test(report), '3D viewer must be created only after activation');
assert.match(report, /not yet documented/, 'Design status must remain clear');
const poster = [...report.matchAll(/<img\b[^>]*>/g)].map(match => match[0]).find(tag => attributes(tag, 'class')[0]?.split(' ').includes('model-poster'));
assert(poster, 'Missing static PCB poster');
assert.match(attributes(poster, 'srcset')[0] ?? '', /320w/, 'Poster must include a mobile image candidate');
assert(attributes(poster, 'sizes').length === 1, 'Poster must declare its rendered size');
assert.match(report, /class="model-launch"[^>]*\bhidden/, '3D activation must stay hidden without JavaScript');

for (const legacy of ['Gemfile', '_config.yml', 'index.md', 'regulador.glb']) {
  await assert.rejects(stat(join(dist, legacy)), `Legacy source leaked into build: ${legacy}`);
}
await assert.rejects(stat(join(dist, 'projects/iot-sensor-node/index.html')), 'Draft project route must not be generated');

const hash = async file => createHash('sha256').update(await readFile(file)).digest('hex');
assert.equal(await hash(join(root, 'assets/img/projects/linear-regulator/regulador.min.glb')), await hash(join(dist, 'models/linear-regulator.glb')), 'Published model differs from the original');
assert.equal(await hash(join(root, 'assets/img/projects/linear-regulator/Regulador-3d.png')), 'afe858b75d9ff9ef918cb147252fe25eb46034b4b770c1a9d00fbbffa08f0bb5', 'Original PCB image changed');

const socialTag = home.match(/<meta[^>]*property="og:image"[^>]*>/)?.[0];
assert(socialTag, 'Missing social image');
const socialUrl = new URL(attributes(socialTag, 'content')[0]);
const social = await readFile(await fileFor(socialUrl.pathname));
assert.equal(social.subarray(1, 4).toString(), 'PNG', 'Social image must be a raster PNG');
assert.equal(social.readUInt32BE(16), 1200, 'Incorrect social image width');
assert.equal(social.readUInt32BE(20), 630, 'Incorrect social image height');

const luminance = hex => {
  assert.match(hex ?? '', /^#[\da-f]{6}$/i, 'Contrast checks require an explicit six-digit color');
  const rgb = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)];
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
};
const styleSource = await readFile(join(root, 'src/styles/global.css'), 'utf8');
let colorPairs = 0;
for (const theme of ['dark', 'light']) {
  const palette = styleSource.match(new RegExp(':root\\[data-theme=[\'"]' + theme + '[\'"]\\]\\s*\\{([^}]+)\\}'))?.[1];
  assert(palette, 'Missing theme palette: ' + theme);
  const colors = new Map([...palette.matchAll(/--([\w-]+):\s*(#[\da-f]{6})/gi)].map(([, name, value]) => [name, value]));
  for (const foreground of ['foreground', 'muted', 'accent-text']) {
    for (const background of ['background', 'surface', 'media-background']) {
      const ratio = contrast(colors.get(foreground), colors.get(background));
      assert(ratio >= 4.5, 'Insufficient text contrast in ' + theme + ': ' + foreground + ' on ' + background + ' (' + ratio.toFixed(2) + ':1)');
      colorPairs += 1;
    }
  }
  assert(contrast(colors.get('foreground'), colors.get('selection')) >= 4.5, 'Insufficient selection contrast: ' + theme);
  colorPairs += 1;
}
console.log('Verified ' + colorPairs + ' text color pairs across both themes.');

console.log(`Verified ${routes.length} routes, ${links} local references, and ${fragments} fragments.`);
console.log('Draft exclusion, image alternatives, social card, source preservation, and on-demand 3D checks passed.');
