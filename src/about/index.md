---
layout: base.njk
title: About Our Process
description: Learn about our automation-first development methodology and service offerings
---

<div class="section">
    <div class="container">
        <h1>About Our Process</h1>
        <p style="font-size: 1.25rem; color: var(--color-text-secondary); max-width: 800px;">
            We build production-ready websites using an automation-first methodology that ensures 
            quality, performance, and maintainability at every step of development.
        </p>
    </div>
</div>

<div class="section" style="background-color: var(--color-bg-secondary);">
    <div class="container" style="max-width: 100%; padding: 0;">
        <h2 style="padding: 0 var(--space-lg);">Our Service Offering</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl); padding: 0 var(--space-lg);">
            We specialize in building enterprise-grade websites with multi-theme architecture, 
            comprehensive quality assurance, and automated deployment pipelines.
        </p>
        
        <div style="max-width: 1000px; margin: 0 auto; padding: 0 100px;">
            <div style="display: grid; gap: var(--space-xl); margin-top: var(--space-xl);">
                <div class="card">
                    <h3>Multi-Theme Website Solutions</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                        Build websites that support multiple design themes with runtime switching. 
                        Perfect for A/B testing, brand variations, seasonal designs, or client 
                        customization. All themes share the same content structure, dramatically 
                        reducing maintenance overhead.
                    </p>
                    <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
                        <li>Runtime theme switching with localStorage persistence</li>
                        <li>CSS variable-based architecture for easy customization</li>
                        <li>Shared content structure across all themes</li>
                        <li>Theme-specific styling without code duplication</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>Automation-First Development</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                        Every aspect of development is automated. From code quality checks to visual 
                        assessments, our system ensures consistency and quality without manual intervention.
                    </p>
                    <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
                        <li>Automated linting and formatting on every commit</li>
                        <li>Automated testing with Playwright E2E tests</li>
                        <li>Automated performance and accessibility audits</li>
                        <li>Automated visual quality assessment</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>Quality Assurance Pipeline</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                        Comprehensive quality gates prevent deployment of substandard code. Our system 
                        validates code quality, performance, accessibility, SEO, and visual design 
                        before any code reaches production.
                    </p>
                    <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
                        <li>Lighthouse CI with configurable thresholds</li>
                        <li>Bundle size monitoring and limits</li>
                        <li>Accessibility testing (Pa11y, Axe Core)</li>
                        <li>HTML validation and standards compliance</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>Visual Quality Assessment</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                        Automated screenshot analysis evaluates design quality across all themes. 
                        Our system checks spacing, contrast, readability, and professionalism, 
                        then iteratively improves designs until target scores are met.
                    </p>
                    <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
                        <li>Automated screenshot capture for all themes</li>
                        <li>Spacing and layout analysis</li>
                        <li>Color contrast validation</li>
                        <li>Automated improvement loop</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>Production-Ready Deployment</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                        Fully configured deployment pipelines with Netlify, including serverless functions, 
                        form handling, and automated builds. Integrated with Discord for notifications 
                        and build status tracking.
                    </p>
                    <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
                        <li>Netlify deployment with automated builds</li>
                        <li>Serverless functions for backend logic</li>
                        <li>Form submission handling</li>
                        <li>Discord integration for notifications</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>Comprehensive Documentation</h3>
                    <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                        Every project includes detailed documentation: architecture decisions, acceptance 
                        criteria, quality rubrics, setup guides, and automated review packets generated 
                        when quality gates pass.
                    </p>
                    <ul style="color: var(--color-text-secondary); margin-top: var(--space-md); padding-left: var(--space-lg);">
                        <li>Architecture documentation with diagrams</li>
                        <li>Acceptance criteria and quality rubrics</li>
                        <li>Setup and deployment guides</li>
                        <li>Automated review packet generation</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="container">
        <h2>Our Development Methodology</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl);">
            We follow a rigorous, automation-first methodology that ensures quality at every step.
        </p>
        
        <div style="max-width: 1000px; margin: 0 auto;">
            <div style="display: grid; gap: var(--space-xl);">
                <!-- Step 1 -->
                <div class="card">
                    <div style="display: flex; align-items: start; gap: var(--space-lg);">
                        <div style="min-width: 60px; height: 60px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; flex-shrink: 0;">
                            1
                        </div>
                        <div>
                            <h3 style="margin-bottom: var(--space-sm);">Test-Driven Development (TDD)</h3>
                            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                                We write Playwright end-to-end tests <strong>before</strong> implementing features. 
                                This ensures functionality works correctly from the user's perspective and prevents 
                                regressions. All tests must pass before code is merged.
                            </p>
                            <div style="background-color: var(--color-bg-secondary); padding: var(--space-md); border-radius: var(--radius-base);">
                                <strong>Example:</strong> Before building the theme switcher, we wrote tests that 
                                verify themes can be switched, preferences are saved, and the UI updates correctly.
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2 -->
                <div class="card">
                    <div style="display: flex; align-items: start; gap: var(--space-lg);">
                        <div style="min-width: 60px; height: 60px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; flex-shrink: 0;">
                            2
                        </div>
                        <div>
                            <h3 style="margin-bottom: var(--space-sm);">Automated Quality Checks</h3>
                            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                                Every commit triggers automated checks across multiple dimensions of quality:
                            </p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md);">
                                <div style="background-color: var(--color-bg-secondary); padding: var(--space-sm); border-radius: var(--radius-base);">
                                    <strong>Code Quality:</strong><br>
                                    ESLint, Stylelint, Markdownlint, Prettier
                                </div>
                                <div style="background-color: var(--color-bg-secondary); padding: var(--space-sm); border-radius: var(--radius-base);">
                                    <strong>Testing:</strong><br>
                                    Playwright E2E tests
                                </div>
                                <div style="background-color: var(--color-bg-secondary); padding: var(--space-sm); border-radius: var(--radius-base);">
                                    <strong>Performance:</strong><br>
                                    Lighthouse CI, Bundle size
                                </div>
                                <div style="background-color: var(--color-bg-secondary); padding: var(--space-sm); border-radius: var(--radius-base);">
                                    <strong>Accessibility:</strong><br>
                                    Pa11y, Axe Core, HTML Validator
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3 -->
                <div class="card">
                    <div style="display: flex; align-items: start; gap: var(--space-lg);">
                        <div style="min-width: 60px; height: 60px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; flex-shrink: 0;">
                            3
                        </div>
                        <div>
                            <h3 style="margin-bottom: var(--space-sm);">Visual Assessment & Iteration</h3>
                            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                                Automated screenshot analysis evaluates design quality across all themes. Our system 
                                checks spacing, contrast, readability, and professionalism. An automated improvement 
                                loop iteratively fixes issues until target scores are met.
                            </p>
                            <div style="background-color: var(--color-bg-secondary); padding: var(--space-md); border-radius: var(--radius-base);">
                                <strong>Assessment Criteria:</strong>
                                <ul style="margin-top: var(--space-sm); padding-left: var(--space-lg);">
                                    <li>Is it spaced properly?</li>
                                    <li>Is it clean?</li>
                                    <li>Can users read easily? (Color contrast validation)</li>
                                    <li>Do the designs have a mark of professionalism?</li>
                                    <li>What does the page miss compared to theme standards?</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 4 -->
                <div class="card">
                    <div style="display: flex; align-items: start; gap: var(--space-lg);">
                        <div style="min-width: 60px; height: 60px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; flex-shrink: 0;">
                            4
                        </div>
                        <div>
                            <h3 style="margin-bottom: var(--space-sm);">Continuous Integration & Deployment</h3>
                            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                                GitHub Actions orchestrates the entire pipeline. On every push, we build, test, 
                                validate, and deploy. Quality gates block merges that don't meet standards. 
                                Successful builds trigger Netlify deployment and Discord notifications.
                            </p>
                            <div style="background-color: var(--color-bg-secondary); padding: var(--space-md); border-radius: var(--radius-base);">
                                <strong>Pipeline Flow:</strong><br>
                                1. Code pushed to GitHub → 2. GitHub Actions triggered → 3. Install dependencies → 
                                4. Run all quality checks → 5. Build site → 6. Run tests → 7. Deploy to Netlify → 
                                8. Send Discord notification
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 5 -->
                <div class="card">
                    <div style="display: flex; align-items: start; gap: var(--space-lg);">
                        <div style="min-width: 60px; height: 60px; background: var(--color-accent); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; flex-shrink: 0;">
                            5
                        </div>
                        <div>
                            <h3 style="margin-bottom: var(--space-sm);">Comprehensive Documentation</h3>
                            <p style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">
                                Every aspect of the project is documented: architecture decisions, acceptance 
                                criteria, quality rubrics, analytics evaluations, and setup guides. Automated 
                                review packets are generated when all quality gates pass.
                            </p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-md);">
                                <div style="background-color: var(--color-bg-secondary); padding: var(--space-sm); border-radius: var(--radius-base);">
                                    <strong>Architecture:</strong><br>
                                    System design, data flow, theme system
                                </div>
                                <div style="background-color: var(--color-bg-secondary); padding: var(--space-sm); border-radius: var(--radius-base);">
                                    <strong>Quality:</strong><br>
                                    Rubrics, acceptance criteria, metrics
                                </div>
                                <div style="background-color: var(--color-bg-secondary); padding: var(--space-sm); border-radius: var(--radius-base);">
                                    <strong>Setup:</strong><br>
                                    Installation, deployment, configuration
                                </div>
                                <div style="background-color: var(--color-bg-secondary); padding: var(--space-sm); border-radius: var(--radius-base);">
                                    <strong>Review:</strong><br>
                                    Automated review packet generation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section" style="background-color: var(--color-bg-secondary);">
    <div class="container">
        <h2>Technology Stack</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-xl); margin-top: var(--space-xl);">
            <div class="card">
                <h3>Frontend</h3>
                <ul style="color: var(--color-text-secondary); margin-top: var(--space-sm); padding-left: var(--space-lg);">
                    <li><strong>Eleventy (11ty)</strong> - Static site generator</li>
                    <li><strong>CSS Variables</strong> - Theme system architecture</li>
                    <li><strong>Vanilla JavaScript</strong> - Minimal, performant code</li>
                    <li><strong>Nunjucks</strong> - Template engine</li>
                </ul>
            </div>
            
            <div class="card">
                <h3>Quality Assurance</h3>
                <ul style="color: var(--color-text-secondary); margin-top: var(--space-sm); padding-left: var(--space-lg);">
                    <li><strong>Playwright</strong> - End-to-end testing</li>
                    <li><strong>Lighthouse CI</strong> - Performance audits</li>
                    <li><strong>ESLint, Stylelint</strong> - Code quality</li>
                    <li><strong>Pa11y, Axe Core</strong> - Accessibility</li>
                </ul>
            </div>
            
            <div class="card">
                <h3>Infrastructure</h3>
                <ul style="color: var(--color-text-secondary); margin-top: var(--space-sm); padding-left: var(--space-lg);">
                    <li><strong>Netlify</strong> - Hosting & serverless functions</li>
                    <li><strong>GitHub Actions</strong> - CI/CD pipeline</li>
                    <li><strong>Sanity CMS</strong> - Content management</li>
                    <li><strong>Discord Webhooks</strong> - Notifications</li>
                </ul>
            </div>
            
            <div class="card">
                <h3>Monitoring & Analytics</h3>
                <ul style="color: var(--color-text-secondary); margin-top: var(--space-sm); padding-left: var(--space-lg);">
                    <li><strong>HTML Validator</strong> - Standards compliance</li>
                    <li><strong>Bundle Size</strong> - Performance monitoring</li>
                    <li><strong>Visual Assessment</strong> - Design quality</li>
                    <li><strong>Automated Logging</strong> - Quality metrics</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="section">
    <div class="container">
        <h2>Why Choose Our Approach?</h2>
        <div class="card-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-xl); margin-top: var(--space-xl);">
            <div class="card">
                <h3>🚀 Faster Development</h3>
                <p style="color: var(--color-text-secondary);">
                    Automation eliminates manual quality checks, allowing developers to focus on 
                    building features. Issues are caught immediately, not during final review.
                </p>
            </div>
            
            <div class="card">
                <h3>🛡️ Higher Quality</h3>
                <p style="color: var(--color-text-secondary);">
                    Quality gates ensure no substandard code reaches production. Every deployment 
                    meets performance, accessibility, and design standards.
                </p>
            </div>
            
            <div class="card">
                <h3>📊 Data-Driven</h3>
                <p style="color: var(--color-text-secondary);">
                    All quality metrics are tracked and logged. We can see exactly how the project 
                    improves over time and identify areas for optimization.
                </p>
            </div>
            
            <div class="card">
                <h3>🔄 Continuous Improvement</h3>
                <p style="color: var(--color-text-secondary);">
                    Automated improvement loops iteratively enhance designs until target scores 
                    are met. No manual design tweaking required.
                </p>
            </div>
            
            <div class="card">
                <h3>📝 Comprehensive Documentation</h3>
                <p style="color: var(--color-text-secondary);">
                    Every decision is documented. New team members can understand the architecture, 
                    process, and quality standards immediately.
                </p>
            </div>
            
            <div class="card">
                <h3>✅ Production-Ready</h3>
                <p style="color: var(--color-text-secondary);">
                    From day one, the project is structured for production. Deployment pipelines, 
                    monitoring, and quality assurance are built in, not added later.
                </p>
            </div>
        </div>
    </div>
</div>

<div class="section" style="background-color: var(--color-bg-secondary);">
    <div class="container">
        <div style="text-align: center; max-width: 800px; margin: 0 auto;">
            <h2>Ready to Get Started?</h2>
            <p style="font-size: 1.125rem; color: var(--color-text-secondary); margin: var(--space-xl) 0;">
                Whether you need a multi-theme website, automated quality assurance, or a complete 
                development pipeline, we can help. Our automation-first approach ensures quality 
                and speed from day one.
            </p>
            <div style="display: flex; gap: var(--space-md); justify-content: center; flex-wrap: wrap;">
                <a href="/submit/" class="btn">Contact Us</a>
                <a href="/themes/" class="btn btn-secondary">View Our Work</a>
            </div>
        </div>
    </div>
</div>

