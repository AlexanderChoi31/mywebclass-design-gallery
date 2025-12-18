# Visual Assessment Guide

## Overview

The Visual Assessment system automatically screenshots each theme and evaluates visual quality based on your specific questions:

1. **Is it spaced properly?** - Analyzes spacing consistency and scale
2. **Is it clean?** - Checks for professional design patterns
3. **Can users read easily?** - Validates color contrast ratios (WCAG AA/AAA)
4. **Do the designs have a mark of professionalism?** - Evaluates semantic HTML, meta tags, accessibility
5. **What does my page miss compared to industry standards?** - Compares against typical theme implementations

## Quick Start

### 1. Start the dev server

```bash
npm run dev
```

Keep this running in one terminal.

### 2. Run visual assessment

In another terminal:

```bash
# Basic assessment
npm run visual-assessment

# Advanced assessment (recommended)
npm run visual-assessment:advanced

# Or use the shortcut
npm run screenshots
```

## What It Does

### Screenshots
- Takes full-page screenshots of each theme
- Saves to `screenshots/` directory
- Format: `{theme}-{page}-{timestamp}.png`

### Assessments

For each theme/page combination, it evaluates:

#### 1. Spacing Analysis
- Checks for consistent padding/margins
- Validates spacing scale usage
- Scores: 0-5

#### 2. Cleanliness Analysis
- Checks semantic HTML structure
- Validates meta tags
- Checks for organized CSS
- Scores: 0-5

#### 3. Readability Analysis
- Calculates color contrast ratios
- Validates WCAG AA (4.5:1) compliance
- Validates WCAG AAA (7:1) compliance
- Scores: 0-5

#### 4. Professionalism Analysis
- Checks for header/footer/nav/main
- Validates meta tags (description, viewport, OG tags)
- Checks responsive design
- Validates accessibility features
- Scores: 0-5

#### 5. Industry Comparison
- Compares against typical theme implementations
- Provides recommendations
- Highlights missing features

## Output Files

### Screenshots
Location: `screenshots/`
- Full-page PNG screenshots
- One per theme/page combination

### Assessment Reports
Location: `logs/visual-assessments/`

1. **JSON Report** (`advanced-assessment-{timestamp}.json`)
   - Detailed data for programmatic analysis
   - All metrics and scores

2. **Text Summary** (`advanced-assessment-summary-{timestamp}.txt`)
   - Human-readable report
   - Answers to all questions
   - Scores and recommendations

## Example Output

```
THEME: ONYX
═══════════════════════════════════════════════════════════════════════════

Page: homepage
Screenshot: onyx-homepage-1234567890.png
Overall Score: 4.2/5

  ❓ Is it spaced properly?
  ✅ Yes - 8/10 containers have consistent padding, 9/10 have vertical spacing
  📊 Score: 4.5/5

  ❓ Is it clean?
  ✅ Yes - Clean, organized design with 85% professional indicators
  📊 Score: 4.2/5

  ❓ Can users read easily? (Ensure color contrast nicely)
  ✅ Yes - 92% of text elements meet WCAG AA contrast (4.5:1), average contrast: 8.2:1
  📊 Score: 4.6/5

  ❓ Do the designs have a mark of professionalism to them?
  ✅ Yes - Professional design patterns: semantic HTML, meta tags, responsive design
  📊 Score: 4.3/5

  🌐 If compared to other images of this theme, what does my page miss out on?
  💡 Based on onyx theme standards: Dark, editorial themes typically feature...
```

## Integration with CI/CD

Add to your GitHub Actions workflow:

```yaml
- name: Visual Assessment
  run: |
    npm run dev &
    sleep 10
    npm run visual-assessment:advanced
```

## Customization

### Change Base URL

```bash
BASE_URL=https://your-site.netlify.app npm run visual-assessment:advanced
```

### Add More Pages

Edit `scripts/advanced-visual-assessment.js`:

```javascript
const pages = [
  { path: '/', name: 'homepage' },
  { path: '/themes/', name: 'themes-index' },
  { path: '/submit/', name: 'submit' },  // Add more pages
  { path: '/themes/onyx/', name: 'onyx-detail' }
];
```

### Adjust Scoring Weights

Edit the `overallScore` calculation in `assessThemePage()`:

```javascript
const overallScore = (
  contrast.score * 0.3 +      // 30% weight
  spacing.overallScore * 0.25 + // 25% weight
  typography.score * 0.2 +     // 20% weight
  professionalism.score * 0.25 // 25% weight
);
```

## Troubleshooting

### "Connection refused" error
- Make sure dev server is running: `npm run dev`
- Check the port (default: 8080)
- Set BASE_URL if using different URL

### Screenshots are blank
- Wait longer for page load (increase timeout)
- Check if fonts are loading properly
- Verify theme is being applied correctly

### Low contrast scores
- Review color combinations in `src/css/themes.css`
- Ensure text/background contrast meets WCAG AA (4.5:1)
- Use online contrast checkers to verify

## Best Practices

1. **Run regularly** - Add to your quality check routine
2. **Compare over time** - Track scores across commits
3. **Review screenshots** - Visual inspection complements automated analysis
4. **Fix issues iteratively** - Address one theme at a time
5. **Document decisions** - Note why certain design choices were made

## Next Steps

After running assessments:
1. Review screenshots in `screenshots/` directory
2. Read the summary report
3. Address low-scoring areas
4. Re-run to verify improvements
5. Commit improvements with before/after screenshots

