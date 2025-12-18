/**
 * Analytics Manager
 * Only loads if consent is given
 */

(function() {
  'use strict';

  let analyticsInitialized = false;

  /**
   * Initialize analytics (only if consent given)
   */
  function initAnalytics() {
    if (analyticsInitialized) return;
    
    // Check consent
    if (!window.ConsentManager || !window.ConsentManager.hasConsent()) {
      return;
    }

    // Check if analytics is enabled
    const enabled = document.documentElement.dataset.analyticsEnabled === 'true';
    if (!enabled) {
      return;
    }

    // Initialize analytics here
    // This is a placeholder - replace with actual analytics implementation

    // Track page view
    trackPageView();

    // Track theme changes
    document.addEventListener('themeChanged', (event) => {
      trackEvent('theme_changed', { theme: event.detail.theme });
    });

    analyticsInitialized = true;
  }

  /**
   * Track page view
   */
  function trackPageView() {
    // Example: Google Analytics 4
    // const path = window.location.pathname;
    // const title = document.title;
    // if (typeof gtag !== 'undefined') {
    //   gtag('config', 'GA_MEASUREMENT_ID', {
    //     page_path: path,
    //     page_title: title
    //   });
    // }
  }

  /**
   * Track custom event
   */
  function trackEvent(eventName, eventData = {}) {
    // Example: Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', eventName, eventData);
    // }
    // Suppress unused parameter warning
    void eventData;
  }

  /**
   * Track form submission
   */
  function trackSubmission(formData) {
    trackEvent('form_submission', {
      form_type: formData.type || 'contact',
      // Don't include PII
    });
  }

  // Export
  window.initAnalytics = initAnalytics;
  window.trackPageView = trackPageView;
  window.trackEvent = trackEvent;
  window.trackSubmission = trackSubmission;

  // Auto-initialize if consent already exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.ConsentManager && window.ConsentManager.hasConsent()) {
        initAnalytics();
      }
    });
  } else {
    if (window.ConsentManager && window.ConsentManager.hasConsent()) {
      initAnalytics();
    }
  }
})();

