(() => {
  const storageKey = 'mvb-theme';
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const isTheme = value => value === 'light' || value === 'dark';
  let preference = null;

  const readPreference = () => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      preference = isTheme(saved) ? saved : null;
    } catch {
      // Preserve the in-page choice when browser storage is unavailable.
    }
  };
  readPreference();

  const preferredTheme = () => preference ?? (systemTheme.matches ? 'dark' : 'light');
  const syncControls = theme => {
    const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
    for (const button of document.querySelectorAll('[data-theme-toggle]')) {
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    }
  };
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#181818' : '#f5f4f0');
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', theme);
    syncControls(theme);
  };

  // This script runs in the head, before the page can paint the wrong theme.
  applyTheme(preferredTheme());

  const initializeControls = () => {
    syncControls(document.documentElement.dataset.theme);
    for (const button of document.querySelectorAll('[data-theme-toggle]')) {
      button.addEventListener('click', () => {
        preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        try {
          window.localStorage.setItem(storageKey, preference);
        } catch {
          // Keep the selection for this page even if it cannot be persisted.
        }
        applyTheme(preference);
      });
      button.hidden = false;
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeControls, { once: true });
  } else {
    initializeControls();
  }

  systemTheme.addEventListener('change', () => {
    if (preference === null) applyTheme(preferredTheme());
  });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = isTheme(event.newValue) ? event.newValue : null;
    applyTheme(preferredTheme());
  });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    readPreference();
    applyTheme(preferredTheme());
  });
})();
