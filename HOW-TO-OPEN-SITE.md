# 🌐 How to Open the MyWebClass Design Gallery Site

## Quick Access Links

### 🚀 Live Production Site (Netlify)
**Main URL:** https://joyful-cranachan-6fdbb1.netlify.app

This is the live, production-ready site deployed on Netlify. It updates automatically when you push to GitHub.

---

## 💻 Local Development

### Option 1: Development Server (Recommended for Development)

1. **Start the dev server:**
   ```bash
   cd "/Users/alexchoi/CMS Project"
   npm run dev
   ```

2. **Open in browser:**
   - **Homepage:** http://localhost:8080/
   - The server will automatically reload when you make changes

3. **Stop the server:**
   - Press `Ctrl + C` in the terminal

### Option 2: Built Site (Static Files)

1. **Build the site:**
   ```bash
   cd "/Users/alexchoi/CMS Project"
   npm run build
   ```

2. **Open the built site:**
   - Navigate to: `/Users/alexchoi/CMS Project/_site/`
   - Open `index.html` in your browser
   - Or use a local server:
     ```bash
     cd "/Users/alexchoi/CMS Project/_site"
     python3 -m http.server 8000
     ```
   - Then open: http://localhost:8000/

---

## 📄 All Available Pages

### Main Pages (Local: http://localhost:8080/ | Live: https://joyful-cranachan-6fdbb1.netlify.app)

| Page | Local URL | Live URL |
|------|-----------|----------|
| **Homepage** | http://localhost:8080/ | https://joyful-cranachan-6fdbb1.netlify.app/ |
| **Themes Index** | http://localhost:8080/themes/ | https://joyful-cranachan-6fdbb1.netlify.app/themes/ |
| **Workflow** | http://localhost:8080/workflow/ | https://joyful-cranachan-6fdbb1.netlify.app/workflow/ |
| **Tools** | http://localhost:8080/tools/ | https://joyful-cranachan-6fdbb1.netlify.app/tools/ |
| **About** | http://localhost:8080/about/ | https://joyful-cranachan-6fdbb1.netlify.app/about/ |
| **Submit** | http://localhost:8080/submit/ | https://joyful-cranachan-6fdbb1.netlify.app/submit/ |
| **Privacy** | http://localhost:8080/privacy/ | https://joyful-cranachan-6fdbb1.netlify.app/privacy/ |
| **CMS Content** | http://localhost:8080/cms/ | https://joyful-cranachan-6fdbb1.netlify.app/cms/ |

### Theme Detail Pages

| Theme | Local URL | Live URL |
|-------|-----------|----------|
| **Onyx** | http://localhost:8080/themes/onyx/ | https://joyful-cranachan-6fdbb1.netlify.app/themes/onyx/ |
| **Paper** | http://localhost:8080/themes/paper/ | https://joyful-cranachan-6fdbb1.netlify.app/themes/paper/ |
| **Neon** | http://localhost:8080/themes/neon/ | https://joyful-cranachan-6fdbb1.netlify.app/themes/neon/ |
| **Brutal** | http://localhost:8080/themes/brutal/ | https://joyful-cranachan-6fdbb1.netlify.app/themes/brutal/ |
| **Calm** | http://localhost:8080/themes/calm/ | https://joyful-cranachan-6fdbb1.netlify.app/themes/calm/ |
| **Royal** | http://localhost:8080/themes/royal/ | https://joyful-cranachan-6fdbb1.netlify.app/themes/royal/ |

---

## 🎨 Testing Theme Switching

1. Open any page (homepage recommended)
2. Look for the theme switcher dropdown in the header (top right)
3. Select a theme from the dropdown:
   - Onyx
   - Paper
   - Neon
   - Brutal
   - Calm
   - Royal
4. The page will instantly switch themes
5. Refresh the page - your theme choice is saved (localStorage)

---

## 🔧 Quick Commands

### Start Development Server
```bash
cd "/Users/alexchoi/CMS Project"
npm run dev
```
Then open: http://localhost:8080/

### Build Site
```bash
cd "/Users/alexchoi/CMS Project"
npm run build
```
Built files will be in: `_site/` directory

### Run Tests
```bash
cd "/Users/alexchoi/CMS Project"
npm test
```

### Test Everything
```bash
cd "/Users/alexchoi/CMS Project"
npm run test:all
```

### Open in Browser (macOS)
```bash
# Open homepage
open http://localhost:8080/

# Open live site
open https://joyful-cranachan-6fdbb1.netlify.app
```

---

## 📱 Mobile Testing

### Local Development
1. Find your computer's local IP address:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
2. On your mobile device, connect to the same WiFi network
3. Open: `http://YOUR_IP_ADDRESS:8080/`

### Live Site
- Simply open: https://joyful-cranachan-6fdbb1.netlify.app on your mobile browser

---

## 🌍 Network Access (Share with Others)

### Using ngrok (Tunnel to Local Server)
1. Install ngrok: https://ngrok.com/
2. Start your dev server: `npm run dev`
3. In another terminal:
   ```bash
   ngrok http 8080
   ```
4. Share the ngrok URL (e.g., `https://abc123.ngrok.io`)

### Using Live Site
- Simply share: https://joyful-cranachan-6fdbb1.netlify.app

---

## 🐛 Troubleshooting

### Port 8080 Already in Use
```bash
# Find what's using port 8080
lsof -ti:8080

# Kill the process
kill -9 $(lsof -ti:8080)

# Or use a different port
PORT=3000 npm run dev
```

### Site Not Loading
1. Check if dev server is running: `lsof -ti:8080`
2. Check for build errors: `npm run build`
3. Clear browser cache
4. Try incognito/private mode

### Changes Not Showing
1. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Restart dev server: `Ctrl + C` then `npm run dev`
3. Clear browser cache

---

## 📊 Quick Status Check

Run this to check if everything is working:
```bash
cd "/Users/alexchoi/CMS Project"
npm run test:all
```

This will check:
- ✅ Dev server status
- ✅ Local site accessibility
- ✅ Build process
- ✅ Playwright tests
- ✅ Linting
- ✅ Netlify deployment

---

## 🔗 Quick Links Summary

**Live Site:** https://joyful-cranachan-6fdbb1.netlify.app

**Local Development:** http://localhost:8080/ (when `npm run dev` is running)

**GitHub Repository:** https://github.com/AlexanderChoi31/mywebclass-design-gallery

**Netlify Dashboard:** https://app.netlify.com

---

## 💡 Pro Tips

1. **Bookmark the live site** for quick access
2. **Use the theme switcher** to see all 6 themes on any page
3. **Check mobile responsiveness** by resizing your browser window
4. **Use browser DevTools** (F12) to inspect theme CSS variables
5. **Test form submission** on the `/submit/` page
6. **View source code** to see how themes are implemented

---

**Last Updated:** December 18, 2025

