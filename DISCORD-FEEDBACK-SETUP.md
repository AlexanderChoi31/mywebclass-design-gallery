# 📝 Discord Feedback Notifications - Setup Guide

## ✅ Current Status

**Discord notifications for form submissions are ALREADY IMPLEMENTED!** 

When someone submits feedback through the `/submit/` page, it will automatically send a notification to your Discord `#submissions` channel (if configured).

---

## How It Works

### Current Flow:

```
1. User fills out form on /submit/ page
   ↓
2. Form submitted to Netlify Function
   ↓
3. Function processes submission
   ↓
4. Discord notification sent to #submissions channel
   ↓
5. Success message shown to user
```

---

## What Gets Sent to Discord

When someone submits feedback, Discord receives a rich embed message with:

- 👤 **Name** - Submitter's name
- 📧 **Email** - Submitter's email address
- 🎨 **Favorite Theme** - Which theme they selected (if any)
- 💬 **Message** - Their feedback message (truncated to 1000 chars if too long)
- 📰 **Newsletter** - Whether they subscribed to newsletter
- 🕐 **Submitted At** - Timestamp of submission

**Example Discord Message:**
```
📝 New Form Submission Received

📋 Feedback Submission
A new feedback submission has been received from the website.

👤 Name: John Doe
📧 Email: john@example.com
🎨 Favorite Theme: Neon
💬 Message: Love the neon theme! The glow effects are amazing.
📰 Newsletter: ✅ Subscribed
🕐 Submitted At: 12/18/2025, 12:30:00 PM
```

---

## Setup Instructions

### Step 1: Create Discord Webhook

1. **Open Discord** and go to your server
2. **Go to Server Settings** → **Integrations** → **Webhooks**
3. **Click "New Webhook"**
4. **Configure:**
   - Name: `Form Submissions` (or any name you prefer)
   - Channel: Select `#submissions` (or create this channel first)
   - Copy the webhook URL (looks like: `https://discord.com/api/webhooks/...`)

### Step 2: Add to Netlify Environment Variables

1. **Go to Netlify Dashboard:**
   - Visit: https://app.netlify.com
   - Select your site

2. **Add Environment Variable:**
   - Go to: **Site settings** → **Environment variables**
   - Click **Add variable**
   - **Key:** `DISCORD_WEBHOOK_SUBMISSIONS`
   - **Value:** Paste your Discord webhook URL
   - Click **Save**

### Step 3: Test It!

1. **Visit your site:**
   - Go to: https://joyful-cranachan-6fdbb1.netlify.app/submit/
   - Or locally: http://localhost:8080/submit/

2. **Fill out the form:**
   - Name: Test User
   - Email: test@example.com
   - Theme: (select any)
   - Message: This is a test submission
   - Click Submit

3. **Check Discord:**
   - Go to your `#submissions` channel
   - You should see a notification appear!

---

## Verification

### Check if It's Working:

1. **Submit a test form**
2. **Check Discord `#submissions` channel** - Should see notification
3. **Check Netlify Function logs:**
   - Go to: Netlify Dashboard → Functions → `submit`
   - Look for: "Discord notification sent successfully"

### If Not Working:

1. **Check Environment Variable:**
   - Verify `DISCORD_WEBHOOK_SUBMISSIONS` is set in Netlify
   - Make sure webhook URL is correct (starts with `https://discord.com/api/webhooks/`)

2. **Check Function Logs:**
   - Netlify Dashboard → Functions → `submit` → Logs
   - Look for error messages

3. **Test Webhook Manually:**
   ```bash
   curl -X POST "YOUR_DISCORD_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{"content": "Test message"}'
   ```
   - If this works, webhook is valid
   - If not, create a new webhook

4. **Verify Channel:**
   - Make sure `#submissions` channel exists
   - Make sure webhook has permission to post in that channel

---

## Code Location

The Discord notification code is in:
- **File:** `_functions/submit.js`
- **Function:** `exports.handler`
- **Line:** ~92-163

It uses the Discord webhook utility from:
- **File:** `_functions/discord-webhook.js`

---

## Features

✅ **Automatic Notifications** - Every form submission triggers Discord notification
✅ **Rich Embeds** - Beautiful formatted messages with all submission details
✅ **Error Handling** - Form still works even if Discord fails
✅ **Message Truncation** - Long messages are automatically truncated to 1000 chars
✅ **Timestamp** - Includes submission time
✅ **Emoji Icons** - Easy to scan visually

---

## Multiple Channels

You can set up different webhooks for different purposes:

- `DISCORD_WEBHOOK_SUBMISSIONS` - Form submissions (current)
- `DISCORD_WEBHOOK_BUILD_STATUS` - CI/CD build notifications
- `DISCORD_WEBHOOK_REVIEW_QUEUE` - Review packet notifications

All are configured separately in Netlify environment variables.

---

## Troubleshooting

### Issue: No Discord notifications appearing

**Solution:**
1. Check `DISCORD_WEBHOOK_SUBMISSIONS` is set in Netlify
2. Verify webhook URL is correct
3. Test webhook manually with curl
4. Check Netlify function logs for errors

### Issue: Discord notification fails but form works

**Solution:**
- This is expected behavior - form submission continues even if Discord fails
- Check function logs to see why Discord failed
- Verify webhook URL is still valid (webhooks can expire)

### Issue: Partial information in Discord

**Solution:**
- Check that all form fields are being submitted
- Verify form validation is working
- Check function logs for parsing errors

---

## Security Notes

⚠️ **Important:**
- Never commit Discord webhook URLs to git
- Always use environment variables
- Webhook URLs are sensitive - treat them like passwords
- Rotate webhooks if they're exposed

---

## Next Steps

1. ✅ Create Discord webhook for `#submissions` channel
2. ✅ Add `DISCORD_WEBHOOK_SUBMISSIONS` to Netlify environment variables
3. ✅ Test with a form submission
4. ✅ Verify notification appears in Discord

---

**Last Updated:** December 18, 2025
**Status:** ✅ Already Implemented - Just needs configuration!

