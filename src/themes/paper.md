---
layout: base.njk
title: Paper Theme
description: Light, print-inspired design theme
theme: paper
---

<div class="section">
    <div class="container">
        <h1>Paper Theme</h1>
        <p style="font-size: 1.125rem; color: var(--color-text-secondary);">
            A light, print-inspired theme with classic typography and paper texture. 
            Evokes the timeless elegance of traditional publishing.
        </p>
    </div>
</div>

<!-- Hero Section -->
<div class="section" style="background-color: var(--color-bg-secondary);">
    <div class="container">
        <h2>Hero Section</h2>
        <div style="padding: var(--space-2xl); background: var(--color-bg-primary); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
            <h1 style="font-size: 3rem; margin-bottom: var(--space-md);">Print Perfection</h1>
            <p style="font-size: 1.25rem; color: var(--color-text-secondary); max-width: 600px;">
                Experience the classic beauty of print design in a digital format with the Paper theme.
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
                    Classic serif headings with traditional body fonts create a timeless reading experience.
                </p>
            </div>
            <div class="card">
                <h3>Color Palette</h3>
                <p style="color: var(--color-text-secondary);">
                    Clean whites and soft grays with subtle paper texture for authenticity.
                </p>
            </div>
            <div class="card">
                <h3>Spacing</h3>
                <p style="color: var(--color-text-secondary);">
                    Generous spacing inspired by print layouts ensures comfortable reading.
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
            <h1>Heading 1 - Merriweather</h1>
            <h2>Heading 2 - Classic Serif</h2>
            <h3>Heading 3 - Traditional Typography</h3>
            <h4>Heading 4 - Print-Inspired</h4>
            <p>
                Body text uses Source Sans Pro for optimal readability. 
                The combination of serif headings and sans-serif body creates 
                a classic print-inspired design that's both elegant and readable.
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
        window.ThemeSwitcher.setTheme('paper');
    }
});
</script>

