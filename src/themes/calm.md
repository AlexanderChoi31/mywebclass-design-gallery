---
layout: base.njk
title: Calm Theme
description: Soft, airy, minimal design theme
theme: calm
---

<div class="section">
    <div class="container">
        <h1>Calm Theme</h1>
        <p style="font-size: 1.125rem; color: var(--color-text-secondary);">
            A soft, airy, minimal theme with generous spacing and rounded corners. 
            Designed for clarity and peace of mind.
        </p>
    </div>
</div>

<!-- Hero Section -->
<div class="section" style="background-color: var(--color-bg-secondary);">
    <div class="container">
        <h2>Hero Section</h2>
        <div style="padding: var(--space-2xl); background: var(--color-bg-primary); border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
            <h1 style="font-size: 3rem; margin-bottom: var(--space-md);">Peaceful Design</h1>
            <p style="font-size: 1.25rem; color: var(--color-text-secondary); max-width: 600px;">
                Experience clarity and calm with the Calm theme's minimal, spacious design.
            </p>
            <div style="margin-top: var(--space-xl);">
                <a href="#" class="btn">Get Started</a>
                <a href="#" class="btn btn-secondary" style="margin-left: var(--space-md);">Learn More</a>
            </div>
        </div>
    </div>
</div>

<!-- Card Grid -->
<div class="section">
    <div class="container">
        <h2>Card Grid</h2>
        <div class="card-grid">
            <div class="card">
                <h3>Typography</h3>
                <p style="color: var(--color-text-secondary);">
                    Serif headings with elegant spacing create a refined reading experience.
                </p>
            </div>
            <div class="card">
                <h3>Color Palette</h3>
                <p style="color: var(--color-text-secondary);">
                    Deep blacks and grays with a vibrant accent color for emphasis.
                </p>
            </div>
            <div class="card">
                <h3>Spacing</h3>
                <p style="color: var(--color-text-secondary);">
                    Generous spacing scale ensures comfortable content consumption.
                </p>
            </div>
        </div>
    </div>
</div>

<!-- Form Inputs -->
<div class="section" style="background-color: var(--color-bg-secondary);">
    <div class="container">
        <h2>Form Inputs & Buttons</h2>
        <div style="max-width: 600px;">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="your@email.com">
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" rows="4" placeholder="Your message here..."></textarea>
            </div>
            <div style="display: flex; gap: var(--space-md);">
                <button class="btn">Submit</button>
                <button class="btn btn-secondary">Cancel</button>
            </div>
        </div>
    </div>
</div>

<!-- Typography Samples -->
<div class="section">
    <div class="container">
        <h2>Typography Samples</h2>
        <div style="max-width: 800px;">
            <h1>Heading 1 - Playfair Display</h1>
            <h2>Heading 2 - Editorial Style</h2>
            <h3>Heading 3 - Hierarchical Structure</h3>
            <h4>Heading 4 - Content Sections</h4>
            <p>
                Body text uses a clean sans-serif font for optimal readability. 
                The contrast between serif headings and sans-serif body creates 
                visual hierarchy and maintains editorial sophistication.
            </p>
            <p style="color: var(--color-text-secondary);">
                Secondary text provides context without overwhelming the primary content.
            </p>
        </div>
    </div>
</div>

<!-- Alerts -->
<div class="section" style="background-color: var(--color-bg-secondary);">
    <div class="container">
        <h2>Alerts & Notices</h2>
        <div class="alert alert-success">
            <strong>Success!</strong> Your changes have been saved.
        </div>
        <div class="alert alert-info">
            <strong>Info:</strong> This is an informational message.
        </div>
        <div class="alert alert-warning">
            <strong>Warning:</strong> Please review your input before submitting.
        </div>
        <div class="alert alert-error">
            <strong>Error:</strong> Something went wrong. Please try again.
        </div>
    </div>
</div>

<!-- Table/Pricing -->
<div class="section">
    <div class="container">
        <h2>Pricing Table</h2>
        <table>
            <thead>
                <tr>
                    <th>Plan</th>
                    <th>Features</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Basic</strong></td>
                    <td>Essential features</td>
                    <td>$9/month</td>
                </tr>
                <tr>
                    <td><strong>Pro</strong></td>
                    <td>Advanced features + support</td>
                    <td>$29/month</td>
                </tr>
                <tr>
                    <td><strong>Enterprise</strong></td>
                    <td>Everything + custom solutions</td>
                    <td>Custom</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<script>
// Auto-apply theme when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.ThemeSwitcher) {
        window.ThemeSwitcher.setTheme('calm');
    }
});
</script>

