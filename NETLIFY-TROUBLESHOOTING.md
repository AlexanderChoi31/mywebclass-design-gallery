# 🔧 Netlify Deployment Troubleshooting Guide

## Issue: Netlify Not Updating with GitHub

### Quick Diagnosis Steps

1. **Check GitHub Actions Status**
   - Visit: https://github.com/AlexanderChoi31/mywebclass-design-gallery/actions
   - Check if the latest workflow run completed successfully
   - Look for the "deploy" job status

2. **Check Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Go to your site dashboard
   - Check "Deploys" tab for recent deployments
   - Look for any error messages

---

## Common Issues & Solutions

### Issue 1: GitHub Actions Not Running

**Symptoms:**
- No workflow runs appear in GitHub Actions
- No deployment triggered after push

**Solution:**
1. Verify workflow file exists: `.github/workflows/ci.yml`
2. Check if workflow is enabled in repository settings
3. Try pushing again or manually trigger workflow

**Manual Trigger:**
```bash
# Make a small change and push
cd "/Users/alexchoi/CMS Project"
echo "# Trigger rebuild" >> README.md
git add README.md
git commit -m "Trigger Netlify rebuild"
git push origin main
```

---

### Issue 2: Deploy Job Failing in GitHub Actions

**Symptoms:**
- Workflow runs but "deploy" job fails
- Error messages about NETLIFY_AUTH_TOKEN or NETLIFY_SITE_ID

**Solution:**
1. **Get Netlify Credentials:**
   - Visit: https://app.netlify.com/user/applications
   - Click "New access token"
   - Name it "GitHub Actions" and copy the token

2. **Add GitHub Secrets:**
   - Visit: https://github.com/AlexanderChoi31/mywebclass-design-gallery/settings/secrets/actions
   - Add/Update these secrets:
     - `NETLIFY_AUTH_TOKEN` - Your Netlify access token
     - `NETLIFY_SITE_ID` - Your site ID (found in Netlify dashboard URL or site settings)

3. **Get Site ID:**
   - In Netlify dashboard, go to Site settings → General
   - Site ID is shown at the top (or in the URL: `app.netlify.com/sites/YOUR_SITE_ID`)

---

### Issue 3: Netlify Not Connected to GitHub

**Symptoms:**
- No automatic builds in Netlify
- Manual deploys work but auto-deploys don't

**Solution:**
1. **Connect Netlify to GitHub:**
   - Go to: https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select "GitHub"
   - Authorize Netlify to access your repository
   - Select: `AlexanderChoi31/mywebclass-design-gallery`
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `_site`
   - Click "Deploy site"

2. **Or Update Existing Site:**
   - Go to Site settings → Build & deploy
   - Under "Continuous Deployment", click "Link to Git"
   - Select your repository
   - Update build settings if needed

---

### Issue 4: Build Settings Incorrect

**Symptoms:**
- Builds run but site doesn't update correctly
- Wrong files being deployed

**Solution:**
1. **Verify `netlify.toml` exists** (should be in project root)
2. **Check Netlify Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Node version: `20`

3. **Update in Netlify Dashboard:**
   - Site settings → Build & deploy → Build settings
   - Update as needed

---

### Issue 5: GitHub Actions Deploy Job Skipped

**Symptoms:**
- Quality gates pass but deploy job is skipped
- Message: "Skipped because condition not met"

**Solution:**
- The deploy job only runs on `main` branch
- Ensure you're pushing to `main`, not another branch
- Check workflow file: `if: github.ref == 'refs/heads/main'`

---

## Manual Deployment (Quick Fix)

If automatic deployment isn't working, you can deploy manually:

```bash
cd "/Users/alexchoi/CMS Project"

# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy manually
npm run build
netlify deploy --prod --dir=_site
```

---

## Verification Steps

1. **Check Latest Commit:**
   ```bash
   git log --oneline -1
   ```

2. **Check GitHub Actions:**
   - Visit: https://github.com/AlexanderChoi31/mywebclass-design-gallery/actions
   - Latest run should show ✅ (green checkmark)

3. **Check Netlify Deploys:**
   - Visit: https://app.netlify.com
   - Go to your site → Deploys tab
   - Latest deploy should match your latest commit

4. **Check Live Site:**
   - Visit: https://joyful-cranachan-6fdbb1.netlify.app
   - Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
   - Verify changes are visible

---

## Quick Fix Commands

```bash
# 1. Verify you're on main branch
cd "/Users/alexchoi/CMS Project"
git branch

# 2. Make a small change to trigger rebuild
echo "<!-- Trigger rebuild $(date) -->" >> src/index.md
git add src/index.md
git commit -m "Trigger Netlify rebuild"
git push origin main

# 3. Check GitHub Actions (wait 1-2 minutes)
open https://github.com/AlexanderChoi31/mywebclass-design-gallery/actions

# 4. Check Netlify dashboard
open https://app.netlify.com
```

---

## Still Not Working?

1. **Check Netlify Status:**
   - Visit: https://www.netlifystatus.com/
   - Verify no service outages

2. **Check GitHub Status:**
   - Visit: https://www.githubstatus.com/
   - Verify Actions service is operational

3. **Review Logs:**
   - GitHub Actions: Check workflow run logs
   - Netlify: Check deploy logs in dashboard

4. **Contact Support:**
   - Netlify Support: https://www.netlify.com/support/
   - GitHub Support: https://support.github.com/

---

## Expected Behavior

✅ **When Working Correctly:**
1. You push to GitHub
2. GitHub Actions workflow runs automatically
3. Quality gates job runs (lint, test, build)
4. Deploy job runs (deploys to Netlify)
5. Netlify site updates within 1-2 minutes
6. Discord notification sent (if configured)

---

**Last Updated:** December 18, 2025
**Site URL:** https://joyful-cranachan-6fdbb1.netlify.app

