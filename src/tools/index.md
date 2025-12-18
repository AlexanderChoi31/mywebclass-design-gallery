---
layout: base.njk
title: Why These Tools?
description: Learn about our technology choices and why we selected each tool
---

<div class="section">
  <div class="container">
    <h1>Why These Tools?</h1>
    <p style="font-size: 1.25rem; color: var(--color-text-secondary); max-width: 800px;">
      Every tool in our stack was carefully selected for specific reasons. Here's why we chose 
      each technology and how it contributes to building production-ready websites.
    </p>
  </div>
</div>

<!-- Core Framework -->
<div class="section" style="background-color: var(--color-bg-secondary);">
  <div class="container">
    <h2>Core Framework</h2>

    <div class="card" style="margin-bottom: var(--space-xl);">
      <h3>Eleventy (11ty) - Static Site Generator</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
        <strong>Why Eleventy?</strong> We chose Eleventy as our static site generator for several 
        compelling reasons:
      </p>
      <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
        <li><strong>Zero JavaScript Runtime:</strong> Generates pure HTML/CSS, resulting in lightning-fast 
        load times and perfect Lighthouse scores. No client-side JavaScript framework overhead.</li>
        <li><strong>Flexible Templating:</strong> Supports multiple template languages (Nunjucks, Liquid, 
        Handlebars) allowing us to choose the best tool for each use case.</li>
        <li><strong>Simple Data Layer:</strong> Easy integration with headless CMS, JSON files, or APIs 
        without complex data fetching logic.</li>
        <li><strong>Developer Experience:</strong> Fast builds, clear documentation, and a vibrant 
        community. Built by developers, for developers.</li>
        <li><strong>Future-Proof:</strong> Static HTML will always work, regardless of JavaScript 
        framework trends or breaking changes.</li>
      </ul>
      <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
        <strong>Result:</strong> Our site achieves perfect Lighthouse performance scores (100/100) 
        and loads in under 1 second, even on slow connections.
      </div>
    </div>
  </div>
</div>

<!-- Quality Assurance Tools -->
<div class="section">
  <div class="container">
    <h2>Quality Assurance Tools</h2>

    <div style="display: grid; gap: var(--space-xl);">
      <!-- Playwright -->
      <div class="card">
        <h3>Playwright - End-to-End Testing</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
          <strong>Why Playwright?</strong> We use Playwright for comprehensive browser automation and testing:
        </p>
        <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
          <li><strong>Multi-Browser Support:</strong> Test across Chromium, Firefox, and WebKit to ensure 
          compatibility across all major browsers.</li>
          <li><strong>Reliable Automation:</strong> Auto-waiting, network interception, and screenshot 
          capabilities make testing robust and maintainable.</li>
          <li><strong>Visual Testing:</strong> Built-in screenshot comparison helps catch visual regressions 
          automatically.</li>
          <li><strong>Developer-Friendly:</strong> Excellent debugging tools, test UI mode, and clear error 
          messages speed up development.</li>
        </ul>
        <div style="background-color: var(--color-bg-secondary); padding: var(--space-md); border-radius: var(--radius-base);">
          <strong>In Practice:</strong> Our 21 Playwright tests ensure every feature works correctly, 
          from theme switching to form submission, across all pages.
        </div>
      </div>

      <!-- Lighthouse CI -->
      <div class="card">
        <h3>Lighthouse CI - Performance & Quality Audits</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
          <strong>Why Lighthouse CI?</strong> Automated performance, accessibility, SEO, and best practices auditing:
        </p>
        <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
          <li><strong>Comprehensive Metrics:</strong> Measures performance, accessibility, SEO, and best 
          practices in a single audit.</li>
          <li><strong>CI Integration:</strong> Runs automatically on every commit, blocking merges that 
          don't meet quality thresholds.</li>
          <li><strong>Actionable Insights:</strong> Provides specific recommendations for improvement, 
          not just scores.</li>
          <li><strong>Industry Standard:</strong> Uses the same engine as Chrome DevTools, ensuring 
          consistency with real-world performance.</li>
        </ul>
        <div style="background-color: var(--color-bg-secondary); padding: var(--space-md); border-radius: var(--radius-base);">
          <strong>In Practice:</strong> Our site consistently scores 90+ in all Lighthouse categories, 
          ensuring excellent user experience and SEO.
        </div>
      </div>

      <!-- ESLint, Stylelint, Markdownlint -->
      <div class="card">
        <h3>ESLint, Stylelint, Markdownlint - Code Quality</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
          <strong>Why Multiple Linters?</strong> Each linter serves a specific purpose:
        </p>
        <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
          <li><strong>ESLint:</strong> Catches JavaScript errors, enforces coding standards, and prevents 
          common bugs before they reach production.</li>
          <li><strong>Stylelint:</strong> Ensures CSS consistency, catches invalid properties, and enforces 
          best practices for maintainable stylesheets.</li>
          <li><strong>Markdownlint:</strong> Maintains documentation quality, ensures consistent formatting, 
          and improves readability.</li>
        </ul>
        <div style="background-color: var(--color-bg-secondary); padding: var(--space-md); border-radius: var(--radius-base);">
          <strong>In Practice:</strong> Perfect linting scores across all languages ensure code quality 
          and maintainability from day one.
        </div>
      </div>

      <!-- Pa11y & Axe Core -->
      <div class="card">
        <h3>Pa11y & Axe Core - Accessibility Testing</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
          <strong>Why Multiple Accessibility Tools?</strong> Different tools catch different issues:
        </p>
        <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
          <li><strong>Pa11y:</strong> Command-line accessibility testing that's easy to integrate into CI/CD. 
          Provides clear, actionable error messages.</li>
          <li><strong>Axe Core:</strong> Industry-standard accessibility engine used by major companies. 
          Catches WCAG violations that other tools might miss.</li>
          <li><strong>HTML Validator:</strong> Ensures semantic HTML structure, which is fundamental to 
          accessibility and SEO.</li>
        </ul>
        <div style="background-color: var(--color-bg-secondary); padding: var(--space-md); border-radius: var(--radius-base);">
          <strong>In Practice:</strong> Our site meets WCAG AA standards, ensuring it's usable by everyone, 
          including users with disabilities.
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Infrastructure -->
<div class="section" style="background-color: var(--color-bg-secondary);">
  <div class="container">
    <h2>Infrastructure & Deployment</h2>

    <div style="display: grid; gap: var(--space-xl);">
      <!-- Netlify -->
      <div class="card">
        <h3>Netlify - Hosting & Serverless Functions</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
          <strong>Why Netlify?</strong> Netlify provides everything we need for modern web deployment:
        </p>
        <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
          <li><strong>Git-Based Deployments:</strong> Automatic deployments on every push, with preview 
          deployments for pull requests.</li>
          <li><strong>Serverless Functions:</strong> Run backend logic (form submissions, API calls) without 
          managing servers.</li>
          <li><strong>Built-in CDN:</strong> Global content delivery ensures fast load times worldwide.</li>
          <li><strong>Form Handling:</strong> Built-in form processing eliminates the need for separate backend 
          services for simple forms.</li>
          <li><strong>Free Tier:</strong> Generous free tier perfect for small to medium projects, with 
          easy scaling as needed.</li>
        </ul>
        <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
          <strong>In Practice:</strong> Our site deploys automatically on every commit, with zero-downtime 
          deployments and instant rollback capabilities.
        </div>
      </div>

      <!-- GitHub Actions -->
      <div class="card">
        <h3>GitHub Actions - CI/CD Pipeline</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
          <strong>Why GitHub Actions?</strong> Integrated CI/CD that runs quality checks before deployment:
        </p>
        <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
          <li><strong>Native Integration:</strong> Built into GitHub, no separate CI service needed.</li>
          <li><strong>Free for Public Repos:</strong> Unlimited minutes for public repositories, perfect 
          for open-source projects.</li>
          <li><strong>Flexible Workflows:</strong> Easy to configure complex pipelines with multiple steps 
          and conditions.</li>
          <li><strong>Quality Gates:</strong> Can block merges and deployments based on test results, 
          ensuring only quality code reaches production.</li>
        </ul>
        <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
          <strong>In Practice:</strong> Every commit runs 21+ tests, linting, and Lighthouse audits. 
          Only code that passes all checks can be merged.
        </div>
      </div>

      <!-- Sanity CMS -->
      <div class="card">
        <h3>Sanity CMS - Content Management</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
          <strong>Why Sanity?</strong> Headless CMS that separates content from presentation:
        </p>
        <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
          <li><strong>Developer-Friendly:</strong> Schema-based content model that's easy to define and modify.</li>
          <li><strong>Real-Time Collaboration:</strong> Multiple editors can work simultaneously with live updates.</li>
          <li><strong>API-First:</strong> RESTful and GraphQL APIs make it easy to fetch content in any format.</li>
          <li><strong>Flexible:</strong> Can be used for simple content or complex structured data.</li>
          <li><strong>Free Tier:</strong> Generous free tier for small projects.</li>
        </ul>
        <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
          <strong>In Practice:</strong> Content editors can update website content without touching code, 
          while developers maintain full control over presentation.
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Visual Assessment -->
<div class="section">
  <div class="container">
    <h2>Visual Assessment Tools</h2>

    <div class="card">
      <h3>Custom Visual Assessment System</h3>
      <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
        <strong>Why Build Custom Tools?</strong> We created our own visual assessment system because 
        existing tools don't provide the specific insights we need:
      </p>
      <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
        <li><strong>Theme-Specific Analysis:</strong> Our system understands multi-theme architecture 
        and assesses each theme individually.</li>
        <li><strong>Automated Screenshots:</strong> Captures screenshots of all themes and pages 
        automatically for visual regression testing.</li>
        <li><strong>Spacing Analysis:</strong> Measures container spacing consistency, which is critical 
        for professional design but hard to test automatically.</li>
        <li><strong>Contrast Validation:</strong> Calculates color contrast ratios to ensure WCAG 
        compliance across all themes.</li>
        <li><strong>Iterative Improvement:</strong> Automated improvement loop that fixes issues and 
        re-assesses until target scores are met.</li>
      </ul>
      <div style="background-color: var(--color-bg-secondary); padding: var(--space-md); border-radius: var(--radius-base);">
        <strong>In Practice:</strong> Our system ran 10 iterations, generating 240+ screenshots and 
        automatically improving contrast and spacing across all themes.
      </div>
    </div>
  </div>
</div>

<!-- Why This Stack -->
<div class="section" style="background-color: var(--color-bg-secondary);">
  <div class="container">
    <h2>Why This Stack?</h2>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl);">
      Our technology choices work together to create a cohesive, powerful development environment:
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-xl);">
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">🚀 Performance</h3>
        <p style="color: var(--color-text-secondary);">
          Eleventy generates static HTML, Netlify serves it via CDN, and Lighthouse ensures we maintain 
          excellent performance scores.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">🛡️ Quality</h3>
        <p style="color: var(--color-text-secondary);">
          Multiple layers of quality assurance (tests, linting, accessibility) ensure production-ready code.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">💰 Cost-Effective</h3>
        <p style="color: var(--color-text-secondary);">
          All tools have generous free tiers, making this stack accessible for projects of any size.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">🔧 Maintainable</h3>
        <p style="color: var(--color-text-secondary);">
          Modern, well-documented tools with active communities ensure long-term maintainability.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">📈 Scalable</h3>
        <p style="color: var(--color-text-secondary);">
          From small projects to enterprise deployments, this stack scales effortlessly.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">🎯 Future-Proof</h3>
        <p style="color: var(--color-text-secondary);">
          Built on open standards and proven technologies that will remain relevant for years to come.
        </p>
      </div>
    </div>
  </div>
</div>

<!-- CTA -->
<div class="section">
  <div class="container" style="text-align: center;">
    <h2>Ready to See It in Action?</h2>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl); max-width: 600px; margin-left: auto; margin-right: auto;">
      Explore our workflow and see how these tools work together to deliver production-ready websites.
    </p>
    <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
      <a href="/workflow/" class="btn">View Our Workflow</a>
      <a href="/about/" class="btn btn-secondary">Learn More</a>
    </div>
  </div>
</div>

