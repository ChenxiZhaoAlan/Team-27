import { imagePathsByName } from '../data/assets.js';
// Development uses real files. The offline build supplies an inert resource manifest.
const embedded = document.getElementById('embedded-assets');
const resources = embedded ? JSON.parse(embedded.textContent) : {};
const cache = new Map();
export function assetUrl(path) {
  if (!resources[path]) {
    if (embedded) throw new Error(`Missing offline asset: ${path}`);
    return path;
  }
  if (!cache.has(path)) {
    const { mime, chunks } = resources[path];
    cache.set(path, `data:${mime};base64,${chunks.join('')}`);
  }
  return cache.get(path);
}
export const photos = Object.freeze(
  Object.fromEntries(
    Object.entries(imagePathsByName).map(([name, path]) => [name, assetUrl(path)]),
  ),
);
