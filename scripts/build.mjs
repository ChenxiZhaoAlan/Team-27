import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, transform } from 'esbuild';
import { embedCss, imageManifest, safeJson, renderTemplate, validateOffline } from './offline.mjs';
import { imagePathsByName } from '../src/data/assets.js';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const imagePaths = Object.values(imagePathsByName);
export async function buildSite() {
  const dist = path.join(root, 'dist');
  const releases = path.join(root, 'releases');
  // Only generated directories are replaced. Neither build step writes into src/assets/vendor.
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });
  await fs.mkdir(releases, { recursive: true });
  const common = {
    absWorkingDir: root,
    bundle: true,
    minify: false,
    sourcemap: 'external',
    legalComments: 'inline',
    target: ['chrome110', 'safari16'],
  };
  await build({ ...common, entryPoints: ['src/main.js'], format: 'iife', outfile: 'dist/app.js' });
  await build({
    ...common,
    entryPoints: ['src/styles/index.css'],
    outfile: 'dist/styles.css',
    loader: { '.woff2': 'file' },
    assetNames: 'assets/fonts/[name]-[hash]',
  });
  await fs.cp(path.join(root, 'assets/images'), path.join(dist, 'assets/images'), {
    recursive: true,
  });
  await fs.cp(path.join(root, 'vendor'), path.join(dist, 'vendor'), { recursive: true });
  const template = await fs.readFile(path.join(root, 'src/index.html'), 'utf8');
  const scriptTags =
    '<script defer src="vendor/gsap.min.js"></script>\n<script defer src="vendor/ScrollTrigger.min.js"></script>\n<script defer src="app.js"></script>';
  await fs.writeFile(
    path.join(dist, 'index.html'),
    renderTemplate(template, {
      STYLES: '<link rel="stylesheet" href="styles.css">',
      SCRIPTS: scriptTags,
    }),
  );
  const css = await embedCss(await fs.readFile(path.join(dist, 'styles.css'), 'utf8'), dist);
  const manifest = await imageManifest(dist, imagePaths);
  const vendor = [];
  for (const file of ['gsap.min.js', 'ScrollTrigger.min.js']) {
    const original = await fs.readFile(path.join(root, 'vendor', file), 'utf8');
    const formatted = await transform(original, { minify: false, legalComments: 'inline' });
    vendor.push(formatted.code);
  }
  const app = await fs.readFile(path.join(dist, 'app.js'), 'utf8');
  const script = vendor.join('\n') + '\n' + app.replace(/\/\/# sourceMappingURL=.*/g, '');
  const offline = renderTemplate(template, {
    STYLES: `<style>\n${css}\n</style>`,
    SCRIPTS: `<!-- Generated offline demo. Edit the source package, not this file. -->\n<script id="embedded-assets" type="application/json">\n${safeJson(manifest)}\n</script>\n<script>\n${script.replace(/<\/script/gi, '<\\/script')}\n</script>`,
  });
  validateOffline(offline);
  const output = path.join(releases, 'TEAM27-v3-Offline.html');
  await fs.writeFile(output, offline);
  await fs.writeFile(path.join(dist, 'offline-preview.html'), offline);
  return { output, bytes: Buffer.byteLength(offline), sourceImages: imagePaths.length };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  console.log(JSON.stringify(await buildSite()));
