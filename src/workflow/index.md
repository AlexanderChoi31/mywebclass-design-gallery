---
layout: base.njk
title: Our Workflow & Service
description: Discover our automation-first development workflow and service offerings
---

<div class="section">
  <div class="container">
    <h1>Our Development Workflow</h1>
    <p style="font-size: 1.25rem; color: var(--color-text-secondary); max-width: 800px;">
      An automation-first methodology that ensures quality, consistency, and production-readiness 
      at every step of development. This is how we build enterprise-grade websites.
    </p>
  </div>
</div>

<!-- Workflow Overview -->
<div class="section" style="background-color: var(--color-bg-secondary);">
  <div class="container">
    <h2>The Complete Workflow</h2>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-2xl);">
      Our workflow is designed to catch issues early, automate repetitive tasks, and ensure 
      consistent quality across all projects.
    </p>

    <div style="max-width: 1200px; margin: 0 auto;">
      <!-- Phase 1: Planning & Setup -->
      <div class="card" style="margin-bottom: var(--space-xl);">
        <div style="display: flex; align-items: start; gap: var(--space-lg);">
          <div style="min-width: 80px; height: 80px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; flex-shrink: 0;">
            1
          </div>
          <div style="flex-grow: 1;">
            <h3 style="margin-bottom: var(--space-md);">Planning & Architecture</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
              Before writing a single line of code, we define the architecture, acceptance criteria, 
              and quality standards. This includes:
            </p>
            <ul style="color: var(--color-text-secondary); padding-left: var(--space-lg); margin-bottom: var(--space-md);">
              <li>System architecture documentation with data flow diagrams</li>
              <li>Acceptance criteria for all features</li>
              <li>Quality rubrics and scoring metrics</li>
              <li>Technology stack selection and rationale</li>
              <li>CI/CD pipeline design</li>
            </ul>
            <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
              <strong>Deliverable:</strong> Complete architecture documentation, acceptance criteria, 
              and project roadmap.
            </div>
          </div>
        </div>
      </div>

      <!-- Phase 2: Test-Driven Development -->
      <div class="card" style="margin-bottom: var(--space-xl);">
        <div style="display: flex; align-items: start; gap: var(--space-lg);">
          <div style="min-width: 80px; height: 80px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; flex-shrink: 0;">
            2
          </div>
          <div style="flex-grow: 1;">
            <h3 style="margin-bottom: var(--space-md);">Test-Driven Development (TDD)</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
              We write Playwright end-to-end tests <strong>before</strong> implementing features. 
              This ensures functionality works correctly from the user's perspective and prevents regressions.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-md);">
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Homepage Tests</strong><br>
                Page loads, navigation works, theme switcher functional
              </div>
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Theme Tests</strong><br>
                All themes load correctly, switching persists
              </div>
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Form Tests</strong><br>
                Validation, submission, error handling
              </div>
            </div>
            <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
              <strong>Result:</strong> 21+ automated tests ensure every feature works as expected. 
              All tests must pass before code is merged.
            </div>
          </div>
        </div>
      </div>

      <!-- Phase 3: Automated Quality Checks -->
      <div class="card" style="margin-bottom: var(--space-xl);">
        <div style="display: flex; align-items: start; gap: var(--space-lg);">
          <div style="min-width: 80px; height: 80px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; flex-shrink: 0;">
            3
          </div>
          <div style="flex-grow: 1;">
            <h3 style="margin-bottom: var(--space-md);">Automated Quality Gates</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
              Every commit triggers comprehensive automated checks across multiple dimensions of quality:
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-md);">
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Code Quality</strong><br>
                ESLint, Stylelint, Markdownlint, Prettier
              </div>
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Testing</strong><br>
                Playwright E2E tests (21+ tests)
              </div>
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Performance</strong><br>
                Lighthouse CI, Bundle size monitoring
              </div>
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Accessibility</strong><br>
                Pa11y, Axe Core, HTML Validator
              </div>
            </div>
            <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
              <strong>Quality Gates:</strong> Code that doesn't meet standards is automatically blocked 
              from merging. No manual review needed for basic quality checks.
            </div>
          </div>
        </div>
      </div>

      <!-- Phase 4: Visual Assessment -->
      <div class="card" style="margin-bottom: var(--space-xl);">
        <div style="display: flex; align-items: start; gap: var(--space-lg);">
          <div style="min-width: 80px; height: 80px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; flex-shrink: 0;">
            4
          </div>
          <div style="flex-grow: 1;">
            <h3 style="margin-bottom: var(--space-md);">Visual Quality Assessment</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
              Automated screenshot analysis evaluates design quality across all themes. Our system 
              checks spacing, contrast, readability, and professionalism, then iteratively improves 
              designs until target scores are met.
            </p>
            <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base); margin-bottom: var(--space-md);">
              <strong>Assessment Criteria:</strong>
              <ul style="margin-top: var(--space-sm); padding-left: var(--space-lg);">
                <li>Is it spaced properly?</li>
                <li>Is it clean?</li>
                <li>Can users read easily? (Color contrast validation)</li>
                <li>Do the designs have a mark of professionalism?</li>
                <li>What does the page miss compared to theme standards?</li>
              </ul>
            </div>
            <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
              <strong>Automated Improvement Loop:</strong> Our system ran 10 iterations, generating 
              240+ screenshots and automatically fixing contrast and spacing issues across all themes.
            </div>
          </div>
        </div>
      </div>

      <!-- Phase 5: CI/CD & Deployment -->
      <div class="card" style="margin-bottom: var(--space-xl);">
        <div style="display: flex; align-items: start; gap: var(--space-lg);">
          <div style="min-width: 80px; height: 80px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; flex-shrink: 0;">
            5
          </div>
          <div style="flex-grow: 1;">
            <h3 style="margin-bottom: var(--space-md);">Continuous Integration & Deployment</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
              Our CI/CD pipeline automates the entire deployment process. Every successful build 
              is automatically deployed to production, ensuring your site is always up-to-date.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md); margin-bottom: var(--space-md);">
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>GitHub Actions</strong><br>
                Automated CI pipeline
              </div>
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Netlify</strong><br>
                Automated builds and deployment
              </div>
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Discord</strong><br>
                Build status notifications
              </div>
              <div style="background-color: var(--color-bg-tertiary); padding: var(--space-sm); border-radius: var(--radius-base);">
                <strong>Quality Gates</strong><br>
                Block merges on failures
              </div>
            </div>
            <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
              <strong>Result:</strong> Zero-downtime deployments with automatic rollback capabilities. 
              Every deployment is tested and validated before going live.
            </div>
          </div>
        </div>
      </div>

      <!-- Phase 6: Documentation & Review -->
      <div class="card">
        <div style="display: flex; align-items: start; gap: var(--space-lg);">
          <div style="min-width: 80px; height: 80px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; flex-shrink: 0;">
            6
          </div>
          <div style="flex-grow: 1;">
            <h3 style="margin-bottom: var(--space-md);">Documentation & Review</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
              Every project includes comprehensive documentation and automated review packets generated 
              when all quality gates pass.
            </p>
            <div style="background-color: var(--color-bg-tertiary); padding: var(--space-md); border-radius: var(--radius-base);">
              <strong>Deliverables:</strong>
              <ul style="margin-top: var(--space-sm); padding-left: var(--space-lg);">
                <li>Architecture documentation with diagrams</li>
                <li>Acceptance criteria and quality rubrics</li>
                <li>Setup and deployment guides</li>
                <li>Automated review packets (generated on quality gate pass)</li>
                <li>Quality metrics and improvement logs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Service Offering -->
<div class="section">
  <div class="container">
    <h2>Our Service Offering</h2>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-2xl); max-width: 800px;">
      We deliver production-ready websites using this proven workflow. Here's what you get:
    </p>

    <div class="card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-xl);">
      <div class="card">
        <h3>🎨 Multi-Theme Architecture</h3>
        <p style="color: var(--color-text-secondary);">
          Build websites with multiple design themes that can be switched at runtime. Perfect for 
          A/B testing, brand variations, or seasonal designs.
        </p>
        <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
          <li>Runtime theme switching</li>
          <li>CSS variable-based system</li>
          <li>Shared content structure</li>
          <li>Zero code duplication</li>
        </ul>
      </div>

      <div class="card">
        <h3>⚡ Automation-First Development</h3>
        <p style="color: var(--color-text-secondary);">
          Every aspect of development is automated. From code quality checks to visual assessments, 
          our system ensures consistency and quality.
        </p>
        <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
          <li>Automated linting and formatting</li>
          <li>End-to-end testing</li>
          <li>Performance audits</li>
          <li>Visual quality assessment</li>
        </ul>
      </div>

      <div class="card">
        <h3>🔍 Quality Assurance Pipeline</h3>
        <p style="color: var(--color-text-secondary);">
          Comprehensive quality gates prevent deployment of substandard code. Our system validates 
          code quality, performance, accessibility, and SEO.
        </p>
        <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
          <li>Lighthouse CI thresholds</li>
          <li>Bundle size monitoring</li>
          <li>Accessibility testing</li>
          <li>HTML validation</li>
        </ul>
      </div>

      <div class="card">
        <h3>📊 Visual Quality Assessment</h3>
        <p style="color: var(--color-text-secondary);">
          Automated screenshot analysis evaluates design quality across all themes. Our system checks 
          spacing, contrast, readability, and professionalism.
        </p>
        <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
          <li>Automated screenshot capture</li>
          <li>Spacing and layout analysis</li>
          <li>Color contrast validation</li>
          <li>Automated improvement loops</li>
        </ul>
      </div>

      <div class="card">
        <h3>🚀 Production-Ready Deployment</h3>
        <p style="color: var(--color-text-secondary);">
          Fully configured deployment pipelines with Netlify, including serverless functions, form 
          handling, and automated builds.
        </p>
        <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
          <li>Netlify hosting and functions</li>
          <li>Automated build pipeline</li>
          <li>Form submission handling</li>
          <li>Discord webhook integration</li>
        </ul>
      </div>

      <div class="card">
        <h3>📝 Comprehensive Documentation</h3>
        <p style="color: var(--color-text-secondary);">
          Every project includes detailed documentation: architecture decisions, acceptance criteria, 
          quality rubrics, and setup guides.
        </p>
        <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
          <li>Architecture documentation</li>
          <li>Acceptance criteria</li>
          <li>Quality rubrics</li>
          <li>Setup guides</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- Why This Workflow -->
<div class="section" style="background-color: var(--color-bg-secondary);">
  <div class="container">
    <h2>Why This Workflow?</h2>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl);">
      Our automation-first approach delivers unparalleled benefits:
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-xl);">
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">💰 Cost-Effective</h3>
        <p style="color: var(--color-text-secondary);">
          Automated processes reduce manual labor and errors, saving development costs and time.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">🎯 High Quality</h3>
        <p style="color: var(--color-text-secondary);">
          Rigorous testing and quality gates ensure a flawless user experience from day one.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">📈 Scalable</h3>
        <p style="color: var(--color-text-secondary);">
          Modular architecture and modern stack support future growth and feature additions.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">🔧 Maintainable</h3>
        <p style="color: var(--color-text-secondary);">
          Clean code, comprehensive tests, and clear documentation simplify updates and maintenance.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">⚡ Fast Performance</h3>
        <p style="color: var(--color-text-secondary);">
          Eleventy and optimized assets deliver lightning-fast load times and excellent Lighthouse scores.
        </p>
      </div>
      <div>
        <h3 style="color: var(--color-accent); margin-bottom: var(--space-sm);">🛡️ Future-Proof</h3>
        <p style="color: var(--color-text-secondary);">
          Built with modern, open-source technologies that stand the test of time.
        </p>
      </div>
    </div>
  </div>
</div>

<!-- CTA -->
<div class="section">
  <div class="container" style="text-align: center;">
    <h2>Ready to Build Your Website?</h2>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl); max-width: 600px; margin-left: auto; margin-right: auto;">
      Let's discuss how our automation-first workflow can deliver your production-ready website.
    </p>
    <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
      <a href="/submit/" class="btn">Get Started</a>
      <a href="/tools/" class="btn btn-secondary">Learn About Our Tools</a>
    </div>
  </div>
</div>

