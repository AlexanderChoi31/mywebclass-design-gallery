# Automated Improvement Loop Guide

## Overview

The Automated Improvement Loop continuously assesses your themes, fixes issues, and iterates until perfect scores (10/10) are achieved. It answers your 5 key questions and takes progress screenshots.

## The 5 Assessment Questions

1. **Is it spaced properly?** - Analyzes spacing consistency and scale
2. **Is it clean?** - Checks for professional design patterns
3. **Can users read easily? (Ensure color contrast nicely)** - Validates WCAG AA/AAA contrast
4. **Do the designs have a mark of professionalism?** - Evaluates semantic HTML, meta tags, accessibility
5. **Is typography hierarchy clear?** - Checks heading structure and size relationships

## How It Works

### Process Flow

```
1. Assess all themes/pages
   ↓
2. Check scores (target: 4.5+/5 for each metric)
   ↓
3. If not perfect:
   - Take "before" screenshot
   - Fix contrast issues
   - Fix spacing issues
   - Rebuild site
   - Take "after" screenshot
   ↓
4. Re-assess
   ↓
5. Repeat until perfect or max iterations (10)
```

### What Gets Fixed

**Contrast Issues:**
- Adjusts text colors to meet WCAG AA (4.5:1)
- Ensures proper contrast ratios
- Updates theme CSS variables

**Spacing Issues:**
- Adds consistent padding/margins
- Ensures vertical spacing
- Updates container/section styles

## Usage

### Start the Loop

```bash
# Make sure dev server is running
npm run dev

# In another terminal, start the loop
npm run improve
```

Or use the alias:
```bash
npm run improve:loop
```

### What Happens

1. **Iteration 1**: Assesses all themes, finds issues, fixes them
2. **Iteration 2**: Re-assesses with fixes, finds remaining issues
3. **Continues**: Until all scores are 4.5+/5 or max iterations reached

### Output Files

**Progress Screenshots:**
- Location: `screenshots/progress/`
- Format: `{theme}-{page}-v{iteration}-{before|after|final}.png`
- Example: `onyx-homepage-v1-before.png`, `onyx-homepage-v1-after.png`

**Assessment Logs:**
- Location: `logs/improvement-loop/`
- Files:
  - `iteration-{n}.json` - Detailed assessment data
  - `improvement-loop-summary.txt` - Final report with all 5 questions answered

## Understanding Scores

### Perfect Score: 4.5+/5

Each metric is scored 0-5:
- **4.5-5.0**: Excellent (passes)
- **3.5-4.4**: Good (needs minor improvement)
- **2.5-3.4**: Fair (needs improvement)
- **0-2.4**: Poor (needs major improvement)

### Overall Score Calculation

```
Overall = (Contrast × 0.3) + (Spacing × 0.25) + (Typography × 0.2) + (Professionalism × 0.25)
```

## Progress Tracking

### Screenshots

All screenshots are saved with version numbers:
- `v1-before.png` - Before fixes in iteration 1
- `v1-after.png` - After fixes in iteration 1
- `v2-before.png` - Before fixes in iteration 2
- etc.

**Screenshots are NEVER deleted** - they serve as a visual history of improvements.

### Logs

Each iteration creates:
- JSON log with detailed metrics
- Summary report with answers to all 5 questions
- Progress tracking across iterations

## Customization

### Change Max Iterations

Edit `scripts/automated-improvement-loop.js`:
```javascript
const maxIterations = 10; // Change this
```

### Adjust Score Thresholds

Edit the `needsImprovement` check:
```javascript
needsImprovement: overallScore < 4.5 || contrast.score < 4.5 || spacing.overallScore < 4.5
```

### Add More Fixes

Extend the fix functions:
- `fixContrastIssues()` - Add more contrast improvements
- `fixSpacingIssues()` - Add more spacing improvements
- Add new fix functions for other issues

## Troubleshooting

### Loop Stops Early

- Check if max iterations reached
- Review logs for errors
- Check if fixes are being applied correctly

### Scores Not Improving

- Review the assessment details in JSON logs
- Check if fixes are actually being applied
- May need manual intervention for complex issues

### Screenshots Not Saving

- Check `screenshots/progress/` directory exists
- Verify write permissions
- Check disk space

## Best Practices

1. **Run Regularly**: After major changes
2. **Review Screenshots**: Compare before/after visually
3. **Check Logs**: Understand what's being fixed
4. **Manual Review**: Some issues may need human judgment
5. **Commit Progress**: Save screenshots and logs in git

## Example Output

```
ITERATION 1
══════════════════════════════════════════════════════════════════════

📊 Assessing onyx - homepage...
  Overall Score: 2.88/5
  Spacing: 2.5/5
  Readability: 0.0/5
  Professionalism: 5.0/5

  📸 Screenshot (before): onyx-homepage-v1-before.png
  🔧 Fixing contrast issues...
  🔧 Fixing spacing issues...
  🔨 Rebuilding...
  📸 Screenshot (after): onyx-homepage-v1-after.png

📊 Iteration 1 Summary:
   Average Score: 2.95/5
   Minimum Score: 2.88/5
   Issues Found: 10
```

## Integration

### Add to CI/CD

```yaml
- name: Run Improvement Loop
  run: |
    npm run dev &
    sleep 10
    npm run improve
```

### Schedule Regular Runs

Use cron or GitHub Actions scheduled workflows to run periodically.

## Next Steps

After the loop completes:
1. Review the final summary report
2. Check all progress screenshots
3. Verify improvements visually
4. Commit changes if satisfied
5. Run again if needed

