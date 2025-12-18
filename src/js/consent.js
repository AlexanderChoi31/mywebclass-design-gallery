/**
 * GDPR Cookie Consent Manager
 * Blocks analytics until user consent
 */

(function() {
  'use strict';

  const CONSENT_STORAGE_KEY = 'mywebclass-consent';
  const CONSENT_VERSION = '1.0';

  /**
   * Check if user has given consent
   */
  function hasConsent() {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consent) return false;
    
    try {
      const data = JSON.parse(consent);
      return data.version === CONSENT_VERSION && data.analytics === true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Save consent
   */
  function saveConsent(analytics) {
    const consent = {
      version: CONSENT_VERSION,
      analytics: analytics === true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('consentChanged', { detail: consent }));
    
    // Initialize analytics if consented
    if (analytics && typeof window.initAnalytics === 'function') {
      window.initAnalytics();
    }
  }

  /**
   * Show cookie banner
   */
  function showCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner && !hasConsent()) {
      banner.classList.add('show');
    }
  }

  /**
   * Hide cookie banner
   */
  function hideCookieBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      banner.classList.remove('show');
    }
  }

  /**
   * Handle accept button
   */
  function handleAccept() {
    saveConsent(true);
    hideCookieBanner();
  }

  /**
   * Handle reject button
   */
  function handleReject() {
    saveConsent(false);
    hideCookieBanner();
  }

  /**
   * Initialize consent system
   */
  function initConsent() {
    // Check if consent already given
    if (hasConsent()) {
      if (typeof window.initAnalytics === 'function') {
        window.initAnalytics();
      }
      return;
    }

    // Show banner after a short delay
    setTimeout(showCookieBanner, 1000);

    // Attach event listeners
    const acceptBtn = document.querySelector('.cookie-banner .btn-accept');
    const rejectBtn = document.querySelector('.cookie-banner .btn-reject');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', handleAccept);
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', handleReject);
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsent);
  } else {
    initConsent();
  }

  // Export for external use
  window.ConsentManager = {
    hasConsent,
    saveConsent,
    showCookieBanner,
    hideCookieBanner
  };
})();

