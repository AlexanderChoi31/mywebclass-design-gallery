# 🧪 Testing Guide - MyWebClass Design Gallery

## Quick Test Command

Run all tests at once:
```bash
npm run test:all
```

This will check:
- ✅ Dev server status
- ✅ Local site accessibility
- ✅ Build process
- ✅ Playwright tests (21 tests)
- ⚠️  Linting (some stylelint warnings are expected)
- ✅ Netlify deployment

## Individual Tests

### 1. Check Dev Server
```bash
# Check if dev server is running
lsof -ti:8080 && echo "✅ Running" || echo "❌ Not running"

# Start dev server if needed
npm run dev
```

### 2. Test Local Site
```bash
# Visit in browser
open http://localhost:8080

# Or check with curl
curl -I http://localhost:8080
```

### 3. Test Build
```bash
npm run build
```

### 4. Run Playwright Tests
```bash
npm test
# Should show: 21 passed
```

### 5. Run Linting
```bash
npm run lint
# Note: Some stylelint warnings are expected (duplicate selectors for theme-specific styles)
```

### 6. Check Netlify
```bash
# Visit in browser
open https://joyful-cranachan-6fdbb1.netlify.app

# Or check with curl
curl -I https://joyful-cranachan-6fdbb1.netlify.app
```

## Test All Pages Locally

Visit these URLs in your browser (with dev server running):

- **Homepage**: http://localhost:8080/
- **Themes Index**: http://localhost:8080/themes/
- **About**: http://localhost:8080/about/
- **Submit**: http://localhost:8080/submit/
- **Privacy**: http://localhost:8080/privacy/
- **CMS Content**: http://localhost:8080/cms/

### Theme Pages
- **Onyx**: http://localhost:8080/themes/onyx/
- **Paper**: http://localhost:8080/themes/paper/
- **Neon**: http://localhost:8080/themes/neon/
- **Brutal**: http://localhost:8080/themes/brutal/
- **Calm**: http://localhost:8080/themes/calm/
- **Royal**: http://localhost:8080/themes/royal/

## Test Theme Switching

1. Visit any page
2. Use the theme switcher in the header
3. Verify the theme changes
4. Refresh the page - theme should persist (localStorage)

## Quality Checks

### Comprehensive Quality Check
```bash
npm run quality-comprehensive
```

This runs:
- Linting (JS, CSS, Markdown)
- Playwright tests
- Lighthouse CI
- Bundle size check
- Accessibility (Pa11y, Axe)
- HTML validation

### Visual Assessment
```bash
npm run screenshots
```

Captures screenshots of all themes for visual review.

## Current Status

✅ **Dev Server**: Running on port 8080
✅ **Local Site**: Accessible (HTTP 200)
✅ **Build**: Successful
✅ **Tests**: 21/21 passing
⚠️  **Linting**: Some stylelint warnings (expected)
✅ **Netlify**: Live at https://joyful-cranachan-6fdbb1.netlify.app

## Troubleshooting

### Dev Server Not Running
```bash
npm run dev
```

### Tests Failing
```bash
# Install Playwright browsers if needed
npx playwright install

# Run tests with UI
npm run test:ui
```

### Build Failing
```bash
# Clean and rebuild
rm -rf _site
npm run build
```

### Netlify Not Updating
- Check GitHub Actions: https://github.com/AlexanderChoi31/mywebclass-design-gallery/actions
- Check Netlify dashboard: https://app.netlify.com

