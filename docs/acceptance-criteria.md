# Acceptance Criteria

This document defines the acceptance criteria for the MyWebClass Design Gallery project.

## Theme Requirements

### ✅ Exactly 5 Themes Exist

- [x] **Onyx** - Dark, editorial theme
- [x] **Paper** - Light, print-inspired theme
- [x] **Neon** - High-contrast, modern theme
- [x] **Brutal** - Brutalist, bold theme
- [x] **Calm** - Soft, airy, minimal theme

### ✅ Themes Differ Drastically

Each theme must have distinct:

- **Typography**: Different font families for headings/body
- **Spacing Scale**: Different spacing multipliers
- **Border Radius**: Different radius values (0px to 1.5rem)
- **Shadows**: Different shadow intensities
- **Component Style**: Unique button, card, form styles

**Verification**: Visual inspection of each theme page shows clear differences.

## Theme Switcher

### ✅ Theme Switcher Works

- [x] Dropdown/select element present in navigation
- [x] All 5 themes available as options
- [x] Selecting theme updates `data-theme` attribute on `<html>`
- [x] CSS variables apply correctly based on theme
- [x] Visual changes are immediate and obvious

### ✅ Theme Persistence

- [x] Selected theme saved to `localStorage`
- [x] Theme persists across page reloads
- [x] Default theme applied if no preference saved
- [x] Theme applied before page render (no flash)

## Theme Detail Pages

### ✅ Feature Showcase Required

Each theme detail page (`/themes/:slug/`) includes:

- [x] **Hero Section**: Large heading, description, CTA buttons
- [x] **Navigation**: Theme-aware navigation bar
- [x] **Card Grid**: Multiple cards demonstrating card component
- [x] **Form Inputs + Buttons**: Text inputs, textarea, buttons
- [x] **Typography Samples**: All heading levels, body text
- [x] **Alert/Notice**: Success, error, warning, info alerts
- [x] **Table/Pricing**: Table component with pricing or data

**Verification**: All components visible on each theme page.

## CMS Integration

### ✅ CMS-Driven Content Page

- [x] At least one page renders content from Sanity CMS
- [x] Content fetched via Netlify Function
- [x] Fallback content if CMS unavailable
- [x] Page accessible at `/cms/`

## Form Submission

### ✅ Submission Form Creates Airtable Record

- [x] Form submits to Netlify Function
- [x] Function saves to Airtable
- [x] Required fields: name, email, message
- [x] Optional fields: theme, newsletter
- [x] Error handling for Airtable failures

### ✅ Submission Triggers Discord Notification

- [x] Discord webhook called after Airtable save
- [x] Message includes form data
- [x] Formatted as Discord embed
- [x] Error handling if Discord fails

## Privacy & Consent

### ✅ GDPR Cookie Banner

- [x] Banner appears on first visit
- [x] Accept/Reject buttons functional
- [x] Consent stored in localStorage
- [x] Banner doesn't reappear after consent
- [x] Links to privacy policy

### ✅ Analytics Gated by Consent

- [x] Analytics only load if consent given
- [x] No analytics scripts before consent
- [x] Consent checked on page load
- [x] Analytics initialization function exists

### ✅ Privacy Policy Page

- [x] Privacy policy page exists at `/privacy/`
- [x] Linked from cookie banner
- [x] Linked from footer
- [x] Includes cookie information
- [x] Includes data usage policies

## Quality Gates

### ✅ CI Blocks Merges if Quality Gates Fail

- [x] Linting must pass (or warnings only)
- [x] Tests must pass
- [x] Lighthouse CI must meet thresholds
- [x] Bundle size must be under limits
- [x] Build must succeed

**Verification**: GitHub Actions workflow enforces gates.

## Logging

### ✅ Logs Written to Repo

- [x] `logs/build-log.txt` - Build information
- [x] `logs/quality-report.txt` - Quality metrics
- [x] `logs/review-packet.txt` - Review packet (when gates pass)
- [x] `logs/submissions-log.txt` - Submission log (optional)

## Pages Required

### ✅ All Pages Exist

- [x] Home (`/`)
- [x] Themes index (`/themes/`)
- [x] Theme detail pages (`/themes/:slug/`) for all 5 themes
- [x] CMS content page (`/cms/`)
- [x] Submission page (`/submit/`)
- [x] Privacy policy (`/privacy/`)

## Technical Requirements

### ✅ Node 20+ Compatible

- [x] `package.json` specifies Node 20+
- [x] Code uses Node 20+ features appropriately
- [x] CI uses Node 20

### ✅ Eleventy Static Site

- [x] Eleventy 2.0+ installed
- [x] Multi-page site structure
- [x] Templates use Nunjucks
- [x] Build generates static HTML

### ✅ Minimal JavaScript

- [x] Theme switcher only
- [x] Consent management only
- [x] Analytics (gated) only
- [x] Form submission handling
- [x] No unnecessary JavaScript

## Summary

All acceptance criteria have been met. The project includes:

- 5 distinct themes with drastic visual differences
- Functional theme switcher with persistence
- Complete feature showcases on theme pages
- CMS integration with Sanity
- Form submission with Airtable + Discord
- GDPR-compliant consent system
- Privacy policy page
- Quality gates in CI/CD
- Comprehensive logging
- All required pages

**Status**: ✅ **ACCEPTED**

