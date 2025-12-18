# MyWebClass – Outstanding Design Styles Gallery

A production-ready Eleventy (11ty) website showcasing five drastically different design themes. Built with automation-first principles, comprehensive testing, and quality enforcement.

## 🎨 Features

- **5 Distinct Themes**: Onyx, Paper, Neon, Brutal, Calm
- **Theme Switcher**: Runtime theme switching with localStorage persistence
- **CMS Integration**: Sanity CMS for content management
- **Form Submissions**: Airtable + Discord integration
- **GDPR Compliance**: Cookie consent and privacy policy
- **Quality Gates**: Automated linting, testing, and Lighthouse CI
- **CI/CD**: GitHub Actions with comprehensive quality checks

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

The site will be available at `http://localhost:8080`

## 📁 Project Structure

```
CMS Project/
├── src/                    # Source files
│   ├── _includes/          # Eleventy includes
│   ├── themes/            # Theme detail pages
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript
├── _functions/            # Netlify Functions
├── tests/                 # Playwright tests
├── docs/                  # Documentation
└── logs/                  # Generated logs
```

## 🎯 Themes

1. **Onyx** - Dark, editorial theme with serif typography
2. **Paper** - Light, print-inspired theme with paper texture
3. **Neon** - High-contrast, modern theme with glow effects
4. **Brutal** - Brutalist, bold theme with sharp edges
5. **Calm** - Soft, airy, minimal theme with generous spacing

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
# Sanity CMS
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_READ_TOKEN=your-read-token

# Airtable
AIRTABLE_BASE_ID=your-base-id
AIRTABLE_TABLE_NAME=Submissions
AIRTABLE_API_KEY=your-api-key

# Discord Webhooks
DISCORD_WEBHOOK_BUILD_STATUS=your-webhook-url
DISCORD_WEBHOOK_SUBMISSIONS=your-webhook-url
DISCORD_WEBHOOK_REVIEW_QUEUE=your-webhook-url
```

### Discord Webhook Setup

1. Go to your Discord server settings
2. Navigate to Integrations → Webhooks
3. Create webhooks for:
   - `#build-status` - CI/CD notifications
   - `#submissions` - Form submission notifications
   - `#review-queue` - Review packet notifications
4. Copy webhook URLs to `.env`

## 📚 Documentation

- [Architecture](./docs/architecture.md) - System architecture and data flow
- [Acceptance Criteria](./docs/acceptance-criteria.md) - Project requirements
- [Quality Rubric](./docs/quality-rubric.md) - Quality evaluation criteria
- [Analytics Evaluation](./docs/analytics-evaluation.md) - Analytics tool analysis
- [QA Report](./docs/qa-report.md) - Test-driven development approach

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run specific test file
npx playwright test tests/homepage.spec.js
```

## 🔍 Quality Checks

```bash
# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css

# Lint Markdown
npm run lint:md

# Run Lighthouse CI
npm run lighthouse

# Check bundle size
npm run bundle-size
```

## 📊 CI/CD

The project includes a comprehensive GitHub Actions workflow that:

- Runs linting checks
- Executes Playwright tests
- Runs Lighthouse CI
- Checks bundle sizes
- Generates review packets
- Deploys to Netlify (on main branch)

## 🚢 Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `_site`
3. Add environment variables in Netlify dashboard
4. Deploy!

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy _site directory to your hosting provider
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run Playwright tests
- `npm run lint` - Run all linters
- `npm run lighthouse` - Run Lighthouse CI
- `npm run bundle-size` - Check bundle sizes
- `npm run generate-review-packet` - Generate review packet

## 🎓 Educational Value

This project demonstrates:

- Modern static site generation with Eleventy
- Theme system architecture with CSS variables
- CMS integration patterns
- Serverless functions (Netlify Functions)
- GDPR-compliant consent management
- CI/CD automation
- Test-driven development
- Quality enforcement

## 📄 License

ISC

## 🙏 Acknowledgments

Built as a demonstration of professional-grade web development practices with automation-first principles.

---

**Status**: ✅ Production Ready


