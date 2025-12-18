---
layout: base.njk
title: Royal Theme
description: Elegant Royal theme with gold accents, cursive typography, and refined curvature
theme: royal
---

<div class="section">
    <div class="container">
        <h1>Royal Theme</h1>
        <p style="font-size: 1.25rem; color: var(--color-text-secondary); max-width: 800px;">
            An elegant and sophisticated theme featuring gold, black, white, and light pink accents. 
            Designed with cursive typography and refined curvature that creates a sharp yet elegant aesthetic.
        </p>
    </div>
</div>

<div class="section" style="background-color: var(--color-bg-secondary);">
    <div class="container">
        <h2>Theme Showcase</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-xl);">
            Experience the Royal theme's elegant design elements:
        </p>
        
        <!-- Hero Section -->
        <div class="card" style="margin-bottom: var(--space-xl);">
            <h3>Hero Section</h3>
            <p style="color: var(--color-text-secondary);">
                The Royal theme features elegant gold gradients, refined borders, and sophisticated typography 
                that creates a luxurious and regal atmosphere.
            </p>
        </div>
        
        <!-- Navigation -->
        <div class="card" style="margin-bottom: var(--space-xl);">
            <h3>Navigation</h3>
            <p style="color: var(--color-text-secondary);">
                Navigation elements feature gold accents with elegant hover effects, including 
                gradient underlines that smoothly animate on interaction.
            </p>
        </div>
        
        <!-- Card Grid -->
        <div class="card-grid" style="margin-bottom: var(--space-xl);">
            <div class="card">
                <h4>Elegant Cards</h4>
                <p style="color: var(--color-text-secondary); font-size: 0.9rem;">
                    Cards feature gold borders, refined curvature, and gradient top borders 
                    that add sophistication.
                </p>
            </div>
            <div class="card">
                <h4>Refined Typography</h4>
                <p style="color: var(--color-text-secondary); font-size: 0.9rem;">
                    Cursive headings with gold gradient text create an elegant, luxurious feel 
                    throughout the design.
                </p>
            </div>
            <div class="card">
                <h4>Sophisticated Colors</h4>
                <p style="color: var(--color-text-secondary); font-size: 0.9rem;">
                    Gold (#d4af37), black, white, and light pink (#ffb6c1) create a regal 
                    color palette.
                </p>
            </div>
        </div>
        
        <!-- Form Inputs -->
        <div class="card" style="margin-bottom: var(--space-xl);">
            <h3>Form Elements</h3>
            <form style="max-width: 500px;">
                <div class="form-group">
                    <label for="royal-name">Name</label>
                    <input type="text" id="royal-name" name="name" placeholder="Enter your name" style="width: 100%; padding: var(--space-sm); border: 2px solid var(--color-border); border-radius: var(--radius-base);">
                </div>
                <div class="form-group">
                    <label for="royal-email">Email</label>
                    <input type="email" id="royal-email" name="email" placeholder="your@email.com" style="width: 100%; padding: var(--space-sm); border: 2px solid var(--color-border); border-radius: var(--radius-base);">
                </div>
                <button type="submit" class="btn" style="margin-top: var(--space-md);">Submit</button>
            </form>
        </div>
        
        <!-- Typography Showcase -->
        <div class="card" style="margin-bottom: var(--space-xl);">
            <h3>Typography</h3>
            <h1 style="margin-bottom: var(--space-sm);">Heading 1 - Cursive Elegance</h1>
            <h2 style="margin-bottom: var(--space-sm);">Heading 2 - Refined Style</h2>
            <h3 style="margin-bottom: var(--space-sm);">Heading 3 - Sophisticated Design</h3>
            <p style="color: var(--color-text-secondary); margin-top: var(--space-md);">
                Body text uses elegant serif typography (Cormorant Garamond) that complements 
                the cursive headings (Dancing Script) for a refined, luxurious appearance.
            </p>
        </div>
        
        <!-- Alert/Notice -->
        <div class="card" style="background: linear-gradient(135deg, #f4e4bc 0%, #ffe4e9 100%); border: 2px solid var(--royal-gold); margin-bottom: var(--space-xl);">
            <h4 style="color: var(--color-text-primary);">✨ Royal Features</h4>
            <p style="color: var(--color-text-primary);">
                This theme features elegant gold gradients, refined curvature (1.5rem border-radius), 
                cursive typography, and sophisticated color combinations that create a luxurious, 
                regal aesthetic.
            </p>
        </div>
        
        <!-- Table -->
        <div class="card" style="margin-bottom: var(--space-xl);">
            <h3>Data Presentation</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: var(--space-md);">
                <thead>
                    <tr style="background-color: var(--color-bg-secondary);">
                        <th style="padding: var(--space-sm); border: 2px solid var(--color-border); text-align: left;">Feature</th>
                        <th style="padding: var(--space-sm); border: 2px solid var(--color-border); text-align: left;">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: var(--space-sm); border: 2px solid var(--color-border);">Colors</td>
                        <td style="padding: var(--space-sm); border: 2px solid var(--color-border);">Gold, Black, White, Light Pink</td>
                    </tr>
                    <tr style="background-color: var(--color-bg-secondary);">
                        <td style="padding: var(--space-sm); border: 2px solid var(--color-border);">Typography</td>
                        <td style="padding: var(--space-sm); border: 2px solid var(--color-border);">Cursive headings, elegant serif body</td>
                    </tr>
                    <tr>
                        <td style="padding: var(--space-sm); border: 2px solid var(--color-border);">Curvature</td>
                        <td style="padding: var(--space-sm); border: 2px solid var(--color-border);">1.5rem border-radius for refined elegance</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style="text-align: center; margin-top: var(--space-2xl);">
            <a href="/themes/" class="btn">← Back to Themes</a>
        </div>
    </div>
</div>

<script>
// Auto-apply theme when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.ThemeSwitcher) {
        window.ThemeSwitcher.setTheme('royal');
    }
});
</script>

