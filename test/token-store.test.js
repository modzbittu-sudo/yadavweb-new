const fs = require('node:fs');
const test = require('node:test');
const assert = require('node:assert/strict');

const { parseTokenList, addTokenToList, persistTokenList, readTokenFile } = require('../token-store');
const { resolvePort } = require('../port-config');

test('parseTokenList reads comma and newline separated tokens', () => {
  const tokens = parseTokenList('abc, def\nghi, jkl');
  assert.deepEqual(tokens, ['abc', 'def', 'ghi', 'jkl']);
});

test('addTokenToList prevents duplicates and allows unlimited tokens by default', () => {
  const tokens = ['a', 'b'];
  const result = addTokenToList(tokens, 'b');
  assert.deepEqual(result, ['a', 'b']);

  const next = addTokenToList(tokens, 'c');
  assert.deepEqual(next, ['a', 'b', 'c']);

  const unlimited = addTokenToList(['a', 'b', 'c', 'd', 'e'], 'f');
  assert.deepEqual(unlimited, ['a', 'b', 'c', 'd', 'e', 'f']);

  const limited = addTokenToList(['a', 'b'], 'c', 2);
  assert.deepEqual(limited, ['a', 'b']);
});

test('persistTokenList writes BOT_TOKENS using comma list', () => {
  const filePath = 'test/.env.mock';
  const tokens = ['token1', 'token2'];
  const output = persistTokenList(filePath, tokens);
  assert.equal(output, 'token1,token2');
});

test('readTokenFile accepts newline and comma separated token text files', () => {
  const filePath = 'test/.env.mock';
  fs.writeFileSync(filePath, 'alpha, beta\ngamma\ndelta\n', 'utf8');

  try {
    assert.deepEqual(readTokenFile(filePath), ['alpha', 'beta', 'gamma', 'delta']);
  } finally {
    fs.unlinkSync(filePath);
  }
});

test('resolvePort prefers an explicit PORT but defaults to Render-safe port in production', () => {
  assert.equal(resolvePort({ PORT: '8080', NODE_ENV: 'production' }), 8080);
  assert.equal(resolvePort({ NODE_ENV: 'production' }), 10000);
  assert.equal(resolvePort({}), 3000);
});
