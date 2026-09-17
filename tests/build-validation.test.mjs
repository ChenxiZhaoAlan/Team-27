import test from 'node:test';
import assert from 'node:assert/strict';
import { renderTemplate, validateOffline } from '../scripts/offline.mjs';

test('build markers reject missing, repeated and unknown insertion points', () => {
  assert.equal(renderTemplate('<!-- BUILD:X -->', { X: '$&' }), '$&');
  assert.throws(() => renderTemplate('', { X: '' }));
  assert.throws(() => renderTemplate('<!-- BUILD:X --><!-- BUILD:X -->', { X: '' }));
  assert.throws(() => renderTemplate('<!-- BUILD:Y -->', {}));
});
test('offline validation rejects file dependencies across HTML and CSS', () => {
  for (const markup of [
    '<img src="missing.png">',
    '<script src="app.js"></script>',
    '<link href="styles.css">',
    '<video poster="poster.jpg"></video>',
    '<source srcset="one.png 1x, two.png 2x">',
    '<style>@import "other.css";</style>',
    '<style>.a { background: url(other.jpg) }</style>',
  ])
    assert.throws(() => validateOffline(markup), markup);
  assert.doesNotThrow(() =>
    validateOffline(
      '<img src="data:image/png;base64,aaa"><style>.a{background:url(data:image/png;base64,aaa)}</style>',
    ),
  );
});
