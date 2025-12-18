/**
 * Theme Switcher
 * Handles theme switching and localStorage persistence
 */

(function() {
  'use strict';

  const THEME_STORAGE_KEY = 'mywebclass-theme';
  const DEFAULT_THEME = 'calm';
  const THEMES = ['onyx', 'paper', 'neon', 'brutal', 'calm'];

  /**
   * Initialize theme from localStorage or default
   */
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = savedTheme && THEMES.includes(savedTheme) ? savedTheme : DEFAULT_THEME;
    setTheme(theme);
    return theme;
  }

  /**
   * Set theme on document
   */
  function setTheme(theme) {
    if (!THEMES.includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Using default.`);
      theme = DEFAULT_THEME;
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update select element if it exists
    const select = document.querySelector('.theme-switcher select');
    if (select) {
      select.value = theme;
    }

    // Dispatch custom event for analytics
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  /**
   * Handle theme switcher change
   */
  function handleThemeChange(event) {
    const newTheme = event.target.value;
    setTheme(newTheme);
  }

  /**
   * Initialize theme switcher
   */
  function initThemeSwitcher() {
    const select = document.querySelector('.theme-switcher select');
    if (select) {
      const currentTheme = initTheme();
      select.value = currentTheme;
      select.addEventListener('change', handleThemeChange);
    } else {
      // If no select found, still initialize theme
      initTheme();
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
  } else {
    initThemeSwitcher();
  }

  // Export for external use
  window.ThemeSwitcher = {
    setTheme,
    getCurrentTheme: () => document.documentElement.getAttribute('data-theme') || DEFAULT_THEME,
    getThemes: () => [...THEMES]
  };
})();

