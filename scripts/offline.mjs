import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';

export const chunks = (text, width = 120) => text.match(new RegExp(`.{1,${width}}`, 'g')) || [];
export function safeJson(value) {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}
export function inside(root, relative) {
  if (/^[a-z][a-z\d+.-]*:/i.test(relative) || relative.startsWith('//'))
    throw new Error(`External asset is not permitted: ${relative}`);
  const destination = path.resolve(root, relative);
  if (!destination.startsWith(path.resolve(root) + path.sep))
    throw new Error(`Asset escapes its root: ${relative}`);
  return destination;
}
export async function embedCss(css, directory) {
  const tree = postcss.parse(css);
  const pending = [];
  tree.walkDecls((declaration) => {
    const matches = [...declaration.value.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)];
    if (!matches.length) return;
    pending.push(
      (async () => {
        let value = declaration.value;
        for (const match of matches) {
          const filename = inside(directory, match[1]);
          if (path.extname(filename) !== '.woff2')
            throw new Error(`Unexpected CSS resource: ${match[1]}`);
          const data = (await fs.readFile(filename)).toString('base64');
          // CSS line continuation avoids a hundred-kilobyte source line without changing the URL.
          const url = `url("data:font/woff2;base64,${chunks(data).join('\\\n')}")`;
          value = value.replace(match[0], url);
        }
        declaration.value = value;
      })(),
    );
  });
  await Promise.all(pending);
  return tree.toString().replace(/\/\*# sourceMappingURL=.*?\*\//g, '');
}
export async function imageManifest(directory, paths) {
  const manifest = {};
  for (const relative of paths) {
    const extension = path.extname(relative);
    const mime = { '.png': 'image/png', '.jpg': 'image/jpeg' }[extension];
    if (!mime) throw new Error(`Unsupported image type: ${relative}`);
    const bytes = await fs.readFile(inside(directory, relative));
    manifest[relative] = { mime, chunks: chunks(bytes.toString('base64')) };
  }
  return manifest;
}

export function renderTemplate(template, replacements) {
  for (const [name, value] of Object.entries(replacements)) {
    const marker = `<!-- BUILD:${name} -->`;
    if (template.split(marker).length !== 2) throw new Error(`Expected exactly one ${marker}`);
    template = template.replace(marker, () => value);
  }
  if (/<!-- BUILD:/.test(template)) throw new Error('Unresolved build marker');
  return template;
}

export function validateOffline(html) {
  // Inspect markup separately so examples in JavaScript strings are not treated as live tags.
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, (tag) =>
    tag.slice(0, tag.indexOf('>') + 1),
  );
  for (const tag of markup.matchAll(
    /<(?:script|link|img|source|video|audio|iframe|object|embed|input)\b[^>]*>/gi,
  )) {
    for (const attr of tag[0].matchAll(
      /\b(?:src|href|poster|data|srcset)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
    )) {
      const value = attr[1] ?? attr[2] ?? attr[3];
      if (value && !/^(?:data:|#)/i.test(value))
        throw new Error(`Offline HTML dependency: ${value}`);
      if (/^srcset/i.test(attr[0])) throw new Error('Offline srcset must be embedded explicitly');
    }
  }
  for (const style of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    const tree = postcss.parse(style[1]);
    tree.walkAtRules('import', () => {
      throw new Error('Offline CSS contains an import');
    });
    tree.walkDecls((decl) => {
      for (const url of decl.value.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
        if (!/^(?:data:|#)/i.test(url[1])) throw new Error(`Offline CSS dependency: ${url[1]}`);
      }
    });
  }
}
