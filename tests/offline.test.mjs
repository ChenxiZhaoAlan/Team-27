import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { chunks, safeJson, inside, embedCss, imageManifest } from '../scripts/offline.mjs';

test('asset JSON cannot end its inert script block', () => {
  const json = safeJson({ caption: '</script><script>alert(1)</script>' });
  assert.ok(!json.includes('</script>'));
  assert.equal(JSON.parse(json).caption, '</script><script>alert(1)</script>');
});
test('large binary data has bounded lines and exact reconstruction', () => {
  const data = Buffer.from(Array.from({ length: 8192 }, (_, index) => index % 256));
  const segments = chunks(data.toString('base64'));
  assert.ok(segments.every((part) => part.length <= 120));
  assert.deepEqual(Buffer.from(segments.join(''), 'base64'), data);
});
test('offline assets reject remote URLs and directory escapes', () => {
  for (const name of ['../secret.txt', 'https://example.com/font.woff2', '//example.com/a'])
    assert.throws(() => inside('/project/dist', name));
  assert.equal(inside('/project/dist', 'assets/x.png'), '/project/dist/assets/x.png');
});
test('font embedding preserves bytes and fails on a missing file', async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), 'team27-test-'));
  try {
    const binary = Buffer.from('test-font-bytes');
    await fs.writeFile(path.join(folder, 'font.woff2'), binary);
    const css = await embedCss('@font-face{src:url("font.woff2")}', folder);
    const encoded = css.match(/base64,([^"\)]+)/)[1].replace(/\\\n/g, '');
    assert.deepEqual(Buffer.from(encoded, 'base64'), binary);
    await assert.rejects(() => embedCss('@font-face{src:url(missing.woff2)}', folder));
    await assert.rejects(() => imageManifest(folder, ['missing.png']));
  } finally {
    await fs.rm(folder, { recursive: true, force: true });
  }
});
