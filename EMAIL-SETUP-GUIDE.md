# 📧 Email Notification Setup Guide

## Overview

Email notifications are now configured for build status updates. You'll receive emails when:
- ✅ Build succeeds
- ❌ Build fails
- 🚀 Deployment completes successfully

---

## Setup Options

### Option 1: SendGrid (Recommended - Easiest)

**Why SendGrid?**
- Free tier: 100 emails/day
- Simple API key setup
- Reliable delivery
- No SMTP configuration needed

**Steps:**

1. **Create SendGrid Account:**
   - Visit: https://signup.sendgrid.com/
   - Sign up for free account

2. **Create API Key:**
   - Go to: Settings → API Keys
   - Click "Create API Key"
   - Name it: "GitHub Actions Build Notifications"
   - Select "Full Access" or "Restricted Access" (Mail Send permission)
   - Copy the API key (you'll only see it once!)

3. **Add to GitHub Secrets:**
   - Go to: https://github.com/AlexanderChoi31/mywebclass-design-gallery/settings/secrets/actions
   - Click "New repository secret"
   - Add these secrets:
     - `SENDGRID_API_KEY` - Your SendGrid API key
     - `BUILD_STATUS_EMAIL_TO` - Your email address (e.g., `your-email@example.com`)
     - `BUILD_STATUS_EMAIL_FROM` - Sender email (must be verified in SendGrid)
     - `SITE_NAME` - Optional: "MyWebClass Design Gallery" (or leave default)

4. **Verify Sender Email in SendGrid:**
   - Go to: Settings → Sender Authentication
   - Verify your sender email address
   - Or use SendGrid's default: `noreply@sendgrid.net`

**Done!** Emails will now be sent automatically.

---

### Option 2: Gmail SMTP

**Why Gmail?**
- Free
- Already have account
- Simple setup

**Steps:**

1. **Enable App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Sign in with your Gmail account
   - Click "Select app" → "Mail"
   - Click "Select device" → "Other (Custom name)"
   - Enter: "GitHub Actions"
   - Click "Generate"
   - Copy the 16-character password

2. **Add to GitHub Secrets:**
   - Go to: https://github.com/AlexanderChoi31/mywebclass-design-gallery/settings/secrets/actions
   - Add these secrets:
     - `SMTP_HOST` - `smtp.gmail.com`
     - `SMTP_PORT` - `587`
     - `SMTP_SECURE` - `false`
     - `SMTP_USER` - Your Gmail address (e.g., `your-email@gmail.com`)
     - `SMTP_PASSWORD` - The 16-character app password
     - `BUILD_STATUS_EMAIL_TO` - Your email address
     - `BUILD_STATUS_EMAIL_FROM` - Your Gmail address
     - `SITE_NAME` - Optional: "MyWebClass Design Gallery"

**Done!** Emails will now be sent via Gmail.

---

### Option 3: Mailgun

**Why Mailgun?**
- Free tier: 5,000 emails/month
- Good for production
- Reliable delivery

**Steps:**

1. **Create Mailgun Account:**
   - Visit: https://www.mailgun.com/
   - Sign up for free account

2. **Get SMTP Credentials:**
   - Go to: Sending → Domain Settings
   - Find "SMTP credentials" section
   - Copy:
     - SMTP hostname
     - SMTP port (usually 587)
     - SMTP username
     - SMTP password

3. **Add to GitHub Secrets:**
   - Go to: https://github.com/AlexanderChoi31/mywebclass-design-gallery/settings/secrets/actions
   - Add these secrets:
     - `SMTP_HOST` - Mailgun SMTP hostname
     - `SMTP_PORT` - `587`
     - `SMTP_SECURE` - `false`
     - `SMTP_USER` - Mailgun SMTP username
     - `SMTP_PASSWORD` - Mailgun SMTP password
     - `BUILD_STATUS_EMAIL_TO` - Your email address
     - `BUILD_STATUS_EMAIL_FROM` - Your verified Mailgun email
     - `SITE_NAME` - Optional: "MyWebClass Design Gallery"

**Done!** Emails will now be sent via Mailgun.

---

### Option 4: Custom SMTP Server

If you have your own SMTP server (e.g., company email, other provider):

1. **Get SMTP Settings:**
   - Hostname
   - Port (usually 587 for TLS, 465 for SSL)
   - Username
   - Password
   - Security type (TLS/SSL)

2. **Add to GitHub Secrets:**
   - `SMTP_HOST` - Your SMTP hostname
   - `SMTP_PORT` - Your SMTP port
   - `SMTP_SECURE` - `true` for SSL (port 465), `false` for TLS (port 587)
   - `SMTP_USER` - Your SMTP username
   - `SMTP_PASSWORD` - Your SMTP password
   - `BUILD_STATUS_EMAIL_TO` - Recipient email
   - `BUILD_STATUS_EMAIL_FROM` - Sender email
   - `SITE_NAME` - Optional: "MyWebClass Design Gallery"

---

## Required GitHub Secrets

### Minimum Required:
- `BUILD_STATUS_EMAIL_TO` - **Required** - Where to send notifications

### For SendGrid:
- `SENDGRID_API_KEY` - SendGrid API key
- `BUILD_STATUS_EMAIL_FROM` - Verified sender email

### For SMTP (Gmail, Mailgun, Custom):
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP port (usually 587)
- `SMTP_SECURE` - `true` or `false`
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `BUILD_STATUS_EMAIL_FROM` - Sender email address

### Optional:
- `SITE_NAME` - Custom site name (defaults to "MyWebClass Design Gallery")

---

## Testing Email Notifications

### Test Build Failure:
1. Make a commit that will fail (e.g., syntax error)
2. Push to GitHub
3. Wait for workflow to fail
4. Check your email for failure notification

### Test Build Success:
1. Make a normal commit
2. Push to GitHub
3. Wait for workflow to complete
4. Check your email for success notification

### Test Deployment:
1. Push to `main` branch
2. Wait for deployment to complete
3. Check your email for deployment notification

---

## Email Content

### Build Success Email:
- ✅ Green header
- Build details (workflow, branch, commit)
- Link to GitHub Actions run
- Timestamp

### Build Failure Email:
- ❌ Red header
- Error details
- Link to GitHub Actions run for debugging
- Timestamp

### Deployment Email:
- 🚀 Green header
- Live site URL (clickable button)
- Commit hash
- Timestamp

---

## Troubleshooting

### Emails Not Sending:

1. **Check GitHub Secrets:**
   - Verify all required secrets are set
   - Check for typos in secret names
   - Ensure values are correct

2. **Check GitHub Actions Logs:**
   - Go to: https://github.com/AlexanderChoi31/mywebclass-design-gallery/actions
   - Open latest workflow run
   - Check "Send email notification" step logs
   - Look for error messages

3. **Common Issues:**
   - **SendGrid:** Verify sender email is verified in SendGrid
   - **Gmail:** Ensure app password is correct (not regular password)
   - **SMTP:** Check firewall/network allows SMTP connections
   - **Port:** Verify port is correct (587 for TLS, 465 for SSL)

4. **Test Locally (Optional):**
   ```bash
   cd "/Users/alexchoi/CMS Project"
   node -e "
   require('dotenv').config();
   const { sendBuildStatusEmail } = require('./_functions/email-notification.js');
   sendBuildStatusEmail('success', 'Test email', { 'Test': 'This is a test' });
   "
   ```

---

## Email Service Comparison

| Service | Free Tier | Setup Difficulty | Best For |
|---------|-----------|------------------|----------|
| **SendGrid** | 100/day | ⭐ Easy | Quick setup |
| **Gmail** | Unlimited* | ⭐⭐ Medium | Personal projects |
| **Mailgun** | 5,000/month | ⭐⭐ Medium | Production |
| **Custom SMTP** | Varies | ⭐⭐⭐ Hard | Enterprise |

*Gmail has daily sending limits (~500/day for free accounts)

---

## Security Notes

- ⚠️ **Never commit API keys or passwords to git**
- ✅ Always use GitHub Secrets for sensitive data
- ✅ Use app passwords for Gmail (not your main password)
- ✅ Rotate API keys periodically
- ✅ Use environment-specific email addresses for testing

---

## Next Steps

1. Choose your email service (SendGrid recommended)
2. Set up account and get credentials
3. Add secrets to GitHub
4. Push a commit to trigger test email
5. Verify email received

---

**Need Help?** Check the GitHub Actions logs for detailed error messages.

**Last Updated:** December 18, 2025

