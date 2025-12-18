#!/bin/bash
# Quick script to diagnose and fix Netlify deployment issues

echo "🔍 Netlify Deployment Diagnostic"
echo "================================="
echo ""

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: Not on main branch. Deploy job only runs on main."
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Check GitHub Actions:"
echo "   https://github.com/AlexanderChoi31/mywebclass-design-gallery/actions"
echo ""
echo "2. Verify Netlify Secrets are set:"
echo "   https://github.com/AlexanderChoi31/mywebclass-design-gallery/settings/secrets/actions"
echo "   Required secrets:"
echo "   - NETLIFY_AUTH_TOKEN"
echo "   - NETLIFY_SITE_ID"
echo ""
echo "3. Check Netlify Dashboard:"
echo "   https://app.netlify.com"
echo ""
echo "4. To trigger a rebuild, run:"
echo "   git commit --allow-empty -m 'Trigger Netlify rebuild'"
echo "   git push origin main"
echo ""

