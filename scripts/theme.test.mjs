import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const source = await readFile(new URL('../src/scripts/theme.js', import.meta.url), 'utf8');

function browser({ saved = null, dark = false, blocked = false, loaded = false } = {}) {
  const listeners = {};
  const attributes = {};
  const meta = {};
  let controls = loaded;
  let stored = saved;
  let click;
  let ready;
  let systemChange;
  const button = {
    hidden: true,
    setAttribute: (name, value) => { attributes[name] = value; },
    addEventListener: (name, handler) => { if (name === 'click') click = handler; },
  };
  const document = {
    documentElement: { dataset: { theme: 'dark' } },
    readyState: loaded ? 'complete' : 'loading',
    querySelector: selector => ({ setAttribute: (_, value) => { meta[selector] = value; } }),
    querySelectorAll: () => controls ? [button] : [],
    addEventListener: (name, handler) => { if (name === 'DOMContentLoaded') ready = handler; },
  };
  const system = {
    matches: dark,
    addEventListener: (_, handler) => { systemChange = handler; },
  };
  const window = {
    matchMedia: () => system,
    localStorage: {
      getItem: () => { if (blocked) throw new Error('Storage unavailable'); return stored; },
      setItem: (_, value) => { if (blocked) throw new Error('Storage unavailable'); stored = value; },
    },
    addEventListener: (name, handler) => { listeners[name] = handler; },
  };
  runInNewContext(source, { window, document });
  return {
    button, attributes, meta,
    theme: () => document.documentElement.dataset.theme,
    saved: () => stored,
    ready: () => { controls = true; ready?.(); },
    click: () => click(),
    system: value => { system.matches = value; systemChange(); },
    restore: value => { stored = value; listeners.pageshow?.({ persisted: true }); },
    storage: (value, key = 'mvb-theme') => listeners.storage({ key, newValue: value }),
  };
}

test('first visit resolves the system theme synchronously, before controls initialize', () => {
  for (const dark of [true, false]) {
    const page = browser({ dark });
    assert.equal(page.theme(), dark ? 'dark' : 'light');
    assert.equal(page.meta['meta[name="theme-color"]'], dark ? '#181818' : '#f5f4f0');
    assert.equal(page.meta['meta[name="color-scheme"]'], page.theme());
    assert.equal(page.button.hidden, true);
    assert.equal(page.saved(), null);
    page.ready();
    assert.equal(page.button.hidden, false);
    assert.equal(page.attributes['aria-label'], `Switch to ${dark ? 'light' : 'dark'} theme`);
  }
});

test('a saved choice overrides the system before the first paint', () => {
  for (const saved of ['light', 'dark']) {
    const page = browser({ saved, dark: saved === 'light', loaded: true });
    assert.equal(page.theme(), saved);
    assert.equal(page.button.hidden, false);
  }
});

test('toggling updates metadata and labels, and survives a fresh page load', () => {
  const page = browser({ dark: true });
  page.ready();
  page.click();
  assert.equal(page.theme(), 'light');
  assert.equal(page.saved(), 'light');
  assert.equal(page.meta['meta[name="theme-color"]'], '#f5f4f0');
  assert.equal(page.meta['meta[name="color-scheme"]'], 'light');
  assert.equal(page.attributes['aria-label'], 'Switch to dark theme');
  assert.equal(page.attributes.title, page.attributes['aria-label']);
  assert.equal(browser({ saved: page.saved(), dark: true }).theme(), 'light');
  page.click();
  assert.equal(page.theme(), 'dark');
  assert.equal(page.saved(), 'dark');
});

test('system changes follow the system until the visitor makes a choice', () => {
  const page = browser();
  page.ready();
  page.system(true);
  assert.equal(page.theme(), 'dark');
  page.click();
  page.system(true);
  assert.equal(page.theme(), 'light');
});

test('storage events synchronize tabs and cleared preferences return to the system', () => {
  const page = browser({ saved: 'invalid', dark: true, loaded: true });
  assert.equal(page.theme(), 'dark');
  page.storage('light', 'unrelated-key');
  assert.equal(page.theme(), 'dark');
  page.storage('light');
  assert.equal(page.theme(), 'light');
  assert.equal(page.attributes['aria-label'], 'Switch to dark theme');
  page.storage(null);
  assert.equal(page.theme(), 'dark');
  page.storage('light');
  page.storage(null, null);
  assert.equal(page.theme(), 'dark');
});

test('blocked browser storage still permits switching and retains the page choice', () => {
  const page = browser({ blocked: true, loaded: true });
  assert.equal(page.theme(), 'light');
  assert.equal(page.button.hidden, false);
  page.click();
  assert.equal(page.theme(), 'dark');
  page.system(false);
  assert.equal(page.theme(), 'dark');
  page.click();
  assert.equal(page.theme(), 'light');
});

test('a cached page restores the latest saved theme, labels and browser metadata', () => {
  const page = browser({ saved: 'dark', loaded: true });
  page.restore('light');
  assert.equal(page.theme(), 'light');
  assert.equal(page.attributes['aria-label'], 'Switch to dark theme');
  assert.equal(page.meta['meta[name="theme-color"]'], '#f5f4f0');
  assert.equal(page.meta['meta[name="color-scheme"]'], 'light');
});

test('a cleared preference on cache restoration follows the current system theme', () => {
  const page = browser({ saved: 'light', dark: true, loaded: true });
  page.restore(null);
  assert.equal(page.theme(), 'dark');
});

test('cache restoration preserves an in-page choice when storage is blocked', () => {
  const page = browser({ blocked: true, loaded: true });
  page.click();
  page.restore(null);
  assert.equal(page.theme(), 'dark');
});
